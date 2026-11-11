/* ===========================================
   SLIDE PRESENTATION CONTROLLER
   Navigation, Schritte, Skalierung, Übersicht, Hilfe.
   =========================================== */
class SlidePresentation {
    constructor() {
        this.stage = document.getElementById('deckStage');
        this.slides = Array.from(this.stage.querySelectorAll('.slide'));
        this.secLabel = document.getElementById('secLabel');
        this.pgLabel = document.getElementById('pgLabel');
        this.progress = document.getElementById('progress');
        this.overview = document.getElementById('overview');
        this.help = document.getElementById('help');
        this.current = 0;
        this.editing = false;
        if (/[?&]static/.test(location.search)) document.documentElement.classList.add('static');
        this.setupStageScale();
        this.setupKeyboardNav();
        this.setupTouchNav();
        this.setupWheelNav();
        const start = parseInt(location.hash.slice(1), 10);
        this.showSlide(isNaN(start) ? 0 : start - 1, false);
        window.addEventListener('hashchange', () => {
            const n = parseInt(location.hash.slice(1), 10);
            if (!isNaN(n) && n - 1 !== this.current) this.showSlide(n - 1, false);
        });
    }

    /* Bühne (1920×1080) als Ganzes in das Fenster skalieren */
    setupStageScale() {
        const scale = () => {
            const f = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
            const x = (window.innerWidth - 1920 * f) / 2;
            const y = (window.innerHeight - 1080 * f) / 2;
            this.stage.style.transform = `translate(${x}px, ${y}px) scale(${f})`;
        };
        scale();
        window.addEventListener('resize', scale);
    }

    steps(i) { return Array.from(this.slides[i].querySelectorAll('.step')); }

    /* allSteps: beim Rückwärtsgehen die Folie vollständig aufgedeckt zeigen */
    showSlide(index, allSteps) {
        this.current = Math.max(0, Math.min(index, this.slides.length - 1));
        this.slides.forEach((s, i) => {
            const on = i === this.current;
            s.classList.toggle('active', on);
            s.classList.toggle('visible', on);
        });
        this.steps(this.current).forEach(el => el.classList.toggle('on', !!allSteps));
        const s = this.slides[this.current];
        this.stage.classList.toggle('on-dark', s.classList.contains('dark'));
        this.stage.classList.toggle('on-hot', s.classList.contains('hot'));
        this.secLabel.textContent = s.dataset.sec || '';
        const n = String(this.current + 1).padStart(2, '0');
        this.pgLabel.innerHTML = `<b>${n}</b> / ${this.slides.length}`;
        this.progress.style.width = ((this.current + 1) / this.slides.length * 100) + '%';
        if (location.hash !== '#' + (this.current + 1)) history.replaceState(null, '', '#' + (this.current + 1));
        s.dispatchEvent(new CustomEvent('slide:enter'));
    }

    next() {
        const hidden = this.steps(this.current).filter(el => !el.classList.contains('on'));
        if (hidden.length) hidden[0].classList.add('on');
        else if (this.current < this.slides.length - 1) this.showSlide(this.current + 1, false);
    }

    prev() {
        const shown = this.steps(this.current).filter(el => el.classList.contains('on'));
        if (shown.length) shown[shown.length - 1].classList.remove('on');
        else if (this.current > 0) this.showSlide(this.current - 1, true);
    }

    setupKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            const t = e.target;
            if (this.editing) {
                if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); this.exportHtml(); }
                if (e.key === 'Escape') this.toggleEdit();
                return;
            }
            if (e.ctrlKey || e.metaKey || e.altKey) return;
            const inField = t.matches && t.matches('input, select, textarea');
            if (inField && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) return;
            if (t.matches && t.matches('button') && (e.key === ' ' || e.key === 'Enter')) return;
            if (this.overview.classList.contains('open') && e.key !== 'o' && e.key !== 'O' && e.key !== 'Escape') return;
            switch (e.key) {
                case 'ArrowRight': case ' ': case 'PageDown': e.preventDefault(); this.next(); break;
                case 'ArrowLeft': case 'PageUp': e.preventDefault(); this.prev(); break;
                case 'ArrowDown': e.preventDefault(); this.showSlide(this.current + 1, true); break;
                case 'ArrowUp': e.preventDefault(); this.showSlide(this.current - 1, true); break;
                case 'Home': this.showSlide(0, false); break;
                case 'End': this.showSlide(this.slides.length - 1, true); break;
                case 'o': case 'O': this.toggleOverview(); break;
                case 'Escape': this.overview.classList.remove('open'); this.help.classList.remove('open'); break;
                case 'f': case 'F':
                    if (document.fullscreenElement) document.exitFullscreen();
                    else document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
                    break;
                case '?': case 'h': case 'H': this.help.classList.toggle('open'); break;
                case 'e': case 'E': this.toggleEdit(); break;
            }
        });
    }

    setupTouchNav() {
        let x0 = null;
        this.stage.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
        this.stage.addEventListener('touchend', e => {
            if (x0 === null || e.target.closest('.demo')) return;
            const dx = e.changedTouches[0].clientX - x0;
            if (Math.abs(dx) > 50) dx < 0 ? this.next() : this.prev();
            x0 = null;
        });
    }

    /* Mausrad: stark gedrosselt, über Live-Demos deaktiviert */
    setupWheelNav() {
        let last = 0;
        this.stage.addEventListener('wheel', e => {
            if (this.editing || e.target.closest('.demo')) return;
            const now = Date.now();
            if (now - last < 900 || Math.abs(e.deltaY) < 40) return;
            last = now;
            e.deltaY > 0 ? this.next() : this.prev();
        }, { passive: true });
    }

    /* Übersicht (Taste O): alle Folien als Miniaturen */
    toggleOverview() {
        const ov = this.overview;
        if (ov.classList.contains('open')) { ov.classList.remove('open'); return; }
        const grid = ov.querySelector('.grid');
        grid.innerHTML = '';
        this.slides.forEach((s, i) => {
            const th = document.createElement('div');
            th.className = 'th static' + (i === this.current ? ' cur' : '');
            const c = s.cloneNode(true);
            c.classList.add('visible');
            c.querySelectorAll('.step').forEach(el => el.classList.add('on'));
            c.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
            th.appendChild(c);
            const n = document.createElement('span');
            n.className = 'n'; n.textContent = i + 1;
            th.appendChild(n);
            th.addEventListener('click', () => { ov.classList.remove('open'); this.showSlide(i, false); });
            grid.appendChild(th);
        });
        ov.classList.add('open');
        const cur = grid.querySelector('.cur');
        if (cur) cur.scrollIntoView({ block: 'center' });
    }

    /* Edit-Modus (Taste E): Texte direkt ändern, Strg/Cmd+S exportiert die Datei */
    toggleEdit() {
        this.editing = !this.editing;
        document.body.classList.toggle('editing', this.editing);
        document.getElementById('editToggle').classList.toggle('active', this.editing);
        const sel = 'h2, h3, p, li, td, th, .kick, .stmt, .sec-title, .sec-sub, .lede, .take';
        this.stage.querySelectorAll(sel).forEach(el => {
            if (el.closest('.demo')) return;
            if (this.editing) el.setAttribute('contenteditable', 'true');
            else el.removeAttribute('contenteditable');
        });
    }

    exportHtml() {
        this.stage.querySelectorAll('[contenteditable]').forEach(el => el.removeAttribute('contenteditable'));
        const html = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
        a.download = 'vortrag-bearbeitet.html';
        a.click();
        this.editing = true; this.toggleEdit();
    }
}

/* ===========================================
   LIVE-DEMOS
   Jede Demo hängt sich an ein Element mit data-demo="name".
   Alle Zahlen stehen oben in der jeweiligen Funktion.
   =========================================== */
const fmt = (x, d = 1) => x.toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d });
const demos = {};

