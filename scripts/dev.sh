#!/usr/bin/env bash
#
# One command from a fresh clone to a browsable site:
# installs the build tooling if it's missing, regenerates docs/, and serves it.
#
#   ./scripts/dev.sh              # build + serve on the first free port from 8000
#   PORT=9000 ./scripts/dev.sh    # pin a port
#   ./scripts/dev.sh --build-only # regenerate docs/ and exit
#   ./scripts/dev.sh --open       # also open the site in a browser
#
# Safe to re-run. Multiple worktrees can serve at once — each picks its own port.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

BUILD_ONLY=0
OPEN=0
for arg in "$@"; do
  case "$arg" in
    --build-only) BUILD_ONLY=1 ;;
    --open)       OPEN=1 ;;
    -h|--help)    sed -n '3,12p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "unknown option: $arg (try --help)" >&2; exit 2 ;;
  esac
done

need() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "error: $1 is required but not installed." >&2
    exit 1
  }
}
need node
need npm
need python3   # the static file server

# --- dependencies -----------------------------------------------------------
# Test that the build's actual imports resolve rather than just checking for a
# node_modules directory — a half-finished install passes that check and then
# fails inside build.mjs with ERR_MODULE_NOT_FOUND.
if ! node -e "import('markdown-it').then(()=>import('markdown-it-anchor'))" 2>/dev/null; then
  echo "==> installing build tooling"
  npm install
fi

# --- pick a port ------------------------------------------------------------
port_free() {
  python3 - "$1" <<'PY' >/dev/null 2>&1
import socket, sys
s = socket.socket()
# Match http.server's allow_reuse_address, otherwise a port left in TIME_WAIT by
# a just-stopped server reads as busy and each restart drifts to a higher port.
s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
try:
    s.bind(("127.0.0.1", int(sys.argv[1])))
except OSError:
    sys.exit(1)
finally:
    s.close()
PY
}

if [ "$BUILD_ONLY" -eq 1 ]; then
  :                                    # no port needed
elif [ -n "${PORT:-}" ]; then
  port_free "$PORT" || { echo "error: port $PORT is already in use." >&2; exit 1; }
else
  PORT=8000
  until port_free "$PORT"; do
    PORT=$((PORT + 1))
    [ "$PORT" -gt 8020 ] && { echo "error: no free port in 8000-8020." >&2; exit 1; }
  done
fi

# --- build ------------------------------------------------------------------
echo "==> building docs/"
npm run build

[ "$BUILD_ONLY" -eq 1 ] && exit 0

# --- serve ------------------------------------------------------------------
URL="http://localhost:${PORT}"
python3 -m http.server -d docs "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT INT TERM

for _ in $(seq 20); do
  port_free "$PORT" || break     # port now bound == server is listening
  sleep 0.1
done
kill -0 "$SERVER_PID" 2>/dev/null || { echo "error: server failed to start." >&2; exit 1; }

echo
echo "    GreenGrass docs  →  ${URL}"
echo "    Ctrl-C to stop."
echo

[ "$OPEN" -eq 1 ] && { command -v open >/dev/null && open "$URL" || true; }

wait "$SERVER_PID"
