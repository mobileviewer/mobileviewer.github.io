/**
 * Mobile Viewer — Footer Component (Multilingual)
 * Renders the site footer with translated content
 * Injected into #footer-placeholder
 */
(function () {
  'use strict';

  // ─── SUPPORTED LANGUAGES ──────────────────────────────
  const SUPPORTED_LANGUAGES = {
    en: { code: 'en', label: 'English', flag: '🇬🇧' },
    de: { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    es: { code: 'es', label: 'Español', flag: '🇪🇸' },
    fr: { code: 'fr', label: 'Français', flag: '🇫🇷' },
    it: { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  };

  const DEFAULT_LANGUAGE = 'en';
  const STORAGE_KEY = 'mobile-viewer-language';

  // ─── TRANSLATIONS ──────────────────────────────────────
  const TRANSLATIONS = {
    en: {
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
      // Tools
      viewportResizer: 'Viewport Resizer',
      qrGenerator: 'QR Code Generator',
      screenshotTool: 'Screenshot Tool',
      contrastChecker: 'Contrast Checker',
      uaSwitcher: 'User Agent Switcher',
      multiDevice: 'Multi-Device Preview',
    },
    de: {
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
      viewportResizer: 'Viewport Resizer',
      qrGenerator: 'QR-Code-Generator',
      screenshotTool: 'Screenshot-Tool',
      contrastChecker: 'Kontrastprüfer',
      uaSwitcher: 'User-Agent-Switcher',
      multiDevice: 'Multi-Device-Vorschau',
    },
    es: {
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
      viewportResizer: 'Redimensionador de Viewport',
      qrGenerator: 'Generador de Códigos QR',
      screenshotTool: 'Capturador de Pantallas',
      contrastChecker: 'Verificador de Contraste',
      uaSwitcher: 'Cambiador de User Agent',
      multiDevice: 'Vista Previa Multi-dispositivo',
    },
    fr: {
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
      viewportResizer: 'Redimensionneur de Viewport',
      qrGenerator: 'Générateur de Codes QR',
      screenshotTool: 'Outil de Capture d\'Écran',
      contrastChecker: 'Vérificateur de Contraste',
      uaSwitcher: 'Changeur d\'User Agent',
      multiDevice: 'Aperçu Multi-appareils',
    },
    it: {
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
      viewportResizer: 'Ridimensionatore Viewport',
      qrGenerator: 'Generatore Codici QR',
      screenshotTool: 'Cattura Schermo',
      contrastChecker: 'Controllore Contrasto',
      uaSwitcher: 'Cambiatore User Agent',
      multiDevice: 'Anteprima Multi-dispositivo',
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

  function t(key, lang) {
    const currentLang = lang || getCurrentLanguage();
    return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS[DEFAULT_LANGUAGE]?.[key] || key;
  }

  // ─── FOOTER LINK DEFINITIONS ──────────────────────────
  function getFooterLinks(lang) {
    const tFn = (key) => t(key, lang);
    return {
      Tools: [
        { href: `${getLanguagePath(lang)}responsive-viewport-resizer`, label: tFn('viewportResizer') },
        { href: `${getLanguagePath(lang)}qr-code-generator`, label: tFn('qrGenerator') },
        { href: `${getLanguagePath(lang)}website-screenshot-capturer`, label: tFn('screenshotTool') },
        { href: `${getLanguagePath(lang)}accessibility-contrast-checker`, label: tFn('contrastChecker') },
        { href: `${getLanguagePath(lang)}user-agent-switcher`, label: tFn('uaSwitcher') },
        { href: `${getLanguagePath(lang)}multi-device-preview`, label: tFn('multiDevice') },
      ],
      Resources: [
        { href: `${getLanguagePath(lang)}#how-to-guide`, label: tFn('footerHowTo') },
        { href: `${getLanguagePath(lang)}#why-mobile`, label: tFn('footerWhy') },
        { href: `${getLanguagePath(lang)}#faq`, label: 'FAQ' },
        { href: `${getLanguagePath(lang)}#features`, label: tFn('footerFeatures') },
        { href: `${getLanguagePath(lang)}blog`, label: 'Blog' },
      ],
      Pages: [
        { href: `${getLanguagePath(lang)}about`, label: tFn('footerAbout') },
        { href: `${getLanguagePath(lang)}contact`, label: tFn('footerContact') },
        { href: `${getLanguagePath(lang)}privacy-policy`, label: tFn('footerPrivacy') },
        { href: `${getLanguagePath(lang)}terms-of-service`, label: tFn('footerTerms') },
        { href: `${getLanguagePath(lang)}sitemap.xml`, label: tFn('footerSitemap') },
      ],
    };
  }

  // ─── BUILD FOOTER ──────────────────────────────────────
  function buildFooter() {
    const lang = getCurrentLanguage();
    const tFn = (key) => t(key, lang);
    const footerLinks = getFooterLinks(lang);

    const colsHTML = Object.entries(footerLinks).map(([heading, links]) => `
      <div class="footer-col">
        <h3 class="footer-col-title">${tFn(`footer${heading}`) || heading}</h3>
        <ul class="footer-col-list" role="list">
          ${links.map(l => `<li><a href="${l.href}" class="footer-link">${l.label}</a></li>`).join('')}
        </ul>
      </div>
    `).join('');

    const year = new Date().getFullYear();

    return `
<footer id="site-footer" class="site-footer" role="contentinfo">
  <div class="footer-glow" aria-hidden="true"></div>
  <div class="container footer-inner">

    <!-- Brand Column -->
    <div class="footer-brand">
      <a href="${getLanguagePath(lang)}" class="footer-logo" aria-label="Mobile Viewer Home">
        <div class="logo-icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="7" y="2" width="14" height="22" rx="3" stroke="currentColor" stroke-width="2"/>
            <path d="M12 19h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <rect x="2" y="7" width="24" height="14" rx="2" stroke="currentColor" stroke-width="1.5" opacity=".45"/>
          </svg>
        </div>
        <span class="logo-text">Mobile<span class="logo-accent">Viewer</span></span>
      </a>
      <p class="footer-tagline">${tFn('footerTagline')}</p>
      <div class="footer-socials" aria-label="Social media links">
        <a href="https://github.com/mobileviewer" class="social-link" aria-label="GitHub" rel="noopener" target="_blank">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
        </a>
      </div>
      <div class="footer-badge-row">
        <span class="footer-badge">✓ Free Forever</span>
        <span class="footer-badge">✓ No Sign-up</span>
        <span class="footer-badge">✓ No Install</span>
      </div>
    </div>

    <!-- Link Columns -->
    <nav class="footer-links-wrapper" aria-label="Footer navigation">
      ${colsHTML}
    </nav>
  </div>

  <!-- Bottom Bar -->
  <div class="footer-bottom">
    <div class="container footer-bottom-inner">
      <p class="footer-copy">© ${year} Mobile Viewer. ${tFn('footerCopyright')}</p>
      <p class="footer-legal">
        <a href="${getLanguagePath(lang)}privacy-policy" class="footer-legal-link">${tFn('footerPrivacyShort')}</a>
        <span aria-hidden="true">·</span>
        <a href="${getLanguagePath(lang)}terms-of-service" class="footer-legal-link">${tFn('footerTermsShort')}</a>
        <span aria-hidden="true">·</span>
        <a href="${getLanguagePath(lang)}sitemap.xml" class="footer-legal-link">${tFn('footerSitemap')}</a>
      </p>
    </div>
  </div>
</footer>
    `.trim();
  }

  // ─── INIT FOOTER ───────────────────────────────────────
  function initFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;
    placeholder.outerHTML = buildFooter();
  }

  // ─── RUN ──────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooter);
  } else {
    initFooter();
  }
})();