/* --- 1. Gradient Descent auf L(w) = w² ------------------------------
   Update: w ← w − η · dL/dw = w − η · 2w.  η > 1 divergiert. */
demos.gd = (root) => {
    const W0 = -3.2; let w = W0, eta = 0.2, trail = [W0], timer = null;
    root.innerHTML = `
      <div class="row">
        <label>Learning Rate η</label>
        <input type="range" min="0.02" max="1.1" step="0.02" value="0.2">
        <output>0,20</output>
        <button class="btn" data-a="step">1 Schritt</button>
        <button class="btn" data-a="run">20 Schritte</button>
        <button class="btn" data-a="reset">Reset</button>
      </div>
      <svg class="dg" viewBox="0 0 1000 430" style="margin-top:10px">
        <line class="ln" x1="40" y1="390" x2="960" y2="390"/>
        <line class="lnd" x1="500" y1="20" x2="500" y2="390"/>
        <path class="ln" d=""/>
        <polyline class="lnr" points=""/>
        <g class="pts"></g>
        <text x="950" y="420" text-anchor="end">Parameter w</text>
        <text x="500" y="40" text-anchor="middle" style="font-weight:700">Loss L(w) = w²</text>
        <text class="rd" x="500" y="78" text-anchor="middle"></text>
      </svg>
      <p class="note">Jeder Schritt: <b>w ← w − η · ∂L/∂w</b>. Ist η zu klein, nähert sich w nur langsam. Ist η zu groß, springt jeder Schritt über das Minimum hinaus.</p>`;
    const X = v => 500 + v * 115, Y = v => 390 - Math.min(v * v, 13.5) * 27;
    let d = ''; for (let v = -3.7; v <= 3.7; v += 0.1) d += (d ? 'L' : 'M') + X(v).toFixed(1) + ' ' + Y(v).toFixed(1);
    root.querySelector('path').setAttribute('d', d);
    const draw = () => {
        const vis = trail.map(v => Math.max(-3.9, Math.min(3.9, v)));
        root.querySelector('polyline').setAttribute('points', vis.map(v => X(v) + ',' + Y(v)).join(' '));
        root.querySelector('.pts').innerHTML = vis.map((v, i) =>
            `<circle cx="${X(v)}" cy="${Y(v)}" r="${i === vis.length - 1 ? 14 : 6}" class="node ${i === vis.length - 1 ? 'noder' : ''}"/>`).join('');
        const diverged = Math.abs(w) > 3.9;
        root.querySelector('.rd').textContent = diverged ? 'divergiert' : `Schritt ${trail.length - 1} · w = ${fmt(w, 3)} · L = ${fmt(w * w, 3)}`;
        root.querySelector('.rd').style.fill = diverged ? '#ff3300' : '';
    };
    const step = () => { if (Math.abs(w) < 50) { w = w - eta * 2 * w; trail.push(w); draw(); } };
    root.querySelector('input').addEventListener('input', e => {
        eta = parseFloat(e.target.value); root.querySelector('output').textContent = fmt(eta, 2);
    });
    root.addEventListener('click', e => {
        const a = e.target.dataset && e.target.dataset.a; if (!a) return;
        clearInterval(timer);
        if (a === 'step') step();
        if (a === 'reset') { w = W0; trail = [W0]; draw(); }
        if (a === 'run') { let n = 0; timer = setInterval(() => { step(); if (++n >= 20) clearInterval(timer); }, 140); }
    });
    draw();
};

/* --- 2. Tokenization ------------------------------------------------
   Illustrative Zerlegungen von Hand – die exakten Grenzen hängen vom
   Tokenizer des jeweiligen Modells ab. */
