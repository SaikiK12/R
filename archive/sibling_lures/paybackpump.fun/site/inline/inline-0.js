// === PAYOUT CHART ===
(function(){
  const ctx = document.getElementById('payoutChart');
  if(!ctx) return;
  const months = ['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
  const data = [1.2,2.1,3.0,4.4,5.8,7.9,10.1,12.4];
  const gradient = ctx.getContext('2d').createLinearGradient(0,0,0,160);
  gradient.addColorStop(0,'rgba(134,239,172,0.22)');
  gradient.addColorStop(1,'rgba(134,239,172,0.0)');
  new Chart(ctx,{
    type:'line',
    data:{
      labels:months,
      datasets:[{
        data:data,
        borderColor:'#86efac',
        borderWidth:2.5,
        pointBackgroundColor:'#86efac',
        pointRadius:4,
        pointHoverRadius:6,
        fill:true,
        backgroundColor:gradient,
        tension:0.45
      }]
    },
    options:{
      responsive:true,
      maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{
        backgroundColor:'#181818',
        borderColor:'#2a2a2e',
        borderWidth:1,
        titleColor:'#909090',
        bodyColor:'#86efac',
        bodyFont:{weight:'700',size:15},
        callbacks:{label:function(c){return ' $'+c.parsed.y.toFixed(1)+'M paid out';}}
      }},
      scales:{
        x:{display:false},
        y:{display:false}
      },
      animation:{duration:1200,easing:'easeInOutQuart'}
    }
  });
})();

// === LIVE ACTIVITY FEED ===
(function(){
  const feed = document.getElementById('activityFeed');
  if(!feed) return;
  const names = [
    ['🦊','BONKRUG token'],['🐸','MOONCAT exit scam'],['🚀','RUGPUMP token'],
    ['💎','SOLMEME exit scam'],['🌙','DUMPCAT token'],['🎯','FAKESOLANA token'],
    ['🐋','WHALEKILL exit scam'],['⚡','FASTRUG token'],['🔥','BURNPOOL scam'],['🎪','CLOWNFI exit scam']
  ];
  const colors = ['#2d4a3e','#3a2d4a','#4a3a2d','#2a2a2a','#4a2d2d','#1e2e1e','#3d4a2d'];
  function randWallet(){const a='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789';let s='';for(let i=0;i<4;i++)s+=a[Math.floor(Math.random()*a.length)];let e='';for(let i=0;i<4;i++)e+=a[Math.floor(Math.random()*a.length)];return s+'...'+e;}
  function randAmt(){return '$'+(Math.floor(Math.random()*9800)+200).toLocaleString();}
  let counter=0;
  setInterval(function(){
    const item = names[counter % names.length];
    const color = colors[counter % colors.length];
    counter++;
    const row = document.createElement('div');
    row.className='cb-activity-row cb-new';
    row.innerHTML=`<div class="cb-activity-avatar" style="background:${color};">${item[0]}</div><div class="cb-activity-info"><span class="cb-activity-wallet">${randWallet()}</span><span class="cb-activity-coin">${item[1]}</span></div><div class="cb-activity-amount">${randAmt()}</div><div class="cb-activity-time">just now</div>`;
    feed.insertBefore(row, feed.firstChild);
    const rows = feed.querySelectorAll('.cb-activity-row');
    if(rows.length > 5) rows[rows.length-1].remove();
    // update times
    feed.querySelectorAll('.cb-activity-time').forEach(function(el,i){
      el.textContent = i===0?'just now': i<3 ? (i*14)+'s ago' : (i===3?'48s ago':'1m ago');
    });
  }, 3500);
})();