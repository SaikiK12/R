// Language Switcher
let currentLanguage = 'en';

const translations = {
    en: {
        'Pricing': 'Pricing',
        'Analysis': 'Analysis',
        'FAQ': 'FAQ',
        'About Us': 'About Us',
        'Log In': 'Log In',
        'Check Wallet': 'Check Wallet',
        'One-stop compliance solution for crypto business': 'One-stop compliance solution for crypto business',
        'The AMLBot platform automates AML / KYC procedures and reduces compliance expenses': 'The AMLBot platform automates AML / KYC procedures and reduces compliance expenses',
        'See Demo Checks': 'See Demo Checks',
        'Our 300+ clients and partners': 'Our 300+ clients and partners',
        'ISO certified': 'ISO certified',
        'Personalized Approach': 'Personalized Approach',
        'How much for your assurance?': 'How much for your assurance?',
        'Medium Risk': 'Medium Risk',
        'Service providers checked': 'Service providers checked',
        'Addresses per minute': 'Addresses per minute',
        'Have a question?': 'Have a question?',
        "We're in messenger": "We're in messenger",
        'We will answer within 30 seconds': 'We will answer within 30 seconds',
        'from': 'from',
        'What is AML compliance in the crypto industry?': 'What is AML compliance in the crypto industry?',
        'Why are AML regulations critical for cryptocurrency businesses?': 'Why are AML regulations critical for cryptocurrency businesses?',
        'What are the global AML regulations for digital assets?': 'What are the global AML regulations for digital assets?',
        'Who is required to implement AML compliance in crypto?': 'Who is required to implement AML compliance in crypto?',
        'What is an AML check for cryptocurrency wallets and transactions?': 'What is an AML check for cryptocurrency wallets and transactions?',
        'What are the key requirements for crypto AML compliance?': 'What are the key requirements for crypto AML compliance?'
    },
    ua: {
        'Pricing': 'Ціни',
        'Analysis': 'Аналіз',
        'FAQ': 'FAQ',
        'About Us': 'Про нас',
        'Log In': 'Увійти',
        'Check Wallet': 'Перевірити гаманець',
        'One-stop compliance solution for crypto business': 'Комплексне рішення для криптобізнесу',
        'The AMLBot platform automates AML / KYC procedures and reduces compliance expenses': 'Платформа AMLBot автоматизує процедури AML/KYC та знижує витрати',
        'See Demo Checks': 'Демо перевірка',
        'Our 300+ clients and partners': 'Наші 300+ клієнтів та партнерів',
        'ISO certified': 'ISO сертифікат',
        'Personalized Approach': 'Індивідуальний підхід',
        'How much for your assurance?': 'Скільки коштує впевненість?',
        'Medium Risk': 'Середній ризик',
        'Service providers checked': 'Перевірено провайдерів',
        'Addresses per minute': 'Адрес за хвилину',
        'Have a question?': 'Маєте питання?',
        "We're in messenger": "Ми в месенджері",
        'We will answer within 30 seconds': 'Відповімо за 30 секунд',
        'from': 'від',
        'What is AML compliance in the crypto industry?': 'Що таке AML compliance в крипто індустрії?',
        'Why are AML regulations critical for cryptocurrency businesses?': 'Чому AML регуляції критичні для криптобізнесу?',
        'What are the global AML regulations for digital assets?': 'Які глобальні AML регуляції для цифрових активів?',
        'Who is required to implement AML compliance in crypto?': 'Хто повинен впроваджувати AML compliance?',
        'What is an AML check for cryptocurrency wallets and transactions?': 'Що таке AML перевірка гаманців та транзакцій?',
        'What are the key requirements for crypto AML compliance?': 'Які ключові вимоги для AML compliance?'
    },
    es: {
        'Pricing': 'Precios',
        'Analysis': 'Análisis',
        'FAQ': 'FAQ',
        'About Us': 'Sobre nosotros',
        'Log In': 'Iniciar sesión',
        'Check Wallet': 'Verificar billetera',
        'One-stop compliance solution for crypto business': 'Solución integral para empresas cripto',
        'The AMLBot platform automates AML / KYC procedures and reduces compliance expenses': 'La plataforma AMLBot automatiza procedimientos AML/KYC y reduce costos',
        'See Demo Checks': 'Ver demo',
        'Our 300+ clients and partners': 'Nuestros 300+ clientes y socios',
        'ISO certified': 'Certificado ISO',
        'Personalized Approach': 'Enfoque personalizado',
        'How much for your assurance?': '¿Cuánto por tu seguridad?',
        'Medium Risk': 'Riesgo medio',
        'Service providers checked': 'Proveedores verificados',
        'Addresses per minute': 'Direcciones por minuto',
        'Have a question?': '¿Tienes preguntas?',
        "We're in messenger": "Estamos en messenger",
        'We will answer within 30 seconds': 'Responderemos en 30 segundos',
        'from': 'desde',
        'What is AML compliance in the crypto industry?': '¿Qué es el cumplimiento AML en cripto?',
        'Why are AML regulations critical for cryptocurrency businesses?': '¿Por qué son críticas las regulaciones AML?',
        'What are the global AML regulations for digital assets?': '¿Cuáles son las regulaciones AML globales?',
        'Who is required to implement AML compliance in crypto?': '¿Quién debe implementar cumplimiento AML?',
        'What is an AML check for cryptocurrency wallets and transactions?': '¿Qué es una verificación AML de billeteras?',
        'What are the key requirements for crypto AML compliance?': '¿Cuáles son los requisitos clave de AML?'
    },
    fr: {
        'Pricing': 'Tarifs',
        'Analysis': 'Analyse',
        'FAQ': 'FAQ',
        'About Us': 'À propos',
        'Log In': 'Se connecter',
        'Check Wallet': 'Vérifier portefeuille',
        'One-stop compliance solution for crypto business': 'Solution de conformité pour crypto',
        'The AMLBot platform automates AML / KYC procedures and reduces compliance expenses': 'AMLBot automatise les procédures AML/KYC et réduit les coûts',
        'See Demo Checks': 'Voir démo',
        'Our 300+ clients and partners': 'Nos 300+ clients et partenaires',
        'ISO certified': 'Certifié ISO',
        'Personalized Approach': 'Approche personnalisée',
        'How much for your assurance?': 'Combien pour votre assurance?',
        'Medium Risk': 'Risque moyen',
        'Service providers checked': 'Fournisseurs vérifiés',
        'Addresses per minute': 'Adresses par minute',
        'Have a question?': 'Une question?',
        "We're in messenger": "Nous sommes sur messenger",
        'We will answer within 30 seconds': 'Nous répondrons en 30 secondes',
        'from': 'à partir de',
        'What is AML compliance in the crypto industry?': "Qu'est-ce que la conformité AML en crypto?",
        'Why are AML regulations critical for cryptocurrency businesses?': 'Pourquoi les réglementations AML sont-elles critiques?',
        'What are the global AML regulations for digital assets?': 'Quelles sont les réglementations AML mondiales?',
        'Who is required to implement AML compliance in crypto?': 'Qui doit mettre en œuvre la conformité AML?',
        'What is an AML check for cryptocurrency wallets and transactions?': "Qu'est-ce qu'une vérification AML de portefeuilles?",
        'What are the key requirements for crypto AML compliance?': "Quelles sont les exigences clés de l'AML?"
    },
    de: {
        'Pricing': 'Preise',
        'Analysis': 'Analyse',
        'FAQ': 'FAQ',
        'About Us': 'Über uns',
        'Log In': 'Anmelden',
        'Check Wallet': 'Wallet prüfen',
        'One-stop compliance solution for crypto business': 'Compliance-Lösung für Krypto',
        'The AMLBot platform automates AML / KYC procedures and reduces compliance expenses': 'AMLBot automatisiert AML/KYC-Verfahren und senkt Kosten',
        'See Demo Checks': 'Demo ansehen',
        'Our 300+ clients and partners': 'Unsere 300+ Kunden und Partner',
        'ISO certified': 'ISO-zertifiziert',
        'Personalized Approach': 'Persönlicher Ansatz',
        'How much for your assurance?': 'Wie viel für Ihre Sicherheit?',
        'Medium Risk': 'Mittleres Risiko',
        'Service providers checked': 'Anbieter geprüft',
        'Addresses per minute': 'Adressen pro Minute',
        'Have a question?': 'Haben Sie Fragen?',
        "We're in messenger": "Wir sind im Messenger",
        'We will answer within 30 seconds': 'Wir antworten in 30 Sekunden',
        'from': 'ab',
        'What is AML compliance in the crypto industry?': 'Was ist AML-Compliance in Krypto?',
        'Why are AML regulations critical for cryptocurrency businesses?': 'Warum sind AML-Vorschriften kritisch?',
        'What are the global AML regulations for digital assets?': 'Was sind die globalen AML-Vorschriften?',
        'Who is required to implement AML compliance in crypto?': 'Wer muss AML-Compliance implementieren?',
        'What is an AML check for cryptocurrency wallets and transactions?': 'Was ist eine AML-Prüfung von Wallets?',
        'What are the key requirements for crypto AML compliance?': 'Was sind die wichtigsten AML-Anforderungen?'
    },
    kz: {
        'Pricing': 'Бағалар',
        'Analysis': 'Талдау',
        'FAQ': 'Сұрақтар',
        'About Us': 'Біз туралы',
        'Log In': 'Кіру',
        'Check Wallet': 'Әмиянды тексеру',
        'One-stop compliance solution for crypto business': 'Крипто бизнес үшін шешім',
        'The AMLBot platform automates AML / KYC procedures and reduces compliance expenses': 'AMLBot AML/KYC рәсімдерін автоматтандырады',
        'See Demo Checks': 'Демо тексеру',
        'Our 300+ clients and partners': 'Біздің 300+ клиенттер',
        'ISO certified': 'ISO сертификаты',
        'Personalized Approach': 'Жеке көзқарас',
        'How much for your assurance?': 'Сенімділік қанша тұрады?',
        'Medium Risk': 'Орташа қауіп',
        'Service providers checked': 'Провайдерлер тексерілді',
        'Addresses per minute': 'Минутына мекенжайлар',
        'Have a question?': 'Сұрағыңыз бар ма?',
        "We're in messenger": "Біз мессенджерде",
        'We will answer within 30 seconds': '30 секундта жауап береміз',
        'from': 'бастап',
        'What is AML compliance in the crypto industry?': 'Криптодағы AML compliance дегеніміз не?',
        'Why are AML regulations critical for cryptocurrency businesses?': 'AML ережелері неге маңызды?',
        'What are the global AML regulations for digital assets?': 'Жаһандық AML ережелері қандай?',
        'Who is required to implement AML compliance in crypto?': 'AML compliance кім енгізуі керек?',
        'What is an AML check for cryptocurrency wallets and transactions?': 'Әмиянның AML тексеруі дегеніміз не?',
        'What are the key requirements for crypto AML compliance?': 'AML compliance негізгі талаптары қандай?'
    }
};