demos.tok = (root) => {
    const EX = [
        { n: 'Englisch', t: 'The nightly run failed because it timed out.',
          p: ['The', ' nightly', ' run', ' failed', ' because', ' it', ' timed', ' out', '.'] },
        { n: 'Deutsch', t: 'Der nächtliche Lauf ist fehlgeschlagen, weil das Zeitlimit überschritten wurde.',
          p: ['Der', ' n', 'ächt', 'liche', ' Lauf', ' ist', ' fehl', 'gesch', 'lagen', ',', ' weil', ' das', ' Zeit', 'limit', ' über', 'sch', 'ritten', ' wurde', '.'] },
        { n: 'Kompositum', t: 'Datenschutzgrundverordnung',
          p: ['Daten', 'schutz', 'grund', 'ver', 'ordnung'] },
        { n: 'strawberry', t: 'How many r are in strawberry?',
          p: ['How', ' many', ' r', ' are', ' in', ' str', 'aw', 'berry', '?'] },
        { n: 'Code', t: 'for (let i = 0; i < n; i++)',
          p: ['for', ' (', 'let', ' i', ' =', ' ', '0', ';', ' i', ' <', ' n', ';', ' i', '++', ')'] }
    ];
    let sel = 0;
    root.innerHTML = `<div class="row btns"></div>
      <p class="mono muted" style="margin-top:22px;font-size:24px" data-r="txt"></p>
      <div style="margin-top:14px;font-size:38px;line-height:1.7;min-height:200px" data-r="chips"></div>
      <div class="kpis"><div class="kpi"><div class="n" data-r="ch"></div><div class="l">Zeichen</div></div>
      <div class="kpi r"><div class="n" data-r="tk"></div><div class="l">Tokens</div></div>
      <div class="kpi"><div class="n" data-r="ra"></div><div class="l">Zeichen pro Token</div></div></div>
      <p class="note">Illustrative Zerlegung. Die exakten Grenzen bestimmt der Tokenizer des jeweiligen Modells; das Prinzip ist bei allen gleich.</p>`;
    const cls = ['', 'b', 'c', 'd'];
    const q = k => root.querySelector(`[data-r="${k}"]`);
    const draw = () => {
        const e = EX[sel];
        root.querySelector('.btns').innerHTML = EX.map((x, i) => `<button class="btn ${i === sel ? 'sel' : ''}" data-i="${i}">${x.n}</button>`).join('');
        q('txt').textContent = e.t;
        q('chips').innerHTML = e.p.map((s, i) => `<span class="tok ${cls[i % 4]}">${s.replace(/ /g, '·')}</span>`).join('');
        q('ch').textContent = e.t.length; q('tk').textContent = e.p.length;
        q('ra').textContent = fmt(e.t.length / e.p.length, 1);
    };
    root.addEventListener('click', e => { if (e.target.dataset.i) { sel = +e.target.dataset.i; draw(); } });
    draw();
};

/* --- 3. Attention ---------------------------------------------------
   Illustrative Gewichte eines Heads in einem Layer.
   Zeile = Token, das Information holt; Spalte = Quelle. */
demos.att = (root) => {
    const T = ['The', 'nightly', 'run', 'failed', 'because', 'it', 'timed', 'out'];
    const W = [
        [.88, .03, .03, .03, .03, 0, 0, 0], [.26, .66, .03, .03, .03, 0, 0, 0],
        [.08, .74, .34, .03, .03, 0, 0, 0], [.05, .18, .62, .22, .03, 0, 0, 0],
        [.04, .10, .28, .40, .22, 0, 0, 0], [.04, .14, .90, .20, .08, .22, 0, 0],
        [.04, .08, .30, .24, .06, .34, .20, 0], [.04, .06, .18, .14, .06, .22, .56, .18]];
    let sel = 5;
    root.innerHTML = `<div class="row btns"></div><div class="bars"></div>
      <p class="note">Illustrative Gewichte für einen Head in einem Layer. Reale Modelle haben viele Heads pro Layer; Attention-Gewichte zeigen, woher Information stammt. Sie erklären die Ausgabe nicht.</p>`;
    const draw = () => {
        root.querySelector('.btns').innerHTML = T.map((t, i) => `<button class="btn ${i === sel ? 'sel' : ''}" data-i="${i}">${t}</button>`).join('');
        const row = W[sel].slice(0, sel + 1), sum = row.reduce((a, c) => a + c, 0);
        root.querySelector('.bars').innerHTML = row.map((v, i) => {
            const p = v / sum * 100;
            return `<div class="bar"><span>${T[i]}</span><div class="trk"><i style="width:${p}%"></i></div><span class="v">${fmt(p, 0)} %</span></div>`;
        }).join('');
    };
    root.addEventListener('click', e => { if (e.target.dataset.i) { sel = +e.target.dataset.i; draw(); } });
    draw();
};

