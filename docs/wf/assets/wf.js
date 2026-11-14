/* GreenGrass wireframe shell helpers (plain JS, no build). */
(function () {
    var W = (window.WF = window.WF || {});
    var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); };
    W.esc = esc;

    // ---------------- Navigation per persona (navigation-model.md § Navigation Items Per Persona)
    // off: true = works offline (navigation-model.md § Offline Navigation Behavior)
    var I = function (id, label, icon, o) { o = o || {}; o.id = id; o.label = label; o.icon = icon; return o; };
    var MSG = { id: 'messaging', label: 'Messaging', icon: 'messages-square', items: [I('messages', 'Messages', 'messages-square', { off: true, badge: 2 })] };
    var NAV = {
      OA: [
        { id: 'overview', label: 'Overview', icon: 'layout-dashboard', items: [I('dashboard', 'Dashboard', 'layout-dashboard'), I('activity', 'Activity Feed', 'activity')] },
        { id: 'people', label: 'People', icon: 'users', items: [I('contacts', 'Contacts', 'users', { off: true }), I('segments', 'Segments', 'list-filter'), I('import', 'Import/Export', 'upload'), I('dedup', 'Dedup Queue', 'copy')] },
        { id: 'field', label: 'Field', icon: 'door-open', items: [I('canvassing', 'Canvassing', 'door-open'), I('phonebank', 'Phone Banking', 'phone'), I('voterreg', 'Voter Registration', 'clipboard-check'), I('turfs', 'Turfs', 'map')] },
        { id: 'fundraising', label: 'Fundraising', icon: 'banknote', items: [I('donations', 'Donations', 'banknote'), I('forms', 'Forms', 'file-text'), I('fcampaigns', 'Campaigns', 'megaphone'), I('compliance', 'Compliance', 'shield-check', { badge: 1 }), I('splits', 'Alliance Splits', 'link')] },
        { id: 'comms', label: 'Communications', icon: 'mail', items: [I('email', 'Email', 'mail'), I('sms', 'SMS/WhatsApp', 'message-square'), I('social', 'Social Media', 'share-2'), I('templates', 'Templates', 'layout-template')] },
        { id: 'events', label: 'Events', icon: 'calendar', items: [I('events', 'Events', 'calendar'), I('checkin', 'Check-in', 'square-check', { off: true })] },
        { id: 'activism', label: 'Activism', icon: 'flag', items: [I('acampaigns', 'Campaigns', 'flag'), I('petitions', 'Petitions', 'file-text'), I('comments', 'Public Comments', 'message-square')] },
        { id: 'press', label: 'Press', icon: 'newspaper', items: [I('media', 'Media Contacts', 'users'), I('content', 'Content', 'file-text'), I('releases', 'Releases', 'newspaper'), I('coverage', 'Coverage', 'chart-column'), I('endorse', 'Endorsements', 'user-check'), I('psocial', 'Social', 'share-2')] },
        { id: 'gotv', label: 'GOTV', icon: 'vote', items: [I('universe', 'Universe', 'users'), I('staging', 'Staging', 'map-pin'), I('warroom', 'War Room', 'radio'), I('rides', 'Rides', 'car', { off: true }), I('watchers', 'Poll Watchers', 'eye', { off: true }), I('results', 'Results', 'vote')] },
        MSG,
        { id: 'alliance', label: 'Alliance', icon: 'link', items: [I('allydash', 'Alliance Dashboard', 'layout-dashboard'), I('members', 'Members', 'building'), I('shared', 'Shared Campaigns', 'megaphone')] }
      ],
      CD: [
        { id: 'overview', label: 'Overview', icon: 'layout-dashboard', items: [I('dashboard', 'Comms Dashboard', 'layout-dashboard')] },
        { id: 'comms', label: 'Communications', icon: 'mail', items: [I('email', 'Email Campaigns', 'mail'), I('sms', 'SMS/WhatsApp', 'message-square'), I('social', 'Social Media', 'share-2'), I('templates', 'Templates', 'layout-template')] },
        { id: 'press', label: 'Press', icon: 'newspaper', items: [I('media', 'Media Contacts', 'users'), I('content', 'Content', 'file-text'), I('releases', 'Releases', 'newspaper'), I('coverage', 'Coverage', 'chart-column'), I('endorse', 'Endorsements', 'user-check'), I('talking', 'Talking Points', 'list')] },
        { id: 'people', label: 'People', icon: 'users', items: [I('contacts', 'Contacts', 'users', { off: true }), I('segments', 'Segments', 'list-filter')] },
        MSG
      ],
      FD: [
        { id: 'overview', label: 'Overview', icon: 'layout-dashboard', items: [I('dashboard', 'Fundraising Dashboard', 'layout-dashboard')] },
        { id: 'fundraising', label: 'Fundraising', icon: 'banknote', items: [I('donations', 'Donations', 'banknote'), I('forms', 'Forms', 'file-text'), I('fcampaigns', 'Campaigns', 'megaphone'), I('recurring', 'Recurring', 'repeat'), I('refunds', 'Refunds', 'receipt'), I('cash', 'Cash', 'banknote'), I('compliance', 'Compliance', 'shield-check', { badge: 3 })] },
        { id: 'people', label: 'People', icon: 'users', items: [I('donors', 'Donors', 'heart', { off: true }), I('segments', 'Segments', 'list-filter')] },
        MSG
      ],
      FiD: [
        { id: 'overview', label: 'Overview', icon: 'layout-dashboard', items: [I('dashboard', 'Field Dashboard', 'layout-dashboard')] },
        { id: 'field', label: 'Field', icon: 'door-open', items: [I('canvassing', 'Canvassing', 'door-open'), I('phonebank', 'Phone Banking', 'phone'), I('voterreg', 'Voter Registration', 'clipboard-check'), I('turfs', 'Turfs', 'map')] },
        { id: 'gotv', label: 'GOTV', icon: 'vote', items: [I('universe', 'Universe', 'users'), I('staging', 'Staging', 'map-pin'), I('warroom', 'War Room', 'radio'), I('rides', 'Rides', 'car', { off: true, badge: 12 }), I('watchers', 'Poll Watchers', 'eye', { off: true })] },
        { id: 'people', label: 'People', icon: 'users', items: [I('contacts', 'Contacts', 'users', { off: true }), I('segments', 'Segments', 'list-filter')] },
        MSG
      ],
      VC: [
        { id: 'overview', label: 'Overview', icon: 'layout-dashboard', items: [I('dashboard', 'Volunteer Dashboard', 'layout-dashboard')] },
        { id: 'volunteers', label: 'Volunteers', icon: 'users', items: [I('roster', 'Roster', 'users'), I('onboarding', 'Onboarding', 'user-plus', { badge: 5 }), I('training', 'Training', 'graduation-cap'), I('shifts', 'Shifts', 'calendar'), I('teams', 'Teams', 'users')] },
        { id: 'events', label: 'Events', icon: 'calendar', items: [I('events', 'Events', 'calendar'), I('checkin', 'Check-in', 'square-check', { off: true })] },
        MSG
      ],
      DM: [
        { id: 'overview', label: 'Overview', icon: 'layout-dashboard', items: [I('dashboard', 'Data Dashboard', 'layout-dashboard')] },
        { id: 'people', label: 'People', icon: 'users', items: [I('contacts', 'Contacts', 'users', { off: true }), I('segments', 'Segments', 'list-filter'), I('import', 'Import', 'upload'), I('export', 'Export', 'download'), I('dedup', 'Dedup Queue', 'copy', { badge: 42 }), I('quality', 'Data Quality', 'database')] },
        MSG
      ],
      C: [
        { id: 'overview', label: 'Overview', icon: 'layout-dashboard', items: [I('dashboard', 'Campaign Dashboard', 'layout-dashboard')] },
        { id: 'profile', label: 'Profile', icon: 'user', items: [I('profile', 'My Public Profile', 'user')] },
        { id: 'approvals', label: 'Approvals', icon: 'square-check', items: [I('approvals', 'Pending Approvals', 'square-check', { badge: 3 })] },
        { id: 'messaging', label: 'Messaging', icon: 'messages-square', items: [I('messages', 'Messages', 'messages-square', { off: true, badge: 2 })] }
      ]
    };
    W.NAV = NAV;

    var PEOPLE = {
      OA: { name: 'Pablo Defendini', init: 'PD', role: 'Org Admin' },
      CD: { name: 'Natalia Cruz', init: 'NC', role: 'Communications Director' },
      FD: { name: 'Ricardo Pagán', init: 'RP', role: 'Finance Director' },
      FiD: { name: 'Marisol Vega', init: 'MV', role: 'Field Director' },
      VC: { name: 'Javier Rosado', init: 'JR', role: 'Volunteer Coordinator' },
      DM: { name: 'Carlos Méndez', init: 'CM', role: 'Data Manager' },
      V: { name: 'Carlos Rivera', init: 'CR', role: 'Volunteer' },
      TL: { name: 'Gabriel Soto', init: 'GS', role: 'Team Lead' },
      C: { name: 'Lucía Marrero', init: 'LM', role: 'Candidate' },
      S: { name: 'Elena Torres', init: 'ET', role: 'Supporter' }
    };
    W.PEOPLE = PEOPLE;

    // ---------------- Small component helpers
    W.badgeCount = function (n) { return '<span class="badge-count num" aria-label="' + n + ' new">' + (n > 99 ? '99+' : n) + '</span>'; };
    W.status = function (kind, label) {
      var icon = { success: 'circle-check', warning: 'triangle-alert', error: 'octagon-alert', info: 'info' }[kind] || 'info';
      return '<span class="badge badge-' + kind + '">' + ic(icon, 'xs') + esc(label) + '</span>';
    };
    W.trend = function (dir, text, cls) {
      return '<span class="trend ' + (cls || (dir === 'up' ? 'up' : 'down')) + '">' + ic(dir === 'up' ? 'arrow-up' : 'arrow-down', 'sm') + '<span>' + text + '</span></span>';
    };
    W.metric = function (m) {
      var aria = m.aria ? ' aria-label="' + esc(m.aria) + '"' : '';
      return '<a class="card metric interactive" href="#"' + aria + '>' +
        '<span class="metric-label">' + ic(m.icon, 'sm') + esc(m.label) + '</span>' +
        '<span class="metric-value num">' + m.value + '</span>' +
        (m.lines || []).map(function (l) { return '<span class="metric-sub">' + l + '</span>'; }).join('') +
        (m.bar != null ? '<div class="bar" style="margin-block-start:var(--space-2)"><span style="width:' + m.bar + '%"></span></div>' : '') +
        '</a>';
    };
    W.widget = function (o) {
      return '<section class="card widget ' + (o.span ? 'span-' + o.span : '') + '" aria-labelledby="' + o.id + '"' + (o.busy ? ' aria-busy="true"' : '') + '>' +
        '<div class="widget-head">' + (o.icon ? ic(o.icon, 'md', o.iconCls) : '') + '<h2 id="' + o.id + '">' + o.title + '</h2>' + (o.actions ? '<div class="widget-actions">' + o.actions + '</div>' : '') + '</div>' +
        o.body + (o.foot ? '<div class="widget-foot">' + o.foot + '</div>' : '') + '</section>';
    };
    W.more = function (label, sr) { return '<a class="link-action" href="#">' + esc(label) + (sr ? '<span class="sr-only"> ' + esc(sr) + '</span>' : '') + ic('arrow-right', 'sm') + '</a>'; };
    W.barrow = function (label, pct, right, cls, extra) {
      return '<div class="barrow' + (extra ? ' wide' : '') + '"><span>' + label + '</span><div class="bar ' + (cls || '') + '" role="img" aria-label="' + esc(String(label).replace(/<[^>]+>/g, '')) + ': ' + pct + '%"><span style="width:' + Math.min(100, pct) + '%"></span></div><span class="val num">' + (right != null ? right : pct + '%') + '</span>' + (extra ? '<span>' + extra + '</span>' : '') + '</div>';
    };
    W.alert = function (sev, title, body, action) {
      var map = { critical: ['octagon-alert', 'err', 'Critical'], warning: ['triangle-alert', 'warn', 'Warning'], info: ['info', 'inf', 'Info'] }[sev];
      return '<div class="alert-item sev-' + sev + '">' + ic(map[0], 'md', map[1]) + '<div class="stack-2" style="flex:1;min-width:0;gap:var(--space-1)">' +
        '<span class="sev-label">' + map[2] + '</span><span class="li-title" style="font-size:var(--text-sm)">' + title + '</span>' + (body ? '<span class="li-sub">' + body + '</span>' : '') + (action ? '<span>' + action + '</span>' : '') + '</div></div>';
    };

    // Line chart (Data/Chart): SVG, text summary for screen readers (dashboards.md § Accessibility Notes)
    W.lineChart = function (o) {
      var w = o.w || 560, h = o.h || 200, pl = 48, pr = 12, pt = 8, pb = 28;
      var max = o.max, min = o.min || 0;
      var iw = w - pl - pr, ih = h - pt - pb;
      var x = function (i, n) { return pl + (n === 1 ? 0 : i * iw / (n - 1)); };
      var y = function (v) { return pt + ih - (v - min) / (max - min) * ih; };
      var out = '<svg class="chart" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + esc(o.summary) + '">';
      (o.yTicks || []).forEach(function (t) {
        out += '<line class="grid-line" x1="' + pl + '" x2="' + (w - pr) + '" y1="' + y(t) + '" y2="' + y(t) + '"/>';
        out += '<text class="axis" x="' + (pl - 8) + '" y="' + (y(t) + 4) + '" text-anchor="end">' + (o.yFmt ? o.yFmt(t) : t) + '</text>';
      });
      (o.xLabels || []).forEach(function (l, i, a) {
        out += '<text class="axis" x="' + x(i, a.length) + '" y="' + (h - 6) + '" text-anchor="middle">' + l + '</text>';
      });
      o.series.forEach(function (s, si) {
        var pts = s.values.map(function (v, i) { return x(i, s.values.length).toFixed(1) + ',' + y(v).toFixed(1); }).join(' ');
        if (s.area) out += '<polygon points="' + pl + ',' + y(min) + ' ' + pts + ' ' + x(s.values.length - 1, s.values.length) + ',' + y(min) + '" style="fill:' + s.color + ';opacity:.12"/>';
        out += '<polyline points="' + pts + '" fill="none" style="stroke:' + s.color + '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"' + (s.dash ? ' stroke-dasharray="6 5"' : '') + '/>';
      });
      out += '</svg>';
      if (o.series.length > 1 || o.legend) {
        out += '<div class="legend">' + o.series.map(function (s) { return '<span style="color:' + s.color + '"><i class="' + (s.dash ? 'dash' : '') + '" style="background:' + s.color + '"></i><span class="muted">' + s.label + '</span></span>'; }).join('') + '</div>';
      }
      return out;
    };

    // ---------------- Shell pieces
    function syncChip(state) {
      switch (state) {
        case 'stale': return '<button class="sync stale" type="button" aria-label="Connected, last sync 8 minutes ago. Open sync details"><span class="dot"></span>Last sync: 8 min</button>';
        case 'syncing': return '<button class="sync syncing" type="button" aria-label="Syncing">' + ic('refresh-cw', 'sm') + 'Syncing…</button>';
        case 'offline': return '<button class="sync offline" type="button" aria-label="Offline. Open sync details"><span class="dot"></span>Offline</button>';
        case 'error': return '<span class="sync error" role="status">' + ic('triangle-alert', 'sm') + 'Sync failed · <a href="#">Retry</a></span>';
        default: return '<button class="sync" type="button" aria-label="Connected and synced. Open sync details"><span class="dot"></span><span class="sr-only">Connected</span></button>';
      }
    }
    W.header = function (cfg) {
      var p = PEOPLE[cfg.persona] || PEOPLE.OA;
      var T = cfg.strings || {};
      var tn = cfg.tenant;
      var tenant = tn
        ? '<a class="tenant" href="#" data-tenant aria-label="' + esc(T.tenant || tn.name) + '"><span class="tenant-logo' + (tn.logo ? ' has-img' : '') + '">' + (tn.logo ? '<img src="' + esc(tn.logo) + '" alt="">' : ic('leaf', 'md')) + '</span><span data-tenant-name>' + esc(tn.name) + '</span>' + (tn.editable ? ic('pencil', 'xs', 'muted') : '') + '</a>'
        : cfg.alliance
        ? '<a class="tenant" href="#">' + '<span class="tenant-logo">' + ic('link', 'md') + '</span><span>Coalición Verde</span>' + ic('chevron-down', 'sm', 'muted') + '</a>'
        : '<a class="tenant" href="#" aria-label="Partido Verde home"><span class="tenant-logo">' + ic('leaf', 'md') + '</span><span>Partido Verde</span></a>';
      return '<header class="hdr">' + tenant +
        '<div class="input" role="search">' + ic('search', 'sm') + '<span>' + (cfg.rtl ? '...بحث' : (T.search || 'Search people, events, campaigns…')) + '</span><span class="kbd">⌘K</span></div>' +
        '<div class="hdr-right">' + (cfg.syncHtml || syncChip(cfg.sync)) +
        '<button class="btn btn-icon bell" type="button" aria-label="' + (T.notif || 'Notifications') + (cfg.noBadges ? '' : (T.unread || ', 3 unread')) + '"' + (cfg.drawer ? ' aria-expanded="true"' : '') + '>' + ic('bell', 'md') + (cfg.noBadges ? '' : W.badgeCount(3)) + '</button>' +
        '<span aria-live="polite" class="sr-only">' + (cfg.noBadges ? '' : (T.unreadLive || '3 unread notifications')) + '</span>' +
        '<button class="usermenu" type="button" aria-label="' + (T.account || 'Account menu for ') + esc(p.name) + '"><span class="avatar">' + p.init + '</span>' + ic('chevron-down', 'sm') + '</button>' +
        '</div></header>';
    };
    W.sidebar = function (cfg) {
      var nav = cfg.nav || NAV[cfg.persona || 'OA'];
      var open = cfg.open; // array of section ids that are expanded; default all
      var off = cfg.sync === 'offline';
      var L = cfg.labels || {};
      var t = function (s) { return L[s] || s; };
      if (cfg.collapsed) {
        var r = '<nav class="sb" aria-label="Main navigation"><button class="btn btn-icon sb-toggle" type="button" aria-label="Expand sidebar" aria-expanded="false">' + ic('chevrons-right', 'md') + '</button>';
        nav.forEach(function (sec, i) {
          var active = sec.items.some(function (it) { return it.id === cfg.active; });
          var badge = cfg.noBadges ? 0 : sec.items.reduce(function (a, it) { return a + (it.badge || 0); }, 0);
          r += '<a class="rail-item" href="#" aria-label="' + esc(sec.label) + '"' + (active ? ' aria-current="page"' : '') + '>' + ic(sec.icon, 'md') + (badge && !active ? W.badgeCount(badge) : '') +
            (cfg.tooltip === sec.id ? '<span class="tooltip" role="tooltip">' + esc(sec.label) + '</span>' : '') +
            (cfg.flyout === sec.id ? flyout(sec) : '') + '</a>';
        });
        r += '<div class="sb-foot" style="align-items:center;width:100%">' +
          '<a class="rail-item" href="#" aria-label="Help">' + ic('circle-help', 'md') + '</a>' +
          '<a class="rail-item" href="#" aria-label="Español" lang="es">' + ic('globe', 'md') + '</a>' +
          '<a class="rail-item" href="#" aria-label="Settings">' + ic('settings', 'md') + '</a></div></nav>';
        return r;
      }
      function flyout(sec) {
        return '<div class="card flyout" role="menu"><span class="sb-sec-head">' + esc(sec.label) + '</span>' + sec.items.map(function (it) { return '<span class="sb-item" role="menuitem">' + ic(it.icon, 'md') + esc(it.label) + '</span>'; }).join('') + '</div>';
      }
      var s = '<nav class="sb" aria-label="' + t('Main navigation') + '"><button class="btn btn-icon sb-toggle" type="button" aria-label="' + t('Collapse sidebar') + '" aria-expanded="true">' + ic('chevrons-left', 'md') + '</button>';
      nav.forEach(function (sec) {
        var isOpen = !open || open.indexOf(sec.id) > -1;
        s += '<div class="sb-sec' + (sec.cls ? ' ' + sec.cls : '') + '"><button class="sb-sec-head" type="button" data-sec="' + sec.id + '" aria-expanded="' + isOpen + '"><span>' + esc(t(sec.label)) + '</span>' + ic(isOpen ? 'chevron-down' : (cfg.rtl ? 'chevron-left' : 'chevron-right'), 'sm') + '</button>';
        if (isOpen) sec.items.forEach(function (it) {
          var unavailable = off && !it.off;
          s += '<a class="sb-item' + (unavailable ? ' is-offline' : '') + '" href="' + (it.href || '#') + '"' + (it.attrs || '') + (it.id === cfg.active ? ' aria-current="page"' : '') + (unavailable ? ' aria-disabled="true" title="Requires connection"' : '') + '>' + ic(it.icon, 'md') + '<span>' + esc(t(it.label)) + '</span>' +
            (unavailable ? '<span class="offline-badge">' + ic('wifi-off', 'xs') + '<span class="sr-only">Requires connection</span></span>' : (it.badge && !cfg.noBadges ? W.badgeCount(it.badge) : '')) + '</a>';
        });
        s += '</div>';
      });
      s += '<div class="sb-foot">' +
        '<a class="sb-item" href="#">' + ic('circle-help', 'md') + t('Help') + '</a>' +
        '<a class="sb-item" href="#" lang="' + (cfg.langSwitch ? cfg.langSwitch[1] : (cfg.rtl ? 'en' : 'es')) + '">' + ic('globe', 'md') + (cfg.langSwitch ? cfg.langSwitch[0] : (cfg.rtl ? 'English' : 'Español')) + '</a>' +
        '<a class="sb-item" href="#">' + ic('settings', 'md') + t('Settings') + '</a></div></nav>';
      return s;
    };
    W.pageHead = function (o) {
      var tools = '';
      if (o.updated) tools += '<span class="fresh' + (o.stale ? ' stale' : '') + '">' + (o.stale ? ic('triangle-alert', 'sm') : ic('clock', 'sm')) + (o.auto ? 'Auto-refresh: ' + o.auto : 'Last updated: ' + o.updated) + '</span>';
      if (o.updated) tools += '<button class="btn btn-icon btn-sm" type="button" aria-label="Refresh dashboard">' + ic('refresh-cw', 'sm') + '</button>';
      if (o.range) tools += '<label class="select"><span class="sr-only">Date range</span>' + ic('calendar', 'sm', 'muted') + o.range + ic('chevron-down', 'sm', 'muted') + '</label>';
      return '<div class="page-head"><div>' + (o.crumbs ? '<nav class="crumbs" aria-label="Breadcrumb">' + o.crumbs.map(function (c, i, a) { return i === a.length - 1 ? '<span aria-current="page">' + c + '</span>' : '<a href="#">' + c + '</a>' + ic('chevron-right', 'xs'); }).join('') + '</nav>' : '') +
        '<h1>' + o.title + '</h1>' + (o.sub ? '<p class="sub">' + o.sub + '</p>' : '') + '</div><div class="tools">' + tools + '</div></div>';
    };

    W.desktop = function (cfg, content) {
      var cls = 'app' + (cfg.collapsed ? ' collapsed' : '');
      var right = cfg.detail || '';
      var over = '';
      if (cfg.drawer) over = '<div class="scrim" aria-hidden="true"></div><aside class="drawer over" role="dialog" aria-modal="true" aria-label="Notifications">' + cfg.drawer + '</aside>';
      return '<a class="skip-link" href="#content">' + ((cfg.strings || {}).skip || 'Skip to content') + '</a><div class="' + cls + '">' + (cfg.banner || '') + W.header(cfg) + '<div class="body">' + W.sidebar(cfg) +
        '<main class="main" id="content"' + (cfg.drawer ? ' aria-hidden="true"' : '') + '>' + content + '</main>' + right + '</div>' + over + '</div>';
    };

    // ---------------- Mobile
    var TABS = {
      OA: [['layout-dashboard', 'Dashboard'], ['users', 'Contacts'], ['banknote', 'Donations'], ['messages-square', 'Messages', 2], ['ellipsis', 'More']],
      CD: [['layout-dashboard', 'Dashboard'], ['mail', 'Email'], ['share-2', 'Social'], ['messages-square', 'Messages', 2], ['ellipsis', 'More']],
      FD: [['layout-dashboard', 'Dashboard'], ['banknote', 'Donations'], ['shield-check', 'Compliance', 3], ['messages-square', 'Messages'], ['ellipsis', 'More']],
      FiD: [['layout-dashboard', 'Dashboard'], ['door-open', 'Canvassing'], ['map', 'Turfs'], ['messages-square', 'Messages'], ['ellipsis', 'More']],
      VC: [['layout-dashboard', 'Dashboard'], ['users', 'Roster'], ['calendar', 'Shifts'], ['messages-square', 'Messages'], ['ellipsis', 'More']],
      DM: [['users', 'Contacts'], ['upload', 'Import'], ['copy', 'Dedup', 42], ['messages-square', 'Messages'], ['ellipsis', 'More']],
      V: [['clipboard-list', 'Shifts'], ['calendar', 'Events'], ['messages-square', 'Messages', 1], ['play', 'Start Shift', 0, 'go']],
      TL: [['clipboard-list', 'Shifts'], ['calendar', 'Events'], ['messages-square', 'Messages', 1], ['play', 'Start Shift', 0, 'go']],
      C: [['layout-dashboard', 'Dashboard'], ['user', 'Profile'], ['square-check', 'Approvals', 3], ['messages-square', 'Messages', 2]],
      S: [['user', 'Profile'], ['banknote', 'Donations'], ['calendar', 'Events']]
    };
    W.TABS = TABS;
    W.tabbar = function (persona, active) {
      return '<nav class="tabbar" role="tablist" aria-label="Main">' + TABS[persona].map(function (t, i) {
        return '<button class="bt' + (t[3] ? ' ' + t[3] : '') + '" role="tab" type="button" aria-selected="' + (i === active) + '">' + ic(t[0], 'lg') + '<span>' + t[1] + '</span>' + (t[2] ? W.badgeCount(t[2]) : '') + '</button>';
      }).join('') + '</nav>';
    };
    W.statusbar = function () { return '<div class="m-status" aria-hidden="true"><span class="num">9:41</span><span>' + '●●●● ▮' + '</span></div>'; };
    W.mobile = function (cfg, content) {
      var left = cfg.back ? '<button class="btn btn-icon" type="button" aria-label="Back">' + ic('arrow-left', 'lg') + '</button>' : '<button class="btn btn-icon" type="button" aria-label="Open menu"' + (cfg.menu ? ' aria-expanded="true"' : '') + '>' + ic('menu', 'lg') + '</button>';
      var actions = (cfg.actions || ['search', 'sync']).map(function (a) {
        if (a === 'search') return '<button class="btn btn-icon" type="button" aria-label="Search">' + ic('search', 'lg') + '</button>';
        if (a === 'refresh') return '<button class="btn btn-icon" type="button" aria-label="Refresh">' + ic('refresh-cw', 'lg') + '</button>';
        if (a === 'sync') return '<button class="btn btn-icon" type="button" aria-label="Connected and synced"><span class="sync" style="padding:0"><span class="dot"></span></span></button>';
        return a;
      }).join('');
      return '<div class="m-app">' + W.statusbar() + '<header class="m-top">' + left + '<h1>' + cfg.title + '</h1>' + actions + '</header>' +
        '<main class="m-content" id="content">' + content + '</main>' + (cfg.persona ? W.tabbar(cfg.persona, cfg.tab || 0) : '') + (cfg.overlay || '') + '</div>';
    };

    // ---------------- Entry
    W.render = function (cfg) {
      var root = document.documentElement;
      root.lang = cfg.lang || 'en';
      root.dir = cfg.rtl ? 'rtl' : 'ltr';
      if (cfg.dark) root.setAttribute('data-color-mode', 'dark');
      if (cfg.theme) root.setAttribute('data-theme', cfg.theme);
      if (cfg.context) root.setAttribute('data-context', cfg.context);
      document.title = (cfg.docTitle || cfg.title || 'GreenGrass') + ' · GreenGrass wireframes';
      var html = typeof cfg.html === 'function' ? cfg.html(cfg) : cfg.html;
      document.body.insertAdjacentHTML('afterbegin', html);
      if (cfg.after) cfg.after();
    };
    W.boot = function (id) {
      var s = W.SCREENS[id];
      if (!s) { document.body.textContent = 'Unknown screen: ' + id; return; }
      W.render(s);
    };
  })();
