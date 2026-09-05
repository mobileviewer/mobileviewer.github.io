/**
 * Mobile Viewer — Header Component (Multilingual)
 * Renders the site header with navigation and language selector
 * Injected into #header-placeholder
 */
(function () {
  'use strict';

  // ─── SUPPORTED LANGUAGES ──────────────────────────────
  const SUPPORTED_LANGUAGES = {
    en: { code: 'en', label: 'English', flag: '🇬🇧', locale: 'en_US' },
    de: { code: 'de', label: 'Deutsch', flag: '🇩🇪', locale: 'de_DE' },
    es: { code: 'es', label: 'Español', flag: '🇪🇸', locale: 'es_ES' },
    fr: { code: 'fr', label: 'Français', flag: '🇫🇷', locale: 'fr_FR' },
    it: { code: 'it', label: 'Italiano', flag: '🇮🇹', locale: 'it_IT' },
  };

  const DEFAULT_LANGUAGE = 'en';
  const STORAGE_KEY = 'mobile-viewer-language';

  // ─── TRANSLATIONS ──────────────────────────────────────
  const TRANSLATIONS = {
    en: {
      home: 'Home',
      tools: 'Tools',
      features: 'Features',
      guide: 'Guide',
      faq: 'FAQ',
      blog: 'Blog',
      launchViewer: 'Launch Viewer',
      quickAccess: 'Quick Access Tools',
      // Footer
      footerTagline: 'The free, professional-grade responsive design tester trusted by 50,000+ developers worldwide.',
      footerTools: 'Tools',
      footerResources: 'Resources',
      footerPages: 'Pages',
      footerHowTo: 'How to Check Mobile View',
      footerWhy: 'Why Mobile Testing Matters',
      footerFeatures: 'Features',
      footerAbout: 'About Us',
      footerContact: 'Contact',
      footerPrivacy: 'Privacy Policy',
      footerTerms: 'Terms of Service',
      footerSitemap: 'Sitemap',
      footerCopyright: 'All rights reserved. Made for developers, by developers.',
      footerLegal: 'Legal',
      footerPrivacyShort: 'Privacy',
      footerTermsShort: 'Terms',
      // Language
      language: 'Language',
      // Viewer tools
      viewportResizer: 'Viewport Resizer',
      qrGenerator: 'QR Code Generator',
      screenshotTool: 'Screenshot Tool',
      contrastChecker: 'Contrast Checker',
      uaSwitcher: 'User Agent Switcher',
      multiDevice: 'Multi-Device Preview',
      breakpointTester: 'Breakpoint Tester',
      offlineTester: 'Offline Mode Tester',
      deviceFrame: 'Device Frame Simulator',
      pageSpeed: 'Page Speed Analyzer',
      cameraTester: 'Camera Tester',
      speakerTester: 'Speaker Tester',
      micTester: 'Mic Tester',
      emailPreview: 'Email Preview',
      emailLinkGen: 'Email Link Generator',
      notepad: 'Notepad Online',
    },
    de: {
      home: 'Startseite',
      tools: 'Werkzeuge',
      features: 'Funktionen',
      guide: 'Anleitung',
      faq: 'FAQ',
      blog: 'Blog',
      launchViewer: 'Viewer starten',
      quickAccess: 'Schnellzugriff-Werkzeuge',
      footerTagline: 'Der kostenlose, professionelle Responsive-Design-Tester, dem 50.000+ Entwickler weltweit vertrauen.',
      footerTools: 'Werkzeuge',
      footerResources: 'Ressourcen',
      footerPages: 'Seiten',
      footerHowTo: 'So prüfen Sie die mobile Ansicht',
      footerWhy: 'Warum mobiles Testen wichtig ist',
      footerFeatures: 'Funktionen',
      footerAbout: 'Über uns',
      footerContact: 'Kontakt',
      footerPrivacy: 'Datenschutzerklärung',
      footerTerms: 'Nutzungsbedingungen',
      footerSitemap: 'Sitemap',
      footerCopyright: 'Alle Rechte vorbehalten. Von Entwicklern für Entwickler.',
      footerLegal: 'Rechtliches',
      footerPrivacyShort: 'Datenschutz',
      footerTermsShort: 'AGB',
      language: 'Sprache',
      viewportResizer: 'Viewport Resizer',
      qrGenerator: 'QR-Code-Generator',
      screenshotTool: 'Screenshot-Tool',
      contrastChecker: 'Kontrastprüfer',
      uaSwitcher: 'User-Agent-Switcher',
      multiDevice: 'Multi-Device-Vorschau',
      breakpointTester: 'Breakpoint-Tester',
      offlineTester: 'Offline-Modus-Tester',
      deviceFrame: 'Geräte-Rahmen-Simulator',
      pageSpeed: 'Page-Speed-Analyzer',
      cameraTester: 'Kamera-Tester',
      speakerTester: 'Lautsprecher-Tester',
      micTester: 'Mikrofon-Tester',
      emailPreview: 'E-Mail-Vorschau',
      emailLinkGen: 'E-Mail-Link-Generator',
      notepad: 'Notizblock Online',
    },
    es: {
      home: 'Inicio',
      tools: 'Herramientas',
      features: 'Características',
      guide: 'Guía',
      faq: 'Preguntas Frecuentes',
      blog: 'Blog',
      launchViewer: 'Lanzar Visor',
      quickAccess: 'Herramientas de Acceso Rápido',
      footerTagline: 'El probador de diseño responsive gratuito y de nivel profesional en el que confían más de 50.000 desarrolladores en todo el mundo.',
      footerTools: 'Herramientas',
      footerResources: 'Recursos',
      footerPages: 'Páginas',
      footerHowTo: 'Cómo verificar la vista móvil',
      footerWhy: 'Por qué importa el testing móvil',
      footerFeatures: 'Características',
      footerAbout: 'Sobre nosotros',
      footerContact: 'Contacto',
      footerPrivacy: 'Política de Privacidad',
      footerTerms: 'Términos de Servicio',
      footerSitemap: 'Mapa del sitio',
      footerCopyright: 'Todos los derechos reservados. Hecho por desarrolladores, para desarrolladores.',
      footerLegal: 'Legal',
      footerPrivacyShort: 'Privacidad',
      footerTermsShort: 'Términos',
      language: 'Idioma',
      viewportResizer: 'Redimensionador de Viewport',
      qrGenerator: 'Generador de Códigos QR',
      screenshotTool: 'Capturador de Pantallas',
      contrastChecker: 'Verificador de Contraste',
      uaSwitcher: 'Cambiador de User Agent',
      multiDevice: 'Vista Previa Multi-dispositivo',
      breakpointTester: 'Probador de Breakpoints',
      offlineTester: 'Probador de Modo Offline',
      deviceFrame: 'Simulador de Marcos',
      pageSpeed: 'Analizador de Velocidad',
      cameraTester: 'Probador de Cámara',
      speakerTester: 'Probador de Altavoces',
      micTester: 'Probador de Micrófono',
      emailPreview: 'Vista Previa de Email',
      emailLinkGen: 'Generador de Enlaces de Email',
      notepad: 'Bloc de Notas Online',
    },
    fr: {
      home: 'Accueil',
      tools: 'Outils',
      features: 'Fonctionnalités',
      guide: 'Guide',
      faq: 'FAQ',
      blog: 'Blog',
      launchViewer: 'Lancer le Visionneur',
      quickAccess: 'Outils d\'Accès Rapide',
      footerTagline: 'Le testeur de design responsive gratuit et professionnel en qui plus de 50 000 développeurs dans le monde ont confiance.',
      footerTools: 'Outils',
      footerResources: 'Ressources',
      footerPages: 'Pages',
      footerHowTo: 'Comment vérifier la vue mobile',
      footerWhy: 'Pourquoi le test mobile est important',
      footerFeatures: 'Fonctionnalités',
      footerAbout: 'À propos',
      footerContact: 'Contact',
      footerPrivacy: 'Politique de Confidentialité',
      footerTerms: 'Conditions d\'Utilisation',
      footerSitemap: 'Plan du site',
      footerCopyright: 'Tous droits réservés. Conçu par des développeurs, pour des développeurs.',
      footerLegal: 'Juridique',
      footerPrivacyShort: 'Confidentialité',
      footerTermsShort: 'Conditions',
      language: 'Langue',
      viewportResizer: 'Redimensionneur de Viewport',
      qrGenerator: 'Générateur de Codes QR',
      screenshotTool: 'Outil de Capture d\'Écran',
      contrastChecker: 'Vérificateur de Contraste',
      uaSwitcher: 'Changeur d\'User Agent',
      multiDevice: 'Aperçu Multi-appareils',
      breakpointTester: 'Testeur de Points de Rupture',
      offlineTester: 'Testeur Hors Ligne',
      deviceFrame: 'Simulateur de Cadres',
      pageSpeed: 'Analyseur de Vitesse',
      cameraTester: 'Testeur de Caméra',
      speakerTester: 'Testeur de Haut-parleurs',
      micTester: 'Testeur de Micro',
      emailPreview: 'Aperçu Email',
      emailLinkGen: 'Générateur de Liens Email',
      notepad: 'Bloc-notes en Ligne',
    },
    it: {
      home: 'Home',
      tools: 'Strumenti',
      features: 'Caratteristiche',
      guide: 'Guida',
      faq: 'FAQ',
      blog: 'Blog',
      launchViewer: 'Lancia Visualizzatore',
      quickAccess: 'Strumenti ad Accesso Rapido',
      footerTagline: 'Il tester di design responsive gratuito e professionale affidabile da oltre 50.000 sviluppatori in tutto il mondo.',
      footerTools: 'Strumenti',
      footerResources: 'Risorse',
      footerPages: 'Pagine',
      footerHowTo: 'Come controllare la vista mobile',
      footerWhy: 'Perché il testing mobile è importante',
      footerFeatures: 'Caratteristiche',
      footerAbout: 'Chi siamo',
      footerContact: 'Contatti',
      footerPrivacy: 'Informativa sulla Privacy',
      footerTerms: 'Termini di Servizio',
      footerSitemap: 'Mappa del sito',
      footerCopyright: 'Tutti i diritti riservati. Creato da sviluppatori, per sviluppatori.',
      footerLegal: 'Legale',
      footerPrivacyShort: 'Privacy',
      footerTermsShort: 'Termini',
      language: 'Lingua',
      viewportResizer: 'Ridimensionatore Viewport',
      qrGenerator: 'Generatore Codici QR',
      screenshotTool: 'Cattura Schermo',
      contrastChecker: 'Controllore Contrasto',
      uaSwitcher: 'Cambiatore User Agent',
      multiDevice: 'Anteprima Multi-dispositivo',
      breakpointTester: 'Tester Punti di Interruzione',
      offlineTester: 'Tester Modalità Offline',
      deviceFrame: 'Simulatore Cornici',
      pageSpeed: 'Analizzatore Velocità',
      cameraTester: 'Test Fotocamera',
      speakerTester: 'Test Altoparlanti',
      micTester: 'Test Microfono',
      emailPreview: 'Anteprima Email',
      emailLinkGen: 'Generatore Link Email',
      notepad: 'Blocco Note Online',
    }
  };

  // ─── LANGUAGE UTILITIES ──────────────────────────────
  function getCurrentLanguage() {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    if (segments.length > 0 && SUPPORTED_LANGUAGES[segments[0]]) {
      return segments[0];
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED_LANGUAGES[stored]) return stored;
    } catch (e) {}
    const browserLang = (navigator.language || navigator.languages?.[0] || 'en').split('-')[0];
    return SUPPORTED_LANGUAGES[browserLang] ? browserLang : DEFAULT_LANGUAGE;
  }

  function getLanguagePath(lang) {
    if (lang === DEFAULT_LANGUAGE) return '/';
    return `/${lang}/`;
  }

  function switchLanguage(lang) {
    if (!SUPPORTED_LANGUAGES[lang]) return;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    const targetPath = getLanguagePath(lang);
    const currentPath = window.location.pathname;
    if (currentPath === targetPath || 
        (lang === DEFAULT_LANGUAGE && (currentPath === '/' || currentPath === ''))) {
      window.location.reload();
      return;
    }
    window.location.href = targetPath;
  }

  function t(key, lang) {
    const currentLang = lang || getCurrentLanguage();
    return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS[DEFAULT_LANGUAGE]?.[key] || key;
  }

  // ─── TOOL DEFINITIONS ──────────────────────────────────
  const TOOL_DROPDOWN = [
    { href: '/responsive-viewport-resizer', key: 'viewportResizer' },
    { href: '/qr-code-generator', key: 'qrGenerator' },
    { href: '/website-screenshot-capturer', key: 'screenshotTool' },
    { href: '/accessibility-contrast-checker', key: 'contrastChecker' },
    { href: '/user-agent-switcher', key: 'uaSwitcher' },
    { href: '/multi-device-preview', key: 'multiDevice' },
    { href: '/breakpoint-tester-bookmarklet', key: 'breakpointTester' },
    { href: '/offline-mode-tester', key: 'offlineTester' },
    { href: '/device-frame-simulator', key: 'deviceFrame' },
    { href: '/page-speed', key: 'pageSpeed' },
    { href: '/camera-test', key: 'cameraTester' },
    { href: '/speaker-test', key: 'speakerTester' },
    { href: '/mic-check', key: 'micTester' },
    { href: '/email-preview', key: 'emailPreview' },
    { href: '/email-link-generator', key: 'emailLinkGen' },
    { href: '/notepad', key: 'notepad' },
  ];

  const NAV_LINKS = [
    { href: '/', key: 'home' },
    { href: '/#tools', key: 'tools', hasDropdown: true },
    { href: '#features', key: 'features' },
    { href: '#how-to-guide', key: 'guide' },
    { href: '#faq', key: 'faq' },
    { href: '/blog', key: 'blog' },
  ];

  // ─── BUILD HEADER ──────────────────────────────────────
  function buildHeader() {
    const lang = getCurrentLanguage();
    const tFn = (key) => t(key, lang);

    const toolItems = TOOL_DROPDOWN.map(tool =>
      `<li><a href="${tool.href}" class="dropdown-item">${tFn(tool.key)}</a></li>`
    ).join('');

    const mobileToolItems = TOOL_DROPDOWN.map(tool =>
      `<li><a href="${tool.href}" class="mobile-nav-link mobile-nav-link--sub">${tFn(tool.key)}</a></li>`
    ).join('');

    // Language selector dropdown options
    const langOptions = Object.values(SUPPORTED_LANGUAGES).map(l =>
      `<button class="lang-option ${l.code === lang ? 'active' : ''}" data-lang="${l.code}" role="menuitem">
        ${l.flag} ${l.label}
      </button>`
    ).join('');

    const navLinks = NAV_LINKS.map((l) => {
      if (l.key === 'tools') {
        return `
          <li class="nav-item nav-item--dropdown">
            <button class="nav-link nav-link--btn" aria-haspopup="true" aria-expanded="false" data-dropdown="tools-dd">
              ${tFn('tools')}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <ul class="dropdown-menu" id="tools-dd" role="menu">${toolItems}</ul>
          </li>`;
      }
      return `<li class="nav-item"><a href="${l.href}" class="nav-link">${tFn(l.key)}</a></li>`;
    }).join('');

    return `
<header id="site-header" class="site-header" role="banner">
  <div class="header-inner">
    <a href="${getLanguagePath(lang)}" class="header-logo" aria-label="Mobile Viewer — Home">
      <div class="logo-icon" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="7" y="2" width="14" height="22" rx="3" stroke="currentColor" stroke-width="2"/>
          <path d="M12 19h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <rect x="2" y="7" width="24" height="14" rx="2" stroke="currentColor" stroke-width="1.5" opacity=".45"/>
        </svg>
      </div>
      <span class="logo-text">Mobile<span class="logo-accent">Viewer</span></span>
    </a>

    <nav class="header-nav" aria-label="Main navigation">
      <ul class="nav-list" role="list">
        ${navLinks}
      </ul>
    </nav>

    <!-- Language Selector -->
    <div class="lang-selector-wrapper">
      <button class="lang-selector-btn" id="langSelectorBtn" aria-haspopup="true" aria-expanded="false">
        <span class="lang-flag">${SUPPORTED_LANGUAGES[lang].flag}</span>
        <span class="lang-code">${lang.toUpperCase()}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M2 3l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="lang-dropdown" id="langDropdown" role="menu" aria-label="Language selector">
        ${langOptions}
      </div>
    </div>

    <div class="header-cta">
      <a href="${getLanguagePath(lang)}#viewerStage" class="header-cta-btn" onclick="scrollToViewer(); return false;" aria-label="${tFn('launchViewer')}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="4" y="1" width="8" height="14" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
          <path d="M7 12h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        ${tFn('launchViewer')}
      </a>
    </div>

    <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>

  <!-- Mobile Menu -->
  <div class="mobile-menu" id="mobile-menu" aria-hidden="true" role="navigation" aria-label="Mobile navigation">
    <ul class="mobile-nav-list" role="list">
      <li><a href="${getLanguagePath(lang)}" class="mobile-nav-link">${tFn('home')}</a></li>
      <li class="mobile-nav-item--dropdown">
        <button class="mobile-nav-link mobile-dropdown-trigger" data-mobile-dropdown="mobile-tools-dd" aria-expanded="false">
          ${tFn('tools')}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" class="dropdown-arrow">
            <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <ul class="mobile-dropdown-menu" id="mobile-tools-dd" style="display: none;">${mobileToolItems}</ul>
      </li>
      <li><a href="#features" class="mobile-nav-link">${tFn('features')}</a></li>
      <li><a href="#how-to-guide" class="mobile-nav-link">${tFn('guide')}</a></li>
      <li><a href="#faq" class="mobile-nav-link">${tFn('faq')}</a></li>
      <li class="mobile-nav-divider" aria-hidden="true"></li>
      <li>
        <a href="${getLanguagePath(lang)}#viewer" class="mobile-nav-link mobile-nav-link--cta" onclick="scrollToViewer()">
          🚀 ${tFn('launchViewer')}
        </a>
      </li>
    </ul>
    <div class="mobile-tools-grid">
      <p class="mobile-tools-label">${tFn('quickAccess')}</p>
      ${TOOL_DROPDOWN.slice(0, 6).map(tool => 
        `<a href="${tool.href}" class="mobile-tool-link">${tFn(tool.key)}</a>`
      ).join('')}
    </div>
    <!-- Mobile Language Switcher -->
    <div class="mobile-lang-switcher">
      <p class="mobile-tools-label">${tFn('language')}</p>
      <div class="mobile-lang-options">
        ${Object.values(SUPPORTED_LANGUAGES).map(l =>
          `<button class="mobile-lang-btn ${l.code === lang ? 'active' : ''}" data-lang="${l.code}">
            ${l.flag} ${l.label}
          </button>`
        ).join('')}
      </div>
    </div>
  </div>
  <div class="header-overlay" id="headerOverlay" aria-hidden="true"></div>
</header>
    `.trim();
  }

  // ─── INIT HEADER ───────────────────────────────────────
  function initHeader() {
    const placeholder = document.getElementById('header-placeholder');
    if (!placeholder) return;

    placeholder.outerHTML = buildHeader();

    // ─── Language Selector ──────────────────────────────
    const langBtn = document.getElementById('langSelectorBtn');
    const langDropdown = document.getElementById('langDropdown');

    if (langBtn && langDropdown) {
      langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = langBtn.getAttribute('aria-expanded') === 'true';
        langBtn.setAttribute('aria-expanded', String(!isOpen));
        langDropdown.classList.toggle('is-open', !isOpen);
      });

      langDropdown.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', () => {
          const lang = btn.dataset.lang;
          if (lang && lang !== getCurrentLanguage()) {
            switchLanguage(lang);
          }
          langBtn.setAttribute('aria-expanded', 'false');
          langDropdown.classList.remove('is-open');
        });
      });

      document.addEventListener('click', (e) => {
        if (langBtn && langDropdown && 
            !langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
          langBtn.setAttribute('aria-expanded', 'false');
          langDropdown.classList.remove('is-open');
        }
      });
    }

    // ─── Mobile Language Switcher ────────────────────────
    document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        if (lang && lang !== getCurrentLanguage()) {
          switchLanguage(lang);
        }
      });
    });

    // ─── Scroll behaviour ──────────────────────────────
    const header = document.getElementById('site-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const current = window.scrollY;
      if (current > 60) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
      if (current > lastScroll && current > 120) {
        header.classList.add('header--hidden');
      } else {
        header.classList.remove('header--hidden');
      }
      lastScroll = current;
    }, { passive: true });

    // ─── Hamburger ─────────────────────────────────────
    const ham = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('headerOverlay');

    function openMenu() {
      ham.classList.add('is-open');
      mobileMenu.classList.add('is-open');
      overlay.classList.add('is-visible');
      ham.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      ham.classList.remove('is-open');
      mobileMenu.classList.remove('is-open');
      overlay.classList.remove('is-visible');
      ham.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    ham.addEventListener('click', () => {
      ham.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });

    // ─── Mobile dropdown ────────────────────────────────
    const mobileDropdownTrigger = document.querySelector('.mobile-dropdown-trigger');
    const mobileDropdownMenu = document.getElementById('mobile-tools-dd');

    if (mobileDropdownTrigger && mobileDropdownMenu) {
      mobileDropdownTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = mobileDropdownTrigger.getAttribute('aria-expanded') === 'true';
        mobileDropdownTrigger.setAttribute('aria-expanded', String(!isExpanded));
        if (!isExpanded) {
          mobileDropdownMenu.style.display = 'block';
          mobileDropdownTrigger.querySelector('.dropdown-arrow').style.transform = 'rotate(180deg)';
        } else {
          mobileDropdownMenu.style.display = 'none';
          mobileDropdownTrigger.querySelector('.dropdown-arrow').style.transform = 'rotate(0deg)';
        }
      });
    }

    // ─── Desktop dropdown ───────────────────────────────
    const ddBtn = document.querySelector('[data-dropdown="tools-dd"]');
    const ddMenu = document.getElementById('tools-dd');

    if (ddBtn && ddMenu) {
      ddBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = ddBtn.getAttribute('aria-expanded') === 'true';
        ddBtn.setAttribute('aria-expanded', String(!isOpen));
        ddMenu.classList.toggle('is-open', !isOpen);
      });

      document.addEventListener('click', (e) => {
        if (ddBtn && ddMenu && !ddBtn.contains(e.target) && !ddMenu.contains(e.target)) {
          ddBtn.setAttribute('aria-expanded', 'false');
          ddMenu.classList.remove('is-open');
        }
      });

      ddBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          ddBtn.setAttribute('aria-expanded', 'false');
          ddMenu.classList.remove('is-open');
          ddBtn.focus();
        }
      });
    }

    // ─── Active nav link ───────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('nav-link--active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('nav-link--active');
            }
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => observer.observe(s));
  }

  // ─── EXPOSE GLOBALLY ──────────────────────────────────
  window.i18n = {
    getCurrentLanguage,
    getLanguagePath,
    switchLanguage,
    t,
    SUPPORTED_LANGUAGES,
    TRANSLATIONS,
  };

  // ─── RUN ──────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
  } else {
    initHeader();
  }
})();