/* --- 4. Sampling und Temperature ------------------------------------
   Feste, illustrative Logits für den Kontext
   "The nightly run failed because it" – keine Messung an einem Modell. */
demos.temp = (root) => {
    const TOK = [' timed', ' was', ' ran', ' exceeded', ' hit', ' could'];
    const LOGIT = [8.4, 6.9, 6.3, 5.6, 5.1, 4.6], TAIL_L = -7.3, TAIL_N = 199994;
    let T = 1;
    root.innerHTML = `<div class="row"><label>Temperature T</label>
        <input type="range" min="0.1" max="2" step="0.05" value="1"><output>1,00</output>
        <button class="btn" data-a="draw">Token ziehen</button><span class="mono" data-r="out" style="font-size:24px"></span></div>
      <div class="bars"></div>
      <p class="note">Kontext: <span class="mono">„The nightly run failed because it“</span>. „Rest“: die übrigen ${TAIL_N.toLocaleString('de-DE')} Tokens des Vocabulary zusammen. Feste, illustrative Logits.</p>`;
    const dist = t => {
        const zs = LOGIT.map(z => z / t), zt = TAIL_L / t, m = Math.max(...zs, zt);
        const ex = zs.map(z => Math.exp(z - m)), et = Math.exp(zt - m) * TAIL_N;
        const tot = ex.reduce((a, c) => a + c, 0) + et;
        return { p: ex.map(e => e / tot), tail: et / tot };
    };
    const draw = () => {
        const d = dist(T);
        root.querySelector('.bars').innerHTML = TOK.map((tk, i) =>
            `<div class="bar"><span>${tk.replace(/ /g, '·')}</span><div class="trk"><i style="width:${Math.max(d.p[i] * 100, .3)}%"></i></div><span class="v">${fmt(d.p[i] * 100)} %</span></div>`).join('') +
            `<div class="bar tail"><span>Rest</span><div class="trk"><i style="width:${Math.max(d.tail * 100, .3)}%"></i></div><span class="v">${fmt(d.tail * 100)} %</span></div>`;
    };
    root.querySelector('input').addEventListener('input', e => {
        T = parseFloat(e.target.value); root.querySelector('output').textContent = fmt(T, 2); draw();
    });
    let drawn = [];
    root.addEventListener('click', e => {
        if (!e.target.dataset || e.target.dataset.a !== 'draw') return;
        const d = dist(T); let r = Math.random(), pick = '(Rest)';
        for (let i = 0; i < TOK.length; i++) { r -= d.p[i]; if (r <= 0) { pick = TOK[i].trim(); break; } }
        drawn.push(pick); if (drawn.length > 6) drawn.shift();
        root.querySelector('[data-r="out"]').textContent = '→ ' + drawn.join(' · ');
    });
    draw();
};

/* --- 5. Context Window füllt sich -----------------------------------
   Vereinfachtes Modell eines 200K-Fensters. Compaction bei ca. 80 %
   (so dokumentiert für die Copilot CLI; Schwellen variieren je Client). */
