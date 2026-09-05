// /js/language.js
(function() {
  'use strict';

  const SUPPORTED_LANGUAGES = ['en', 'de', 'es', 'fr', 'it'];
  const DEFAULT_LANGUAGE = 'en';
  const STORAGE_KEY = 'mobile-viewer-language';

  function getBrowserLanguage() {
    const lang = navigator.language || navigator.languages?.[0] || 'en';
    const shortLang = lang.split('-')[0].toLowerCase();
    return SUPPORTED_LANGUAGES.includes(shortLang) ? shortLang : DEFAULT_LANGUAGE;
  }

  function getStoredLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function setStoredLanguage(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors
    }
  }

  function getPathLanguage() {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    if (segments.length > 0 && SUPPORTED_LANGUAGES.includes(segments[0])) {
      return segments[0];
    }
    return null;
  }

  function getCurrentLanguage() {
    // Priority: URL path > localStorage > browser preference > default
    const pathLang = getPathLanguage();
    if (pathLang) return pathLang;

    const storedLang = getStoredLanguage();
    if (storedLang && SUPPORTED_LANGUAGES.includes(storedLang)) {
      return storedLang;
    }

    const browserLang = getBrowserLanguage();
    if (SUPPORTED_LANGUAGES.includes(browserLang)) {
      return browserLang;
    }

    return DEFAULT_LANGUAGE;
  }

  function getLanguagePath(lang) {
    if (lang === DEFAULT_LANGUAGE) return '/';
    return `/${lang}/`;
  }

  function getFullLanguageUrl(lang) {
    const baseUrl = window.location.origin;
    return baseUrl + getLanguagePath(lang);
  }

  function switchLanguage(lang) {
    if (!SUPPORTED_LANGUAGES.includes(lang)) return;
    setStoredLanguage(lang);
    const targetPath = getLanguagePath(lang);
    const currentPath = window.location.pathname;
    
    // If already on the correct language path, reload
    if (currentPath === targetPath || 
        (lang === DEFAULT_LANGUAGE && currentPath === '/')) {
      window.location.reload();
      return;
    }
    
    window.location.href = targetPath;
  }

  // Expose to global scope
  window.i18n = {
    getCurrentLanguage,
    getLanguagePath,
    getFullLanguageUrl,
    switchLanguage,
    SUPPORTED_LANGUAGES,
    DEFAULT_LANGUAGE,
    translations
  };

  // Language switcher initialization
  document.addEventListener('DOMContentLoaded', function() {
    const currentLang = getCurrentLanguage();
    
    // Add language switcher buttons
    const languageSwitcher = document.createElement('div');
    languageSwitcher.className = 'language-switcher';
    languageSwitcher.innerHTML = `
      <button class="lang-btn" data-lang="en" aria-label="English">🇬🇧 EN</button>
      <button class="lang-btn" data-lang="de" aria-label="Deutsch">🇩🇪 DE</button>
      <button class="lang-btn" data-lang="es" aria-label="Español">🇪🇸 ES</button>
      <button class="lang-btn" data-lang="fr" aria-label="Français">🇫🇷 FR</button>
      <button class="lang-btn" data-lang="it" aria-label="Italiano">🇮🇹 IT</button>
    `;

    // Find a place to insert the language switcher (e.g., header)
    const headerNav = document.querySelector('.header-nav .nav-list');
    if (headerNav) {
      const li = document.createElement('li');
      li.className = 'nav-item--lang';
      li.appendChild(languageSwitcher);
      headerNav.appendChild(li);
    } else {
      // Fallback: add to header
      const headerInner = document.querySelector('.header-inner');
      if (headerInner) {
        const wrapper = document.createElement('div');
        wrapper.className = 'language-switcher-wrapper';
        wrapper.appendChild(languageSwitcher);
        headerInner.appendChild(wrapper);
      }
    }

    // Highlight current language
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const lang = btn.dataset.lang;
      if (lang === currentLang) {
        btn.classList.add('active');
      }
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const targetLang = this.dataset.lang;
        if (targetLang !== currentLang) {
          switchLanguage(targetLang);
        }
      });
    });

    // For mobile menu
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
      const mobileLang = document.createElement('div');
      mobileLang.className = 'mobile-lang-switcher';
      mobileLang.innerHTML = `
        <span class="mobile-lang-label">${translations[currentLang]?.language || 'Language'}</span>
        <div class="mobile-lang-options">
          ${SUPPORTED_LANGUAGES.map(lang => `
            <button class="mobile-lang-btn ${lang === currentLang ? 'active' : ''}" data-lang="${lang}">
              ${lang === 'en' ? '🇬🇧 English' : 
                lang === 'de' ? '🇩🇪 Deutsch' : 
                lang === 'es' ? '🇪🇸 Español' : 
                lang === 'fr' ? '🇫🇷 Français' : '🇮🇹 Italiano'}
            </button>
          `).join('')}
        </div>
      `;
      mobileMenu.appendChild(mobileLang);
      
      mobileLang.querySelectorAll('.mobile-lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const lang = this.dataset.lang;
          if (lang !== currentLang) {
            switchLanguage(lang);
          }
        });
      });
    }
  });
})();
