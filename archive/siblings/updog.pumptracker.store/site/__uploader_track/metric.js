(() => {
try {
  const site = document.currentScript?.dataset.site || '?';
  const K = 'ua_vid';
  const vid = localStorage.getItem(K) || (() => {
    const v = crypto.randomUUID?.() || Math.random().toString(36).slice(2);
    localStorage.setItem(K, v); return v;
  })();
  const sid = crypto.randomUUID?.() || Date.now().toString(36) + Math.random().toString(36).slice(2);
  const q = [], snaps = [];
  let lastMove = 0, lastScroll = 0, lateSnaps = 0, snapTimer = 0;

  const fp = [navigator.platform, navigator.language, screen.width + 'x' + screen.height,
    screen.colorDepth, navigator.hardwareConcurrency || '', navigator.deviceMemory || '',
    Intl.DateTimeFormat().resolvedOptions().timeZone].join('|');
  let h = 2166136261;
  for (let i = 0; i < fp.length; i++) { h ^= fp.charCodeAt(i); h = Math.imul(h, 16777619); }
  const fingerprint = (h >>> 0).toString(16);

  const push = (k, d = {}) => q.push({ k, t: Date.now(), d });

  const killUri = s => s.replace(/data:[^\s"'<>)]{300,}/g, 'data:,');

  const VOID_TAGS = new Set(['area','base','br','col','embed','hr','img','input','link','meta','source','track','wbr']);
  const escAttr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const escText = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

  const ser = (node, depth) => {
    if (node.nodeType === 3) return escText(node.textContent);
    if (node.nodeType !== 1 || depth > 25) return '';
    const tag = node.tagName.toLowerCase();
    if (tag === 'script' || tag === 'object' || tag === 'embed' || tag === 'noscript') return '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select')
      return `<${tag} placeholder="••••"></${tag}>`;
    if (node.matches('[contenteditable]')) return `<${tag}></${tag}>`;
    let attrs = '';
    const nodeAttrs = node.attributes;
    if (tag === 'iframe') {
      let inner = '';
      try {
        const doc = node.contentDocument;
        if (doc && doc.documentElement) inner = ser(doc.documentElement, depth + 1);
      } catch (e) {}
      if (!inner) return '';
      for (let i = 0; i < nodeAttrs.length; i++) {
        const a = nodeAttrs[i];
        if (a.name === 'src' || a.name === 'srcdoc' || a.name === 'srcset') continue;
        attrs += ` ${a.name}="${escAttr(a.name === 'style' ? killUri(a.value) : a.value)}"`;
      }
      return `<iframe${attrs} srcdoc="${escAttr('<!doctype html>' + inner)}"></iframe>`;
    }
    for (let i = 0; i < nodeAttrs.length; i++) {
      const a = nodeAttrs[i];
      if ((a.name === 'src' || a.name === 'srcset') && a.value.startsWith('data:') && a.value.length > 300) continue;
      attrs += ` ${a.name}="${escAttr(a.name === 'style' ? killUri(a.value) : a.value)}"`;
    }
    if (VOID_TAGS.has(tag)) return `<${tag}${attrs}>`;
    if (tag === 'style') return `<style${attrs}>${killUri(node.textContent)}</style>`;
    let inner = '';
    if (node.shadowRoot)
      for (const n of node.shadowRoot.childNodes) { const s = ser(n, depth + 1); if (s) inner += s; }
    for (const n of node.childNodes) { const s = ser(n, depth + 1); if (s) inner += s; }
    return `<${tag}${attrs}>${inner}</${tag}>`;
  };

  const snapHtml = () => {
    let html = ser(document.documentElement, 0);
    if (!/<base[\s>]/i.test(html))
      html = html.replace(/<head([^>]*)>/i, '<head$1><base href="' + escAttr(location.href) + '">');
    return '<!doctype html>' + html;
  };

  const send = (extra = {}) => {
    if (!q.length && !extra.snapshot && !snaps.length) return;
    const body = JSON.stringify({
      sid, vid, fingerprint, name: site, page: location.href, referrer: document.referrer,
      signals: { webdriver: navigator.webdriver === true },
      events: q.splice(0), snaps: snaps.splice(0), ...extra
    });
    if (body.length > 60000) {
      fetch('/__uploader_track', { method: 'POST', body, headers: { 'content-type': 'application/json' } }).catch(() => {});
      return;
    }
    navigator.sendBeacon('/__uploader_track', new Blob([body], { type: 'application/json' }))
      || fetch('/__uploader_track', { method: 'POST', body, keepalive: true, headers: { 'content-type': 'application/json' } }).catch(() => {});
  };

  const snap = () => { try { snaps.push({ t: Date.now(), h: snapHtml().slice(0, 300000) }); send(); } catch (e) {} };

  const lateSnap = () => {
    if (lateSnaps >= 5 || snapTimer) return;
    snapTimer = setTimeout(() => { snapTimer = 0; lateSnaps++; snap(); }, 800);
  };

  push('view', { w: innerWidth, h: innerHeight });
  addEventListener('click', e => {
    const r = e.target.getBoundingClientRect();
    push('click', {
      x: Math.round(e.clientX), y: Math.round(e.clientY),
      px: Math.round(scrollX), py: Math.round(scrollY), tag: e.target.tagName,
      label: (e.target.innerText || e.target.getAttribute?.('aria-label') || '').trim().slice(0, 80),
      path: path(e.target), rx: Math.round(r.left), ry: Math.round(r.top)
    });
    lateSnap();
  }, { passive: true });
  addEventListener('mousemove', e => {
    if (Date.now() - lastMove > 120) { lastMove = Date.now(); push('move', { x: Math.round(e.clientX), y: Math.round(e.clientY) }); }
  }, { passive: true });
  addEventListener('touchmove', e => {
    const t = e.touches && e.touches[0];
    if (t && Date.now() - lastMove > 150) { lastMove = Date.now(); push('move', { x: Math.round(t.clientX), y: Math.round(t.clientY) }); }
  }, { passive: true });
  addEventListener('scroll', () => {
    if (Date.now() - lastScroll > 300) {
      lastScroll = Date.now();
      push('scroll', { x: Math.round(scrollX), y: Math.round(scrollY),
        p: Math.min(100, Math.round((scrollY + innerHeight) / Math.max(document.documentElement.scrollHeight, 1) * 100)) });
    }
  }, { passive: true });
  addEventListener('resize', () => push('resize', { w: innerWidth, h: innerHeight }), { passive: true });
  document.addEventListener('visibilitychange', () => push(document.hidden ? 'hidden' : 'visible'));

  function path(el) {
    let a = [];
    for (let i = 0; el && i < 5; i++, el = el.parentElement)
      a.unshift(el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') +
        (el.classList?.length ? '.' + [...el.classList].slice(0, 2).join('.') : ''));
    return a.join('>');
  }

  setInterval(send, 1800);
  setInterval(() => push('heartbeat'), 15000);
  addEventListener('pagehide', () => { push('leave'); send(); });

  window.requestIdleCallback ? requestIdleCallback(snap, { timeout: 3000 }) : setTimeout(snap, 2500);

  setTimeout(() => { if (!document.hidden) snap(); }, 10000);
  setTimeout(() => { if (!document.hidden) snap(); }, 25000);

  window.__ua_event = push;
  window.__ua_snap = lateSnap;

  try {
    const modalish = n => {
      if (n.nodeType !== 1) return false;
      if (n.matches?.('dialog,[role=dialog],[aria-modal="true"]')) return true;
      const cls = (n.id || '') + ' ' + (n.className?.baseVal !== undefined ? n.className.baseVal : (n.className || ''));
      return /modal|dialog|popup|overlay|lightbox/i.test(cls);
    };
    let lastModalTs = 0;
    const mo = new MutationObserver(muts => {
      if (lateSnaps >= 5) { mo.disconnect(); return; }
      let hit = false;
      for (const m of muts) {
        if (m.type === 'attributes') { if (modalish(m.target)) { hit = true; break; } }
        else for (const n of m.addedNodes) if (modalish(n)) { hit = true; break; }
        if (hit) break;
      }
      if (hit) {
        const now = Date.now();
        if (now - lastModalTs > 1500) { lastModalTs = now; push('modal_open', {}); }
        lateSnap();
      }
    });
    mo.observe(document.documentElement, {
      childList: true, subtree: true, attributes: true,
      attributeFilter: ['class', 'open', 'aria-modal', 'style']
    });
  } catch (e) {}
} catch (e) {}
})();