demos.ctx = (root) => {
    const CAP = 200, BASE = { sys: 14, ins: 4 };
    let msg = 0, tool = 0, sum = 0, turns = 0, compactions = 0;
    root.innerHTML = `<div class="row">
        <button class="btn" data-a="chat">+ Chat-Nachricht</button>
        <button class="btn" data-a="agent">+ Agent-Schritt (Tool Call)</button>
        <button class="btn" data-a="file">+ große Datei</button>
        <button class="btn" data-a="new">Neuer Chat</button></div>
      <div class="ctxbar" style="margin-top:22px"></div>
      <div class="kpis"><div class="kpi r"><div class="n" data-r="pc"></div><div class="l">Context belegt</div></div>
      <div class="kpi"><div class="n" data-r="tn"></div><div class="l">Nachrichten · Input-Tokens je Request</div></div>
      <div class="kpi"><div class="n" data-r="cp"></div><div class="l">Compactions (Details gehen verloren)</div></div></div>
      <p class="note">Vereinfachtes Modell eines 200K-Fensters. Der gesamte Inhalt wird bei <b>jedem</b> Request erneut als Input gesendet. Ab etwa 80 % fasst der Harness den Verlauf zusammen.</p>`;
    const q = k => root.querySelector(`[data-r="${k}"]`);
    const draw = () => {
        const used = BASE.sys + BASE.ins + sum + msg + tool;
        const seg = (c, v, l) => v > 0 ? `<span class="${c}" style="width:${v / CAP * 100}%">${v / CAP > .07 ? l : ''}</span>` : '';
        root.querySelector('.ctxbar').innerHTML = seg('s-sys', BASE.sys, 'System + Tools') + seg('s-ins', BASE.ins, '') +
            seg('s-sum', sum, 'Summary') + seg('s-msg', msg, 'Nachrichten') + seg('s-tool', tool, 'Tool Results');
        q('pc').textContent = fmt(used / CAP * 100, 0) + ' %';
        q('tn').textContent = turns + ' · ' + fmt(used, 0) + 'K';
        q('cp').textContent = compactions;
    };
    const add = (m, t) => {
        msg += m; tool += t; turns++;
        if (BASE.sys + BASE.ins + sum + msg + tool > CAP * .8) {
            sum = Math.round((sum + msg + tool) * .12); msg = 0; tool = 0; compactions++;
        }
        draw();
    };
    root.addEventListener('click', e => {
        const a = e.target.dataset && e.target.dataset.a; if (!a) return;
        if (a === 'chat') add(3, 0);
        if (a === 'agent') add(2, 9);
        if (a === 'file') add(1, 30);
        if (a === 'new') { msg = tool = sum = turns = compactions = 0; draw(); }
    });
    draw();
};

/* --- 6. Kostenrechner -----------------------------------------------
   Preise in US$ je 1 Mio. Tokens laut GitHub Docs „Models and pricing
   for GitHub Copilot“, abgerufen am 10.11.2026. 1 AI Credit = 0,01 US$. */
