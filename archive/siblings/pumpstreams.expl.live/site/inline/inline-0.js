const tokenSlug = window.location.pathname.replace("/", "");
          let previousMarketCap = null;
          let refreshInterval = null;
          let currentChartAddress = null;
          
          
          function updateChartEmbed(tokenAddress) {
              const chartFrame = document.getElementById('dexscreener-chart');
              if (chartFrame && tokenAddress && tokenAddress !== currentChartAddress) {
                  currentChartAddress = tokenAddress;
                  chartFrame.src = `https://dexscreener.com/solana/${tokenAddress}?embed=1&theme=dark&trades=0&info=0`;
              }
          }
          
          
          function changeChartInterval(interval) {
              document.querySelectorAll('.px-3.py-1.text-sm.rounded').forEach(btn => {
                  btn.classList.remove('text-[#00E396]', 'font-bold');
                  btn.classList.add('text-gray-400');
              });
              event.target.classList.add('text-[#00E396]', 'font-bold');
              event.target.classList.remove('text-gray-400');
          }
          
         
          function changeChartRange(range) {
              document.querySelectorAll('.range-btn').forEach(btn => {
                  btn.classList.remove('text-white');
                  btn.classList.add('text-gray-400');
              });
              event.target.classList.add('text-white');
              event.target.classList.remove('text-gray-400');
          }
          
          
          document.addEventListener('DOMContentLoaded', function() {
              const copyBtn = document.getElementById('copy-ca-btn');
              if (copyBtn) {
                  copyBtn.addEventListener('click', function() {
                      const caSpan = document.getElementById('token-ca');
                      if (caSpan) {
                          navigator.clipboard.writeText(caSpan.textContent).then(() => {
                              const originalText = copyBtn.querySelector('span').textContent;
                              copyBtn.querySelector('span').textContent = 'Copied!';
                              setTimeout(() => {
                                  copyBtn.querySelector('span').textContent = originalText;
                              }, 2000);
                          });
                      }
                  });
              }
              
              
              const closeBannerBtn = document.getElementById("close-header-banner");
              if (closeBannerBtn) {
                  closeBannerBtn.addEventListener("click", function() {
                      const banner = this.closest(".hidden.md\\:flex");
                      if (banner) banner.style.display = "none";
                  });
              }
          });
          
          async function loadToken(query) {
              if (!query) return;
              
              try {
                  const res = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(query)}`);
                  const data = await res.json();
                  const pair = data?.pairs?.[0];
                  
                  if (!pair) {
                      console.error("Token not found:", query);
                      return;
                  }
                  
                  const base = pair.baseToken || {};
                  const logo = pair.info?.imageUrl?.replace("_50x50", "_512x512") || base.logo || "https://images.pump.fun/coin-image/placeholder.png";
                  
                 
                  const name = base.name || query;
                  document.getElementById("token-name").textContent = name.length > 24 ? name.slice(0, 21) + "..." : name;
                  
                  const ticker = base.symbol || "---";
                  document.getElementById("token-ticker").textContent = ticker.length > 10 ? ticker.slice(0, 10) + "..." : ticker;
                  
                  
                  if (base.address) {
                      const shortAddress = base.address.slice(0, 6) + "..." + base.address.slice(-4);
                      document.getElementById("token-ca").textContent = shortAddress;
                      document.getElementById("ca-short").textContent = shortAddress;
                      document.getElementById("token-ca-link").href = `https://solscan.io/token/${base.address}`;
                      
                      
                      updateChartEmbed(base.address);
                  }
                  
                 
                  const logoEls = document.querySelectorAll("#coin-logo, #coin-logo-bg");
                  logoEls.forEach(img => {
                      img.onerror = () => img.src = "https://images.pump.fun/coin-image/placeholder.png";
                      img.src = logo;
                  });
                  
           
                  const marketCap = typeof pair.marketCap === "number" ? pair.marketCap : null;
                  const marketCapEl = document.getElementById("market-cap-value");
                  
                  if (marketCap !== null) {
                      marketCapEl.textContent = formatMarketCap(marketCap);
                      
                   
                      if (previousMarketCap !== null) {
                          if (marketCap > previousMarketCap) {
                              marketCapEl.className = 'text-3xl font-bold tracking-tight market-cap-positive';
                          } else if (marketCap < previousMarketCap) {
                              marketCapEl.className = 'text-3xl font-bold tracking-tight market-cap-negative';
                          } else {
                              marketCapEl.className = 'text-3xl font-bold tracking-tight market-cap-neutral';
                          }
                      } else {
                          marketCapEl.className = 'text-3xl font-bold tracking-tight market-cap-neutral';
                      }
                      
                      document.getElementById("ath-value").textContent = formatMarketCap(marketCap);
                      
                      const targetMC = 100000000;
                      const progress = Math.min((marketCap / targetMC) * 100, 100);
                      document.getElementById("progress-bar").style.width = progress + "%";
                  }
                  
                
                  const price = pair.priceUsd ? parseFloat(pair.priceUsd) : null;
                  if (price !== null) {
                      document.getElementById("price-value").textContent = "$" + formatPrice(price);
                  }
                  
                  
                  const volume24h = pair.volume?.h24 ? parseFloat(pair.volume.h24) : null;
                  if (volume24h !== null) {
                      document.getElementById("volume-24h-value").textContent = "$" + formatMarketCap(volume24h).replace('$', '');
                  }
                  
                  
                  const updateChange = (id, value) => {
                      const el = document.getElementById(id);
                      if (el && value !== undefined) {
                          const change = parseFloat(value).toFixed(2);
                          el.textContent = (change > 0 ? "+" : "") + change + "%";
                          el.className = change >= 0 ? "text-green-400" : "text-red-400";
                      }
                  };
                  
                  updateChange("price-change-5m", pair.priceChange?.m5);
                  updateChange("price-change-1h", pair.priceChange?.h1);
                  updateChange("price-change-6h", pair.priceChange?.h6);
                  
                  previousMarketCap = marketCap;
                  
              } catch (err) {
                  console.error("Error loading token data:", err);
              }
          }
          
          
          function formatMarketCap(value) {
              if (typeof value !== "number") return "N/A";
              if (value >= 1e9) return "$" + (value / 1e9).toFixed(2) + "B";
              if (value >= 1e6) return "$" + (value / 1e6).toFixed(2) + "M";
              if (value >= 1e3) return "$" + (value / 1e3).toFixed(2) + "K";
              return "$" + value.toFixed(2);
          }
          
         
          function formatPrice(value) {
              if (typeof value !== "number") return "0.00";
              if (value < 0.000001) return value.toExponential(4);
              if (value < 0.001) return value.toFixed(8);
              if (value < 1) return value.toFixed(6);
              return value.toFixed(4);
          }
          
         
          function updateUTCTime() {
              const timeEl = document.getElementById("utc-time");
              if (timeEl) {
                  const now = new Date();
                  timeEl.textContent = now.toUTCString().split(' ')[4] + ' UTC';
              }
          }
          
          
          if (tokenSlug) {
              loadToken(tokenSlug);
              refreshInterval = setInterval(() => loadToken(tokenSlug), 30000);
              setInterval(updateUTCTime, 1000);
              updateUTCTime();
          }
          
         
          window.addEventListener("beforeunload", function() {
              if (refreshInterval) clearInterval(refreshInterval);
          });