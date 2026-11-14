/* GreenGrass demo app (/wf/app/): the navigation shell, working.
   Two sections load existing demo tools in a frame (addresses in ../assets/demos-config.js);
   every other section shows a "coming soon" page. Plain JS, no build, no dependencies. */
(function () {
  'use strict';

  var CFG = window.GG_DEMOS;
  var DEMO_KEY = 'gg-demos-v1'; // shared with /wf/demos: client name, logo and demo addresses
  var APP_KEY = 'gg-app-v1';    // this app: colour mode, language, sidebar state

  function load(k) { try { return JSON.parse(localStorage.getItem(k) || '{}') || {}; } catch (e) { return {}; } }
  function store(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
  // Only http(s) addresses load in the frame or a link: a javascript: URL from ?monitor= would run on this origin.
  function safeUrl(u) { if (!u) return ''; try { var x = new URL(u, location.href); return /^https?:$/.test(x.protocol) ? x.href : ''; } catch (e) { return ''; } }
  function safeImg(u) { if (!u) return ''; return /^data:image\/[a-z+.-]+;base64,/i.test(u) ? u : safeUrl(u); }
  function norm(s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
  var ic = window.ic;

  // ---------------------------------------------------------------- Strings
  var STR = {
    es: {
      skip: 'Saltar al contenido', mainNav: 'Navegación principal', tabs: 'Principal',
      collapse: 'Contraer barra lateral', expand: 'Expandir barra lateral',
      menu: 'Abrir menú', closeMenu: 'Cerrar menú', more: 'Más',
      search: 'Buscar secciones…', searchLabel: 'Buscar secciones', openSearch: 'Buscar', noResults: 'No hay secciones con ese nombre.',
      notif: 'Notificaciones', notifEmptyH: 'Todavía no hay notificaciones', notifEmptyP: 'Aquí verás mensajes, aprobaciones y alertas a medida que lleguen.',
      close: 'Cerrar', help: 'Ayuda', settings: 'Ajustes', otherLang: 'English', otherLangCode: 'en',
      toDark: 'Cambiar a modo oscuro', toLight: 'Cambiar a modo claro', darkMode: 'Modo oscuro', lightMode: 'Modo claro',
      account: 'Menú de la cuenta', user: 'Cuenta de demostración', role: 'Administración',
      customize: 'Personalizar cliente', online: 'Conectado', offline: 'Sin conexión',
      soon: 'Esta sección estará disponible pronto.',
      missingH: 'Falta la dirección del {n}', missingP: 'Pega la dirección donde ya funciona esta herramienta. Se guarda en este navegador y se carga aquí cada vez que la elijas.',
      addr: 'Dirección del {n}', load: 'Cargar', change: 'Cambiar dirección', reload: 'Recargar', newTab: 'Abrir en pestaña nueva',
      badUrl: 'Escribe una dirección completa que empiece por https:// o http://.',
      clientP: 'El nombre y el logo aparecen en la barra superior. Se guardan en este navegador.',
      clientName: 'Nombre del cliente', logo: 'Logo', upload: 'Subir imagen', removeLogo: 'Quitar logo',
      logoUrl: 'o pega la dirección de una imagen', reset: 'Restablecer', cancel: 'Cancelar', save: 'Guardar',
      logoBadUrl: 'La dirección del logo debe empezar por https:// o http://.', logoBadFile: 'No se pudo leer esa imagen. Prueba con un PNG, JPG o SVG.',
      saveFail: 'Se usará en esta sesión, pero este navegador no pudo guardarlo. Prueba con una imagen más pequeña.'
    },
    en: {
      skip: 'Skip to content', mainNav: 'Main navigation', tabs: 'Main',
      collapse: 'Collapse sidebar', expand: 'Expand sidebar',
      menu: 'Open menu', closeMenu: 'Close menu', more: 'More',
      search: 'Search sections…', searchLabel: 'Search sections', openSearch: 'Search', noResults: 'No section has that name.',
      notif: 'Notifications', notifEmptyH: 'No notifications yet', notifEmptyP: 'You’ll see messages, approvals, and alerts here as they arrive.',
      close: 'Close', help: 'Help', settings: 'Settings', otherLang: 'Español', otherLangCode: 'es',
      toDark: 'Switch to dark mode', toLight: 'Switch to light mode', darkMode: 'Dark mode', lightMode: 'Light mode',
      account: 'Account menu', user: 'Demo account', role: 'Administrator',
      customize: 'Customize client', online: 'Connected', offline: 'Offline',
      soon: 'This section is coming soon.',
      missingH: 'The {n} address is missing', missingP: 'Paste the address where this tool already runs. It is saved in this browser and loads here each time you choose it.',
      addr: '{n} address', load: 'Load', change: 'Change address', reload: 'Reload', newTab: 'Open in new tab',
      badUrl: 'Enter a full address that starts with https:// or http://.',
      clientP: 'The name and logo appear in the top bar. They are saved in this browser.',
      clientName: 'Client name', logo: 'Logo', upload: 'Upload image', removeLogo: 'Remove logo',
      logoUrl: 'or paste an image address', reset: 'Reset', cancel: 'Cancel', save: 'Save',
      logoBadUrl: 'The logo address must start with https:// or http://.', logoBadFile: 'That image could not be read. Try a PNG, JPG or SVG.',
      saveFail: 'It will be used in this session, but this browser could not save it. Try a smaller image.'
    }
  };

  // ---------------------------------------------------------------- Navigation (the wireframe's Org Admin sidebar)
  function I(id, icon, en, es) { return { id: id, icon: icon, en: en, es: es }; }
  var SECTIONS = [
    { id: 'demos', icon: 'play', en: 'Demos', es: 'Demos', items: CFG.demos.map(function (d) {
      return { id: d.id, icon: d.icono, en: d.name || d.nombre, es: d.nombre, shortEn: d.short || d.name || d.nombre, shortEs: d.corto || d.nombre, demo: d };
    }) },
    { id: 'overview', icon: 'layout-dashboard', en: 'Overview', es: 'Resumen', items: [I('dashboard', 'layout-dashboard', 'Dashboard', 'Panel'), I('activity', 'activity', 'Activity Feed', 'Flujo de actividad')] },
    { id: 'people', icon: 'users', en: 'People', es: 'Personas', items: [I('contacts', 'users', 'Contacts', 'Contactos'), I('segments', 'list-filter', 'Segments', 'Segmentos'), I('import', 'upload', 'Import/Export', 'Importación/Exportación'), I('dedup', 'copy', 'Dedup Queue', 'Cola de deduplicación')] },
    { id: 'field', icon: 'door-open', en: 'Field', es: 'Campo', items: [I('canvassing', 'door-open', 'Canvassing', 'Trabajo de campo'), I('phonebank', 'phone', 'Phone Banking', 'Jornadas de llamadas'), I('voterreg', 'clipboard-check', 'Voter Registration', 'Inscripción de votantes'), I('turfs', 'map', 'Turfs', 'Territorios')] },
    { id: 'fundraising', icon: 'banknote', en: 'Fundraising', es: 'Recaudación de fondos', items: [I('donations', 'banknote', 'Donations', 'Donaciones'), I('forms', 'file-text', 'Forms', 'Formularios'), I('campaigns', 'megaphone', 'Campaigns', 'Campañas'), I('compliance', 'shield-check', 'Compliance', 'Cumplimiento'), I('splits', 'link', 'Alliance Splits', 'Repartos de la alianza')] },
    { id: 'comms', icon: 'mail', en: 'Communications', es: 'Comunicaciones', items: [I('email', 'mail', 'Email', 'Correo'), I('sms', 'message-square', 'SMS/WhatsApp', 'SMS/WhatsApp'), I('social', 'share-2', 'Social Media', 'Redes sociales'), I('templates', 'layout-template', 'Templates', 'Plantillas')] },
    { id: 'events', icon: 'calendar', en: 'Events', es: 'Eventos', items: [I('events', 'calendar', 'Events', 'Eventos'), I('checkin', 'square-check', 'Check-in', 'Registro de entrada')] },
    { id: 'activism', icon: 'flag', en: 'Activism', es: 'Activismo', items: [I('campaigns', 'flag', 'Campaigns', 'Campañas'), I('petitions', 'file-text', 'Petitions', 'Peticiones'), I('comments', 'message-square', 'Public Comments', 'Comentarios públicos')] },
    { id: 'press', icon: 'newspaper', en: 'Press', es: 'Prensa', items: [I('media', 'users', 'Media Contacts', 'Contactos de medios'), I('content', 'file-text', 'Content', 'Contenido'), I('releases', 'newspaper', 'Releases', 'Comunicados'), I('coverage', 'chart-column', 'Coverage', 'Cobertura'), I('endorsements', 'user-check', 'Endorsements', 'Respaldos'), I('social', 'share-2', 'Social', 'Redes')] },
    { id: 'gotv', icon: 'vote', en: 'GOTV', es: 'GOTV', items: [I('universe', 'users', 'Universe', 'Universo'), I('staging', 'map-pin', 'Staging', 'Concentración'), I('warroom', 'radio', 'War Room', 'Centro de mando'), I('rides', 'car', 'Rides', 'Transporte'), I('watchers', 'eye', 'Poll Watchers', 'Observadores'), I('results', 'vote', 'Results', 'Resultados')] },
    { id: 'messaging', icon: 'messages-square', en: 'Messaging', es: 'Mensajería', items: [I('messages', 'messages-square', 'Messages', 'Mensajes')] },
    { id: 'alliance', icon: 'link', en: 'Alliance', es: 'Alianza', items: [I('dashboard', 'layout-dashboard', 'Alliance Dashboard', 'Panel de la alianza'), I('members', 'building', 'Members', 'Miembros'), I('shared', 'megaphone', 'Shared Campaigns', 'Campañas conjuntas')] }
  ];
  var APP = { id: 'app', icon: 'settings', en: '', es: '', items: [I('help', 'circle-help', 'Help', 'Ayuda'), I('settings', 'settings', 'Settings', 'Ajustes')] };
  var ALL = SECTIONS.concat([APP]);
  var DEFAULT = '#/demos/' + CFG.demos[0].id;
  // Bottom tabs on phones (navigation-shell.md § Bottom Tab Bar): the two demos, the dashboard, messages, More.
  var TABS = [['demos', CFG.demos[0].id], ['demos', CFG.demos[1] ? CFG.demos[1].id : ''], ['overview', 'dashboard'], ['messaging', 'messages']].filter(function (t) { return t[1]; });

  function href(sec, it) { return '#/' + sec.id + '/' + it.id; }
  function find(sid, iid) {
    for (var i = 0; i < ALL.length; i++) if (ALL[i].id === sid) for (var j = 0; j < ALL[i].items.length; j++) if (ALL[i].items[j].id === iid) return { sec: ALL[i], it: ALL[i].items[j] };
    return null;
  }
  function parse() { var p = location.hash.replace(/^#\/?/, '').split('/'); return find(p[0], p[1]); }

  // ---------------------------------------------------------------- State
  var q = new URLSearchParams(location.search);
  var saved = load(DEMO_KEY), prefs = load(APP_KEY);
  var savedClient = saved.cliente || {};
  var lang = q.get('lang') || prefs.lang;
  var state = {
    lang: lang === 'en' ? 'en' : 'es',
    theme: document.documentElement.getAttribute('data-color-mode') === 'dark' ? 'dark' : 'light',
    collapsedPref: typeof prefs.collapsed === 'boolean' ? prefs.collapsed : null,
    open: Array.isArray(prefs.open) ? prefs.open : null,
    client: null,
    urls: {},
    overlay: null,     // 'menu' | 'more' | 'search' | 'notif' | 'client' | 'user'
    sbOverlay: false,  // tablet: expanded sidebar over the content
    query: '', qi: 0,
    urlError: false,
    clientError: null,
    online: navigator.onLine !== false
  };
  // What this browser has saved. Address and logo parameters in a shared link apply to
  // this visit only: saving them silently would let any link plant a page in the frame.
  var own = function (o, k) { return !!o && typeof o === 'object' && Object.prototype.hasOwnProperty.call(o, k) && typeof o[k] === 'string'; };
  var stored = { cliente: { nombre: own(savedClient, 'nombre') ? savedClient.nombre : '', logo: own(savedClient, 'logo') ? safeImg(savedClient.logo) : '' }, urls: {} };
  CFG.demos.forEach(function (d) { stored.urls[d.id] = own(saved.urls, d.id) ? safeUrl(saved.urls[d.id]) : ''; });
  state.client = {
    name: (q.get('cliente') || '').trim().slice(0, 60) || stored.cliente.nombre || CFG.cliente.nombre,
    logo: q.has('logo') ? safeImg(q.get('logo')) : (stored.cliente.logo || safeImg(CFG.cliente.logo || ''))
  };
  CFG.demos.forEach(function (d) { state.urls[d.id] = safeUrl(q.get(d.id) || '') || stored.urls[d.id] || safeUrl(d.url || ''); });
  var cur = parse();

  function t(k) { return STR[state.lang][k]; }
  function L(x) { return x[state.lang]; }
  function short(it) { return state.lang === 'en' ? (it.shortEn || it.en) : (it.shortEs || it.es); }
  function savePrefs() { store(APP_KEY, { theme: state.theme, lang: state.lang, collapsed: state.collapsedPref, open: state.open }); }
  function persistClient() { stored.cliente = { nombre: state.client.name, logo: state.client.logo }; return store(DEMO_KEY, stored); }
  function persistUrl(id) { stored.urls[id] = state.urls[id]; return store(DEMO_KEY, stored); }

  var mqMobile = matchMedia('(max-width: 767px)');
  var mqTablet = matchMedia('(min-width: 768px) and (max-width: 1023px)');
  var mqWide = matchMedia('(min-width: 1280px)');
  function mode() { return mqMobile.matches ? 'mobile' : mqTablet.matches ? 'tablet' : 'desktop'; }
  function rail() {
    var m = mode();
    if (m === 'tablet') return !state.sbOverlay;
    if (m === 'desktop') return state.collapsedPref != null ? state.collapsedPref : !mqWide.matches;
    return false;
  }
  function openSet() {
    if (state.open) return state.open.slice();
    var o = ['demos'];
    if (cur && cur.sec !== APP && cur.sec.id !== 'demos') o.push(cur.sec.id);
    return o;
  }
  // Arriving at a page opens its section; after that the person may close it.
  function ensureOpen() {
    if (state.open && cur && cur.sec !== APP && state.open.indexOf(cur.sec.id) < 0) { state.open.push(cur.sec.id); savePrefs(); }
  }

  // ---------------------------------------------------------------- Render helpers
  var $ = function (id) { return document.getElementById(id); };
  function put(el, html) { if (el.__html !== html) { el.innerHTML = html; el.__html = html; } }
  function logoHtml(cls) {
    var c = state.client;
    return '<span class="tenant-logo' + (c.logo ? ' has-img' : '') + (cls ? ' ' + cls : '') + '">' + (c.logo ? '<img src="' + esc(c.logo) + '" alt="">' : ic('leaf', 'md')) + '</span>';
  }
  function themeIcon() { return state.theme === 'dark' ? ic('sun', 'md') : ic('moon', 'md'); }
  function themeLabel() { return state.theme === 'dark' ? t('toLight') : t('toDark'); }

  function headerHtml() {
    var c = state.client;
    return '<button class="btn btn-icon hdr-menu" type="button" data-act="menu" aria-label="' + esc(t('menu')) + '" aria-expanded="false">' + ic('menu', 'lg') + '</button>' +
      '<button class="tenant" type="button" data-act="client" aria-label="' + esc(t('customize') + ': ' + c.name) + '">' + logoHtml() + '<span class="tenant-name">' + esc(c.name) + '</span>' + ic('pencil', 'xs', 'muted') + '</button>' +
      '<span class="hdr-title" aria-hidden="true">' + esc(cur ? L(cur.it) : '') + '</span>' +
      '<div class="search-wrap"><label class="input">' + ic('search', 'sm') + '<span class="sr-only">' + esc(t('searchLabel')) + '</span>' +
        '<input id="q" type="search" autocomplete="off" spellcheck="false" placeholder="' + esc(t('search')) + '" role="combobox" aria-autocomplete="list" aria-controls="q-list" aria-expanded="false">' +
        '<span class="kbd" aria-hidden="true">' + (/Mac|iPhone|iPad/.test(navigator.platform) ? '⌘K' : 'Ctrl K') + '</span></label>' +
        '<div id="qpop"></div></div>' +
      '<div class="hdr-right">' +
        '<span class="sync' + (state.online ? '' : ' offline') + '" role="status"><span class="dot"></span><span' + (state.online ? ' class="sr-only"' : '') + '>' + esc(state.online ? t('online') : t('offline')) + '</span></span>' +
        '<button class="btn btn-icon hdr-search" type="button" data-act="search" aria-label="' + esc(t('openSearch')) + '">' + ic('search', 'lg') + '</button>' +
        '<button class="btn btn-icon" type="button" data-act="theme" aria-label="' + esc(themeLabel()) + '" title="' + esc(themeLabel()) + '">' + themeIcon() + '</button>' +
        '<button class="btn btn-icon bell" type="button" data-act="notif" aria-label="' + esc(t('notif')) + '" aria-expanded="false">' + ic('bell', 'md') + '</button>' +
        '<button class="usermenu" type="button" data-act="user" aria-controls="user-pop" aria-label="' + esc(t('account')) + '" aria-expanded="false"><span class="avatar">' + ic('user', 'sm') + '</span>' + ic('chevron-down', 'sm') + '</button>' +
        '<div id="upop"></div></div>';
  }
  function userPopHtml() {
    return '<div class="card pop user-pop" id="user-pop" role="group" aria-label="' + esc(t('account')) + '">' +
      '<div class="who"><span class="avatar">' + ic('user', 'sm') + '</span><span class="stack-2" style="gap:0;min-width:0"><span class="semibold t-sm">' + esc(t('user')) + '</span><span class="t-xs muted">' + esc(t('role') + ' · ' + state.client.name) + '</span></span></div>' +
      '<button class="sb-item" type="button" data-act="client">' + ic('pencil', 'md') + '<span>' + esc(t('customize')) + '</span></button>' +
      '<button class="sb-item" type="button" data-act="theme">' + themeIcon() + '<span>' + esc(state.theme === 'dark' ? t('lightMode') : t('darkMode')) + '</span></button>' +
      '<button class="sb-item" type="button" data-act="lang" lang="' + t('otherLangCode') + '">' + ic('globe', 'md') + '<span>' + esc(t('otherLang')) + '</span></button>' +
      '<a class="sb-item" href="#/app/settings">' + ic('settings', 'md') + '<span>' + esc(t('settings')) + '</span></a></div>';
  }

  function sidebarHtml() {
    var m = mode();
    if (m === 'mobile') return '';
    var isRail = rail();
    var s;
    if (isRail) {
      s = '<nav class="sb" aria-label="' + esc(t('mainNav')) + '"><button class="btn btn-icon sb-toggle" type="button" data-act="toggle-sb" aria-label="' + esc(t('expand')) + '" aria-expanded="false">' + ic('chevrons-right', 'md') + '</button>';
      SECTIONS.forEach(function (sec) {
        var active = cur && cur.sec === sec;
        s += '<button class="rail-item" type="button" data-fly="' + sec.id + '" aria-label="' + esc(L(sec)) + '" aria-controls="flyout" aria-expanded="false"' + (active ? ' aria-current="page"' : '') + '>' + ic(sec.icon, 'md') + '</button>';
        if (sec.id === 'demos') s += '<span class="rail-sep" aria-hidden="true"></span>';
      });
      s += '<div class="sb-foot rail-foot">' +
        '<a class="rail-item" href="#/app/help" aria-label="' + esc(t('help')) + '" title="' + esc(t('help')) + '"' + (cur && cur.it.id === 'help' ? ' aria-current="page"' : '') + '>' + ic('circle-help', 'md') + '</a>' +
        '<button class="rail-item" type="button" data-act="lang" lang="' + t('otherLangCode') + '" aria-label="' + esc(t('otherLang')) + '" title="' + esc(t('otherLang')) + '">' + ic('globe', 'md') + '</button>' +
        '<a class="rail-item" href="#/app/settings" aria-label="' + esc(t('settings')) + '" title="' + esc(t('settings')) + '"' + (cur && cur.it.id === 'settings' ? ' aria-current="page"' : '') + '>' + ic('settings', 'md') + '</a></div></nav>';
    } else {
      var open = openSet();
      s = '<nav class="sb" aria-label="' + esc(t('mainNav')) + '"><button class="btn btn-icon sb-toggle" type="button" data-act="toggle-sb" aria-label="' + esc(t('collapse')) + '" aria-expanded="true">' + ic('chevrons-left', 'md') + '</button>';
      SECTIONS.forEach(function (sec) {
        var isOpen = open.indexOf(sec.id) > -1;
        s += '<div class="sb-sec' + (sec.id === 'demos' ? ' sb-demos' : '') + '"><button class="sb-sec-head" type="button" data-sec="' + sec.id + '" aria-expanded="' + isOpen + '"><span>' + esc(L(sec)) + '</span>' + ic(isOpen ? 'chevron-down' : 'chevron-right', 'sm') + '</button>';
        if (isOpen) sec.items.forEach(function (it) { s += itemLink(sec, it, 'sb-item'); });
        s += '</div>';
      });
      s += '<div class="sb-foot">' + itemLink(APP, APP.items[0], 'sb-item') +
        '<button class="sb-item" type="button" data-act="lang" lang="' + t('otherLangCode') + '">' + ic('globe', 'md') + '<span>' + esc(t('otherLang')) + '</span></button>' +
        itemLink(APP, APP.items[1], 'sb-item') + '</div></nav>';
    }
    if (state.sbOverlay && m === 'tablet') s += '<div class="scrim sb-scrim" data-act="close" aria-hidden="true"></div>';
    return s;
  }
  function itemLink(sec, it, cls, extra) {
    var active = cur && cur.sec === sec && cur.it === it;
    return '<a class="' + cls + '" href="' + href(sec, it) + '"' + (active ? ' aria-current="page"' : '') + (extra || '') + '>' + ic(it.icon, 'md') + '<span>' + esc(L(it)) + '</span></a>';
  }

  function tabbarHtml() {
    if (mode() !== 'mobile') return '';
    var inTabs = false;
    var s = '<nav class="tabbar" aria-label="' + esc(t('tabs')) + '">' + TABS.map(function (tb) {
      var x = find(tb[0], tb[1]);
      var sel = cur && cur.sec === x.sec && cur.it === x.it && state.overlay !== 'more';
      if (cur && cur.it === x.it) inTabs = true;
      return '<a class="bt" href="' + href(x.sec, x.it) + '"' + (sel ? ' aria-current="page"' : '') + ' aria-label="' + esc(L(x.it)) + '">' + ic(x.it.icon, 'lg') + '<span aria-hidden="true">' + esc(short(x.it)) + '</span></a>';
    }).join('');
    var moreSel = state.overlay === 'more' || !inTabs;
    s += '<button class="bt" type="button" data-act="more" aria-expanded="' + (state.overlay === 'more') + '"' + (moreSel ? ' aria-current="true"' : '') + '>' + ic('ellipsis', 'lg') + '<span>' + esc(t('more')) + '</span></button></nav>';
    return s;
  }

  function mainHtml() {
    if (!cur) return '';
    if (cur.it.demo) return demoHtml(cur.it);
    var crumbs = cur.sec === APP ? '' : '<nav class="crumbs" aria-label="Breadcrumb"><span>' + esc(L(cur.sec)) + '</span>' + ic('chevron-right', 'xs') + '<span aria-current="page">' + esc(L(cur.it)) + '</span></nav>';
    return '<div class="page soon">' + crumbs + '<section class="empty" aria-labelledby="soon-h"><span class="empty-icon">' + ic(cur.it.icon, 'xl') + '</span>' +
      '<h1 id="soon-h" class="t-2xl">' + esc(L(cur.it)) + '</h1><p>' + esc(t('soon')) + '</p></section></div>';
  }
  function demoHtml(it) {
    var d = it.demo, url = state.urls[d.id], name = L(it);
    if (!url) {
      return '<section class="empty demo-empty" aria-labelledby="dh"><span class="empty-icon">' + ic(it.icon, 'xl') + '</span>' +
        '<h1 id="dh" class="t-2xl">' + esc(t('missingH').replace('{n}', name)) + '</h1><p>' + esc(t('missingP')) + '</p>' +
        '<form class="demo-url" data-url-form novalidate><label class="input" style="flex:1"><span class="sr-only">' + esc(t('addr').replace('{n}', name)) + '</span><input type="url" name="url" required placeholder="https://…" autocomplete="url"' + (state.urlError ? ' aria-invalid="true" aria-describedby="url-err"' : '') + '></label>' +
        '<button class="btn btn-primary" type="submit">' + esc(t('load')) + ic('arrow-right', 'sm') + '</button></form>' +
        (state.urlError ? '<p id="url-err" class="field-error" role="alert">' + esc(t('badUrl')) + '</p>' : '') + '</section>';
    }
    var b = function (act, icon, label, cls) { return '<button class="btn ' + cls + ' btn-sm" type="button" data-act="' + act + '" title="' + esc(label) + '">' + ic(icon, 'sm') + '<span class="btn-label">' + esc(label) + '</span></button>'; };
    return '<div class="demo-view"><div class="demo-bar"><div class="stack-2"><h1 class="t-lg semibold">' + esc(name) + '</h1><span class="t-xs muted demo-addr">' + esc(url) + '</span></div>' +
      '<div class="btn-group">' + b('edit-url', 'pencil', t('change'), 'btn-ghost') + b('reload', 'refresh-cw', t('reload'), 'btn-secondary') +
      '<a class="btn btn-secondary btn-sm" href="' + esc(url) + '" target="_blank" rel="noopener" title="' + esc(t('newTab')) + '">' + ic('external-link', 'sm') + '<span class="btn-label">' + esc(t('newTab')) + '</span></a></div></div>' +
      '<iframe class="demo-frame" title="' + esc(name) + '" src="' + esc(url) + '" allow="clipboard-read; clipboard-write; fullscreen; autoplay" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads allow-modals"></iframe></div>';
  }

  // ---------------------------------------------------------------- Overlays
  function msec(sec, items) {
    return '<div class="m-sec">' + (sec ? '<div class="group-label">' + esc(L(sec)) + '</div>' : '') + items.map(function (it) { return itemLink(sec || APP, it, 'm-item'); }).join('') + '</div>';
  }
  function mFoot() {
    return '<div class="m-sep"></div><div class="m-sec">' + itemLink(APP, APP.items[1], 'm-item') + itemLink(APP, APP.items[0], 'm-item') +
      '<button class="m-item" type="button" data-act="lang" lang="' + t('otherLangCode') + '">' + ic('globe', 'md') + '<span>' + esc(t('otherLang')) + '</span></button>' +
      '<button class="m-item" type="button" data-act="theme">' + themeIcon() + '<span>' + esc(state.theme === 'dark' ? t('lightMode') : t('darkMode')) + '</span></button></div>';
  }
  function layerHtml() {
    var o = state.overlay;
    if (o === 'menu') {
      return '<div class="m-full" role="dialog" aria-modal="true" aria-label="' + esc(t('mainNav')) + '"><div class="m-top" style="border:0"><button class="btn btn-icon" type="button" data-act="close" aria-label="' + esc(t('closeMenu')) + '">' + ic('x', 'lg') + '</button></div>' +
        '<div class="m-scroll"><button class="m-tenant" type="button" data-act="client" aria-label="' + esc(t('customize') + ': ' + state.client.name) + '">' + logoHtml() + '<span class="stack-2" style="gap:0;min-width:0;flex:1"><span class="t-lg semibold">' + esc(state.client.name) + '</span><span class="t-sm muted">' + esc(t('user')) + '</span></span>' + ic('pencil', 'sm', 'muted') + '</button>' +
        SECTIONS.map(function (sec) { return msec(sec, sec.items); }).join('') + mFoot() + '</div></div>';
    }
    if (o === 'more') {
      var tabIds = TABS.map(function (tb) { return tb[0] + '/' + tb[1]; });
      return '<div class="sheet-scrim" data-act="close" aria-hidden="true"></div><div class="sheet" role="dialog" aria-modal="true" aria-label="' + esc(t('more')) + '"><div class="handle" aria-hidden="true"></div>' +
        SECTIONS.map(function (sec) {
          var rest = sec.items.filter(function (it) { return tabIds.indexOf(sec.id + '/' + it.id) < 0; });
          return rest.length ? msec(sec, rest) : '';
        }).join('') + mFoot() + '</div>';
    }
    if (o === 'search') {
      return '<div class="m-full" role="dialog" aria-modal="true" aria-label="' + esc(t('searchLabel')) + '"><div class="m-top"><button class="btn btn-icon" type="button" data-act="close" aria-label="' + esc(t('close')) + '">' + ic('arrow-left', 'lg') + '</button>' +
        '<label class="input" style="flex:1;margin-inline-end:var(--space-2)">' + ic('search', 'sm') + '<span class="sr-only">' + esc(t('searchLabel')) + '</span><input id="mq" type="search" autocomplete="off" spellcheck="false" placeholder="' + esc(t('search')) + '" aria-controls="mq-list"></label></div>' +
        '<div class="m-scroll" id="mq-res" style="padding-block-start:var(--space-2)"></div></div>';
    }
    if (o === 'notif') {
      return '<div class="scrim" data-act="close" aria-hidden="true"></div><aside class="drawer over" role="dialog" aria-modal="true" aria-labelledby="notif-h"><div class="panel-head"><h2 id="notif-h">' + esc(t('notif')) + '</h2>' +
        '<button class="btn btn-icon" type="button" data-act="close" aria-label="' + esc(t('close')) + '">' + ic('x', 'md') + '</button></div><div class="panel-body"><section class="empty"><span class="empty-icon">' + ic('bell', 'xl') + '</span><h3 class="t-lg semibold">' + esc(t('notifEmptyH')) + '</h3><p>' + esc(t('notifEmptyP')) + '</p></section></div></aside>';
    }
    if (o === 'client') {
      var c = state.client, show = pendingLogo !== null ? pendingLogo : c.logo;
      return '<div class="scrim fixed" data-act="close" aria-hidden="true"></div><div class="card dialog" role="dialog" aria-modal="true" aria-labelledby="cd-h"><form data-client-form class="stack">' +
        '<div class="spread"><h2 id="cd-h" class="t-xl">' + esc(t('customize')) + '</h2><button class="btn btn-icon" type="button" data-act="close" aria-label="' + esc(t('close')) + '">' + ic('x', 'md') + '</button></div>' +
        '<p class="t-sm muted">' + esc(t('clientP')) + '</p>' +
        '<label class="stack-2"><span class="medium t-sm">' + esc(t('clientName')) + '</span><span class="input"><input name="nombre" required maxlength="60" value="' + esc(c.name) + '"></span></label>' +
        '<div class="stack-2"><span class="medium t-sm">' + esc(t('logo')) + '</span><div class="cluster" style="gap:var(--space-4);flex-wrap:nowrap"><span class="tenant-logo logo-preview' + (show ? ' has-img' : '') + '">' + (show ? '<img src="' + esc(show) + '" alt="">' : ic('leaf', 'md')) + '</span>' +
        '<label class="btn btn-secondary btn-sm">' + ic('upload', 'sm') + esc(t('upload')) + '<input type="file" accept="image/*" name="file" class="sr-only"></label>' +
        (show ? '<button class="btn btn-ghost btn-sm" type="button" data-act="nologo">' + esc(t('removeLogo')) + '</button>' : '') + '</div>' +
        '<label class="stack-2"><span class="t-xs muted">' + esc(t('logoUrl')) + '</span><span class="input"><input name="logo" type="url" placeholder="https://…/logo.png" value="' + (show && show.indexOf('data:') !== 0 ? esc(show) : '') + '"></span></label></div>' +
        (state.clientError ? '<p class="field-error" role="alert">' + esc(t(state.clientError)) + '</p>' : '') +
        '<div class="spread"><button class="btn btn-ghost btn-sm" type="button" data-act="reset-client">' + esc(t('reset')) + '</button><div class="btn-group"><button class="btn btn-secondary" type="button" data-act="close">' + esc(t('cancel')) + '</button><button class="btn btn-primary" type="submit">' + esc(t('save')) + '</button></div></div></form></div>';
    }
    return '';
  }

  // ---------------------------------------------------------------- Search
  function searchResults() {
    var qs = norm(state.query.trim());
    if (!qs) return [];
    var out = [];
    ALL.forEach(function (sec) {
      sec.items.forEach(function (it) {
        if (norm(L(it)).indexOf(qs) > -1 || (sec.id !== 'app' && norm(L(sec)).indexOf(qs) > -1)) out.push({ sec: sec, it: it });
      });
    });
    return out.slice(0, 8);
  }
  function resultsHtml(list, prefix) {
    if (!list.length) return '<p class="search-empty" role="status">' + esc(t('noResults')) + '</p>';
    return '<ul class="results" id="' + prefix + '-list" role="listbox" aria-label="' + esc(t('searchLabel')) + '">' + list.map(function (x, i) {
      return '<li role="presentation"><a class="' + (prefix === 'mq' ? 'm-item' : 'sb-item') + (i === state.qi ? ' is-active' : '') + '" id="' + prefix + '-opt-' + i + '" role="option" aria-selected="' + (i === state.qi) + '" href="' + href(x.sec, x.it) + '">' + ic(x.it.icon, 'md') + '<span>' + esc(L(x.it)) + '</span>' +
        (x.sec.id !== 'app' ? '<span class="result-sec">' + esc(L(x.sec)) + '</span>' : '') + '</a></li>';
    }).join('') + '</ul>';
  }
  function go(x) { var h = href(x.sec, x.it); if (h === location.hash) afterNav(); else location.hash = h; }

  // ---------------------------------------------------------------- Update
  function update() {
    var root = document.documentElement;
    root.lang = state.lang;
    root.setAttribute('data-color-mode', state.theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = state.theme === 'dark' ? '#1e293b' : '#ffffff';
    document.querySelector('.skip-link').textContent = t('skip');
    document.title = (cur ? L(cur.it) + ' · ' : '') + state.client.name;
    var app = $('app');
    app.classList.toggle('collapsed', mode() !== 'mobile' && rail());
    app.classList.toggle('sb-overlay', mode() === 'tablet' && state.sbOverlay);
    put($('hdr'), headerHtml());
    put($('sb'), sidebarHtml());
    put($('content'), mainHtml());
    put($('tabbar'), tabbarHtml());
    put($('layer'), layerHtml());
    put($('upop'), state.overlay === 'user' ? userPopHtml() : '');
    ['menu', 'notif', 'user'].forEach(function (o) { var b = document.querySelector('#hdr [data-act="' + o + '"]'); if (b) b.setAttribute('aria-expanded', String(state.overlay === o)); });
    var modal = isModal();
    ['hdr', 'body', 'tabbar'].forEach(function (id) { $(id).inert = modal; });
    document.querySelector('.skip-link').inert = modal;
    renderSearchPop();
    if (state.overlay === 'search') renderMobileResults();
  }
  // Header search results render on their own, so typing never re-renders the input.
  function renderSearchPop() {
    var box = $('qpop'), inp = $('q');
    if (!box || !inp) return;
    var open = state.overlay === 'search-pop' && !!state.query.trim();
    var res = open ? searchResults() : [];
    box.innerHTML = open ? '<div class="card pop search-pop">' + resultsHtml(res, 'q') + '</div>' : '';
    inp.setAttribute('aria-expanded', String(open));
    if (open && res.length) inp.setAttribute('aria-activedescendant', 'q-opt-' + state.qi); else inp.removeAttribute('aria-activedescendant');
  }
  function renderMobileResults() {
    var box = $('mq-res');
    if (box) put(box, state.query.trim() ? resultsHtml(searchResults(), 'mq') : '');
  }

  function isModal() { return /^(menu|more|search|notif|client)$/.test(state.overlay || ''); }

  // Overlays: remember what opened them and return focus there (navigation-shell.md § Accessibility Notes).
  var opener = null, pendingLogo = null;
  function openOverlay(name, from) {
    closeFly();
    opener = from || document.activeElement;
    state.overlay = name;
    if (name === 'client') { pendingLogo = null; state.clientError = null; }
    update();
    var first = { menu: '.m-full [data-act="close"]', more: '.sheet .m-item', search: '#mq', notif: '.drawer [data-act="close"]', client: '.dialog input[name="nombre"]', user: '.user-pop .sb-item' }[name];
    var el = first && document.querySelector(first);
    if (el) el.focus();
  }
  function closeOverlay(restore) {
    if (!state.overlay && !state.sbOverlay) return;
    var wasSb = state.sbOverlay && !state.overlay;
    state.overlay = null; state.sbOverlay = false; state.query = ''; state.qi = 0;
    update();
    if (restore !== false) {
      var target = wasSb ? document.querySelector('.sb-toggle') : opener;
      if (target && document.contains(target)) target.focus();
      else if (opener && opener.getAttribute && opener.getAttribute('data-act')) { var same = document.querySelector('[data-act="' + opener.getAttribute('data-act') + '"]'); if (same) same.focus(); }
    }
    opener = null;
  }

  // ---------------------------------------------------------------- Rail flyouts
  var fly = $('flyout'), flyFor = null, flyTimer = null;
  function openFly(btn) {
    clearTimeout(flyTimer);
    var s = SECTIONS.filter(function (x) { return x.id === btn.getAttribute('data-fly'); })[0];
    if (!s) return;
    if (flyFor && flyFor !== btn) flyFor.setAttribute('aria-expanded', 'false');
    flyFor = btn; btn.setAttribute('aria-expanded', 'true');
    fly.setAttribute('aria-label', L(s));
    fly.innerHTML = '<div class="sb-sec-head" aria-hidden="true"><span>' + esc(L(s)) + '</span></div>' + s.items.map(function (it) { return itemLink(s, it, 'sb-item'); }).join('');
    fly.hidden = false;
    var r = btn.getBoundingClientRect(), rtl = document.documentElement.dir === 'rtl';
    var top = Math.max(8, Math.min(r.top - 8, window.innerHeight - fly.offsetHeight - 8));
    fly.style.top = top + 'px';
    if (rtl) { fly.style.right = (window.innerWidth - r.left + 8) + 'px'; fly.style.left = 'auto'; }
    else { fly.style.left = (r.right + 8) + 'px'; fly.style.right = 'auto'; }
  }
  function closeFly() {
    clearTimeout(flyTimer);
    if (flyFor) flyFor.setAttribute('aria-expanded', 'false');
    flyFor = null; fly.hidden = true;
  }
  function closeFlySoon() { clearTimeout(flyTimer); flyTimer = setTimeout(closeFly, 180); }

  // ---------------------------------------------------------------- Events
  document.addEventListener('click', function (e) {
    var el = e.target;
    var flyBtn = el.closest('[data-fly]');
    if (flyBtn) {
      if (flyFor === flyBtn && !fly.hidden) { if (!(e.detail > 0 && lastPointer === 'mouse')) closeFly(); }
      else { openFly(flyBtn); var f = fly.querySelector('.sb-item'); if (e.detail === 0 && f) f.focus(); }
      return;
    }
    if (!el.closest('#flyout')) closeFly();
    var link = el.closest('a[href^="#/"]');
    if (link && link.getAttribute('href') === location.hash) { e.preventDefault(); afterNav(); return; }

    var sec = el.closest('.sb [data-sec]');
    if (sec) {
      var id = sec.getAttribute('data-sec'), o = openSet(), i = o.indexOf(id);
      if (i > -1) o.splice(i, 1); else o.push(id);
      state.open = o; savePrefs(); update();
      var again = document.querySelector('.sb [data-sec="' + id + '"]'); if (again) again.focus();
      return;
    }

    var act = el.closest('[data-act]');
    if (!act) {
      if (state.overlay === 'user' && !el.closest('.user-pop')) closeOverlay(false);
      if (state.overlay === 'search-pop' && !el.closest('.search-wrap')) { state.overlay = null; renderSearchPop(); }
      return;
    }
    var k = act.getAttribute('data-act');
    switch (k) {
      case 'menu': openOverlay('menu', act); break;
      case 'more': if (state.overlay === 'more') closeOverlay(); else openOverlay('more', act); break;
      case 'search': state.query = ''; state.qi = 0; openOverlay('search', act); break;
      case 'notif': if (state.overlay === 'notif') closeOverlay(); else openOverlay('notif', act); break;
      case 'user': if (state.overlay === 'user') closeOverlay(); else openOverlay('user', act); break;
      case 'client': openOverlay('client', mode() === 'mobile' ? document.querySelector('.hdr-menu') : document.querySelector('.hdr .tenant')); break;
      case 'close': closeOverlay(); break;
      case 'theme':
        var back = refocus(act); state.theme = state.theme === 'dark' ? 'light' : 'dark'; savePrefs(); update(); back();
        break;
      case 'lang': var back2 = refocus(act); state.lang = state.lang === 'es' ? 'en' : 'es'; savePrefs(); closeFly(); update(); back2(); break;
      case 'toggle-sb':
        if (mode() === 'tablet') { state.sbOverlay = !state.sbOverlay; update(); }
        else { state.collapsedPref = !rail(); savePrefs(); update(); }
        var tg = document.querySelector('.sb-toggle'); if (tg) tg.focus();
        break;
      case 'reload': var fr = document.querySelector('.demo-frame'); if (fr) { var src = fr.src; fr.src = 'about:blank'; fr.src = src; } break;
      case 'edit-url': if (cur && cur.it.demo) { state.urls[cur.it.demo.id] = ''; state.urlError = false; persistUrl(cur.it.demo.id); update(); var u = document.querySelector('[data-url-form] input'); if (u) u.focus(); } break;
      case 'nologo': pendingLogo = ''; state.clientError = null; var keepName = valueOf('nombre'); update(); restore('nombre', keepName); break;
      case 'reset-client':
        state.client = { name: CFG.cliente.nombre, logo: safeImg(CFG.cliente.logo || '') };
        stored.cliente = { nombre: '', logo: '' }; store(DEMO_KEY, stored); closeOverlay(); break;
    }
  });
  // Re-rendering replaces the button that was pressed; put focus back on its replacement.
  function refocus(el) {
    var k = el.getAttribute('data-act');
    var scope = el.closest('.user-pop') ? '.user-pop ' : el.closest('#layer') ? '#layer ' : el.closest('.sb') ? '.sb ' : el.closest('#hdr') ? '#hdr ' : '';
    return function () { var n = document.querySelector(scope + '[data-act="' + k + '"]'); if (n) n.focus(); };
  }
  function valueOf(n) { var x = document.querySelector('.dialog [name="' + n + '"]'); return x ? x.value : null; }
  function restore(n, v) { var x = document.querySelector('.dialog [name="' + n + '"]'); if (x && v != null) x.value = v; }

  document.addEventListener('submit', function (e) {
    var f = e.target;
    e.preventDefault();
    if (f.hasAttribute('data-url-form')) {
      var v = safeUrl(f.url.value.trim());
      if (!v || !/^https?:\/\//i.test(f.url.value.trim())) { var typedUrl = f.url.value; state.urlError = true; update(); var inp = document.querySelector('[data-url-form] input'); if (inp) { inp.value = typedUrl; inp.focus(); } return; }
      state.urlError = false; state.urls[cur.it.demo.id] = v; persistUrl(cur.it.demo.id); update();
    }
    if (f.hasAttribute('data-client-form')) {
      var name = f.nombre.value.trim();
      var typed = f.logo.value.trim();
      if (typed && !safeImg(typed)) { state.clientError = 'logoBadUrl'; update(); restore('nombre', name); restore('logo', typed); var lf = document.querySelector('.dialog [name="logo"]'); if (lf) lf.focus(); return; }
      var logo = typed ? safeImg(typed) : (pendingLogo !== null ? pendingLogo : state.client.logo);
      state.client = { name: name || state.client.name, logo: logo };
      if (!persistClient()) { state.clientError = 'saveFail'; update(); restore('nombre', name); return; }
      closeOverlay();
    }
  });

  document.addEventListener('change', function (e) {
    var el = e.target;
    if (el.name === 'file' && el.files && el.files[0]) {
      var file = el.files[0];
      if (!/^image\//.test(file.type)) return;
      var keepName = valueOf('nombre');
      var done = function (dataUrl, err) {
        if (!err) pendingLogo = dataUrl;
        state.clientError = err || null;
        update(); restore('nombre', keepName);
        var lu = document.querySelector('.dialog [name="logo"]'); if (lu) lu.value = '';
      };
      // Draw the image at most 256px on its longer side: logos stay sharp and fit in browser storage.
      var src = URL.createObjectURL(file), img = new Image();
      img.onload = function () {
        var w = img.naturalWidth || 256, h = img.naturalHeight || 256, k = Math.min(1, 256 / Math.max(w, h));
        var c = document.createElement('canvas');
        c.width = Math.max(1, Math.round(w * k)); c.height = Math.max(1, Math.round(h * k));
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(src);
        var out = ''; try { out = safeImg(c.toDataURL('image/png')); } catch (x) {}
        if (out) done(out); else done(null, 'logoBadFile');
      };
      img.onerror = function () { URL.revokeObjectURL(src); done(null, 'logoBadFile'); };
      img.src = src;
    }
  });

  document.addEventListener('input', function (e) {
    if (e.target.id === 'q') {
      if (state.overlay && state.overlay !== 'search-pop') { state.overlay = null; update(); }
      state.query = e.target.value; state.qi = 0;
      state.overlay = state.query.trim() ? 'search-pop' : null;
      renderSearchPop();
    }
    if (e.target.id === 'mq') { state.query = e.target.value; state.qi = 0; renderMobileResults(); }
    if (e.target.name === 'url' && state.urlError) { state.urlError = false; }
  });

  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      if (state.overlay === 'search') { var mq = $('mq'); if (mq) mq.focus(); return; }
      if (state.overlay && state.overlay !== 'search-pop') closeOverlay(false);
      if (mode() === 'mobile') openOverlay('search');
      else { var qi = $('q'); if (qi) qi.focus(); }
      return;
    }
    if (e.target.id === 'q' || e.target.id === 'mq') {
      var list = searchResults();
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        if (!list.length) return;
        e.preventDefault();
        state.qi = (state.qi + (e.key === 'ArrowDown' ? 1 : list.length - 1)) % list.length;
        if (e.target.id === 'q') renderSearchPop(); else renderMobileResults();
        return;
      }
      if (e.key === 'Enter') { e.preventDefault(); if (list[state.qi]) go(list[state.qi]); return; }
      if (e.key === 'Escape' && e.target.id === 'q') { e.target.value = ''; state.query = ''; state.overlay = null; renderSearchPop(); return; }
    }
    if (e.target.closest && e.target.closest('#flyout')) {
      var links = [].slice.call(fly.querySelectorAll('a')), i = links.indexOf(e.target);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); links[(i + (e.key === 'ArrowDown' ? 1 : links.length - 1)) % links.length].focus(); return; }
      if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); links[e.key === 'Home' ? 0 : links.length - 1].focus(); return; }
      if (e.key === 'Tab' && ((e.shiftKey && i === 0) || (!e.shiftKey && i === links.length - 1))) {
        e.preventDefault();
        var from = flyFor, railEls = [].slice.call(document.querySelectorAll('.sb .sb-toggle, .sb .rail-item'));
        var next = e.shiftKey ? from : railEls[railEls.indexOf(from) + 1];
        closeFly(); if (next) next.focus();
        return;
      }
    }
    if (e.key === 'Escape') {
      if (!fly.hidden) { var back = flyFor; closeFly(); if (back) back.focus(); return; }
      if (state.overlay || state.sbOverlay) closeOverlay();
    }
  });

  // Flyout: open on hover/focus of a rail button, stay open while the pointer is over it.
  var lastPointer = 'mouse';
  document.addEventListener('pointerdown', function (e) { lastPointer = e.pointerType; }, true);
  document.addEventListener('pointerover', function (e) {
    if (e.pointerType !== 'mouse') return;
    var b = e.target.closest('[data-fly]');
    if (b && mode() !== 'mobile') { openFly(b); return; }
    if (e.target.closest('#flyout')) clearTimeout(flyTimer);
  });
  document.addEventListener('pointerout', function (e) {
    if (e.pointerType !== 'mouse') return;
    var from = e.target.closest('[data-fly], #flyout');
    var to = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('[data-fly], #flyout');
    if (from && !to) closeFlySoon();
  });
  document.addEventListener('focusin', function (e) {
    if (!fly.hidden && !e.target.closest('#flyout') && !e.target.closest('[data-fly]')) closeFly();
  });
  document.querySelector('.main').addEventListener('scroll', closeFly, { passive: true });
  window.addEventListener('resize', closeFly);

  // After choosing a page (a new one, or the one already open): close menus and search, focus the page.
  function afterNav() {
    closeFly();
    var qx = $('q'); if (qx && qx.value) { qx.value = ''; if (document.activeElement === qx) qx.blur(); }
    if ((state.overlay && state.overlay !== 'client') || state.sbOverlay) { state.overlay = null; state.sbOverlay = false; }
    state.query = ''; state.qi = 0;
    update();
    var main = $('content'); main.scrollTop = 0; main.focus({ preventScroll: true });
  }
  window.addEventListener('hashchange', function () {
    var next = parse();
    if (!next) { location.replace(DEFAULT); return; }
    cur = next; state.urlError = false;
    ensureOpen();
    afterNav();
  });
  [mqMobile, mqTablet, mqWide].forEach(function (mq) {
    var fn = function () { closeFly(); if (mode() !== 'tablet') state.sbOverlay = false; if (mode() !== 'mobile' && /^(menu|more|search)$/.test(state.overlay || '')) state.overlay = null; update(); };
    if (mq.addEventListener) mq.addEventListener('change', fn); else mq.addListener(fn);
  });
  window.addEventListener('online', function () { state.online = true; update(); });
  window.addEventListener('offline', function () { state.online = false; update(); });

  // ---------------------------------------------------------------- Start
  if (!cur) { history.replaceState(null, '', location.pathname + location.search + DEFAULT); cur = parse(); }
  ensureOpen();
  update();
})();
