/* ============================================================
   Tokens to Decisions — deck engine + interactive widgets
   No dependencies. Works offline.

   Engine:   slide navigation, progressive steps, speaker notes,
             theme toggle, help overlay, scaling to viewport.
   Widgets:  each is initialised lazily and has one learning
             objective, stated in the slide's speaker notes.

   All numbers used by the widgets are fixed illustrative values
   that match the course text. None are measurements of a real
   model, and none are live prices.
   ============================================================ */
(function () {
  'use strict';

  // ---------------------------------------------------------
  // Localisation
  //
  // English strings are the keys, so the English deck is served
  // by the fall-through and cannot drift. A German deck is any
  // page with lang="de"; it loads this same engine.
  // DICT.de lives in deck.de.js, which the German deck loads
  // before this file and which sets window.DECK_DICT.
  // ---------------------------------------------------------
  var LANG = (document.documentElement.lang || 'en').slice(0, 2);
  var LOC  = LANG === 'de' ? 'de-DE' : 'en-GB';
  var DICT = (window.DECK_DICT && window.DECK_DICT[LANG]) || null;

  function tr(k) { return (DICT && DICT[k]) || k; }
  function trf(k) {                      // tr() with %1, %2 … substitution
    var a = Array.prototype.slice.call(arguments, 1);
    return tr(k).replace(/%(\d)/g, function (_, i) { return a[i - 1]; });
  }
  // decimals follow the locale: 0.365 in English, 0,365 in German
  function dec(x, n) {
    var t = Number(x).toFixed(n);
    return LANG === 'de' ? t.replace('.', ',') : t;
  }
  // dollar amounts: $0.365 in English, 0,365 $ in German
  function usd(x, n) {
    return LANG === 'de' ? dec(x, n) + '&nbsp;$' : '$' + dec(x, n);
  }

  // ---------------------------------------------------------
  // Engine
  // ---------------------------------------------------------
  var slides = [], cur = 0, step = 0;
  var stage, progress, counter, notesPanel, notesBody, help;

  function stepsOf(s) { return Array.prototype.slice.call(s.querySelectorAll('.step')); }

  function applySteps() {
    var s = slides[cur], st = stepsOf(s);
    st.forEach(function (el, i) { el.classList.toggle('is-shown', i < step); });
  }

  function render() {
    slides.forEach(function (s, i) { s.classList.toggle('is-current', i === cur); });
    applySteps();
    progress.style.width = ((cur + 1) / slides.length * 100) + '%';
    counter.textContent = (cur + 1) + ' / ' + slides.length;
    var n = slides[cur].querySelector('template.notes');
    notesBody.innerHTML = n ? n.innerHTML
      : '<p class="muted">' + tr('No notes for this slide.') + '</p>';
    initWidgets(slides[cur]);
    if (location.hash !== '#' + (cur + 1)) {
      history.replaceState(null, '', '#' + (cur + 1));
    }
  }

  function go(i, atEnd) {
    cur = Math.max(0, Math.min(slides.length - 1, i));
    step = atEnd ? stepsOf(slides[cur]).length : 0;
    render();
  }
  function next() {
    if (step < stepsOf(slides[cur]).length) { step++; applySteps(); }
    else if (cur < slides.length - 1) { go(cur + 1); }
  }
  function prev() {
    if (step > 0) { step--; applySteps(); }
    else if (cur > 0) { go(cur - 1, true); }
  }

  function scale() {
    var pad = 24;
    var sw = 1280, sh = 720;
    var k = Math.min((window.innerWidth - pad) / sw, (window.innerHeight - pad - 30) / sh);
    if (notesPanel.classList.contains('is-open')) {
      k = Math.min((window.innerWidth - 430 - pad) / sw, (window.innerHeight - pad - 30) / sh);
    }
    slides.forEach(function (s) { s.style.transform = 'scale(' + k + ')'; });
    stage.style.paddingRight = notesPanel.classList.contains('is-open') ? '430px' : '0';
  }

  function toggleNotes() { notesPanel.classList.toggle('is-open'); scale(); }
  function toggleTheme() {
    var d = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', d ? 'light' : 'dark');
    try { localStorage.setItem('deck-theme', d ? 'light' : 'dark'); } catch (e) {}
  }

  function onKey(e) {
    if (e.target.matches('input,button,select,textarea') &&
        ['ArrowLeft', 'ArrowRight', ' '].indexOf(e.key) > -1 &&
        e.target.type === 'range') return;          // let sliders use arrows
    switch (e.key) {
      case 'ArrowRight': case 'PageDown': case ' ': next(); e.preventDefault(); break;
      case 'ArrowLeft': case 'PageUp': prev(); e.preventDefault(); break;
      case 'ArrowDown': go(cur + 1); e.preventDefault(); break;
      case 'ArrowUp': go(cur - 1); e.preventDefault(); break;
      case 'Home': go(0); e.preventDefault(); break;
      case 'End': go(slides.length - 1); e.preventDefault(); break;
      case 's': case 'S': case 'n': case 'N': toggleNotes(); break;
      case 'd': case 'D': toggleTheme(); break;
      case '?': case 'h': case 'H': help.classList.toggle('is-open'); break;
      case 'Escape': help.classList.remove('is-open'); break;
    }
  }

  function boot() {
    stage = document.getElementById('stage');
    progress = document.getElementById('progress');
    counter = document.getElementById('counter');
    notesPanel = document.getElementById('notes');
    notesBody = document.getElementById('notes-body');
    help = document.getElementById('help');
    slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));

    try {
      var t = localStorage.getItem('deck-theme');
      if (t) document.documentElement.setAttribute('data-theme', t);
    } catch (e) {}

    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', scale);
    // respond to hash changes so that pasted links and browser back/forward work
    window.addEventListener('hashchange', function () {
      var n = parseInt((location.hash || '').slice(1), 10);
      if (n > 0 && n <= slides.length && n - 1 !== cur) { go(n - 1); }
    });
    document.getElementById('btn-prev').addEventListener('click', prev);
    document.getElementById('btn-next').addEventListener('click', next);
    document.getElementById('btn-notes').addEventListener('click', toggleNotes);
    document.getElementById('btn-theme').addEventListener('click', toggleTheme);
    document.getElementById('btn-help').addEventListener('click', function () {
      help.classList.toggle('is-open');
    });
    help.addEventListener('click', function (e) {
      if (e.target === help) help.classList.remove('is-open');
    });

    var start = parseInt((location.hash || '').slice(1), 10);
    cur = (start > 0 && start <= slides.length) ? start - 1 : 0;
    step = 0;
    scale();
    render();
  }

  // ---------------------------------------------------------
  // Widget registry — each initialises once per element
  // ---------------------------------------------------------
  var widgets = {};
  function initWidgets(slide) {
    slide.querySelectorAll('[data-widget]').forEach(function (el) {
      if (el.dataset.ready) return;
      var fn = widgets[el.dataset.widget];
      if (fn) { fn(el); el.dataset.ready = '1'; }
    });
  }

  var fmt = function (x, n) { return dec(x, n === undefined ? 3 : n); };
  var sig = function (z) { return 1 / (1 + Math.exp(-z)); };

  // ---- 1. The neuron that learns AND -----------------------
  // Objective: see that "learning" is arithmetic on three numbers,
  // and that one gradient step reduces the loss.
  widgets.neuron = function (root) {
    var ROWS = [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 1, 1]];
    var w1 = 0.5, w2 = -0.4, b = 0.2, ETA = 1.0, epoch = 0;

    root.innerHTML =
      '<h3>' + tr('A neuron learning AND') + '</h3>' +
      '<div class="ctrl"><label for="nw1">w&#8321;</label>' +
        '<input id="nw1" type="range" min="-8" max="8" step="0.1"><output id="ow1"></output></div>' +
      '<div class="ctrl"><label for="nw2">w&#8322;</label>' +
        '<input id="nw2" type="range" min="-8" max="8" step="0.1"><output id="ow2"></output></div>' +
      '<div class="ctrl"><label for="nb">b</label>' +
        '<input id="nb" type="range" min="-14" max="6" step="0.1"><output id="ob"></output></div>' +
      '<table class="readout"><thead><tr>' +
        '<th>x&#8321;</th><th>x&#8322;</th><th>' + tr('target') + '</th><th>z</th>' +
        '<th>&#375;</th><th>' + tr('loss') + '</th>' +
      '</tr></thead><tbody id="nrows"></tbody></table>' +
      '<p class="tiny" style="margin:10px 0 0">' + tr('mean loss') +
        ' <b id="nloss" class="mono"></b>' +
        ' &middot; ' + tr('epoch') + ' <span id="nep" class="mono">0</span></p>' +
      '<div class="btnrow"><button id="nstep">' + tr('Train one step') + '</button>' +
        '<button id="nstep10" class="secondary">' + tr('Run 50 steps') + '</button>' +
        '<button id="nreset" class="secondary">' + tr('Reset') + '</button></div>';

    var $ = function (id) { return root.querySelector('#' + id); };

    function draw() {
      $('nw1').value = w1; $('nw2').value = w2; $('nb').value = b;
      $('ow1').textContent = fmt(w1, 2);
      $('ow2').textContent = fmt(w2, 2);
      $('ob').textContent = fmt(b, 2);
      var html = '', total = 0;
      ROWS.forEach(function (r) {
        var z = w1 * r[0] + w2 * r[1] + b, y = sig(z), L = 0.5 * Math.pow(y - r[2], 2);
        total += L;
        var good = (r[2] === 1 ? y > 0.5 : y < 0.5);
        html += '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td>' +
          '<td>' + fmt(z, 2) + '</td>' +
          '<td class="' + (good ? 'ok' : 'bad') + '">' + fmt(y, 3) + '</td>' +
          '<td>' + fmt(L, 4) + '</td></tr>';
      });
      $('nrows').innerHTML = html;
      $('nloss').textContent = fmt(total / 4, 4);
      $('nep').textContent = epoch;
    }
    function trainStep() {
      var g1 = 0, g2 = 0, gb = 0;
      ROWS.forEach(function (r) {
        var y = sig(w1 * r[0] + w2 * r[1] + b);
        var d = (y - r[2]) * y * (1 - y);
        g1 += d * r[0]; g2 += d * r[1]; gb += d;
      });
      w1 -= ETA * g1 / 4; w2 -= ETA * g2 / 4; b -= ETA * gb / 4;
      epoch++;
    }
    ['nw1', 'nw2', 'nb'].forEach(function (id, i) {
      $(id).addEventListener('input', function (e) {
        var v = parseFloat(e.target.value);
        if (i === 0) w1 = v; else if (i === 1) w2 = v; else b = v;
        draw();
      });
    });
    $('nstep').addEventListener('click', function () { trainStep(); draw(); });
    $('nstep10').addEventListener('click', function () {
      for (var i = 0; i < 50; i++) trainStep();
      draw();
    });
    $('nreset').addEventListener('click', function () {
      w1 = 0.5; w2 = -0.4; b = 0.2; epoch = 0; draw();
    });
    draw();
  };

  // ---- 2. Temperature and the tail -------------------------
  // Objective: see that raising T promotes the whole vocabulary,
  // and that the tail is large enough to dominate.
  widgets.temperature = function (root) {
    var TOK = [' timed', ' was', ' ran', ' exceeded', ' hit', ' could'];
    var LOGIT = [8.4, 6.9, 6.3, 5.6, 5.1, 4.6];
    var TAIL_L = -7.3, TAIL_N = 199994;
    var T = 1.0;

    root.innerHTML =
      '<h3>' + tr('Sampling temperature') + '</h3>' +
      '<div class="ctrl"><label for="tT">T</label>' +
        '<input id="tT" type="range" min="0.1" max="2" step="0.05" value="1"><output id="tO">1.00</output></div>' +
      '<div class="bars" id="tBars"></div>' +
      '<p class="tiny" style="margin-top:12px">' + tr('Context:') + ' <span class="mono">' +
        '&ldquo;The nightly run failed because it&rdquo;</span>. ' +
        tr('Fixed illustrative logits, not a measurement of any model.') + '</p>';

    var bars = root.querySelector('#tBars');
    function dist(t) {
      var zs = LOGIT.map(function (z) { return z / t; });
      var zt = TAIL_L / t;
      var m = Math.max.apply(null, zs.concat([zt]));
      var ex = zs.map(function (z) { return Math.exp(z - m); });
      var et = Math.exp(zt - m) * TAIL_N;
      var tot = ex.reduce(function (a, c) { return a + c; }, 0) + et;
      return { p: ex.map(function (e) { return e / tot; }), tail: et / tot };
    }
    function draw() {
      var d = dist(T), html = '';
      TOK.forEach(function (tk, i) {
        var pc = d.p[i] * 100;
        html += '<div class="bar"><code class="bar__k">' + tk.replace(/ /g, '&nbsp;') + '</code>' +
          '<div class="bar__t"><i style="width:' + Math.max(pc, 0.4) + '%"></i></div>' +
          '<span class="bar__v">' + dec(pc, 1) + '%</span></div>';
      });
      var tc = d.tail * 100;
      html += '<div class="bar bar--tail"><code class="bar__k">' + tr('tail') + '</code>' +
        '<div class="bar__t"><i style="width:' + Math.max(tc, 0.4) + '%"></i></div>' +
        '<span class="bar__v">' + dec(tc, 1) + '%</span></div>';
      html += '<p class="tiny" style="margin:4px 0 0">' +
        trf('&ldquo;tail&rdquo; = the other %1 tokens combined',
            TAIL_N.toLocaleString(LOC)) + '</p>';
      bars.innerHTML = html;
    }
    root.querySelector('#tT').addEventListener('input', function (e) {
      T = parseFloat(e.target.value);
      root.querySelector('#tO').textContent = dec(T, 2);
      draw();
    });
    draw();
  };

  // ---- 3. Attention over the example sentence --------------
  // Objective: see that a token's contextual representation is
  // built from other positions, and which ones.
  widgets.attention = function (root) {
    var T = ['The', 'nightly', 'run', 'failed', 'because', 'it', 'timed', 'out'];
    // Illustrative weights, row = attending FROM, col = attending TO.
    var W = [
      [.88, .03, .03, .03, .03, 0, 0, 0],
      [.26, .66, .03, .03, .03, 0, 0, 0],
      [.08, .74, .34, .03, .03, 0, 0, 0],
      [.05, .18, .62, .22, .03, 0, 0, 0],
      [.04, .10, .28, .40, .22, 0, 0, 0],
      [.04, .14, .90, .20, .08, .22, 0, 0],
      [.04, .08, .30, .24, .06, .34, .20, 0],
      [.04, .06, .18, .14, .06, .22, .56, .18]
    ];
    var sel = 5;
    root.innerHTML =
      '<h3>' + tr('Attention &mdash; choose a token to see what it draws on') + '</h3>' +
      '<div id="aToks" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px"></div>' +
      '<div class="bars" id="aBars"></div>' +
      '<p class="tiny" style="margin-top:12px">' +
      tr('Illustrative weights for one head in one layer. Real models run many heads per ' +
         'layer and these patterns are not an explanation of the model&rsquo;s output.') + '</p>';
    function draw() {
      root.querySelector('#aToks').innerHTML = T.map(function (t, i) {
        return '<button class="' + (i === sel ? '' : 'secondary') +
          '" data-i="' + i + '" style="font-family:var(--mono);padding:7px 12px">' + t + '</button>';
      }).join('');
      var row = W[sel], html = '';
      T.forEach(function (t, i) {
        if (i > sel) return;
        var pc = row[i] * 100;
        html += '<div class="bar"><code class="bar__k">' + t + '</code>' +
          '<div class="bar__t"><i style="width:' + Math.max(pc, 1) + '%"></i></div>' +
          '<span class="bar__v">' + pc.toFixed(0) + '%</span></div>';
      });
      html += '<p class="tiny" style="margin:4px 0 0">' +
        trf('Positions to the right of &ldquo;%1&rdquo; are masked: a token may not see ' +
            'what follows it.', T[sel]) + '</p>';
      root.querySelector('#aBars').innerHTML = html;
      root.querySelectorAll('#aToks button').forEach(function (b) {
        b.addEventListener('click', function () { sel = +b.dataset.i; draw(); });
      });
    }
    draw();
  };

  // ---- 4. Context composition ------------------------------
  // Objective: see that your question is a small part of the
  // context, and that headroom is what everything else consumes.
  widgets.context = function (root) {
    var SRC = [
      { k: 'system', label: tr('System prompt + tools'), tok: 4800, on: true, fixed: true, o: .95 },
      { k: 'instr', label: tr('Your instructions'), tok: 1600, on: true, o: .76 },
      { k: 'docs', label: tr('Three vendor reports (full)'), tok: 100000, on: false, o: .58 },
      { k: 'extract', label: tr('Extracted sections only'), tok: 6000, on: true, o: .58 },
      { k: 'data', label: tr('Measurement summary'), tok: 1200, on: true, o: .44 },
      { k: 'hist', label: tr('Conversation so far'), tok: 9000, on: true, o: .34 },
      { k: 'q', label: tr('Your question'), tok: 120, on: true, fixed: true, o: 1, practice: true }
    ];
    var WINDOW = 200000;
    root.innerHTML =
      '<h3>' + tr('What is in the context') + '</h3>' +
      '<div class="budget" id="cBar"></div>' +
      '<p class="tiny" id="cSum" style="margin:2px 0 0"></p>' +
      '<div class="toggles" id="cTog"></div>';
    function draw() {
      var used = SRC.filter(function (s) { return s.on; })
                    .reduce(function (a, s) { return a + s.tok; }, 0);
      var head = Math.max(WINDOW - used, 0);
      var html = '';
      SRC.forEach(function (s) {
        if (!s.on) return;
        var col = s.practice ? 'var(--practice)' : 'var(--accent)';
        // faint segments carry dark-on-light (or light-on-dark) ink so labels stay legible
        var ink = s.o >= .5 ? 'var(--on-accent)' : 'var(--ink)';
        html += '<div class="budget__seg" style="flex-grow:' + s.tok +
          ';background:' + col + ';opacity:' + s.o + ';color:' + ink + '" title="' + s.label + '">' +
          (s.tok / used > .08 ? Math.round(s.tok / WINDOW * 100) + '%' : '') + '</div>';
      });
      html += '<div class="budget__seg" style="flex-grow:' + head +
        ';background:var(--rule-strong);color:var(--ink)">' +
        (head / WINDOW > .08
           ? trf('headroom %1%', Math.round(head / WINDOW * 100)) : '') + '</div>';
      root.querySelector('#cBar').innerHTML = html;
      root.querySelector('#cSum').innerHTML =
        trf('<b class="mono">%1</b> of %2 tokens used &middot; your question is ' +
            '<b class="mono">%3%</b> of it',
            used.toLocaleString(LOC), WINDOW.toLocaleString(LOC), dec(120 / used * 100, 2));
      root.querySelector('#cTog').innerHTML = SRC.map(function (s, i) {
        return '<label class="toggle' + (s.on ? '' : ' is-off') + '">' +
          '<input type="checkbox" data-i="' + i + '"' + (s.on ? ' checked' : '') +
          (s.fixed ? ' disabled' : '') + '>' + s.label +
          ' <span class="mono tiny">' + s.tok.toLocaleString(LOC) + '</span></label>';
      }).join('');
      root.querySelectorAll('#cTog input').forEach(function (cb) {
        cb.addEventListener('change', function () {
          SRC[+cb.dataset.i].on = cb.checked; draw();
        });
      });
    }
    draw();
  };

  // ---- 5. Cost of four approaches --------------------------
  // Objective: see that caching dominates agentic cost, and that
  // model spend is small next to verification time.
  widgets.cost = function (root) {
    var RATE = { lg: { i: 3.00, c: 0.30, o: 15.00 }, sm: { i: 0.25, c: 0.025, o: 1.25 } };
    var cache = true, rev = 20, wage = 60;
    function c(r, i, ca, o) { return (i * r.i + ca * (cache ? r.c : r.i) + o * r.o) / 1e6; }
    function calc() {
      var one = c(RATE.lg, 113000, 0, 3000);
      var small = c(RATE.sm, 113000, 0, 3000);
      var plan = c(RATE.lg, 4000, 0, 1500) + 3 * c(RATE.sm, 33333, 0, 1500) +
                 c(RATE.sm, 12000, 0, 800) + c(RATE.lg, 7000, 0, 3000);
      var agent = c(RATE.lg, 35000, 375200, 9800);
      return [
        { n: '1 · ' + tr('One large model, single pass'), v: one },
        { n: '2 · ' + tr('One small model, single pass'), v: small },
        { n: '3 · ' + tr('Large plans, small models execute'), v: plan },
        { n: '4 · ' + tr('Agentic loop, 14 steps'), v: agent }
      ];
    }
    root.innerHTML =
      '<h3>' + tr('What one task costs') + '</h3>' +
      '<table class="readout"><thead><tr><th>' + tr('Approach') + '</th>' +
      '<th class="num">' + tr('Model cost') + '</th>' +
      '<th class="num">' + tr('Credits') + '</th></tr></thead>' +
      '<tbody id="kRows"></tbody></table>' +
      '<div class="toggles" style="margin-top:14px">' +
        '<label class="toggle"><input type="checkbox" id="kCache" checked> ' +
        tr('Prompt caching enabled') + '</label>' +
      '</div>' +
      '<div class="ctrl" style="margin-top:12px;grid-template-columns:150px 1fr 84px">' +
        '<label for="kRev">' + tr('review min') + '</label>' +
        '<input id="kRev" type="range" min="0" max="60" step="5" value="20"><output id="kRevO">20</output></div>' +
      '<p class="tiny" id="kCmp" style="margin:4px 0 0"></p>' +
      '<p class="tiny" style="margin-top:10px">' +
      tr('Illustrative rates in US$ per million tokens: large 3.00 in / 0.30 cached / ' +
         '15.00 out; small 0.25 / 0.025 / 1.25. Credits shown at 1 credit = $0.01. ' +
         'Substitute your own current figures.') + '</p>';
    function draw() {
      var rows = calc();
      root.querySelector('#kRows').innerHTML = rows.map(function (r) {
        return '<tr><td>' + r.n + '</td><td class="num">' + usd(r.v, 3) +
          '</td><td class="num">' + (r.v * 100).toFixed(0) + '</td></tr>';
      }).join('');
      var human = rev / 60 * wage;
      var m = rows[0].v;
      root.querySelector('#kCmp').innerHTML =
        rev === 0 ? tr('No verification time counted.') :
        trf('Verification at %1 min &times; $%2/h = <b>$%3</b>, about <b>%4&times;</b> ' +
            'the model cost of approach 1.',
            rev, wage, dec(human, 2), Math.round(human / m));
    }
    root.querySelector('#kCache').addEventListener('change', function (e) {
      cache = e.target.checked; draw();
    });
    root.querySelector('#kRev').addEventListener('input', function (e) {
      rev = +e.target.value;
      root.querySelector('#kRevO').textContent = rev;
      draw();
    });
    draw();
  };

  // ---- 6. Model comparison on three axes -------------------
  // Objective: see that "best" depends on which axis you weight.
  widgets.compare = function (root) {
    var MODELS = [
      { n: tr('Large, high effort'), q: 95, c: 100, l: 100 },
      { n: tr('Large, low effort'), q: 86, c: 42, l: 34 },
      { n: tr('Small, high effort'), q: 78, c: 18, l: 46 },
      { n: tr('Small, low effort'), q: 64, c: 6, l: 12 }
    ];
    var wq = 60, wc = 25, wl = 15;
    root.innerHTML =
      '<h3>' + tr('Weighting the three axes') + '</h3>' +
      '<div class="ctrl"><label for="mq">' + tr('quality') + '</label>' +
        '<input id="mq" type="range" min="0" max="100" step="5" value="60"><output id="mqO">60</output></div>' +
      '<div class="ctrl"><label for="mc">' + tr('cost') + '</label>' +
        '<input id="mc" type="range" min="0" max="100" step="5" value="25"><output id="mcO">25</output></div>' +
      '<div class="ctrl"><label for="ml">' + tr('speed') + '</label>' +
        '<input id="ml" type="range" min="0" max="100" step="5" value="15"><output id="mlO">15</output></div>' +
      '<table class="readout"><thead><tr><th>' + tr('Option') + '</th>' +
      '<th class="num">' + tr('quality') + '</th>' +
      '<th class="num">' + tr('cost') + '</th>' +
      '<th class="num">' + tr('latency') + '</th>' +
      '<th class="num">' + tr('score') + '</th>' +
      '</tr></thead><tbody id="mRows"></tbody></table>' +
      '<p class="tiny" style="margin-top:10px">' +
      tr('Illustrative profiles, not measurements. The point is that the ranking changes ' +
         'with the weighting, so &ldquo;best&rdquo; is not a property of a model alone.') + '</p>';
    function draw() {
      var tot = wq + wc + wl || 1;
      var scored = MODELS.map(function (m) {
        var s = (wq * m.q + wc * (100 - m.c) + wl * (100 - m.l)) / tot;
        return { m: m, s: s };
      }).sort(function (a, b) { return b.s - a.s; });
      root.querySelector('#mRows').innerHTML = scored.map(function (r, i) {
        return '<tr><td>' + (i === 0 ? '<b>' + r.m.n + '</b>' : r.m.n) + '</td>' +
          '<td class="num">' + r.m.q + '</td><td class="num">' + r.m.c + '</td>' +
          '<td class="num">' + r.m.l + '</td><td class="num ' + (i === 0 ? 'ok' : '') + '">' +
          dec(r.s, 1) + '</td></tr>';
      }).join('');
    }
    [['mq', 'wq'], ['mc', 'wc'], ['ml', 'wl']].forEach(function (p) {
      root.querySelector('#' + p[0]).addEventListener('input', function (e) {
        var v = +e.target.value;
        if (p[1] === 'wq') wq = v; else if (p[1] === 'wc') wc = v; else wl = v;
        root.querySelector('#' + p[0] + 'O').textContent = v;
        draw();
      });
    });
    draw();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else { boot(); }
})();
