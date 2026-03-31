/**
 * Mobile Viewer — Header Component
 * Renders the site header with navigation, injected into #header-placeholder
 */
(function () {
  'use strict';

  const NAV_LINKS = [
    { href: '/',       label: 'Home' },
    { href: '/#tools',        label: 'Tools' },
    { href: '#features',     label: 'Features' },
    { href: '#how-to-guide', label: 'Guide' },
    { href: '#faq',          label: 'FAQ' },
  ];

  const TOOL_DROPDOWN = [
    { href: '/responsive-viewport-resizer', label: 'Viewport Resizer' },
    { href: '/qr-code-generator',           label: 'QR Code Generator' },
    { href: '/website-screenshot-capturer', label: 'Screenshot Capturer' },
    { href: '/accessibility-contrast-checker', label: 'Contrast Checker' },
    { href: '/user-agent-switcher',         label: 'User Agent Switcher' },
    { href: '/multi-device-preview',        label: 'Multi-Device Preview' },
    { href: '/breakpoint-tester-bookmarklet', label: 'Breakpoint Tester' },
    { href: '/offline-mode-tester',         label: 'Offline Mode Tester' },
    { href: '/device-frame-simulator',      label: 'Device Frame Simulator' },
    { href: '/page-speed',                  label: 'Page Speed Analyzer' },
  ];

  function buildHeader() {
    const toolItems = TOOL_DROPDOWN.map(t =>
      `<li><a href="${t.href}" class="dropdown-item">${t.label}</a></li>`
    ).join('');

    const navLinks = NAV_LINKS.map((l, i) => {
      if (l.label === 'Tools') {
        return `
          <li class="nav-item nav-item--dropdown">
            <button class="nav-link nav-link--btn" aria-haspopup="true" aria-expanded="false" data-dropdown="tools-dd">
              Tools
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <ul class="dropdown-menu" id="tools-dd" role="menu">${toolItems}</ul>
          </li>`;
      }
      return `<li class="nav-item"><a href="${l.href}" class="nav-link">${l.label}</a></li>`;
    }).join('');

    return `
<header id="site-header" class="site-header" role="banner">
  <div class="header-inner">
    <a href="/" class="header-logo" aria-label="Mobile Viewer — Home">
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

    <div class="header-cta">
      <a href="/#viewer" class="header-cta-btn" onclick="scrollToViewer(); return false;" aria-label="Launch Mobile Viewer">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="4" y="1" width="8" height="14" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
          <path d="M7 12h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        Launch Viewer
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
      ${NAV_LINKS.map(l => `<li><a href="${l.href}" class="mobile-nav-link">${l.label}</a></li>`).join('')}
      <li class="mobile-nav-divider" aria-hidden="true"></li>
      <li><a href="#viewer" class="mobile-nav-link mobile-nav-link--cta" onclick="scrollToViewer()">🚀 Launch Viewer</a></li>
    </ul>
    <div class="mobile-tools-grid">
      <p class="mobile-tools-label">Quick Access Tools</p>
      ${TOOL_DROPDOWN.slice(0, 6).map(t => `<a href="${t.href}" class="mobile-tool-link">${t.label}</a>`).join('')}
    </div>
  </div>
  <div class="header-overlay" id="headerOverlay" aria-hidden="true"></div>
</header>
    `.trim();
  }

  function initHeader() {
    const placeholder = document.getElementById('header-placeholder');
    if (!placeholder) return;

    placeholder.outerHTML = buildHeader();

    // ── Scroll behaviour ──────────────────────────────
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

    // ── Hamburger ─────────────────────────────────────
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

    // Close menu on nav link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });

    // ── Tools dropdown ────────────────────────────────
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
        if (!ddBtn.contains(e.target) && !ddMenu.contains(e.target)) {
          ddBtn.setAttribute('aria-expanded', 'false');
          ddMenu.classList.remove('is-open');
        }
      });

      // Keyboard navigation
      ddBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          ddBtn.setAttribute('aria-expanded', 'false');
          ddMenu.classList.remove('is-open');
          ddBtn.focus();
        }
      });
    }

    // ── Active nav link ───────────────────────────────
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

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
  } else {
    initHeader();
  }
})();