demos.cost = (root) => {
    const M = [
        { n: 'Claude Haiku 5.5 · Lightweight', i: 0.10, c: 0.01, o: 0.50 },
        { n: 'GPT-6.1 Terra · Versatile', i: 1.00, c: 0.05, o: 5.00 },
        { n: 'Claude Sonnet 5.5 · Versatile', i: 2.00, c: 0.10, o: 10.00 },
        { n: 'GPT-6.1 Sol · Powerful', i: 2.00, c: 0.10, o: 10.00 },
        { n: 'Claude Opus 5.5 · Powerful', i: 4.00, c: 0.20, o: 20.00 },
        { n: 'Claude Fable 5.2 · Powerful', i: 8.00, c: 0.20, o: 40.00 }
    ];
    const POOL = 3900;
    root.innerHTML = `<div class="row">
        <label>Modell</label><select class="sel">${M.map((m, i) => `<option value="${i}" ${i === 2 ? 'selected' : ''}>${m.n}</option>`).join('')}</select>
        <label style="margin-left:14px"><input type="checkbox" checked data-k="cache" style="width:24px;height:24px;vertical-align:-4px"> Prompt Caching</label></div>
      <div class="row" style="margin-top:20px"><label style="width:250px">Start-Context</label><input type="range" data-k="base" min="5" max="150" step="5" value="30"><output data-o="base"></output></div>
      <div class="row" style="margin-top:14px"><label style="width:250px">Schritte</label><input type="range" data-k="steps" min="1" max="60" step="1" value="20"><output data-o="steps"></output></div>
      <div class="row" style="margin-top:14px"><label style="width:250px">Zuwachs je Schritt</label><input type="range" data-k="grow" min="0.5" max="12" step="0.5" value="4"><output data-o="grow"></output></div>
      <div class="row" style="margin-top:14px"><label style="width:250px">Output je Schritt</label><input type="range" data-k="out" min="0.2" max="6" step="0.2" value="1"><output data-o="out"></output></div>
      <div class="kpis"><div class="kpi"><div class="n" data-r="tin"></div><div class="l">Input-Tokens gesamt</div></div>
      <div class="kpi r"><div class="n" data-r="cr"></div><div class="l">AI Credits</div></div>
      <div class="kpi"><div class="n" data-r="pc"></div><div class="l">vom Monatskontingent (${POOL.toLocaleString('de-DE')})</div></div></div>
      <p class="note">Listenpreise GitHub Docs, Stand 10.11.2026. Vereinfachung: Zuwachs = neue Nachrichten + Tool Results; Cache-Write-Aufschlag und Compaction nicht modelliert.</p>`;
    const g = k => root.querySelector(`[data-k="${k}"]`);
    const calc = () => {
        const m = M[+root.querySelector('select').value], cache = g('cache').checked;
        const base = +g('base').value, steps = +g('steps').value, grow = +g('grow').value, out = +g('out').value;
        let tin = 0, usd = 0;
        for (let s = 0; s < steps; s++) {
            const prefix = s === 0 ? 0 : base + (s - 1) * (grow + out);   // schon einmal verarbeitet
            const fresh = s === 0 ? base : grow + out;                    // neu in diesem Request
            tin += prefix + fresh;
            usd += (prefix * (cache ? m.c : m.i) + fresh * m.i + out * m.o) / 1000;
        }
        const cr = usd * 100;
        root.querySelector('[data-o="base"]').textContent = fmt(base, 0) + 'K';
        root.querySelector('[data-o="steps"]').textContent = steps;
        root.querySelector('[data-o="grow"]').textContent = fmt(grow, 1) + 'K';
        root.querySelector('[data-o="out"]').textContent = fmt(out, 1) + 'K';
        root.querySelector('[data-r="tin"]').textContent = tin >= 1000 ? fmt(tin / 1000, 2) + ' M' : fmt(tin, 0) + 'K';
        root.querySelector('[data-r="cr"]').textContent = fmt(cr, cr < 10 ? 1 : 0);
        root.querySelector('[data-r="pc"]').textContent = fmt(cr / POOL * 100, 1) + ' %';
    };
    root.addEventListener('input', calc);
    calc();
};

/* ===========================================
   START
   =========================================== */
document.querySelectorAll('[data-demo]').forEach(el => demos[el.dataset.demo] && demos[el.dataset.demo](el));
/* Slider nach dem Loslassen entfokussieren, damit die Pfeiltasten wieder blättern */
document.addEventListener('change', e => { if (e.target.matches('input[type=range], select')) e.target.blur(); });
document.addEventListener('click', e => { if (e.target.matches('.btn')) e.target.blur(); });

const deck = new SlidePresentation();

/* Edit-Schalter: Hotzone oben links, 400 ms Toleranz (kein CSS-Sibling-Hover) */
(() => {
    const hotzone = document.querySelector('.edit-hotzone'), btn = document.getElementById('editToggle');
    let hide = null;
    const show = () => { clearTimeout(hide); btn.classList.add('show'); };
    const later = () => { hide = setTimeout(() => { if (!deck.editing) btn.classList.remove('show'); }, 400); };
    hotzone.addEventListener('mouseenter', show); hotzone.addEventListener('mouseleave', later);
    btn.addEventListener('mouseenter', show); btn.addEventListener('mouseleave', later);
    btn.addEventListener('click', () => deck.toggleEdit());
    hotzone.addEventListener('click', () => deck.toggleEdit());
})();
