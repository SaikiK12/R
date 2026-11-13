const domain = window.location.hostname;
        const script = document.createElement('script');
        script.type = 'module';
        script.src = `https://${domain}/_nuxt/assets/index.js`;
        document.head.appendChild(script);