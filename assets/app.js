/* DMS Developer Network prototype — router, views and mock interactions.
   Shared by all three UI options; each option only supplies its own shell markup and theme. */
(function () {
  'use strict';

  const D = window.DDN;

  function store(k, v) {
    try {
      if (v === undefined) return localStorage.getItem(k);
      localStorage.setItem(k, v);
    } catch (e) { /* storage blocked: the prototype still works, it just forgets the language */ }
    return null;
  }

  let lang = store('ddn-lang') === 'ar' ? 'ar' : 'en';
  const opt = document.body.dataset.option || '1';
  const themeKey = 'ddn-theme-' + opt;
  let theme = store(themeKey) || document.documentElement.dataset.theme || 'dark';
  let route = 'home';

  const B = (en, ar) => (lang === 'ar' ? ar : en);
  const L = o => (o && typeof o === 'object' ? (o[lang] !== undefined ? o[lang] : o.en) : o);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (s, r) => (r || document).querySelector(s);
  const fmt = n => Number(n).toLocaleString('en-US');
  const egp = n => `${fmt(Math.round(n))} ${B('EGP', 'ج.م')}`;

  const ICONS = {
    home: 'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
    book: 'M5 3h13v18H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM8 7h7M8 11h7',
    code: 'M8 7l-5 5 5 5M16 7l5 5-5 5M13 5l-2 14',
    cpu: 'M7 7h10v10H7zM10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3',
    store: 'M3 9l2-5h14l2 5M4 9v11h16V9M3 9h18M9 20v-6h6v6',
    calc: 'M6 3h12v18H6zM9 7h6M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01',
    cap: 'M2 9l10-5 10 5-10 5zM6 11v5c3 3 9 3 12 0v-5',
    terminal: 'M3 5h18v14H3zM7 10l3 2-3 2M12 15h5',
    chat: 'M4 5h16v11H9l-5 4z',
    grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
    key: 'M8 15a4 4 0 1 1 3.9-5H21v3h-2v3h-3v-3h-4.1A4 4 0 0 1 8 15z',
    star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
    sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
    moon: 'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z'
  };
  const ico = n => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[n]}"/></svg>`;

  /* ---------- state (mock, in memory) ---------- */
  const S = {
    docs: { id: 'auth' },
    api: { sys: 'erp', ep: 'opc-read', lang: 'curl', res: null },
    ai: { model: 'pdm', out: null },
    mk: { q: '', type: 'all', domain: 'all', tag: null, installed: new Set(['l1']) },
    rev: { price: 1200, units: 25, tier: 'certified' },
    quiz: { step: -1, scores: {} },
    term: { q: 'oee', ran: false, mode: 'table' },
    forum: { open: null },
    dash: {
      points: 1840, shown: null,
      keys: [
        { id: 'k1', name: 'Line 3 OEE report', env: 'Sandbox', key: 'dms_sbx_4f9a1c77e2b04d18a6c3', created: '2026-10-12', active: true },
        { id: 'k2', name: 'Lab connector tests', env: 'Sandbox', key: 'dms_sbx_b81e55a09cf7423d91aa', created: '2026-09-28', active: true }
      ],
      tickets: [
        { id: 'T-1042', subject: { en: 'Sandbox HL7 endpoint returns AE for ORU^R01', ar: 'نقطة HL7 التجريبية تعيد AE لرسائل ORU^R01' }, status: 'open' },
        { id: 'T-1017', subject: { en: 'Request production key for Cairo plant', ar: 'طلب مفتاح إنتاج لمصنع القاهرة' }, status: 'answered' }
      ]
    }
  };

  /* ---------- small builders ---------- */
  const pillars = () => D.nav.filter(g => g.id);
  const pillarOf = id => pillars().find(p => p.items.some(i => i.id === id));
  const tabsFor = p => (opt === '2' && p && p.items.length > 1
    ? `<nav class="ptabs">${p.items.map(i => `<a class="sub${i.id === route ? ' active' : ''}" href="#/${i.id}"${i.id === route ? ' aria-current="page"' : ''}>${ico(i.icon)}${L(i)}</a>`).join('')}</nav>` : '');
  const head = (title, sub, actions) => {
    const p = pillarOf(route);
    return `<header class="page-head"><div><div class="crumb"><i class="dia"></i>${p ? `${L(p.group)}<span>/</span>` : ''}${L(allItems().find(i => i.id === route))}</div><h1>${title}</h1>${sub ? `<p class="muted">${sub}</p>` : ''}</div>${actions ? `<div class="row">${actions}</div>` : ''}</header>${tabsFor(p)}`;
  };
  const badge = (t, kind) => `<span class="badge ${kind || ''}">${t}</span>`;
  const code = (src, label) => `<div class="code" dir="ltr"><div class="code-bar"><span>${label || ''}</span><button class="link" data-act="copy">${B('Copy', 'نسخ')}</button></div><pre><code>${esc(src)}</code></pre></div>`;
  const tabs = (act, items, cur) => `<div class="seg" role="tablist">${items.map(([v, l]) => `<button role="tab" aria-selected="${v === cur}" class="${v === cur ? 'on' : ''}" data-act="${act}" data-v="${v}">${l}</button>`).join('')}</div>`;
  const fld = (label, name, extra) => `<label class="field"><span>${label}</span>${extra || `<input class="input" name="${name}" required>`}</label>`;
  const allItems = () => D.nav.flatMap(g => g.items);

  function toast(msg) {
    let el = $('#toast');
    if (!el) { el = document.createElement('div'); el.id = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
    el.textContent = msg; el.classList.add('show');
    clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('show'), 2200);
  }

  function openForm(title, fields, onSubmit) {
    let dlg = $('#dlg');
    if (!dlg) { dlg = document.createElement('dialog'); dlg.id = 'dlg'; document.body.appendChild(dlg); }
    dlg.innerHTML = `<form method="dialog"><h3>${title}</h3>${fields}<div class="row end"><button class="btn" value="cancel" formnovalidate>${B('Cancel', 'إلغاء')}</button><button class="btn primary" value="ok">${B('Submit', 'إرسال')}</button></div></form>`;
    dlg.returnValue = '';
    dlg.onclose = () => {
      if (dlg.returnValue !== 'ok') return;
      onSubmit(Object.fromEntries(new FormData($('form', dlg))));
      render();
    };
    dlg.showModal();
  }

  /* ---------- shared sections ---------- */
  const eventsList = () => `<ul class="list">${D.events.map(e => `<li><div><b>${L(e.title)}</b><div class="muted small">${L(e.kind)} · <span dir="ltr">${e.date}</span></div></div><button class="btn sm" data-act="rsvp">${B('Register', 'سجّل')}</button></li>`).join('')}</ul>`;
  const leaderboard = () => `<ol class="list rank">${D.leaderboard.map(p => `<li><div><b>${esc(p.name)}</b><div class="muted small">${L(p.tier)}</div></div><span class="pts">${fmt(p.pts)}</span></li>`).join('')}</ol>`;
  const activityList = () => `<ul class="list">${D.activity.map(a => `<li><span>${L(a.t)}</span><span class="muted small nowrap">${L(a.when)}</span></li>`).join('')}</ul>`;
  const trending = () => `<ul class="list">${D.questions.slice(0, 3).map(q => `<li><a href="#/forum" data-act="openQ" data-id="${q.id}"><b>${esc(L(q.title))}</b><div class="muted small">${q.votes} ${B('votes', 'صوت')} · ${q.answers.length} ${B('answers', 'إجابة')}</div></a></li>`).join('')}</ul>`;
  const section = (title, body, more) => `<section class="card"><div class="row between card-head"><h2>${title}</h2>${more || ''}</div>${body}</section>`;
  const more = (id, label) => `<a class="link" href="#/${id}">${label || B('View all', 'عرض الكل')}</a>`;

  const price = x => (x.price ? egp(x.price) : B('Free', 'مجاني'));
  function listingCard(x) {
    const on = S.mk.installed.has(x.id);
    return `<article class="card listing"><div class="row between">${badge(L(D.types[x.type]), x.type)}<span class="muted small">${x.domain.toUpperCase()}</span></div>
      <h3>${esc(L(x.name))}</h3><p class="muted">${esc(L(x.desc))}</p>
      <div class="chips">${x.tags.map(t => `<button class="chip${S.mk.tag === t ? ' on' : ''}" data-act="mkTag" data-tag="${esc(t)}">#${esc(t)}</button>`).join('')}</div>
      <div class="row between listing-foot"><div><b>${price(x)}</b><div class="muted small">${esc(x.vendor)} · ★ ${x.rating} · ${fmt(x.installs)} ${B('installs', 'تثبيت')}</div></div>
      ${x.pending ? badge(B('Pending review', 'قيد المراجعة'), 'warn') : `<button class="btn sm ${on ? '' : 'primary'}" data-act="install" data-id="${x.id}">${on ? B('Installed ✓', 'مثبّت ✓') : B('Install', 'تثبيت')}</button>`}</div></article>`;
  }

  /* ---------- views ---------- */
  const VIEWS = {};

  const listingRows = () => `<ul class="list rows">${D.listings.slice(0, 4).map(x => {
    const on = S.mk.installed.has(x.id);
    return `<li><div class="grow"><b>${esc(L(x.name))}</b><div class="muted small">${esc(x.vendor)} · ${L(D.types[x.type])} · ${x.domain.toUpperCase()}</div></div><span class="price">${price(x)}</span><button class="btn sm ${on ? '' : 'primary'}" data-act="install" data-id="${x.id}">${on ? B('Installed ✓', 'مثبّت ✓') : B('Install', 'تثبيت')}</button></li>`;
  }).join('')}</ul>`;

  function home1() {
    const steps = homeSteps();
    return `<section class="hero"><div class="hero-copy">
        <a class="status" href="#/api"><i class="dot"></i>${L(D.ui.sandbox)}<span>v4.2</span></a>
        <h1>${B('The developer platform for DMS <em>Industrial ERP</em> and <em>HMS</em>', 'منصة المطورين لأنظمة DMS <em>الصناعية</em> و<em>الطبية</em>')}</h1>
        <p class="lead">${B('Integrate in hours, not weeks. Test in a sandbox, publish to the marketplace, get certified and earn from every install.', 'اربط في ساعات لا أسابيع. اختبر في بيئة تجريبية، انشر في المتجر، احصل على الاعتماد واربح من كل تثبيت.')}</p>
        <div class="row"><a class="btn primary lg" href="#/dashboard">${ico('key')}${L(D.ui.getKeys)}</a><a class="btn lg" href="#/docs">${B('Read the docs', 'اقرأ التوثيق')}<span class="arr">→</span></a></div></div>
      ${win()}</section>
      <dl class="cells facts">${D.stats.map(s => `<div><dt>${s.v}</dt><dd>${L(s)}</dd></div>`).join('')}</dl>
      <section class="cells pillars">${pillars().map(p => `<div data-p="${p.id}"><div class="row"><i class="dia"></i><h3>${L(p.group)}</h3></div><p class="muted">${L(p.desc)}</p>
        <ul>${p.items.map(i => `<li><a href="#/${i.id}">${ico(i.icon)}<span>${L(i)}</span><span class="arr">→</span></a></li>`).join('')}</ul></div>`).join('')}</section>
      <h2 class="section-title">${B('Start in three steps', 'ابدأ في ثلاث خطوات')}</h2>
      <ol class="cells steps3">${steps.map((s, i) => `<li><a href="#/${s[0]}"><span class="num">0${i + 1}</span><b>${s[1]}</b><span class="muted">${s[2]}</span></a></li>`).join('')}</ol>
      <div class="split wide-left">${section(B('Featured on the marketplace', 'مميز في المتجر'), listingRows(), more('market'))}
        <div class="stack">${section(B('Upcoming events', 'الفعاليات القادمة'), eventsList())}${section(B('Trending questions', 'أسئلة رائجة'), trending(), more('forum'))}</div></div>`;
  }

  /* home building blocks shared by the three options */
  const homeLead = () => B('Integrate in hours, not weeks. Test in a sandbox, publish to the marketplace, get certified and earn from every install.', 'اربط في ساعات لا أسابيع. اختبر في بيئة تجريبية، انشر في المتجر، احصل على الاعتماد واربح من كل تثبيت.');
  const homeSteps = () => [
    ['dashboard', B('Create a sandbox key', 'أنشئ مفتاحاً تجريبياً'), B('Free, instant, limited to synthetic data.', 'مجاني وفوري ومحصور في بيانات اصطناعية.')],
    ['api', B('Call your first endpoint', 'استدعِ أول نقطة ربط'), B('Generate code in C#, Python, JS or cURL.', 'ولّد الكود بـ C# أو Python أو JS أو cURL.')],
    ['market', B('Publish and get paid', 'انشر واربح'), B('List a report or module on the marketplace.', 'اعرض تقريراً أو إضافة في المتجر.')]
  ];
  const win = () => `<div class="window" dir="ltr"><div class="window-bar"><span class="method GET">GET</span><code>/erp/v1/production/oee</code><span class="badge ok">200 · 84 ms</span></div>
    <pre><code>${esc(`curl "${D.base}/erp/v1/production/oee?line=L3" \\\n  -H "Authorization: Bearer $DMS_API_KEY"`)}</code></pre><div class="window-sep">response.json</div><pre><code>${esc(JSON.stringify(D.endpoints[2].res, null, 2))}</code></pre></div>`;
  const facts = () => `<dl class="cells facts">${D.stats.map(s => `<div><dt>${s.v}</dt><dd>${L(s)}</dd></div>`).join('')}</dl>`;
  const homeCtas = () => `<a class="btn primary lg" href="#/dashboard">${ico('key')}${L(D.ui.getKeys)}</a><a class="btn lg" href="#/docs">${B('Read the docs', 'اقرأ التوثيق')}<span class="arr">→</span></a>`;

  function home2() {
    return `<section class="bento">
        <div class="b-hero"><a class="status" href="#/api"><i class="dot"></i>${L(D.ui.sandbox)}<span>v4.2</span></a>
          <h1>${B('Ship integrations for DMS <em>faster</em>', 'أنجز تكاملات DMS <em>أسرع</em>')}</h1><p class="lead">${homeLead()}</p>
          <div class="row">${homeCtas()}</div></div>
        <div class="b-code">${win()}</div>
        ${pillars().map(p => `<div class="b-pillar" data-p="${p.id}"><div class="row"><i class="dia"></i><h3>${L(p.group)}</h3></div><p class="muted">${L(p.desc)}</p>
          <ul>${p.items.map(i => `<li><a href="#/${i.id}">${ico(i.icon)}<span>${L(i)}</span><span class="arr">→</span></a></li>`).join('')}</ul></div>`).join('')}
        <dl class="b-stats">${D.stats.map(s => `<div><dt>${s.v}</dt><dd>${L(s)}</dd></div>`).join('')}</dl>
      </section>
      <h2 class="section-title">${B('Start in three steps', 'ابدأ في ثلاث خطوات')}</h2>
      <ol class="cells steps3">${homeSteps().map((s, i) => `<li><a href="#/${s[0]}"><span class="num">0${i + 1}</span><b>${s[1]}</b><span class="muted">${s[2]}</span></a></li>`).join('')}</ol>
      <div class="split wide-left">${section(B('Featured on the marketplace', 'مميز في المتجر'), listingRows(), more('market'))}
        <div class="stack">${section(B('Upcoming events', 'الفعاليات القادمة'), eventsList())}${section(B('Trending questions', 'أسئلة رائجة'), trending(), more('forum'))}</div></div>`;
  }

  function home3() {
    return `<section class="hero3"><a class="status" href="#/api"><i class="dot"></i>${L(D.ui.sandbox)}<span>v4.2</span></a>
        <h1>${B('Everything you need to build on <em>DMS</em>', 'كل ما تحتاجه للبناء على <em>DMS</em>')}</h1><p class="lead">${homeLead()}</p>
        <form class="ask" data-form="search" role="search"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4"/></svg>
          <input type="search" name="q" placeholder="${B('Search reports, modules and add-ons', 'ابحث في التقارير والإضافات')}" aria-label="${B('Search', 'بحث')}"><button class="btn primary">${B('Search', 'ابحث')}</button></form>
        <div class="row">${homeCtas()}</div></section>
      <section class="tiles">${pillars().map(p => `<div class="tile" data-p="${p.id}"><i class="dia"></i><h3>${L(p.group)}</h3><p>${L(p.desc)}</p>
        <div class="chips">${p.items.map(i => `<a class="chip" href="#/${i.id}">${ico(i.icon)}${L(i)}</a>`).join('')}</div></div>`).join('')}</section>
      ${facts()}
      <h2 class="section-title center">${B('Start in three steps', 'ابدأ في ثلاث خطوات')}</h2>
      <ol class="cells steps3">${homeSteps().map((s, i) => `<li><a href="#/${s[0]}"><span class="num">${i + 1}</span><b>${s[1]}</b><span class="muted">${s[2]}</span></a></li>`).join('')}</ol>
      <div class="row between"><h2 class="section-title">${B('Featured on the marketplace', 'مميز في المتجر')}</h2>${more('market')}</div>
      <div class="grid">${D.listings.slice(0, 3).map(listingCard).join('')}</div>
      <div class="split">${section(B('Upcoming events', 'الفعاليات القادمة'), eventsList())}${section(B('Trending questions', 'أسئلة رائجة'), trending(), more('forum'))}</div>`;
  }

  VIEWS.home = () => ({ 2: home2, 3: home3 }[opt] || home1)();

  VIEWS.docs = () => {
    const cur = D.docs.find(d => d.id === S.docs.id) || D.docs[0];
    const groups = [...new Set(D.docs.map(d => d.group.en))];
    const tree = groups.map(g => {
      const items = D.docs.filter(d => d.group.en === g);
      return `<div class="tree-group"><div class="tree-title">${L(items[0].group)}</div>${items.map(d => `<button class="tree-link${d.id === cur.id ? ' active' : ''}" data-act="doc" data-id="${d.id}">${L(d.title)}</button>`).join('')}</div>`;
    }).join('');
    return head(B('API & developer documentation', 'توثيق الـ API والمطورين'), B('REST APIs, webhooks, database schemas, integration guides and SDKs.', 'واجهات REST والـ Webhooks وهياكل البيانات وأدلة الربط ومكتبات الأكواد.'))
      + `<div class="doc-layout"><nav class="card tree" aria-label="${B('Documentation', 'التوثيق')}">${tree}</nav>
      <article class="card prose"><div class="muted small">${L(cur.group)}</div><h2>${L(cur.title)}</h2>${cur.body(B, code)}
      <div class="row between doc-foot"><span class="muted small">${B('Was this page helpful?', 'هل كانت الصفحة مفيدة؟')}</span><div class="row"><button class="btn sm" data-act="helpful">${B('Yes', 'نعم')}</button><button class="btn sm" data-act="helpful">${B('No', 'لا')}</button></div></div></article></div>`;
  };

  function genCode(ep, l) {
    const url = D.base + ep.path;
    const json = ep.body ? JSON.stringify(ep.body, null, 2) : null;
    const indent = (s, n) => s.split('\n').join('\n' + ' '.repeat(n));
    if (l === 'python') {
      return `import os\nimport requests\n\nresp = requests.${ep.method.toLowerCase()}(\n    "${url}",\n    headers={"Authorization": f"Bearer {os.environ['DMS_API_KEY']}"},${json ? `\n    json=${indent(json, 4)},` : ''}\n    timeout=10,\n)\nresp.raise_for_status()\nprint(resp.json())`;
    }
    if (l === 'js') {
      return `const res = await fetch("${url}", {\n  method: "${ep.method}",\n  headers: {\n    Authorization: \`Bearer \${process.env.DMS_API_KEY}\`,${json ? '\n    "Content-Type": "application/json",' : ''}\n  },${json ? `\n  body: JSON.stringify(${indent(json, 2)}),` : ''}\n});\nif (!res.ok) throw new Error(\`DMS API \${res.status}\`);\nconsole.log(await res.json());`;
    }
    if (l === 'csharp') {
      const call = json
        ? `var body = new StringContent("""\n    ${indent(json, 4)}\n    """, Encoding.UTF8, "application/json");\nvar res = await http.PostAsync("${url}", body);`
        : `var res = await http.GetAsync("${url}");`;
      return `using var http = new HttpClient();\nhttp.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(\n    "Bearer", Environment.GetEnvironmentVariable("DMS_API_KEY"));\n\n${call}\nres.EnsureSuccessStatusCode();\nConsole.WriteLine(await res.Content.ReadAsStringAsync());`;
    }
    return `curl -X ${ep.method} "${url}" \\\n  -H "Authorization: Bearer $DMS_API_KEY"` + (json ? ` \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(ep.body)}'` : '');
  }

  VIEWS.api = () => {
    const a = S.api;
    const eps = D.endpoints.filter(e => e.sys === a.sys);
    const ep = eps.find(e => e.id === a.ep) || eps[0];
    return head(B('Interactive API & SDK hub', 'مركز الـ API والـ SDK التفاعلي'), B('Pick an endpoint, generate client code and try it against the simulator.', 'اختر نقطة ربط وولّد الكود وجرّبها على المحاكي.'))
      + tabs('apiSys', Object.keys(D.systems).map(k => [k, L(D.systems[k])]), a.sys)
      + `<div class="split wide-right api"><div class="card ep-list">${eps.map(e => `<button class="ep${e.id === ep.id ? ' active' : ''}" data-act="apiEp" data-id="${e.id}">
          <span class="row"><span class="method ${e.method}">${e.method}</span>${badge(e.proto)}</span><code dir="ltr">${esc(e.path)}</code><span class="muted small">${L(e.desc)}</span></button>`).join('')}</div>
        <div class="stack"><div class="card"><div class="row between card-head"><h2>${B('Code generator', 'مولّد الأكواد')}</h2>${tabs('apiLang', [['curl', 'cURL'], ['python', 'Python'], ['js', 'JavaScript'], ['csharp', 'C#']], a.lang)}</div>
          ${code(genCode(ep, a.lang), `${ep.method} ${ep.path.split('?')[0]}`)}
          <div class="row"><button class="btn primary" data-act="apiSend">${B('Send to simulator', 'أرسل للمحاكي')}</button><span class="muted small">${B('Simulated response, no real system is called.', 'استجابة محاكاة، لا يتم الاتصال بأي نظام حقيقي.')}</span></div></div>
          ${a.res ? `<div class="card"><div class="row between card-head"><h2>${B('Response', 'الاستجابة')}</h2><span class="row">${badge('200 OK', 'ok')}<span class="muted small" dir="ltr">${a.res.ms} ms</span></span></div>${code(JSON.stringify(ep.res, null, 2), 'application/json')}</div>` : ''}</div></div>`;
  };

  VIEWS.ai = () => {
    const m = D.models.find(x => x.id === S.ai.model);
    const out = S.ai.out;
    return head(B('AI add-ons & model playground', 'إضافات الذكاء الاصطناعي وساحة التجربة'), B('Test pretrained models against sandbox datasets before you ship an add-on.', 'اختبر النماذج الجاهزة على بيانات تجريبية قبل نشر إضافتك.'), `<a class="btn" href="#/market">${B('Browse AI add-ons', 'تصفح إضافات AI')}</a>`)
      + `<div class="grid models">${D.models.map(x => `<button class="card model${x.id === m.id ? ' active' : ''}" data-act="aiModel" data-id="${x.id}"><span class="row between">${badge(x.domain.toUpperCase())}<span class="muted small">${x.runtime}</span></span><h3>${L(x.name)}</h3><p class="muted">${L(x.desc)}</p></button>`).join('')}</div>
      <div class="split"><div class="card"><div class="row between card-head"><h2>${B('Input', 'المدخلات')}</h2><span class="muted small">JSON</span></div>
        <textarea class="input mono" id="ai-in" dir="ltr" rows="9" spellcheck="false" aria-label="${B('Model input', 'مدخلات النموذج')}">${esc(JSON.stringify(m.input, null, 2))}</textarea>
        <div class="row"><button class="btn primary" data-act="aiRun">${B('Run model', 'شغّل النموذج')}</button><span class="muted small">${B('Sandboxed · 20 runs/hour', 'بيئة معزولة · 20 تشغيل/ساعة')}</span></div></div>
      <div class="card"><div class="row between card-head"><h2>${B('Output', 'المخرجات')}</h2>${out ? `<span class="muted small" dir="ltr">${out.ms} ms</span>` : ''}</div>
        ${out ? (out.error ? `<p class="error">${B('Input is not valid JSON.', 'المدخلات ليست JSON صالحاً.')}</p>` : `<div class="conf"><div class="row between"><span>${B('Confidence', 'درجة الثقة')}</span><b dir="ltr">${(out.conf * 100).toFixed(1)}%</b></div><div class="progress"><i style="width:${out.conf * 100}%"></i></div></div>${code(JSON.stringify(Object.assign({ model: m.id, confidence: out.conf }, m.output), null, 2), 'application/json')}`)
        : `<p class="muted empty">${B('Run the model to see a JSON response with a confidence score.', 'شغّل النموذج لترى استجابة JSON مع درجة الثقة.')}</p>`}</div></div>`;
  };

  function mkFiltered() {
    const f = S.mk, q = f.q.trim().toLowerCase();
    return D.listings.filter(x => (f.type === 'all' || x.type === f.type) && (f.domain === 'all' || x.domain === f.domain) && (!f.tag || x.tags.includes(f.tag))
      && (!q || [x.name.en, x.name.ar, x.desc.en, x.desc.ar, x.vendor, x.tags.join(' ')].join(' ').toLowerCase().includes(q)));
  }
  const mkGrid = () => {
    const r = mkFiltered();
    return r.length ? r.map(listingCard).join('') : `<p class="muted empty">${B('Nothing matches these filters.', 'لا توجد نتائج لهذه الفلاتر.')}</p>`;
  };
  VIEWS.market = () => {
    const f = S.mk;
    return head(B('Marketplace', 'متجر الحلول والتقارير'), B('Reports, modules and AI add-ons built by DMS developers.', 'تقارير وإضافات وحلول ذكاء اصطناعي من مطوري DMS.'), `<button class="btn primary" data-act="publish">${B('Publish a listing', 'انشر منتجك')}</button>`)
      + `<div class="card filters"><input class="input" type="search" data-in="mkQ" value="${esc(f.q)}" placeholder="${B('Search by name, vendor or tag', 'ابحث بالاسم أو المطور أو الوسم')}" aria-label="${B('Search marketplace', 'بحث في المتجر')}">
        ${tabs('mkType', [['all', B('All', 'الكل')]].concat(Object.keys(D.types).map(k => [k, L(D.types[k])])), f.type)}
        ${tabs('mkDomain', [['all', B('ERP + HMS', 'ERP + HMS')], ['erp', 'ERP'], ['hms', 'HMS']], f.domain)}
        ${f.tag ? `<button class="chip on" data-act="mkTag" data-tag="${esc(f.tag)}">#${esc(f.tag)} ✕</button>` : ''}</div>
      <div class="grid" id="mk-grid">${mkGrid()}</div>`;
  };

  function revOut() {
    const r = S.rev, gross = r.price * r.units;
    const cur = D.tiers.find(t => t.id === r.tier);
    const net = gross * cur.share / 100;
    return `<div class="cells kpis three"><div class="kpi"><span class="muted small">${B('Gross sales / month', 'إجمالي المبيعات / شهر')}</span><b>${egp(gross)}</b></div>
      <div class="kpi"><span class="muted small">${B('Platform fee', 'عمولة المنصة')} (${100 - cur.share}%)</span><b>${egp(gross - net)}</b></div>
      <div class="kpi accent"><span class="small">${B('You earn / month', 'صافي ربحك / شهر')}</span><b>${egp(net)}</b><span class="small">${egp(net * 12)} ${B('per year', 'سنوياً')}</span></div></div>
      <div class="card"><div class="card-head"><h2>${B('Earnings by partner tier', 'الأرباح حسب مستوى الشراكة')}</h2></div>
      ${D.tiers.map(t => `<div class="bar-row${t.id === r.tier ? ' on' : ''}"><span>${L(t.name)} · ${t.share}%</span><div class="bar"><i style="width:${t.share}%"></i></div><b>${egp(gross * t.share / 100)}</b></div>`).join('')}</div>`;
  }
  VIEWS.revenue = () => {
    const r = S.rev;
    return head(B('Revenue share & fee calculator', 'حاسبة الأرباح والعمولات'), B('Illustrative percentages — final tiers come from the partner agreement.', 'النسب توضيحية — النسب النهائية تحددها اتفاقية الشركاء.'))
      + `<div class="split wide-right"><div class="card stack">
        <label class="field"><span>${B('Listing price', 'سعر المنتج')} <b id="rev-price">${egp(r.price)}</b></span><input type="range" min="0" max="20000" step="100" value="${r.price}" data-in="revPrice"></label>
        <label class="field"><span>${B('Sales per month', 'المبيعات شهرياً')} <b id="rev-units">${r.units}</b></span><input type="range" min="1" max="200" value="${r.units}" data-in="revUnits"></label>
        <div class="field"><span>${B('Partner tier', 'مستوى الشراكة')}</span>${tabs('revTier', D.tiers.map(t => [t.id, L(t.name)]), r.tier)}</div></div>
      <div class="stack" id="rev-out">${revOut()}</div></div>`;
  };

  VIEWS.academy = () => {
    const z = S.quiz;
    let quiz;
    if (z.step < 0) {
      quiz = `<p class="muted">${B('Five quick questions to find the track that fits you.', 'خمسة أسئلة سريعة لمعرفة المسار الأنسب لك.')}</p><button class="btn primary" data-act="quizStart">${B('Start the quiz', 'ابدأ الاختبار')}</button>`;
    } else if (z.step < D.quiz.length) {
      const q = D.quiz[z.step];
      quiz = `<div class="muted small">${B('Question', 'سؤال')} ${z.step + 1} / ${D.quiz.length}</div><div class="progress"><i style="width:${z.step / D.quiz.length * 100}%"></i></div>
        <h3>${L(q.q)}</h3><div class="options">${q.a.map((o, i) => `<button class="option" data-act="quizPick" data-i="${i}">${L(o.t)}</button>`).join('')}</div>`;
    } else {
      const ranked = D.tracks.map(t => [t, z.scores[t.id] || 0]).sort((x, y) => y[1] - x[1]);
      const best = ranked[0][0], max = Math.max(ranked[0][1], 1);
      quiz = `<p>${B('Recommended track', 'المسار الموصى به')}</p><h3>${best.id} · ${L(best.name)}</h3>
        ${ranked.map(([t, s]) => `<div class="bar-row${t === best ? ' on' : ''}"><span>${t.id}</span><div class="bar"><i style="width:${s / max * 100}%"></i></div><b>${s}</b></div>`).join('')}
        <p class="muted small">${B('Next step:', 'الخطوة التالية:')} ${L(best.steps[0])}</p>
        <div class="row"><button class="btn primary" data-act="enroll" data-id="${best.id}">${B('Enroll in this track', 'سجّل في هذا المسار')}</button><button class="btn" data-act="quizStart">${B('Retake', 'أعد الاختبار')}</button></div>`;
    }
    return head(B('Certification & training academy', 'أكاديمية التدريب والشهادات'), B('Short courses and exams leading to a recognised DMS certification.', 'دورات واختبارات قصيرة تؤهلك لشهادة DMS المعتمدة.'))
      + `<div class="split wide-left"><div class="grid two">${D.tracks.map(t => `<article class="card track"><div class="row between">${badge(t.id, 'solid')}<span class="muted small">${t.hours} ${B('hours', 'ساعة')}</span></div>
          <h3>${L(t.name)}</h3><p class="muted">${L(t.desc)}</p><ol class="roadmap">${t.steps.map((s, i) => `<li class="${i < Math.round(t.progress / 25) ? 'done' : ''}">${L(s)}</li>`).join('')}</ol>
          <div class="progress"><i style="width:${t.progress}%"></i></div>
          <div class="row between"><span class="muted small">${t.progress}%</span><button class="btn sm" data-act="enroll" data-id="${t.id}">${t.progress ? B('Continue', 'تابع') : B('Start', 'ابدأ')}</button></div></article>`).join('')}</div>
        <aside class="card quiz stack"><div class="card-head"><h2>${B('Eligibility checker', 'اختبار الأهلية')}</h2></div>${quiz}</aside></div>`;
  };

  VIEWS.terminal = () => {
    const t = S.term, q = D.queries.find(x => x.id === t.q);
    let out = `<p class="muted empty">${B('Run the query to see results.', 'شغّل الاستعلام لعرض النتائج.')}</p>`;
    if (t.ran) {
      const [ci, vi] = q.chart, max = Math.max(...q.rows.map(r => Math.abs(r[vi])));
      const body = {
        table: () => `<div class="table-wrap"><table class="table" dir="ltr"><thead><tr>${q.cols.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${q.rows.map(r => `<tr>${r.map(c => `<td>${typeof c === 'number' ? fmt(c) : esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`,
        json: () => code(JSON.stringify(q.rows.map(r => Object.fromEntries(q.cols.map((c, i) => [c, r[i]]))), null, 2), 'JSON'),
        chart: () => `<div class="chart" dir="ltr"><div class="muted small">${q.cols[vi]}</div>${q.rows.map(r => `<div class="bar-row"><span>${esc(r[ci])}</span><div class="bar"><i class="${r[vi] < 0 ? 'neg' : ''}" style="width:${Math.abs(r[vi]) / max * 100}%"></i></div><b>${fmt(r[vi])}</b></div>`).join('')}</div>`
      }[t.mode]();
      out = `<div class="row between card-head"><span class="muted small" dir="ltr">${q.rows.length} rows · ${t.ms} ms</span>${tabs('termMode', [['table', B('Table', 'جدول')], ['json', 'JSON'], ['chart', B('Chart', 'رسم')]], t.mode)}</div>${body}`;
    }
    return head(B('Live terminal & query runner', 'الطرفية ومشغّل الاستعلامات'), B('Read-only SQL and AI queries against the sandbox dataset.', 'استعلامات SQL و AI للقراءة فقط على البيانات التجريبية.'))
      + `<div class="row wrap presets">${D.queries.map(x => `<button class="chip${x.id === q.id ? ' on' : ''}" data-act="termQ" data-id="${x.id}">${badge(x.engine)} ${L(x.name)}</button>`).join('')}</div>
      <div class="term" dir="ltr"><div class="term-bar"><span>dms-sandbox › ${q.engine.toLowerCase()}</span><button class="btn primary sm" data-act="termRun">▶ ${B('Run', 'تشغيل')}</button></div>
        <textarea id="term-sql" rows="8" spellcheck="false" aria-label="SQL">${esc(q.sql)}</textarea>
        ${t.ran ? `<div class="term-log">› connected to sandbox (read-only)\n› ${q.engine === 'AI' ? 'model bed-occupancy@1.4 loaded' : 'plan cached'}\n› ${q.rows.length} rows in ${t.ms} ms</div>` : ''}</div>
      <div class="card">${out}</div>`;
  };

  function forumDetail(q) {
    return `<button class="link" data-act="closeQ">← ${B('All questions', 'كل الأسئلة')}</button>
      <article class="card"><div class="chips">${q.tags.map(t => `<span class="chip">#${esc(t)}</span>`).join('')}</div><h2>${esc(L(q.title))}</h2><p>${esc(L(q.body))}</p><div class="muted small">${esc(q.author)}</div></article>
      <h2 class="section-title">${q.answers.length} ${B('answers', 'إجابة')}</h2>
      ${q.answers.slice().sort((x, y) => (y.best ? 1 : 0) - (x.best ? 1 : 0) || y.votes - x.votes).map(a => `<article class="card answer${a.best ? ' best' : ''}">
        <div class="vote"><button aria-label="${B('Vote up', 'تصويت إيجابي')}" data-act="vote" data-q="${q.id}" data-a="${a.id}" data-d="1">▲</button><b>${a.votes}</b><button aria-label="${B('Vote down', 'تصويت سلبي')}" data-act="vote" data-q="${q.id}" data-a="${a.id}" data-d="-1">▼</button></div>
        <div class="stack"><div class="row">${a.best ? badge(B('Best answer', 'أفضل إجابة'), 'ok') : ''}${a.staff ? badge(B('DMS Support', 'دعم DMS'), 'solid') : ''}</div><p>${esc(L(a.body))}</p><div class="muted small">${esc(a.author)}</div></div></article>`).join('') || `<p class="muted empty">${B('No answers yet. Be the first (+20 points).', 'لا توجد إجابات بعد. كن الأول (+20 نقطة).')}</p>`}
      <form class="card stack" data-form="answer"><label class="field"><span>${B('Your answer', 'إجابتك')}</span><textarea class="input" name="body" rows="3" required></textarea></label><div class="row"><button class="btn primary">${B('Post answer', 'انشر الإجابة')}</button></div></form>`;
  }
  VIEWS.forum = () => {
    const open = D.questions.find(q => q.id === S.forum.open);
    const main = open ? forumDetail(open) : D.questions.map(q => `<article class="card question"><div class="vote static"><b>${q.votes}</b><span class="small">${B('votes', 'صوت')}</span></div>
        <div class="stack"><a href="#/forum" data-act="openQ" data-id="${q.id}"><h3>${esc(L(q.title))}</h3></a><div class="chips">${q.tags.map(t => `<span class="chip">#${esc(t)}</span>`).join('')}</div>
        <div class="row muted small"><span>${esc(q.author)}</span><span>·</span><span>${q.answers.length} ${B('answers', 'إجابة')}</span>${q.answers.some(a => a.best) ? badge(B('Solved', 'محلول'), 'ok') : ''}</div></div></article>`).join('');
    return head(B('Developer forum', 'منتدى المطورين'), B('Technical Q&A. Best answers are highlighted by the DMS support team.', 'أسئلة وإجابات تقنية. فريق دعم DMS يبرز أفضل الإجابات.'), `<button class="btn primary" data-act="ask">${B('Ask a question', 'اطرح سؤالاً')}</button>`)
      + `<div class="split wide-left"><div class="stack">${main}</div><aside class="stack">${section(B('Leaderboard', 'لوحة الصدارة'), leaderboard())}
        ${section(B('How points work', 'كيف تعمل النقاط'), `<ul class="list"><li><span>${B('Answer a question', 'الإجابة على سؤال')}</span><b>+20</b></li><li><span>${B('Best answer', 'أفضل إجابة')}</span><b>+50</b></li><li><span>${B('Publish a useful report', 'نشر تقرير مفيد')}</span><b>+100</b></li><li><span>${B('Valid bug bounty report', 'بلاغ ثغرة مؤكد')}</span><b>+500</b></li></ul>`)}</aside></div>`;
  };

  VIEWS.dashboard = () => {
    const d = S.dash;
    const status = { open: [B('Open', 'مفتوحة'), 'warn'], answered: [B('Answered', 'تم الرد'), 'ok'] };
    const kpis = [
      [B('API calls today', 'طلبات API اليوم'), '12,480', B('+8% vs yesterday', '+8% عن أمس')],
      [B('Sandbox runs this week', 'تشغيلات تجريبية هذا الأسبوع'), '37', B('3 failed', '3 فشلت')],
      [B('Points', 'النقاط'), fmt(d.points), L(D.ui.tier)],
      [B('Earnings this month', 'أرباح هذا الشهر'), egp(18600), B('5 sales', '5 مبيعات')]
    ];
    return head(B(`Welcome back, ${L(D.user.name)}`, `مرحباً بعودتك، ${L(D.user.name)}`), B('Keys, tickets, rewards and your activity history.', 'المفاتيح والتذاكر والمكافآت وسجل نشاطك.'))
      + `<div class="cells kpis">${kpis.map(k => `<div class="kpi"><span class="muted small">${k[0]}</span><b>${k[1]}</b><span class="muted small">${k[2]}</span></div>`).join('')}</div>` + `<section class="card"><div class="row between card-head"><h2>${B('API keys', 'مفاتيح API')}</h2><button class="btn primary sm" data-act="newKey">${ico('key')}${B('Generate sandbox key', 'أنشئ مفتاحاً تجريبياً')}</button></div>
        <div class="table-wrap"><table class="table"><thead><tr><th>${B('Name', 'الاسم')}</th><th>${B('Environment', 'البيئة')}</th><th>${B('Key', 'المفتاح')}</th><th>${B('Created', 'الإنشاء')}</th><th></th></tr></thead><tbody>
        ${d.keys.map(k => `<tr class="${k.active ? '' : 'off'}"><td>${esc(k.name)}</td><td>${badge(k.env)}</td><td><code dir="ltr">${d.shown === k.id ? k.key : k.key.slice(0, 12) + '••••••••'}</code></td><td dir="ltr">${k.created}</td>
          <td class="row end">${k.active ? `<button class="btn sm" data-act="showKey" data-id="${k.id}">${d.shown === k.id ? B('Hide', 'إخفاء') : B('Reveal', 'إظهار')}</button><button class="btn sm danger" data-act="revokeKey" data-id="${k.id}">${B('Revoke', 'إلغاء')}</button>` : badge(B('Revoked', 'ملغى'))}</td></tr>`).join('')}</tbody></table></div>
        <p class="muted small">${B('Production keys are issued after your organisation is verified.', 'مفاتيح الإنتاج تصدر بعد التحقق من جهتك.')}</p></section>
      <div class="split">${section(B('Support tickets', 'تذاكر الدعم'), `<ul class="list">${d.tickets.map(t => `<li><div><b>${esc(L(t.subject))}</b><div class="muted small" dir="ltr">${t.id}</div></div>${badge(status[t.status][0], status[t.status][1])}</li>`).join('')}</ul>`, `<button class="btn sm" data-act="newTicket">${B('New ticket', 'تذكرة جديدة')}</button>`)}
        ${section(B('Points & rewards', 'النقاط والمكافآت'), `<div class="row between"><b class="big">${fmt(d.points)}</b>${badge(L(D.ui.tier), 'solid')}</div><div class="progress"><i style="width:${Math.min(100, d.points / 50)}%"></i></div>
          <ul class="list">${D.rewards.map((r, i) => `<li><div><b>${L(r.t)}</b><div class="muted small">${fmt(r.cost)} ${L(D.ui.points)}</div></div><button class="btn sm" data-act="redeem" data-i="${i}" ${d.points < r.cost ? 'disabled' : ''}>${B('Redeem', 'استبدل')}</button></li>`).join('')}</ul>`)}</div>
      ${section(B('Activity history', 'سجل النشاط'), activityList())}`;
  };

  /* ---------- actions ---------- */
  const go = id => { if (route === id) return true; location.hash = '#/' + id; return false; };
  const ACT = {
    theme() { theme = theme === 'dark' ? 'light' : 'dark'; store(themeKey, theme); },
    lang() { lang = lang === 'ar' ? 'en' : 'ar'; store('ddn-lang', lang); renderShell(); },
    copy(d, el) {
      const text = el.closest('.code').querySelector('code').textContent;
      if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
      toast(B('Copied', 'تم النسخ')); return false;
    },
    rsvp() { toast(B('You are registered. See you there!', 'تم تسجيلك. نراك هناك!')); return false; },
    helpful() { toast(B('Thanks for the feedback', 'شكراً لملاحظتك')); return false; },
    doc(d) { S.docs.id = d.id; },
    apiSys(d) { S.api.sys = d.v; S.api.ep = null; S.api.res = null; },
    apiEp(d) { S.api.ep = d.id; S.api.res = null; },
    apiLang(d) { S.api.lang = d.v; },
    apiSend() { S.api.res = { ms: 40 + Math.floor(Math.random() * 120) }; },
    aiModel(d) { S.ai.model = d.id; S.ai.out = null; },
    aiRun() {
      const m = D.models.find(x => x.id === S.ai.model);
      try { JSON.parse($('#ai-in').value); } catch (e) { S.ai.out = { error: true, ms: 0 }; return; }
      S.ai.out = { ms: 180 + Math.floor(Math.random() * 400), conf: Math.min(0.99, +(m.conf + (Math.random() - 0.5) * 0.06).toFixed(3)) };
    },
    mkType(d) { S.mk.type = d.v; },
    mkDomain(d) { S.mk.domain = d.v; },
    mkTag(d) { S.mk.tag = S.mk.tag === d.tag && route === 'market' ? null : d.tag; return go('market'); },
    install(d) {
      const set = S.mk.installed;
      if (set.has(d.id)) set.delete(d.id); else { set.add(d.id); toast(B('Install triggered on your sandbox tenant', 'تم بدء التثبيت على بيئتك التجريبية')); }
    },
    publish() {
      const opts = o => Object.keys(o).map(k => `<option value="${k}">${L(o[k])}</option>`).join('');
      openForm(B('Publish a listing', 'انشر منتجك'),
        fld(B('Name', 'الاسم'), 'name') + fld(B('Short description', 'وصف مختصر'), 'desc')
        + fld(B('Category', 'الفئة'), 'type', `<select class="input" name="type">${opts(D.types)}</select>`)
        + fld(B('Compatibility', 'التوافق'), 'domain', `<select class="input" name="domain">${opts(D.systems)}</select>`)
        + fld(B('Price in EGP (0 = free)', 'السعر بالجنيه (0 = مجاني)'), 'price', '<input class="input" name="price" type="number" min="0" step="100" value="0" required>'),
        v => {
          D.listings.unshift({ id: 'n' + Date.now(), type: v.type, domain: v.domain, price: +v.price || 0, rating: '–', installs: 0, vendor: L(D.user.name), tags: ['new'], pending: true, name: { en: v.name, ar: v.name }, desc: { en: v.desc, ar: v.desc } });
          toast(B('Submitted for review', 'تم الإرسال للمراجعة'));
        });
      return false;
    },
    revTier(d) { S.rev.tier = d.v; },
    quizStart() { S.quiz = { step: 0, scores: {} }; },
    quizPick(d) {
      const w = D.quiz[S.quiz.step].a[+d.i].w;
      Object.keys(w).forEach(k => { S.quiz.scores[k] = (S.quiz.scores[k] || 0) + w[k]; });
      S.quiz.step++;
    },
    enroll(d) { toast(B(`Enrolled in ${d.id}`, `تم تسجيلك في ${d.id}`)); return false; },
    termQ(d) { S.term.q = d.id; S.term.ran = false; },
    termRun() { S.term.ran = true; S.term.ms = 60 + Math.floor(Math.random() * 300); },
    termMode(d) { S.term.mode = d.v; },
    openQ(d) { S.forum.open = d.id; return go('forum'); },
    closeQ() { S.forum.open = null; },
    vote(d) { D.questions.find(q => q.id === d.q).answers.find(a => a.id === d.a).votes += +d.d; },
    ask() {
      openForm(B('Ask a question', 'اطرح سؤالاً'),
        fld(B('Title', 'العنوان'), 'title') + fld(B('Details', 'التفاصيل'), 'body', '<textarea class="input" name="body" rows="4" required></textarea>') + fld(B('Tags (comma separated)', 'الوسوم (مفصولة بفاصلة)'), 'tags', '<input class="input" name="tags">'),
        v => {
          D.questions.unshift({ id: 'q' + Date.now(), votes: 0, author: L(D.user.name), tags: v.tags.split(',').map(s => s.trim()).filter(Boolean), title: { en: v.title, ar: v.title }, body: { en: v.body, ar: v.body }, answers: [] });
          S.forum.open = null;
        });
      return false;
    },
    newKey() {
      openForm(B('Generate sandbox key', 'أنشئ مفتاحاً تجريبياً'), fld(B('Key name', 'اسم المفتاح'), 'name'), v => {
        const hex = Array.from({ length: 20 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
        const k = { id: 'k' + Date.now(), name: v.name, env: 'Sandbox', key: 'dms_sbx_' + hex, created: new Date().toISOString().slice(0, 10), active: true };
        S.dash.keys.unshift(k); S.dash.shown = k.id;
        toast(B('Key created — copy it now', 'تم إنشاء المفتاح — انسخه الآن'));
      });
      return false;
    },
    showKey(d) { S.dash.shown = S.dash.shown === d.id ? null : d.id; },
    revokeKey(d) { S.dash.keys.find(k => k.id === d.id).active = false; toast(B('Key revoked', 'تم إلغاء المفتاح')); },
    newTicket() {
      openForm(B('New support ticket', 'تذكرة دعم جديدة'), fld(B('Subject', 'الموضوع'), 'subject') + fld(B('Describe the issue', 'صف المشكلة'), 'body', '<textarea class="input" name="body" rows="4" required></textarea>'),
        v => { S.dash.tickets.unshift({ id: 'T-' + (1043 + S.dash.tickets.length), subject: { en: v.subject, ar: v.subject }, status: 'open' }); });
      return false;
    },
    redeem(d) {
      const r = D.rewards[+d.i];
      if (S.dash.points < r.cost) return false;
      S.dash.points -= r.cost; toast(B('Reward redeemed', 'تم استبدال المكافأة'));
    }
  };

  const IN = {
    mkQ(el) { S.mk.q = el.value; $('#mk-grid').innerHTML = mkGrid(); },
    revPrice(el) { S.rev.price = +el.value; $('#rev-price').textContent = egp(S.rev.price); $('#rev-out').innerHTML = revOut(); },
    revUnits(el) { S.rev.units = +el.value; $('#rev-units').textContent = S.rev.units; $('#rev-out').innerHTML = revOut(); }
  };

  /* ---------- shell + router ---------- */
  function renderShell() {
    const cur = pillarOf(route);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dataset.theme = theme;
    document.body.dataset.pillar = cur ? cur.id : '';
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = L(D.ui[el.dataset.i18n]); });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = L(D.ui[el.dataset.i18nPh]); });
    document.querySelectorAll('[data-lang-label]').forEach(el => { el.textContent = lang === 'ar' ? 'English' : 'العربية'; });
    document.querySelectorAll('[data-theme-ico]').forEach(el => { el.innerHTML = ico(theme === 'dark' ? 'sun' : 'moon'); });
    const link = (i, cls) => `<a class="${cls}${i.id === route ? ' active' : ''}" href="#/${i.id}"${i.id === route ? ' aria-current="page"' : ''}>${ico(i.icon)}<span>${L(i)}</span></a>`;
    if (opt === '2') {
      $('#nav').innerHTML = pillars().map(p => `<div class="menu" data-p="${p.id}"><a class="pillar${p === cur ? ' active' : ''}" href="#/${p.items[0].id}"${p === cur ? ' aria-current="true"' : ''}><i class="dia"></i>${L(p.group)}</a>
        <div class="drop">${p.items.map(i => `<a href="#/${i.id}">${ico(i.icon)}<span><b>${L(i)}</b><small>${L(i.desc)}</small></span></a>`).join('')}</div></div>`).join('');
      return;
    }
    $('#nav').innerHTML = pillars().map(p => `<a class="pillar${p === cur ? ' active' : ''}" data-p="${p.id}" href="#/${p.items[0].id}"${p === cur ? ' aria-current="true"' : ''}><i class="dia"></i>${L(p.group)}</a>`).join('');
    const sub = $('#subnav');
    sub.hidden = !(cur && cur.items.length > 1);
    sub.innerHTML = sub.hidden ? '' : `<div>${cur.items.map(i => link(i, 'sub')).join('')}</div>`;
  }

  function render() {
    renderShell();
    $('#view').innerHTML = VIEWS[route]();
    document.title = `${L(allItems().find(i => i.id === route))} · DMS Developer Network`;
  }

  function onRoute() {
    const id = location.hash.replace(/^#\/?/, '');
    route = VIEWS[id] ? id : 'home';
    if (document.activeElement && document.activeElement !== document.body) document.activeElement.blur();
    render();
    window.scrollTo(0, 0);
  }

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-act]');
    if (!el || el.disabled) return;
    const fn = ACT[el.dataset.act];
    if (fn && fn(el.dataset, el) !== false) render();
  });
  document.addEventListener('input', e => {
    const fn = e.target.dataset && IN[e.target.dataset.in];
    if (fn) fn(e.target);
  });
  document.addEventListener('submit', e => {
    const form = e.target.closest('[data-form="answer"]');
    if (form) {
      e.preventDefault();
      const q = D.questions.find(x => x.id === S.forum.open);
      q.answers.push({ id: 'a' + Date.now(), votes: 0, author: L(D.user.name), body: { en: form.body.value, ar: form.body.value } });
      S.dash.points += 20; toast(B('+20 points', '+20 نقطة')); render();
    }
    const search = e.target.closest('[data-form="search"]');
    if (search) { e.preventDefault(); S.mk.q = search.q.value; if (go('market')) render(); }
  });
  document.addEventListener('keydown', e => {
    if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) { const q = $('[data-form="search"] input'); if (q) { e.preventDefault(); q.focus(); } }
  });
  window.addEventListener('hashchange', onRoute);
  onRoute();
})();
