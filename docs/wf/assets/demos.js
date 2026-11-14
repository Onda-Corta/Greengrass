/* /wf/demos: barra lateral con DEMOS que carga cada herramienta en un marco. */
(function () {
    var W = window.WF, esc = W.esc;
    var KEY = 'gg-demos-v1';
    var base = window.GG_DEMOS;
    var saved = {}; try { saved = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { saved = {}; }
    var q = new URLSearchParams(location.search);
    var state = {
      cliente: { nombre: q.get('cliente') || (saved.cliente && saved.cliente.nombre) || base.cliente.nombre, logo: q.get('logo') || (saved.cliente && saved.cliente.logo) || base.cliente.logo || '' },
      urls: {},
      demo: q.get('demo') || base.demos[0].id,
      open: ['demos', 'overview'],
      dialog: false
    };
    // Only http(s) addresses load: a javascript: URL from ?monitor= would run on this origin.
    function safeUrl(u) { if (!u) return ''; try { var x = new URL(u, location.href); return /^https?:$/.test(x.protocol) ? x.href : ''; } catch (e) { return ''; } }
    base.demos.forEach(function (d) { state.urls[d.id] = safeUrl(q.get(d.id) || (saved.urls && saved.urls[d.id]) || d.url || ''); });
    if (!base.demos.some(function (d) { return d.id === state.demo; })) state.demo = base.demos[0].id;
    function save() { try { localStorage.setItem(KEY, JSON.stringify({ cliente: state.cliente, urls: state.urls })); } catch (e) {} }

    function sec(id, label, icon, items) { return { id: id, label: label, icon: icon, items: items.map(function (x) { return { id: id + '-' + x[0], label: x[1], icon: x[2] || icon }; }) }; }
    function nav() {
      return [
        { id: 'demos', label: 'Demos', icon: 'play', cls: 'sb-demos', items: base.demos.map(function (d) { return { id: 'demo-' + d.id, label: d.nombre, icon: d.icono, href: '?demo=' + d.id, attrs: ' data-demo="' + d.id + '"' }; }) },
        sec('overview', 'Resumen', 'layout-dashboard', [['panel', 'Panel'], ['flujo', 'Flujo de actividad', 'activity']]),
        sec('people', 'Personas', 'users', [['contactos', 'Contactos'], ['segmentos', 'Segmentos', 'list-filter'], ['import', 'Importación/Exportación', 'upload'], ['dedup', 'Cola de deduplicación', 'copy']]),
        sec('field', 'Campo', 'door-open', [['tc', 'Trabajo de campo'], ['llamadas', 'Jornadas de llamadas', 'phone'], ['insc', 'Inscripción de votantes', 'clipboard-check'], ['terr', 'Territorios', 'map']]),
        sec('fund', 'Recaudación de fondos', 'banknote', [['don', 'Donaciones'], ['form', 'Formularios', 'file-text'], ['camp', 'Campañas', 'megaphone'], ['cump', 'Cumplimiento', 'shield-check'], ['rep', 'Repartos de la alianza', 'link']]),
        sec('comms', 'Comunicaciones', 'mail', [['correo', 'Correo'], ['sms', 'SMS/WhatsApp', 'message-square'], ['redes', 'Redes sociales', 'share-2'], ['plant', 'Plantillas', 'layout-template']]),
        sec('events', 'Eventos', 'calendar', [['ev', 'Eventos'], ['reg', 'Registro de entrada', 'square-check']]),
        sec('activism', 'Activismo', 'flag', [['camp', 'Campañas'], ['pet', 'Peticiones', 'file-text'], ['com', 'Comentarios públicos', 'message-square']]),
        sec('press', 'Prensa', 'newspaper', [['medios', 'Contactos de medios', 'users'], ['cont', 'Contenido', 'file-text'], ['comu', 'Comunicados'], ['cob', 'Cobertura', 'chart-column'], ['resp', 'Respaldos', 'user-check'], ['redes', 'Redes', 'share-2']]),
        sec('gotv', 'GOTV', 'vote', [['univ', 'Universo', 'users'], ['conc', 'Concentración', 'map-pin'], ['mando', 'Centro de mando', 'radio'], ['trans', 'Transporte', 'car'], ['obs', 'Observadores', 'eye'], ['res', 'Resultados']]),
        sec('msg', 'Mensajería', 'messages-square', [['mens', 'Mensajes']]),
        sec('alliance', 'Alianza', 'link', [['panel', 'Panel de la alianza', 'layout-dashboard'], ['miem', 'Miembros', 'building'], ['conj', 'Campañas conjuntas', 'megaphone']])
      ];
    }
    var STR = { search: 'Buscar personas, eventos, campañas…', notif: 'Notificaciones', unread: ', 3 sin leer', unreadLive: '3 notificaciones sin leer', account: 'Menú de la cuenta de ', skip: 'Saltar al contenido', tenant: 'Personalizar cliente' };
    var LABELS = { 'Help': 'Ayuda', 'Settings': 'Ajustes', 'Main navigation': 'Navegación principal', 'Collapse sidebar': 'Contraer barra lateral' };
    var SYNC = '<button class="sync" type="button" aria-label="Conectado y sincronizado. Abrir detalles de sincronización"><span class="dot"></span><span class="sr-only">Conectado</span></button>';

    function current() { return base.demos.filter(function (d) { return d.id === state.demo; })[0]; }
    function main() {
      var d = current(), url = state.urls[d.id];
      if (!url) {
        return '<section class="empty demo-empty" aria-labelledby="dh"><span class="empty-icon">' + ic(d.icono, 'xl') + '</span>' +
          '<h1 id="dh" class="t-2xl">Falta la dirección del ' + esc(d.nombre) + '</h1>' +
          '<p>Pega la dirección donde ya funciona esta herramienta. Se guarda en este navegador y se carga aquí cada vez que la elijas en la barra lateral.</p>' +
          '<form class="demo-url" data-url-form><label class="sr-only" for="u">Dirección de ' + esc(d.nombre) + '</label><input id="u" class="input" type="url" required placeholder="https://…" autocomplete="url"><button class="btn btn-primary" type="submit">Cargar' + ic('arrow-right', 'sm') + '</button></form></section>';
      }
      return '<div class="demo-bar"><div class="stack-2" style="gap:var(--space-0\\.5);min-width:0"><h1 class="t-lg semibold">' + esc(d.nombre) + '</h1><span class="t-xs muted demo-addr">' + esc(url) + '</span></div>' +
        '<div class="btn-group"><button class="btn btn-ghost btn-sm" type="button" data-act="edit">' + ic('pencil', 'sm') + 'Cambiar dirección</button>' +
        '<button class="btn btn-secondary btn-sm" type="button" data-act="reload">' + ic('refresh-cw', 'sm') + 'Recargar</button>' +
        '<a class="btn btn-secondary btn-sm" href="' + esc(url) + '" target="_blank" rel="noopener">' + ic('external-link', 'sm') + 'Abrir en pestaña nueva</a></div></div>' +
        '<iframe class="demo-frame" title="' + esc(d.nombre) + '" src="' + esc(url) + '" allow="clipboard-read; clipboard-write; fullscreen; microphone; camera; autoplay"></iframe>';
    }
    function dialog() {
      if (!state.dialog) return '';
      var c = state.cliente;
      return '<div class="scrim" data-act="close" aria-hidden="true"></div><div class="card demo-dialog" role="dialog" aria-modal="true" aria-labelledby="cd-h"><form data-client-form class="stack">' +
        '<div class="spread"><h2 id="cd-h" class="t-xl">Personalizar cliente</h2><button class="btn btn-icon" type="button" data-act="close" aria-label="Cerrar">' + ic('x', 'md') + '</button></div>' +
        '<p class="t-sm muted">El nombre y el logo aparecen en la barra superior. Se guardan en este navegador.</p>' +
        '<label class="stack-2"><span class="medium t-sm">Nombre del cliente</span><input class="input" name="nombre" required value="' + esc(c.nombre) + '"></label>' +
        '<div class="stack-2"><span class="medium t-sm">Logo</span><div class="cluster" style="gap:var(--space-4);flex-wrap:nowrap"><span class="tenant-logo demo-logo-preview' + (c.logo ? ' has-img' : '') + '">' + (c.logo ? '<img src="' + esc(c.logo) + '" alt="">' : ic('leaf', 'md')) + '</span>' +
        '<label class="btn btn-secondary btn-sm">' + ic('upload', 'sm') + 'Subir imagen<input type="file" accept="image/*" name="file" class="sr-only"></label>' +
        (c.logo ? '<button class="btn btn-ghost btn-sm" type="button" data-act="nologo">Quitar logo</button>' : '') + '</div>' +
        '<label class="stack-2"><span class="t-xs muted">o pega la dirección de una imagen</span><input class="input" name="logo" type="url" placeholder="https://…/logo.png" value="' + (c.logo && c.logo.indexOf('data:') !== 0 ? esc(c.logo) : '') + '"></label></div>' +
        '<div class="spread"><button class="btn btn-ghost btn-sm" type="button" data-act="reset">Restablecer</button><div class="btn-group"><button class="btn btn-secondary" type="button" data-act="close">Cancelar</button><button class="btn btn-primary" type="submit">Guardar</button></div></div></form></div>';
    }
    var pendingLogo = null;
    function render() {
      var d = current();
      document.title = d.nombre + ' · ' + state.cliente.nombre;
      var html = W.desktop({ persona: 'OA', nav: nav(), active: 'demo-' + state.demo, open: state.open, tenant: { name: state.cliente.nombre, logo: state.cliente.logo, editable: true }, strings: STR, labels: LABELS, syncHtml: SYNC, langSwitch: ['English', 'en'] }, main());
      document.getElementById('root').innerHTML = html + dialog();
      if (state.dialog) { var first = document.querySelector('.demo-dialog input[name=nombre]'); if (first) first.focus(); }
    }
    function select(id) {
      state.demo = id;
      var u = new URL(location.href); u.searchParams.set('demo', id); history.replaceState(null, '', u);
      render();
      var m = document.getElementById('content'); if (m) m.focus({ preventScroll: true });
    }
    document.addEventListener('click', function (e) {
      var a = e.target.closest('[data-demo]');
      if (a) { e.preventDefault(); select(a.getAttribute('data-demo')); return; }
      var h = e.target.closest('.sb-sec-head[data-sec]');
      if (h) { var id = h.getAttribute('data-sec'), i = state.open.indexOf(id); if (i > -1) state.open.splice(i, 1); else state.open.push(id); render(); return; }
      if (e.target.closest('[data-tenant]')) { e.preventDefault(); state.dialog = true; pendingLogo = null; render(); return; }
      var act = e.target.closest('[data-act]'); if (!act) { if (e.target.closest('.sb a[href="#"], .hdr a[href="#"]')) e.preventDefault(); return; }
      var k = act.getAttribute('data-act');
      if (k === 'close') { state.dialog = false; render(); var t = document.querySelector('[data-tenant]'); if (t) t.focus(); }
      if (k === 'reload') { var fr = document.querySelector('.demo-frame'); if (fr) fr.src = fr.src; }
      if (k === 'edit') { state.urls[state.demo] = ''; save(); render(); }
      if (k === 'nologo') { state.cliente.logo = ''; pendingLogo = null; save(); render(); }
      if (k === 'reset') { state.cliente = { nombre: base.cliente.nombre, logo: base.cliente.logo || '' }; save(); state.dialog = false; render(); }
    });
    document.addEventListener('change', function (e) {
      if (e.target.name === 'file' && e.target.files && e.target.files[0]) {
        var r = new FileReader();
        r.onload = function () { pendingLogo = r.result; var p = document.querySelector('.demo-logo-preview'); if (p) { p.className = 'tenant-logo demo-logo-preview has-img'; p.innerHTML = '<img src="' + pendingLogo + '" alt="">'; } };
        r.readAsDataURL(e.target.files[0]);
      }
    });
    document.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = e.target;
      if (f.hasAttribute('data-url-form')) { var v = safeUrl(f.querySelector('input').value.trim()); if (v) { state.urls[state.demo] = v; save(); render(); } }
      if (f.hasAttribute('data-client-form')) {
        state.cliente.nombre = f.nombre.value.trim() || state.cliente.nombre;
        var lu = f.logo.value.trim();
        state.cliente.logo = pendingLogo || lu || (state.cliente.logo && state.cliente.logo.indexOf('data:') === 0 ? state.cliente.logo : '');
        save(); state.dialog = false; render();
      }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && state.dialog) { state.dialog = false; render(); } });
    document.documentElement.lang = 'es';
    render();
  })();
