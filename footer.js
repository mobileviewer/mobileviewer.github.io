/**
 * Mobile Viewer — Footer Component
 * Renders the site footer, injected into #footer-placeholder
 */
(function () {
  'use strict';

  const FOOTER_LINKS = {
    Tools: [
      { href: '/responsive-viewport-resizer', label: 'Viewport Resizer' },
      { href: '/qr-code-generator',           label: 'QR Code Generator' },
      { href: '/website-screenshot-capturer', label: 'Screenshot Tool' },
      { href: '/accessibility-contrast-checker', label: 'Contrast Checker' },
      { href: '/user-agent-switcher',         label: 'User Agent Switcher' },
      { href: '/multi-device-preview',        label: 'Multi-Device Preview' },
    ],
    Resources: [
      { href: '#how-to-guide', label: 'How to Check Mobile View' },
      { href: '#why-mobile',   label: 'Why Mobile Testing Matters' },
      { href: '#faq',          label: 'FAQs' },
      { href: '#features',     label: 'Features' },
      { href: '/blog',     label: 'Blog' },
    ],
    Company: [
      { href: '/about',   label: 'About Us' },
      { href: '/contact', label: 'Contact' },
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-of-service',   label: 'Terms of Service' },
      { href: '/sitemap.xml', label: 'Sitemap' },
    ],
  };

  function buildFooter() {
    const colsHTML = Object.entries(FOOTER_LINKS).map(([heading, links]) => `
      <div class="footer-col">
        <h3 class="footer-col-title">${heading}</h3>
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
      <a href="/" class="footer-logo" aria-label="Mobile Viewer Home">
        <div class="logo-icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="7" y="2" width="14" height="22" rx="3" stroke="currentColor" stroke-width="2"/>
            <path d="M12 19h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <rect x="2" y="7" width="24" height="14" rx="2" stroke="currentColor" stroke-width="1.5" opacity=".45"/>
          </svg>
        </div>
        <span class="logo-text">Mobile<span class="logo-accent">Viewer</span></span>
      </a>
      <p class="footer-tagline">The free, professional-grade responsive design tester trusted by 50,000+ developers worldwide.</p>
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
      <p class="footer-copy">© ${year} Mobile Viewer. All rights reserved. Made for developers, by developers.</p>
      <p class="footer-legal">
        <a href="/privacy-policy" class="footer-legal-link">Privacy</a>
        <span aria-hidden="true">·</span>
        <a href="/terms-of-service" class="footer-legal-link">Terms</a>
        <span aria-hidden="true">·</span>
        <a href="/sitemap.xml" class="footer-legal-link">Sitemap</a>
      </p>
    </div>
  </div>
</footer>
    `.trim();
  }

  function initFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;
    placeholder.outerHTML = buildFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooter);
  } else {
    initFooter();
  }
})();
