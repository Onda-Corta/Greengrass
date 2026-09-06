// GreenGrass docs — client-side search over a prebuilt JSON index.
// No external libraries: tokenized substring matching with simple field weighting.
(function () {
  'use strict';

  var input = document.getElementById('search-input');
  var resultsBox = document.getElementById('search-results');
  if (!input || !resultsBox) return;

  var base = document.documentElement.getAttribute('data-base') || '';
  // Search stays within the page's own language. One index holds every language;
  // the `|| 'en'` defaults keep a stale, pre-i18n index working.
  var lang = document.documentElement.lang || 'en';
  var noResultsLabel = document.documentElement.getAttribute('data-no-results') || 'No results for';
  var index = null;
  var loading = false;
  var selected = -1;
  var current = [];

  function load() {
    if (index || loading) return;
    loading = true;
    fetch(base + 'assets/search-index.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        index = data.filter(function (d) { return (d.lang || 'en') === lang; });
        if (input.value) run(input.value);
      })
      .catch(function () { loading = false; });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function snippet(text, terms) {
    var lower = text.toLowerCase();
    var pos = -1;
    for (var i = 0; i < terms.length; i++) {
      var p = lower.indexOf(terms[i]);
      if (p !== -1 && (pos === -1 || p < pos)) pos = p;
    }
    if (pos === -1) pos = 0;
    var start = Math.max(0, pos - 40);
    var frag = (start > 0 ? '…' : '') + text.slice(start, start + 140) + '…';
    var out = escapeHtml(frag);
    terms.forEach(function (t) {
      if (!t) return;
      var re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      out = out.replace(re, '<mark>$1</mark>');
    });
    return out;
  }

  function score(doc, terms) {
    var title = doc.title.toLowerCase();
    var headings = (doc.headings || []).join(' ').toLowerCase();
    var text = doc.text.toLowerCase();
    var s = 0;
    for (var i = 0; i < terms.length; i++) {
      var t = terms[i];
      if (!t) continue;
      var hit = false;
      if (title.indexOf(t) !== -1) { s += title === t ? 50 : 20; hit = true; }
      if (headings.indexOf(t) !== -1) { s += 8; hit = true; }
      if (text.indexOf(t) !== -1) { s += 3; hit = true; }
      if (!hit) return 0; // every term must appear somewhere
    }
    return s;
  }

  function run(query) {
    var terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length || !index) { hide(); return; }
    current = index
      .map(function (doc) { return { doc: doc, s: score(doc, terms) }; })
      .filter(function (x) { return x.s > 0; })
      .sort(function (a, b) { return b.s - a.s; })
      .slice(0, 12);

    if (!current.length) {
      resultsBox.innerHTML = '<div class="sr-empty">' + escapeHtml(noResultsLabel) +
        ' “' + escapeHtml(query) + '”</div>';
      show();
      return;
    }
    selected = -1;
    resultsBox.innerHTML = current.map(function (x, i) {
      var doc = x.doc;
      return '<a href="' + base + doc.url + '" data-i="' + i + '">' +
        '<div class="sr-title">' + escapeHtml(doc.title) + '</div>' +
        '<div class="sr-section">' + escapeHtml(doc.section) + '</div>' +
        '<div class="sr-snippet">' + snippet(doc.text, terms) + '</div>' +
      '</a>';
    }).join('');
    show();
  }

  function show() { resultsBox.hidden = false; }
  function hide() { resultsBox.hidden = true; selected = -1; }

  function move(delta) {
    var links = resultsBox.querySelectorAll('a');
    if (!links.length) return;
    if (selected >= 0 && links[selected]) links[selected].classList.remove('sel');
    selected = (selected + delta + links.length) % links.length;
    links[selected].classList.add('sel');
    links[selected].scrollIntoView({ block: 'nearest' });
  }

  input.addEventListener('focus', load);
  input.addEventListener('input', function () { run(input.value); });
  input.addEventListener('keydown', function (e) {
    if (resultsBox.hidden) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Enter') {
      var links = resultsBox.querySelectorAll('a');
      if (selected >= 0 && links[selected]) { e.preventDefault(); window.location.href = links[selected].getAttribute('href'); }
    } else if (e.key === 'Escape') { hide(); input.blur(); }
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.search')) hide();
  });

  // "/" focuses search.
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== input && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
      e.preventDefault(); input.focus();
    }
  });
})();
