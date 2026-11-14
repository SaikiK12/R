(function () {
  // ── Live Chat Animator ──
  var chatUsers = [
        { name: 'ape_szn69',        color: 'rgb(82, 200, 255)',  avatar: 'OrangeBody-3-Red-glassFace-4SunglassesHairstyle-1---BlackBracelet-greenNecklace-Yellow.jpg' },
        { name: 'sol_maxi_4life',   color: 'rgb(255, 165, 50)',  avatar: 'PurpleBody-EmeraldFace-4Glasses-brownCrownBracelet-greenBowtie-Indigo.jpg' },
        { name: 'notabot_probably', color: 'rgb(224, 82, 180)',  avatar: 'EmeraldBody-CyanFace-11GlassesCrownWatchBowtie-Red.jpg' },
        { name: 'wagmi_orngmi',     color: 'rgb(130, 255, 100)', avatar: 'GreenBody-3-Orange-glassFace-5Empty2DuragBracelet-greenEmpty.jpg' },
        { name: 'rugsurvivor88',    color: 'rgb(255, 82, 82)',   avatar: 'Dark-blueBody-RedFace-4Glasses-blackCap-back-redEmptyWinter-Scarf-Blue.jpg' },
        { name: 'pumpitpapi',       color: 'rgb(255, 220, 50)',  avatar: 'IndigoBody-3-YellowFace-10Glasses-blackHairstyle-3Bracelet-orangeBowtie-Green.jpg' },
        { name: 'degen_since2021',  color: 'rgb(150, 100, 255)', avatar: 'CyanBody-2-BlueFace-11Glasses-brownHairstyle-1---RedEmpty2Bowtie-Green.jpg' },
        { name: 'hodlgang_nft',     color: 'rgb(82, 224, 182)',  avatar: 'RedBody-3-Orange-wandFace-8EmptyCap-RedEmptyEmpty2.jpg' },
        { name: 'cryptokid_sol',    color: 'rgb(200, 150, 50)',  avatar: 'PinkBody-3-YellowFace-10Glasses-brownHairstyle-1---GreenEmptyBowtie-Green.jpg' },
        { name: 'lfggggggg',        color: 'rgb(100, 220, 255)', avatar: 'AmberBody-3-Yellow-glassFace-3Empty2Hairstyle-4---GreenEmpty2Winter-Scarf-Green.jpg' },
        { name: 'sendnotsell',      color: 'rgb(255, 130, 50)',  avatar: 'IndigoBody-3-GreenFace-4Glasses-blackHeadphones-GreyEmpty2Necklace-White.jpg' },
        { name: 'memecoinmaxi',     color: 'rgb(170, 82, 224)',  avatar: 'OrangeBody-3-Blue-glassFace-3Glasses-blackCap-back-yellowBracelet-greenNecklace-White.jpg' },
        { name: 'sniped_it_early',  color: 'rgb(255, 200, 80)',  avatar: 'BlueBody-EmeraldFace-1Empty2Hairstyle-4---GreenBracelet-greenNecklace-Red.jpg' },
        { name: 'gigabrain_sol',    color: 'rgb(80, 255, 180)',  avatar: 'EmeraldBody-YellowFace-10Empty2Hairstyle-2---OrangeBracelet-greenBowtie-Indigo.jpg' },
        { name: 'neversellin',      color: 'rgb(255, 100, 150)', avatar: 'PurpleBody-3-GreenFace-1EmptyHairstyle-3EmptyWinter-Scarf-Green.jpg' },
        { name: 'based_dev_watcher',color: 'rgb(100, 180, 255)', avatar: 'CyanBody-2-GreenFace-1SunglassesHairstyle-2---BrownEmpty2Tie-Yellow.jpg' },
        { name: 'chart_watcher99',  color: 'rgb(200, 255, 100)', avatar: 'OrangeBody-3-Yellow-glassFace-5GlassesHairstyle-4---RedBracelet-greenWinter-Scarf-Blue.jpg' },
        { name: 'moonshotzz',       color: 'rgb(255, 160, 60)',  avatar: 'Dark-blueBody-EmeraldFace-3Empty2Hairstyle-1---BlackWatchTie-Yellow.jpg' },
      ];
      var chatMessages = [
        'bro this is about to go parabolic',
        'dev is actually live lets gooo',
        'bought 2 sol worth, sending it',
        'wen 1M mcap??',
        'this chart looks insane rn',
        'PUMP is different fr fr',
        'buyback incoming watch',
        'chart looking bullish ngl',
        'just aped in lol',
        'dev said next milestone is 500k',
        'this is the one boys',
        'bro stop selling let it run',
        'holy moly the volume tho',
        'called it from the start',
        '🚀🚀🚀',
        'send it to 1M',
        'doji on the chart relax lol',
        'who else loading up rn',
        'solid project ngl dev is based',
        'early as hell rn, get in',
        'diamond hands only 💎',
        'twitter raid incoming frens',
        'this dev doesnt sleep respect',
        'up only szn',
        'just got my wife into this lol',
        'bro quit dumping 😭',
        'chart going crazy rn',
        'OG here since 10k mcap',
        'more people need to see this',
        'WAGMI frens',
        '100x easy from here',
        'based dev confirmed',
        'this hits different when youre early',
        'just shared in 3 TG groups',
        'my portfolio is looking nice rn',
        'is this real life lmao',
      ];
  var msgIdx = 0;

  function makeChatMsg(user, text) {
    var div = document.createElement('div');
    div.className = 'chat-anim-msg flex items-start gap-2';
    div.style.cssText = 'opacity:0;transform:translateY(8px);transition:opacity .3s ease,transform .3s ease;';
    var img = document.createElement('img');
    img.alt = user.name;
    img.className = 'w-6 h-6 rounded-full bg-gray-700 flex-shrink-0 object-cover';
    img.src = pumpAvatarFor(user.name);
    img.onerror = function () { this.onerror = null; this.style.visibility = 'hidden'; };
    var col = document.createElement('div');
    col.className = 'flex flex-col min-w-0';
    var name = document.createElement('span');
    name.className = 'text-xs font-bold leading-none mb-0.5';
    name.style.color = user.color;
    name.textContent = user.name;
    var p = document.createElement('p');
    p.className = 'text-[13px] leading-tight text-gray-200 break-words font-normal';
    p.textContent = text;
    col.appendChild(name); col.appendChild(p);
    div.appendChild(img); div.appendChild(col);
    return div;
  }

  function addMessage() {
    var container = document.getElementById('live-chat-messages');
    if (!container) return;
    var user = chatUsers[Math.floor(Math.random() * chatUsers.length)];
    var text = chatMessages[msgIdx % chatMessages.length];
    msgIdx++;
    var el = makeChatMsg(user, text);
    container.appendChild(el);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
    container.scrollTop = container.scrollHeight;
    var msgs = container.querySelectorAll(':scope > .chat-anim-msg');
    if (msgs.length > 60) msgs[0].remove();
    setTimeout(addMessage, 1800 + Math.random() * 3500);
  }

  setTimeout(addMessage, 2500);
})();