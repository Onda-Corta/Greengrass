(function () {
    var W = window.WF, S = W.SCREENS;
    var m = W.metric, w = W.widget, more = W.more;

    // ---------------- Mobile standard app
    function adminDash() {
      return m({ icon: 'banknote', label: 'Total raised', value: '$47,320', lines: [W.trend('up', '12%')] }) +
        m({ icon: 'door-open', label: 'Doors knocked', value: '1,247', lines: [W.trend('up', '8%')] }) +
        m({ icon: 'users', label: 'Active volunteers', value: '34', lines: [W.trend('up', '15%')] }) +
        w({ id: 'm-alerts', icon: 'triangle-alert', iconCls: 'warn', title: 'Alerts <span class="num">(3)</span>', body: W.alert('critical', 'Compliance flag: José Delgado', 'Contribution over the $5,000 limit') + W.alert('warning', 'Sync issue: Turf 7', 'No sync in 2 hours') + W.alert('warning', 'Form builder draft expires in 3 days', ''), foot: more('View all alerts') });
    }
    S['shell/mobile-admin'] = { title: 'Mobile — Org Admin', html: function () { return W.mobile({ title: 'Dashboard', persona: 'OA', tab: 0 }, adminDash()); } };

    S['shell/mobile-volunteer'] = { title: 'Mobile — Volunteer', html: function () {
      var up = function (icon, t, when, n) { return '<div class="m-card-row"><span class="cluster semibold">' + ic(icon, 'md', 'muted') + t + '</span><span class="t-sm muted">' + when + '</span><span class="t-sm">' + n + '</span><button class="btn btn-secondary btn-sm" type="button" style="align-self:flex-end;min-height:var(--touch-target-min)">Details</button></div>'; };
      var rec = function (t, s) { return '<div class="m-card-row"><span class="cluster medium">' + ic('circle-check', 'md', 'ok') + t + '</span><span class="t-sm muted">' + s + '</span></div>'; };
      return W.mobile({ title: 'My Shifts', persona: 'V', tab: 0 },
        '<section class="card" aria-labelledby="up"><h2 id="up" class="m-card-head group-label">Upcoming</h2>' + up('clipboard-list', 'Northside Canvass', 'Tomorrow, 2:00 PM', '47 doors assigned') + up('phone', 'Phone Bank Wave 3', 'Sat, March 8, 10:00 AM', '25 calls assigned') + '</section>' +
        '<section class="card" aria-labelledby="re"><h2 id="re" class="m-card-head group-label">Recent</h2>' + rec('Westside Canvass', 'Yesterday · <span class="num">32/40</span> doors') + rec('Voter Reg Drive', 'Feb 28 · 12 registered') + '</section>');
    } };

    function msec(label, items) { return '<div class="m-sec"><div class="group-label">' + label + '</div>' + items.map(function (i) { return '<a class="m-item" href="#"' + (i[2] ? ' aria-current="page"' : '') + '>' + ic(i[0], 'md') + i[1] + '</a>'; }).join('') + '</div>'; }
    S['shell/mobile-more'] = { title: 'Mobile — “More” Menu', html: function () {
      var sheet = '<div class="sheet-scrim" aria-hidden="true"></div><div class="sheet" role="dialog" aria-modal="true" aria-label="More"><div class="handle" aria-hidden="true"></div>' +
        msec('Field', [['door-open', 'Canvassing'], ['phone', 'Phone Banking'], ['clipboard-check', 'Voter Registration'], ['map', 'Turfs']]) +
        msec('Communications', [['mail', 'Email'], ['message-square', 'SMS/WhatsApp'], ['share-2', 'Social Media']]) +
        msec('Events', [['calendar', 'Events'], ['square-check', 'Check-in']]) +
        msec('Fundraising', [['file-text', 'Forms'], ['megaphone', 'Campaigns'], ['shield-check', 'Compliance']]) +
        '<div style="border-block-start:var(--border-width) solid var(--color-border);margin-block:var(--space-2)"></div>' +
        msec('', [['settings', 'Settings'], ['circle-help', 'Help'], ['globe', 'Español']]).replace('<div class="group-label"></div>', '') + '</div>';
      return W.mobile({ title: 'Dashboard', persona: 'OA', tab: 4, overlay: sheet }, adminDash());
    } };

    S['shell/mobile-menu'] = { title: 'Mobile — Hamburger Menu', html: function () {
      var full = '<div class="m-full" role="dialog" aria-modal="true" aria-label="Main navigation">' + W.statusbar() + '<div class="m-top" style="border:0"><button class="btn btn-icon" type="button" aria-label="Close menu">' + ic('x', 'lg') + '</button><span style="flex:1"></span><span class="avatar" style="margin-inline-end:var(--space-3)">PD</span></div>' +
        '<div class="m-scroll"><div class="stack-2" style="gap:var(--space-0\\.5);padding:var(--space-2) var(--space-2) var(--space-4);border-block-end:var(--border-width) solid var(--color-border)"><span class="t-lg semibold">Pablo Defendini</span><span class="t-sm muted">Org Admin · Partido Verde</span></div>' +
        msec('Overview', [['layout-dashboard', 'Dashboard', 1], ['activity', 'Activity Feed']]) +
        msec('People', [['users', 'Contacts'], ['list-filter', 'Segments']]) +
        msec('Field', [['door-open', 'Canvassing'], ['phone', 'Phone Banking'], ['clipboard-check', 'Voter Registration'], ['map', 'Turfs']]) +
        msec('Fundraising', [['banknote', 'Donations'], ['file-text', 'Forms'], ['megaphone', 'Campaigns'], ['shield-check', 'Compliance']]) +
        '<div style="border-block-start:var(--border-width) solid var(--color-border);margin-block:var(--space-2)"></div>' +
        msec('', [['settings', 'Settings'], ['circle-help', 'Help'], ['globe', 'Español'], ['log-out', 'Log Out']]).replace('<div class="group-label"></div>', '') + '</div></div>';
      return W.mobile({ title: 'Dashboard', persona: 'OA', tab: 0, menu: true, overlay: full }, adminDash());
    } };

    S['shell/mobile-tabs'] = { title: 'Per-Persona Mobile Tabs', html: function () {
      var names = { OA: 'Org Admin', CD: 'Communications Director', FD: 'Finance Director', FiD: 'Field Director', VC: 'Volunteer Coordinator', DM: 'Data Manager', V: 'Volunteer', TL: 'Team Lead', C: 'Candidate', S: 'Supporter' };
      return '<main class="sheetpage"><div><h1 class="t-xl">Bottom tab bars by role</h1><p class="t-sm muted">4–5 tabs per role, 48px touch targets, 56px bar. Volunteers and Team Leads get a filled Start Shift tab that enters field mode.</p></div>' +
        Object.keys(names).map(function (k) { return '<section class="specimen"><h2 class="t-sm semibold">' + names[k] + ' <span class="muted medium">(' + k + ')</span></h2>' + W.tabbar(k, 0) + '</section>'; }).join('') + '</main>';
    } };

    // ---------------- Field mode shell
    function fhead(state) {
      var s = {
        connected: '<span class="fsync"><span class="dot"></span>Synced 30s ago</span>',
        stale: '<span class="fsync" style="font-size:var(--text-lg)"><span class="dot" style="background:var(--color-sync-stale)"></span>Synced 12 min ago</span>',
        syncing: '<span class="fsync">' + ic('refresh-cw', 'md') + 'Syncing…</span>',
        offline: '<span class="fsync"><span class="dot" style="background:transparent;border:2px dashed var(--color-sync-offline)"></span>Offline · 47 min</span>',
        error: '<span class="fsync" style="color:#fecaca">' + ic('triangle-alert', 'md') + 'Sync failed · <a href="#" style="color:inherit;text-decoration:underline">Retry</a></span>',
        recent: '<span class="fsync"><span class="dot"></span>Synced 2m ago</span>'
      }[state || 'connected'];
      var bg = state === 'error' ? ' style="background:var(--color-error)"' : (state === 'stale' ? ' style="background:var(--color-warning);color:var(--color-text)"' : '');
      return '<header class="fm-head" role="status"' + bg + '>' + s + '<span class="rec" aria-label="Recording shift time"><i></i>REC</span><span class="timer" aria-label="Shift time 2 hours 34 minutes">2:34</span></header>';
    }
    W.fhead = fhead;
    function ffoot(extra) { return '<footer class="fm-foot">' + (extra || '') + '<div class="spread"><button class="fa fa-danger" type="button">End Shift</button><button class="panic" type="button" aria-label="Lock app">' + ic('lock', 'lg') + '</button></div></footer>'; }
    function fnav() { return '<div class="fm-nav"><button class="fa" type="button">' + ic('chevron-left', 'lg') + 'Prev</button><span class="pos">13 of 47</span><button class="fa" type="button">Next' + ic('chevron-right', 'lg') + '</button></div>'; }
    function fm(body, foot, state) { return '<div class="fm">' + fhead(state) + '<main class="fm-body" id="content">' + body + '</main>' + foot + '</div>'; }

    S['shell/field-walk-list'] = { title: 'Field Mode — Walk List', context: 'field-mode', html: function () {
      var walk = function (n, name, addr) { return '<a class="card walk" href="#" style="color:inherit;text-decoration:none"><span class="semibold">' + n + '. ' + name + '</span><span class="muted" style="font-size:var(--text-base)">' + addr + '</span><span class="st">' + ic('circle', 'sm') + 'Not yet visited</span></a>'; };
      return fm('<div class="stack-2"><h1 class="t-xl">Northside Canvass</h1><span class="muted">12 of 47 complete</span><div class="bar lg" role="img" aria-label="12 of 47 doors complete"><span style="width:25.5%"></span></div></div>' +
        walk(13, 'Ana Martínez', '742 Calle Sol, Apt 3') + walk(14, 'Carlos Rivera', '744 Calle Sol') + walk(15, 'Elena Torres', '748 Calle Sol, Apt 1') + walk(16, 'José Delgado', '750 Calle Sol'),
        '<footer class="fm-foot"><div class="spread"><button class="fa" type="button">' + ic('map-pin', 'lg') + 'Map</button><span style="flex:1"></span><button class="fa fa-danger" type="button">End Shift</button><button class="panic" type="button" aria-label="Lock app">' + ic('lock', 'lg') + '</button></div></footer>');
    } };

    S['shell/field-door-card'] = { title: 'Field Mode — Door Card', context: 'field-mode', html: function () {
      var opt = function (k, t) { return '<button class="opt" type="button"><b>' + k + '</b>' + t + '</button>'; };
      return fm('<div class="stack-2" style="gap:var(--space-1)"><h1 class="t-2xl">Ana Martínez</h1><span>742 Calle Sol, Apt 3</span><span class="muted" style="font-size:var(--text-base)">Age 34 · F · Registered ' + ic('check', 'sm', 'ok') + '</span></div>' +
        '<div class="card" style="padding:var(--space-3) var(--space-4);font-size:var(--text-base)"><div>Previous: canvassed Jan 12</div><div>Support: 3 (Lean support)</div></div>' +
        '<p class="semibold">“Do you plan to support Partido Verde in the upcoming election?”</p>' +
        '<div class="stack-2" role="radiogroup" aria-label="Support level">' + opt('1', 'Strong support') + opt('2', 'Lean support') + opt('3', 'Undecided') + opt('4', 'Lean oppose') + opt('5', 'Strong oppose') + opt(ic('x', 'sm'), 'Not home') + '</div>',
        ffoot(fnav()), 'recent');
    } };

    S['shell/field-response'] = { title: 'Field Mode — After Response Selected', context: 'field-mode', html: function () {
      var cb = function (t, on) { return '<label class="checkrow"><span class="checkbox' + (on ? ' on' : '') + '" role="checkbox" aria-checked="' + !!on + '">' + (on ? ic('check', 'sm') : '') + '</span>' + t + '</label>'; };
      return fm('<div class="spread"><h1 class="t-2xl">Ana Martínez</h1>' + ic('circle-check', 'xl', 'ok') + '</div><span>742 Calle Sol, Apt 3</span>' +
        '<div class="banner banner-info" style="font-size:var(--text-base)">' + ic('check', 'md') + 'Response: 2 — Lean support</div>' +
        '<p class="semibold">“What issues are most important to you?”</p><div>' + cb('Environment', 1) + cb('Economy') + cb('Education') + cb('Healthcare', 1) + cb('Housing') + cb('Public safety') + '</div>' +
        '<label class="stack-2"><span style="font-size:var(--text-base)" class="medium">Notes (optional)</span><div class="textarea">Has a yard sign from last election. Interested in volunteering.</div></label>' +
        '<button class="fa fa-primary" type="button">Save &amp; Next' + ic('arrow-right', 'lg') + '</button>',
        ffoot(fnav()), 'recent');
    } };

    S['shell/field-map'] = { title: 'Field Mode — Map View', context: 'field-mode', html: function () {
      var map = '<svg class="map" viewBox="0 0 340 300" role="img" aria-label="Walk list map: 4 doors visited, you are at 742 Calle Sol, 4 doors remaining">' +
        '<rect width="340" height="300" style="fill:var(--color-surface-sunken)"/>' +
        '<path d="M70 20 V280 M190 20 V280 M20 70 H320 M20 160 H320 M20 240 H320" style="stroke:var(--color-border-strong)" stroke-width="14" stroke-linecap="round"/>' +
        '<text x="232" y="62" class="axis" style="fill:var(--color-text-secondary);font-size:11px">Calle Sol</text><text x="76" y="296" class="axis" style="fill:var(--color-text-secondary);font-size:11px">Calle Luna</text>' +
        [[70, 70, 'v'], [190, 70, 'v'], [70, 160, 'v'], [190, 160, 'c'], [70, 240, 'r'], [190, 240, 'r'], [280, 160, 'r'], [280, 70, 'v']].map(function (p) {
          if (p[2] === 'v') return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="11" style="fill:var(--color-success)"/><path d="M' + (p[0] - 5) + ' ' + p[1] + ' l3.5 3.5 6-7" fill="none" stroke="#fff" stroke-width="2.2"/>';
          if (p[2] === 'c') return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="18" style="fill:var(--color-primary);opacity:.2"/><circle cx="' + p[0] + '" cy="' + p[1] + '" r="10" style="fill:var(--color-primary);stroke:#fff" stroke-width="3"/>';
          return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="10" style="fill:var(--color-surface-raised);stroke:var(--color-text-secondary)" stroke-width="2.5"/>';
        }).join('') + '<text x="212" y="152" style="fill:var(--color-text);font-size:13px;font-weight:600">You</text></svg>';
      var legend = '<div class="legend" style="font-size:var(--text-sm)"><span>' + ic('circle-check', 'sm', 'ok') + '<span>Visited</span></span><span>' + ic('circle-dot', 'sm', 'inf') + '<span>Current</span></span><span>' + ic('circle', 'sm', 'muted') + '<span>Remaining</span></span></div>';
      return fm('<div class="card" style="padding:var(--space-2)">' + map + '</div>' + legend +
        '<div class="card" style="padding:var(--space-4)"><span class="muted t-sm">Next</span><div class="semibold">14. Carlos Rivera</div><div style="font-size:var(--text-base)">744 Calle Sol · <span class="num">120 m</span> away</div></div>' +
        '<div class="cluster" style="flex-wrap:nowrap"><button class="fa" type="button" style="flex:1">' + ic('list', 'lg') + 'List view</button><button class="fa fa-primary" type="button" style="flex:1">' + ic('navigation', 'lg') + 'Navigate</button></div>', ffoot());
    } };

    S['shell/field-end-shift'] = { title: 'Field Mode — End Shift Confirmation', context: 'field-mode', html: function () {
      return '<div class="fm"><header class="fm-head"><h1 class="t-lg semibold" style="color:inherit">End shift?</h1></header><main class="fm-body" id="content">' +
        '<div class="stack-2"><span class="t-xl">Northside Canvass</span><span>Duration: 2h 50m</span></div>' +
        '<div class="stack-2"><span>Completed: <b class="num">32 of 47</b> doors</span><div class="bar lg" role="img" aria-label="32 of 47 doors complete"><span style="width:68%"></span></div></div>' +
        '<div class="cluster">' + ic('refresh-cw', 'md', 'inf') + 'Pending sync: 5 interactions</div>' +
        '<div class="banner banner-warning" style="font-size:var(--text-base);align-items:flex-start">' + ic('triangle-alert', 'lg') + '<span><b>15 doors remaining.</b> They will be released back to the assignment pool.</span></div>' +
        '<div class="stack-3" style="margin-block-start:auto"><button class="fa fa-primary" type="button">End Shift &amp; Sync</button><button class="fa" type="button">Continue Canvassing</button></div></main></div>';
    } };

    S['shell/field-debrief'] = { title: 'Field Mode — Shift Debrief', context: 'field-mode', html: function () {
      var row = function (k, v) { return '<dt>' + k + '</dt><dd class="num">' + v + '</dd>'; };
      return '<div class="fm"><header class="fm-head"><h1 class="t-lg semibold" style="color:inherit;display:flex;gap:var(--space-2);align-items:center">Shift complete ' + ic('circle-check', 'md') + '</h1></header><main class="fm-body" id="content">' +
        '<p>Great work! Here’s your shift summary:</p><dl class="kv card" style="font-size:var(--text-lg);line-height:var(--text-lg-leading);padding:var(--space-4)">' + row('Duration', '2h 50m') + row('Doors', '32') + row('Contacts', '24') + row('Contact rate', '75%') + row('Strong support', '8') + row('Lean support', '11') + row('Undecided', '3') + row('Not home', '8') + '</dl>' +
        '<label class="stack-2"><span class="medium" style="font-size:var(--text-base)">How did it go? (optional)</span><div class="textarea" style="color:var(--color-text-secondary)">Tell your team lead anything they should know</div></label>' +
        '<button class="fa fa-primary" type="button" style="margin-block-start:auto">Done</button></main></div>';
    } };

    S['shell/field-header-states'] = { title: 'Field Mode — Header States', context: 'field-mode', html: function () {
      var states = [['connected', 'Connected'], ['stale', 'Stale (amber, larger)'], ['syncing', 'Syncing'], ['offline', 'Offline (elapsed time)'], ['error', 'Sync error (red, full width)']];
      return '<main class="sheetpage"><div><h1 class="t-xl">Field header states</h1><p class="t-sm muted">Sync status stays readable in sunlight: words and an icon, never colour alone. REC and the shift timer never move.</p></div>' +
        states.map(function (s) { return '<section class="specimen"><h2 class="t-sm semibold">' + s[1] + '</h2><div class="card" style="overflow:hidden">' + fhead(s[0]) + '</div></section>'; }).join('') + '</main>';
    } };

    // ---------------- Wizard shell
    var STEPS = ['Organization info', 'Payment processor', 'Branding setup', 'Team setup', 'Review & launch'];
    function choices(short) {
      var c = function (on, t, d, extra) { return '<div class="card choice' + (on ? ' on' : '') + '" role="radio" aria-checked="' + !!on + '"><span class="radio' + (on ? ' on' : '') + '"></span><div class="stack-2" style="flex:1"><span class="semibold">' + t + '</span><span class="t-sm muted">' + d + '</span>' + (extra || '') + '</div></div>'; };
      return '<div class="stack-3" role="radiogroup" aria-label="Payment processor">' +
        c(1, 'Stripe', short ? 'Credit cards, ACH.' : 'Credit cards, ACH. Available in Puerto Rico.', '<span><a class="btn btn-secondary btn-sm" href="#">Connect Stripe account' + ic('arrow-right', 'sm') + '</a></span>') +
        c(0, 'Local processor', short ? 'Country-specific methods.' : 'Country-specific payment methods. Configure after initial setup.') +
        c(0, 'Skip for now', short ? 'Set up later in Settings.' : 'Set up payments later in Settings.') + '</div>';
    }
    S['shell/wizard'] = { title: 'Wizard Shell', html: function () {
      return '<div class="wz"><header class="wz-head"><span class="tenant"><span class="tenant-logo">' + ic('leaf', 'md') + '</span>GreenGrass</span><span style="flex:1"></span><button class="btn btn-secondary" type="button">' + ic('save', 'sm') + 'Save &amp; exit</button></header>' +
        '<ol class="stepper" aria-label="Setup progress">' + STEPS.map(function (s, i) { return '<li class="' + (i === 0 ? 'done' : i === 1 ? 'active' : '') + '"' + (i === 1 ? ' aria-current="step"' : '') + '><span class="dotn">' + (i === 0 ? ic('check', 'sm') : i + 1) + '</span><span>' + s + (i === 0 ? '<span class="sr-only"> (complete)</span>' : '') + '</span></li>'; }).join('') + '</ol>' +
        '<main class="wz-main" id="content"><div class="stack-2"><span class="t-sm muted">Step 2 of 5</span><h1 class="t-2xl">Connect payment processor</h1><p class="muted">Choose how Partido Verde will accept donations.</p></div>' + choices() + '</main>' +
        '<footer class="wz-foot"><button class="btn btn-secondary" type="button">' + ic('arrow-left', 'sm') + 'Back</button><button class="btn btn-primary" type="button">Next' + ic('arrow-right', 'sm') + '</button></footer></div>';
    } };
    S['shell/wizard-mobile'] = { title: 'Wizard Shell — Mobile', html: function () {
      return '<div class="m-app" style="background:var(--color-surface-sunken)">' + W.statusbar() + '<header class="m-top" style="padding-inline:var(--space-3)"><span class="tenant-logo">' + ic('leaf', 'md') + '</span><span class="t-sm muted" style="flex:1;text-align:center">Step 2 of 5</span><button class="btn btn-ghost" type="button">Save</button></header>' +
        '<div style="padding:var(--space-3) var(--space-4);background:var(--color-surface-raised);border-block-end:var(--border-width) solid var(--color-border)"><div class="cluster" style="gap:var(--space-1);flex-wrap:nowrap" role="img" aria-label="Step 2 of 5: Payment processor">' + [1, 1, 0, 0, 0].map(function (d, i) { return '<span class="bar" style="flex:1;height:var(--space-1)"><span style="width:' + (d ? 100 : 0) + '%"></span></span>'; }).join('') + '</div></div>' +
        '<main class="m-content" id="content"><h1 class="t-xl">Connect payment processor</h1><p class="muted t-sm">Choose how your org will accept donations.</p>' + choices(true) + '</main>' +
        '<footer class="wz-foot" style="padding:var(--space-3) var(--space-4) var(--space-6)"><button class="btn btn-secondary" type="button" style="min-height:var(--touch-target-min)">' + ic('arrow-left', 'sm') + 'Back</button><button class="btn btn-primary" type="button" style="min-height:var(--touch-target-min)">Next' + ic('arrow-right', 'sm') + '</button></footer></div>';
    } };

    // ---------------- Supporter portal shell (tenant-branded)
    var PT = {
      en: { org: 'Partido Verde de Puerto Rico', short: 'Partido Verde', nav: ['My Profile', 'Donations', 'Events', 'Preferences'], out: 'Sign out', h: 'Donation history', total: 'Total donated', meta: '8 donations · Since January 2025', monthly: 'Monthly', once: 'One-time', receipt: 'Receipt', rec: 'Recurring donation', next: 'Next', upd: 'Update amount', card: 'Update card', cancel: 'Cancel', priv: 'Privacy', terms: 'Terms', manage: 'Manage', per: '/mo',
        rows: [['Mar 1, 2026', '$100.00', 0], ['Feb 1, 2026', '$100.00', 0], ['Jan 15, 2026', '$250.00', 1], ['Jan 1, 2026', '$100.00', 0], ['Dec 1, 2025', '$100.00', 0]], nextDate: 'Apr 1, 2026', th: ['Date', 'Amount', 'Type', ''] },
      es: { org: 'Partido Verde de Puerto Rico', short: 'Partido Verde', nav: ['Mi perfil', 'Donaciones', 'Eventos', 'Preferencias'], out: 'Cerrar sesión', h: 'Historial de donaciones', total: 'Total donado', meta: '8 donaciones · Desde enero de 2025', monthly: 'Mensual', once: 'Única', receipt: 'Recibo', rec: 'Donación recurrente', next: 'Próxima', upd: 'Actualizar monto', card: 'Actualizar tarjeta', cancel: 'Cancelar', priv: 'Privacidad', terms: 'Términos', manage: 'Administrar', per: '/mes',
        rows: [['1 mar 2026', '$100.00', 0], ['1 feb 2026', '$100.00', 0], ['15 ene 2026', '$250.00', 1], ['1 ene 2026', '$100.00', 0], ['1 dic 2025', '$100.00', 0]], nextDate: '1 abr 2026', th: ['Fecha', 'Monto', 'Tipo', ''] }
    };
    function portal(lang) {
      var t = PT[lang];
      return '<div class="pt"><header class="pt-head"><a class="tenant" href="#"><span class="tenant-logo">' + ic('leaf', 'md') + '</span>' + t.org + '</a><span style="flex:1"></span><a class="cluster medium" href="#" style="color:var(--color-text)"><span class="avatar">ET</span>Elena Torres</a><button class="btn btn-secondary btn-sm" type="button">' + ic('log-out', 'sm') + t.out + '</button></header>' +
        '<nav class="pt-nav tabs" aria-label="Portal">' + t.nav.map(function (n, i) { return '<a class="tab" href="#"' + (i === 1 ? ' aria-selected="true" aria-current="page"' : '') + '>' + n + '</a>'; }).join('') + '</nav>' +
        '<main class="pt-main" id="content"><div class="stack-2"><h1 class="t-2xl">' + t.h + '</h1></div>' +
        '<div class="card" style="padding:var(--space-6);display:flex;gap:var(--space-10);align-items:flex-end"><div class="stack-2" style="gap:var(--space-1)"><span class="muted t-sm medium">' + t.total + '</span><span class="t-4xl num">$1,250</span></div><span class="muted t-sm">' + t.meta + '</span></div>' +
        '<div class="card"><table class="table"><thead><tr>' + t.th.map(function (h, i) { return '<th' + (i === 1 ? ' class="r"' : '') + '>' + (h || '<span class="sr-only">' + t.receipt + '</span>') + '</th>'; }).join('') + '</tr></thead><tbody>' +
        t.rows.map(function (r) { return '<tr><td>' + r[0] + '</td><td class="r num medium">' + r[1] + '</td><td>' + (r[2] ? t.once : '<span class="cluster" style="gap:var(--space-1)">' + ic('repeat', 'xs', 'muted') + t.monthly + '</span>') + '</td><td class="r"><a class="link-action" href="#">' + ic('download', 'sm') + t.receipt + '<span class="sr-only"> ' + r[0] + '</span></a></td></tr>'; }).join('') + '</tbody></table></div>' +
        '<section class="card widget" aria-labelledby="rec"><div class="widget-head">' + ic('repeat', 'md', 'muted') + '<h2 id="rec">' + t.rec + '</h2></div><div class="cluster t-sm" style="gap:var(--space-4)"><span class="t-xl num">$100.00' + t.per + '</span><span class="muted">' + t.next + ': ' + t.nextDate + '</span><span class="cluster muted" style="gap:var(--space-1)">' + ic('credit-card', 'sm') + 'Visa •••• 4242</span></div>' +
        '<div class="btn-group"><button class="btn btn-secondary btn-sm" type="button">' + t.upd + '</button><button class="btn btn-secondary btn-sm" type="button">' + t.card + '</button><button class="btn btn-ghost btn-sm" type="button" style="color:var(--color-error)">' + t.cancel + '</button></div></section></main>' +
        '<footer class="pt-foot"><span>' + t.org + '</span><a href="#">' + t.priv + '</a><a href="#">' + t.terms + '</a></footer></div>';
    }
    function portalMobile(lang) {
      var t = PT[lang];
      return '<div class="m-app">' + W.statusbar() + '<header class="m-top" style="padding-inline:var(--space-3)"><span class="tenant-logo">' + ic('leaf', 'md') + '</span><h1>' + t.short + '</h1><button class="btn btn-icon" type="button" aria-label="Profile"><span class="avatar">ET</span></button><button class="btn btn-icon" type="button" aria-label="' + t.out + '">' + ic('log-out', 'lg') + '</button></header>' +
        '<nav class="pt-nav tabs" style="padding-inline:var(--space-2)" aria-label="Portal">' + t.nav.slice(0, 3).map(function (n, i) { return '<a class="tab" href="#" style="flex:1;text-align:center;min-height:var(--touch-target-min);display:grid;place-items:center"' + (i === 1 ? ' aria-selected="true" aria-current="page"' : '') + '>' + n.replace('My Profile', 'Profile').replace('Mi perfil', 'Perfil') + '</a>'; }).join('') + '</nav>' +
        '<main class="m-content" id="content"><h1 class="t-xl">' + t.h + '</h1><div class="card metric"><span class="metric-label">' + t.total + '</span><span class="metric-value num">$1,250</span></div>' +
        '<div class="card">' + t.rows.slice(0, 3).map(function (r) { return '<div class="m-card-row" style="flex-direction:row;align-items:center;gap:var(--space-3)"><span style="flex:1">' + r[0].replace(', 2026', '').replace(' 2026', '') + '</span><span class="num semibold">' + r[1].replace('.00', '') + '</span><span class="t-sm muted">' + (r[2] ? t.once : t.monthly) + '</span><a href="#" class="btn btn-icon" aria-label="' + t.receipt + ' ' + r[0] + '">' + ic('download', 'md') + '</a></div>'; }).join('') + '</div>' +
        '<div class="card widget"><span class="semibold">' + t.rec + ': <span class="num">$100' + t.per + '</span></span><span class="t-sm muted">' + t.next + ': ' + t.nextDate.replace(', 2026', '').replace(' 2026', '') + '</span><button class="btn btn-secondary" type="button" style="min-height:var(--touch-target-min)">' + t.manage + '</button></div></main>' +
        '<footer class="pt-foot" style="padding-block-end:var(--space-8)"><a href="#">' + t.priv + '</a><a href="#">' + t.terms + '</a></footer></div>';
    }
    S['shell/portal'] = { title: 'Supporter Portal Shell', theme: 'partido-verde', html: function () { return portal('en'); } };
    S['shell/portal-es'] = { title: 'Portal de simpatizantes', theme: 'partido-verde', lang: 'es', html: function () { return portal('es'); } };
    S['shell/portal-mobile'] = { title: 'Supporter Portal — Mobile', theme: 'partido-verde', html: function () { return portalMobile('en'); } };
  })();
