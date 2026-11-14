(function () {
    var W = window.WF, S = (W.SCREENS = W.SCREENS || {});
    var m = W.metric, w = W.widget, more = W.more;

    // ---------- shared content: Field Operations overview shown inside the desktop shell
    function doors30() { return [38, 52, 61, 44, 70, 88, 35, 41, 57, 66, 49, 72, 95, 40, 33, 48, 63, 58, 77, 92, 37, 45, 52, 61, 69, 84, 99, 42, 50, 46]; }
    function fieldOverview(wide) {
      return '<div class="page">' + W.pageHead({ title: 'Field Operations', crumbs: ['Dashboard', 'Field Operations'], updated: '2 min ago', range: 'Last 30 days' }) +
        '<div class="grid">' +
        '<div class="span-4">' + m({ icon: 'door-open', label: 'Doors knocked', value: '1,247', lines: [W.trend('up', '12% vs previous 30 days')], aria: 'Doors knocked: 1,247, up 12% versus the previous 30 days' }) + '</div>' +
        '<div class="span-4">' + m({ icon: 'users', label: 'Contacts made', value: '891', lines: [W.trend('up', '8% vs previous 30 days')], aria: 'Contacts made: 891, up 8%' }) + '</div>' +
        '<div class="span-4">' + m({ icon: 'clipboard-check', label: 'Contact rate', value: '71.4%', lines: [W.trend('up', '2.1 pts vs previous 30 days')], aria: 'Contact rate: 71.4%, up 2.1 points' }) + '</div>' +
        w({ id: 'w-doors', span: 12, title: 'Doors knocked (30 days)', body: W.lineChart({ w: wide ? 1100 : 900, h: 220, max: 100, yTicks: [0, 25, 50, 75, 100], xLabels: ['Feb 2', 'Feb 9', 'Feb 16', 'Feb 23', 'Mar 2'], series: [{ label: 'Doors', color: 'var(--color-chart-1)', values: doors30(), area: true }], summary: 'Doors knocked per day over 30 days, between 33 and 99 a day, peaking on weekends.' }) }) +
        w({ id: 'w-active', span: 12, title: 'Active campaigns', foot: more('View all campaigns'), body:
          '<table class="table"><thead><tr><th>Campaign</th><th>Progress</th><th class="r">Done</th><th>Status</th></tr></thead><tbody>' +
          [['Northside Canvass', 71, '142/200 doors', 'In progress'], ['Westside Follow-up', 58, '87/150 doors', 'In progress'], ['Phone Bank Wave 3', 62, '312/500 calls', 'In progress'], ['Eastside Registration', 45, '45/100 voters', 'Planned']].map(function (r) {
            return '<tr><td class="medium"><a href="#">' + r[0] + '</a></td><td style="width:40%"><div class="bar" role="img" aria-label="' + r[1] + '% complete"><span style="width:' + r[1] + '%"></span></div></td><td class="r num">' + r[2] + '</td><td>' + (r[3] === 'Planned' ? W.status('info', 'Planned') : W.status('success', 'In progress')) + '</td></tr>';
          }).join('') + '</tbody></table>' }) +
        '</div></div>';
    }
    var FIELD_OPEN = ['overview', 'people', 'field', 'fundraising'];

    S['shell/desktop'] = { title: 'Desktop — Sidebar Expanded', html: function () { return W.desktop({ persona: 'OA', active: 'dashboard', open: FIELD_OPEN }, fieldOverview()); } };
    S['shell/desktop-collapsed'] = { title: 'Desktop — Sidebar Collapsed', html: function () { return W.desktop({ persona: 'OA', active: 'dashboard', collapsed: true, flyout: 'field' }, fieldOverview(true)); } };

    // ---------- Detail panel
    S['shell/desktop-detail'] = { title: 'Desktop — Detail Panel', html: function () {
      var rows = [['Ana Martínez', 'Supporter', 'San Juan', 'Jan 15'], ['Carlos Rivera', 'Volunteer', 'Santurce', 'Mar 2'], ['Elena Torres', 'Donor', 'Carolina', 'Feb 27'], ['José Delgado', 'Volunteer lead', 'Bayamón', 'Mar 1'], ['María Santos', 'Supporter', 'Río Piedras', 'Feb 20'], ['Pedro Colón', 'Volunteer', 'Guaynabo', 'Feb 28'], ['Rosa Figueroa', 'Donor', 'Hato Rey', 'Feb 11'], ['Luis Rodríguez', 'Supporter', 'Cataño', 'Jan 30'], ['Carmen Ortiz', 'Volunteer', 'Trujillo Alto', 'Feb 24'], ['Miguel Ángel Rivera', 'Supporter', 'Caguas', 'Feb 6']];
      var list = '<div class="page" style="padding-inline:var(--space-6)">' + W.pageHead({ title: 'Contacts', crumbs: ['People', 'Contacts'], sub: '287 contacts' }) +
        '<div class="cluster"><div class="input" style="flex:1;max-width:22rem">' + ic('search', 'sm') + 'Search contacts</div><button class="btn btn-secondary" type="button">' + ic('list-filter', 'sm') + 'Filter' + ic('chevron-down', 'sm') + '</button><button class="btn btn-primary" type="button" style="margin-inline-start:auto">' + ic('plus', 'sm') + 'New contact</button></div>' +
        '<div class="card"><table class="table"><thead><tr><th style="width:2.5rem"><span class="sr-only">Select</span></th><th>Name</th><th>Type</th><th>Municipality</th><th class="r">Last contact</th></tr></thead><tbody>' +
        rows.map(function (r, i) { return '<tr' + (i === 0 ? ' aria-selected="true" style="background:var(--color-primary-subtle)"' : '') + '><td><span class="checkbox" style="width:var(--space-4);height:var(--space-4);border-width:1px"></span></td><td class="medium">' + r[0] + '</td><td>' + r[1] + '</td><td class="muted">' + r[2] + '</td><td class="r muted">' + r[3] + '</td></tr>'; }).join('') +
        '</tbody></table></div><div class="spread t-sm muted"><span>Showing <span class="num">1–25</span> of <span class="num">287</span></span><span class="cluster"><button class="btn btn-icon btn-sm" type="button" aria-label="Previous page">' + ic('chevron-left', 'sm') + '</button><span class="num">1 of 12</span><button class="btn btn-icon btn-sm" type="button" aria-label="Next page">' + ic('chevron-right', 'sm') + '</button></span></div></div>';
      var panel = '<aside class="detail" aria-labelledby="dp-h"><div class="panel-head"><h2 id="dp-h" tabindex="-1">Ana Martínez</h2><button class="btn btn-icon" type="button" aria-label="Pin panel">' + ic('pin', 'md') + '</button><button class="btn btn-icon" type="button" aria-label="Close panel (Escape)">' + ic('x', 'md') + '</button></div>' +
        '<div class="panel-body"><div class="cluster" style="gap:var(--space-4);align-items:flex-start"><span class="avatar avatar-lg">AM</span><div class="stack-2" style="gap:var(--space-0\\.5)"><span class="semibold">Ana Martínez</span><span class="t-sm muted num">ana.martinez@gmail.com</span><span class="t-sm muted num">+1 787-555-0147</span><span class="t-sm muted">San Juan, PR</span></div></div>' +
        '<div class="tabs" role="tablist"><button class="tab" role="tab" aria-selected="true">Overview</button><button class="tab" role="tab" aria-selected="false">Activity</button><button class="tab" role="tab" aria-selected="false">Notes</button></div>' +
        '<dl class="kv"><dt>Status</dt><dd>' + W.status('success', 'Active supporter') + '</dd><dt>Support score</dt><dd>4 (Strong)</dd><dt>Last contact</dt><dd>Jan 15 · Door canvass</dd><dt>Source</dt><dd>Door canvass</dd><dt>Tags</dt><dd class="cluster"><span class="badge">Northside</span><span class="badge">Volunteer interest</span></dd></dl>' +
        '<div class="btn-group"><button class="btn btn-secondary" type="button">' + ic('pencil', 'sm') + 'Edit</button><button class="btn btn-primary" type="button">' + ic('plus', 'sm') + 'Log interaction</button></div></div></aside>';
      return W.desktop({ persona: 'OA', active: 'contacts', open: ['overview', 'people', 'field', 'fundraising'], detail: panel }, list);
    } };

    // ---------- Notification drawer
    function notif(icon, title, body, time, unread) {
      return '<a href="#" class="notif' + (unread ? ' unread' : '') + '" style="color:inherit;text-decoration:none"><span class="icon-tile">' + ic(icon, 'sm') + '</span><span class="stack-2" style="gap:var(--space-0\\.5)"><span class="li-title">' + title + '</span><span class="li-sub">' + body + '</span><span class="li-meta">' + time + '</span></span>' + (unread ? '<span class="sr-only">Unread</span>' : '') + '</a>';
    }
    function drawer(empty) {
      var head = '<div class="panel-head"><h2>Notifications</h2><button class="btn btn-icon" type="button" aria-label="Close notifications">' + ic('x', 'md') + '</button></div>';
      if (empty) return head + '<div class="panel-body"><div class="empty" style="padding-block:var(--space-16)"><span class="empty-icon">' + ic('bell', 'xl') + '</span><h3 class="t-lg semibold">No notifications yet</h3><p class="t-sm">You’ll see messages, approvals, and alerts here as they arrive.</p></div></div><div class="drawer-foot"><a class="link-action" href="#">' + ic('settings', 'sm') + 'Notification settings</a></div>';
      return head + '<div class="panel-body" style="gap:var(--space-3)"><div class="seg" role="tablist"><button class="tab" role="tab" aria-selected="true">All</button><button class="tab" role="tab" aria-selected="false">Unread <span class="num">3</span></button><button class="tab" role="tab" aria-selected="false">@ Me</button></div>' +
        '<span class="group-label">Today</span>' +
        notif('calendar', 'New shift assigned to you', 'Northside Canvass · Sat, Mar 8, 2:00 PM', '2 min ago', true) +
        notif('messages-square', 'María Santos sent you a message', '“¿Puedes cubrir el turno del jueves en Bayamón?”', '15 min ago', true) +
        notif('banknote', '$250 donation from Pedro Colón', 'Online form · Rally at Plaza del Mercado', '1 hour ago', true) +
        '<span class="group-label" style="margin-block-start:var(--space-2)">Yesterday</span>' +
        notif('square-check', 'Press release approved', '“Park Restoration Plan” · approved by Lucía Marrero', 'Yesterday, 6:12 PM') +
        notif('upload', 'Import finished', 'Phone bank list — Call Wave 3 · 500 rows, 12 duplicates merged', 'Yesterday, 11:40 AM') +
        '</div><div class="drawer-foot"><button class="btn btn-ghost btn-sm" type="button">' + ic('check', 'sm') + 'Mark all read</button><a class="link-action" href="#">' + ic('settings', 'sm') + 'Notification settings</a></div>';
    }
    S['shell/desktop-notifications'] = { title: 'Desktop — Notification Drawer', html: function () { return W.desktop({ persona: 'OA', active: 'dashboard', open: FIELD_OPEN, drawer: drawer(false) }, fieldOverview()); } };
    S['shell/desktop-notifications-empty'] = { title: 'Notification Drawer — Empty', html: function () { return W.desktop({ persona: 'OA', active: 'dashboard', open: FIELD_OPEN, drawer: drawer(true) }, fieldOverview()); } };

    // ---------- Offline sidebar
    S['shell/desktop-offline'] = { title: 'Sidebar — Offline', html: function () {
      var c = fieldOverview().replace('<div class="grid">', '<div class="banner banner-warning" role="status">' + ic('wifi-off', 'md') + '<span><b>You’re offline.</b> Showing the dashboard as it was at 10:42 AM. Data may be outdated. Field mode, check-in, messages and cached contacts still work.</span></div><div class="grid">').replace('Last updated: 2 min ago', 'Last updated: 47 min ago').replace('<span class="fresh">', '<span class="fresh stale">');
      return W.desktop({ persona: 'OA', active: 'dashboard', sync: 'offline', open: ['overview', 'people', 'field', 'events', 'gotv', 'messaging'] }, c);
    } };

    // ---------- Header states specimen
    S['shell/header-states'] = { title: 'Header Bar States', html: function () {
      var states = [['connected', 'Connected (normal)'], ['stale', 'Stale (more than 5 min since sync)'], ['syncing', 'Syncing'], ['offline', 'Offline'], ['error', 'Sync error']];
      return '<main class="sheetpage" style="padding:var(--space-8)"><div><h1 class="t-2xl">Header bar states</h1><p class="muted t-sm">The sync indicator is the only part of the header that changes. Every state carries text, never colour alone.</p></div>' +
        states.map(function (s) { return '<section class="specimen"><h2 class="t-sm semibold muted">' + s[1] + '</h2><div class="card" style="overflow:hidden">' + W.header({ persona: 'OA', sync: s[0] }) + '</div></section>'; }).join('') + '</main>';
    } };

    // ---------- RTL
    S['shell/desktop-rtl'] = { title: 'Desktop — RTL Layout', rtl: true, lang: 'ar', html: function () {
      var L = { 'Overview': 'نظرة عامة', 'Dashboard': 'لوحة المعلومات', 'Activity Feed': 'النشاط', 'People': 'الأشخاص', 'Contacts': 'جهات الاتصال', 'Segments': 'الشرائح', 'Field': 'الميدان', 'Canvassing': 'التجول', 'Phone Banking': 'بنك الهاتف', 'Messaging': 'المراسلة', 'Messages': 'الرسائل', 'Help': 'مساعدة', 'Settings': 'إعدادات' };
      var save = W.NAV.OA; W.NAV.RTL = [save[0], { id: 'people', label: 'People', icon: 'users', items: save[1].items.slice(0, 2) }, { id: 'field', label: 'Field', icon: 'door-open', items: save[2].items.slice(0, 2) }, save[9]];
      var c = '<div class="page">' + '<div class="page-head"><div><h1>نظرة عامة على الحملة</h1></div></div><div class="grid">' +
        '<div class="span-4">' + m({ icon: 'door-open', label: 'أبواب', value: '1,247', lines: [W.trend('up', '<span class="num">12%</span>')] }) + '</div>' +
        '<div class="span-4">' + m({ icon: 'users', label: 'اتصالات', value: '891', lines: [W.trend('up', '<span class="num">8%</span>')] }) + '</div>' +
        '<div class="span-4">' + m({ icon: 'clipboard-check', label: 'معدل', value: '71.4%', lines: [W.trend('up', '<span class="num">2.1%</span>')] }) + '</div>' +
        w({ id: 'w-rtl', span: 12, title: 'الأبواب التي تم طرقها (30 يومًا)', body: '<div dir="ltr">' + W.lineChart({ w: 900, h: 200, max: 100, yTicks: [0, 50, 100], xLabels: ['Feb 2', 'Feb 9', 'Feb 16', 'Feb 23', 'Mar 2'], series: [{ label: 'Doors', color: 'var(--color-chart-1)', values: doors30(), area: true }], summary: 'Doors knocked per day over 30 days' }) + '</div><p class="t-xs muted">الأرقام والتواريخ تبقى من اليسار إلى اليمين داخل حاوياتها. الخرائط والرسوم البيانية لا تنعكس.</p>' }) +
        '</div></div>';
      var html = W.desktop({ persona: 'RTL', active: 'dashboard', rtl: true, labels: L }, c);
      return html.replace('<span>Partido Verde</span>', '<span>حزب أخضر</span>').replace('Skip to content', 'تخطَّ إلى المحتوى');
    } };
  })();