function toggleLanguageDropdown(e) {
    e.stopPropagation();
    const switcher = e.currentTarget.closest('.language-switcher');
    const isMobile = switcher.classList.contains('language-switcher-mobile');
    const dropdownId = isMobile ? 'languageDropdownMobile' : 'languageDropdown';
    const dropdown = document.getElementById(dropdownId);
    const btn = e.currentTarget;
    
    // Close other dropdown
    const otherDropdownId = isMobile ? 'languageDropdown' : 'languageDropdownMobile';
    const otherDropdown = document.getElementById(otherDropdownId);
    if (otherDropdown) {
        otherDropdown.classList.remove('active');
    }
    
    dropdown.classList.toggle('active');
    btn.classList.toggle('active');
}

function changeLanguage(lang) {
    console.log("Changing language to:", lang);
    currentLanguage = lang;
    
    // Update both current lang displays
    const currentLangEl = document.getElementById('currentLang');
    const currentLangMobileEl = document.getElementById('currentLangMobile');
    if (currentLangEl) currentLangEl.textContent = lang.toUpperCase();
    if (currentLangMobileEl) currentLangMobileEl.textContent = lang.toUpperCase();
    
    // Update all translation elements
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    // Update selected option in all dropdowns
    document.querySelectorAll('.language-option').forEach(opt => {
        opt.classList.remove('selected');
        if (opt.getAttribute('data-lang') === lang) {
            opt.classList.add('selected');
        }
    });
    
    // Close all dropdowns
    document.querySelectorAll('.language-dropdown').forEach(dd => dd.classList.remove('active'));
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.language-switcher')) {
        document.querySelectorAll('.language-dropdown').forEach(dd => dd.classList.remove('active'));
    }
});