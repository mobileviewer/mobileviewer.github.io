/**
 * Mobile Viewer — Main Application Script
 * Full-featured responsive viewer with device simulation, QR, zoom, orientation, etc.
 */
(function () {
  'use strict';

  // ══════════════════════════════════════════════════════════
  // STATE
  // ══════════════════════════════════════════════════════════
  const state = {
    currentDevice: 'mobile',
    currentUrl: '',
    zoom: 80,
    isLandscape: false,
    loaded: false,
    dimensions: { width: 390, height: 844 },
  };

  const DEVICE_DIMS = {
    mobile: { width: 390, height: 844 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1280, height: 800 },
  };

  // ══════════════════════════════════════════════════════════
  // HELPERS
  // ══════════════════════════════════════════════════════════
  function $(id) { return document.getElementById(id); }

  function formatNumber(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M+';
    if (n >= 1000) return (n / 1000).toFixed(0) + 'K+';
    return n.toString();
  }

  function normaliseUrl(raw) {
    const protocol = ($('protocolSelect') || {}).value || 'https://';
    raw = raw.trim();
    if (!raw) return '';
    if (/^https?:\/\//i.test(raw)) return raw;
    if (raw.startsWith('//')) return 'https:' + raw;
    return protocol + raw;
  }

  function setStatus(text, type = '') {
    const indicator = $('statusIndicator');
    const statusText = $('statusText');
    if (!statusText) return;
    statusText.textContent = text;
    if (indicator) {
      indicator.className = 'status-indicator';
      if (type) indicator.classList.add('status-indicator--' + type);
    }
  }

  function setDimDisplay() {
    const d = $('statusDim');
    if (!d) return;
    const w = state.isLandscape ? state.dimensions.height : state.dimensions.width;
    const h = state.isLandscape ? state.dimensions.width : state.dimensions.height;
    d.textContent = `${w} × ${h} px`;
  }

  // ══════════════════════════════════════════════════════════
  // URL INPUT
  // ══════════════════════════════════════════════════════════
  function initUrlInput() {
    const input = $('urlInput');
    const clearBtn = $('urlClearBtn');
    if (!input) return;

    input.addEventListener('input', () => {
      if (clearBtn) clearBtn.style.display = input.value ? 'flex' : 'none';
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') loadURL();
    });

    input.addEventListener('paste', () => {
      setTimeout(() => {
        if (input.value && !input.value.startsWith('http')) {
          input.value = input.value.trim();
        }
      }, 10);
    });
  }

  window.clearUrl = function () {
    const input = $('urlInput');
    const clearBtn = $('urlClearBtn');
    if (input) { input.value = ''; input.focus(); }
    if (clearBtn) clearBtn.style.display = 'none';
    setStatus('Enter a URL above and click Load');
    // Reset iframes
    ['mobile', 'tablet', 'desktop'].forEach(d => {
      const iframe = $(d + 'Iframe');
      const empty = $(d + 'Empty');
      const loading = $(d + 'Loading');
      if (iframe) iframe.src = '';
      if (empty) empty.style.display = 'flex';
      if (loading) loading.style.display = 'none';
    });
    state.loaded = false;
    state.currentUrl = '';
    const browserUrl = $('browserUrl');
    if (browserUrl) browserUrl.textContent = 'about:blank';
  };

  // ══════════════════════════════════════════════════════════
  // DEVICE SWITCHING
  // ══════════════════════════════════════════════════════════
  window.switchDevice = function (device) {
    state.currentDevice = device;

    // Toggle frames
    ['mobile', 'tablet', 'desktop'].forEach(d => {
      const frame = $(d + 'Frame');
      if (frame) frame.classList.toggle('active', d === device);
    });

    // Toggle buttons
    document.querySelectorAll('.toggle-btn').forEach(btn => {
      const isActive = btn.dataset.device === device;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    // Apply dims
    state.dimensions = DEVICE_DIMS[device] || DEVICE_DIMS.mobile;
    const presetMap = {
      mobile: '390x844',
      tablet: '768x1024',
      desktop: '1280x800',
    };
    const sel = $('deviceSelect');
    if (sel) sel.value = presetMap[device] || '390x844';

    setDimDisplay();
    applyFrameSize();
  };

  // ══════════════════════════════════════════════════════════
  // DEVICE PRESET
  // ══════════════════════════════════════════════════════════
  window.applyDevicePreset = function () {
    const sel = $('deviceSelect');
    if (!sel) return;
    const val = sel.value;

    const customGroup = $('customSizeGroup');
    if (val === 'custom') {
      if (customGroup) customGroup.style.display = 'flex';
      return;
    }
    if (customGroup) customGroup.style.display = 'none';

    const [w, h] = val.split('x').map(Number);
    if (!w || !h) return;

    state.dimensions = { width: w, height: h };
    setDimDisplay();
    applyFrameSize();

    // Auto-switch device type
    if (w <= 480) { if (state.currentDevice !== 'mobile') switchDevice('mobile'); }
    else if (w <= 900) { if (state.currentDevice !== 'tablet') switchDevice('tablet'); }
    else { if (state.currentDevice !== 'desktop') switchDevice('desktop'); }
  };

  function applyFrameSize() {
    const iframeId = state.currentDevice + 'Iframe';
    const iframe = $(iframeId);
    if (!iframe) return;

    let w = state.isLandscape ? state.dimensions.height : state.dimensions.width;
    let h = state.isLandscape ? state.dimensions.width : state.dimensions.height;

    // Apply zoom
    const scale = state.zoom / 100;
    iframe.style.width = w + 'px';
    iframe.style.height = h + 'px';
    iframe.style.transform = `scale(${scale})`;
    iframe.style.transformOrigin = 'top left';

    // Wrapper size
    const wrapper = iframe.closest('.iframe-wrapper');
    if (wrapper) {
      wrapper.style.width = (w * scale) + 'px';
      wrapper.style.height = (h * scale) + 'px';
      wrapper.style.overflow = 'hidden';
    }
  }

  // ══════════════════════════════════════════════════════════
  // ORIENTATION
  // ══════════════════════════════════════════════════════════
  window.toggleOrientation = function () {
    state.isLandscape = !state.isLandscape;
    const label = $('orientLabel');
    if (label) label.textContent = state.isLandscape ? 'Landscape' : 'Portrait';
    setDimDisplay();
    applyFrameSize();

    const frame = document.querySelector('.device-frame.active');
    if (frame) {
      frame.classList.toggle('landscape', state.isLandscape);
    }
  };

  // ══════════════════════════════════════════════════════════
  // ZOOM
  // ══════════════════════════════════════════════════════════
  window.adjustZoom = function (delta) {
    state.zoom = Math.max(30, Math.min(150, state.zoom + delta));
    const el = $('zoomLevel');
    if (el) el.textContent = state.zoom + '%';
    applyFrameSize();
  };

  // ══════════════════════════════════════════════════════════
  // LOAD URL
  // ══════════════════════════════════════════════════════════
  window.loadURL = function () {
    const input = $('urlInput');
    if (!input) return;

    const raw = input.value.trim();
    if (!raw) {
      setStatus('⚠ Please enter a valid URL', 'warn');
      input.focus();
      input.classList.add('url-input--shake');
      setTimeout(() => input.classList.remove('url-input--shake'), 400);
      return;
    }

    const url = normaliseUrl(raw);
    if (!url) {
      setStatus('⚠ Invalid URL', 'warn');
      return;
    }

    state.currentUrl = url;

    // Update desktop browser bar
    const browserUrl = $('browserUrl');
    if (browserUrl) browserUrl.textContent = url;

    setStatus('Loading ' + url + ' …', 'loading');

    // Determine which iframes to load
    const activeDevice = state.currentDevice;
    const iframeId = activeDevice + 'Iframe';
    const loadingId = activeDevice + 'Loading';
    const emptyId = activeDevice + 'Empty';

    const iframe = $(iframeId);
    const loading = $(loadingId);
    const empty = $(emptyId);

    if (!iframe) return;

    if (empty) empty.style.display = 'none';
    if (loading) loading.style.display = 'flex';

    // Clear and set
    iframe.src = 'about:blank';
    setTimeout(() => {
      iframe.src = url;
    }, 50);

    iframe.onload = function () {
      if (loading) loading.style.display = 'none';
      state.loaded = true;
      setStatus('✓ Loaded: ' + url, 'success');
      applyFrameSize();
    };

    iframe.onerror = function () {
      if (loading) loading.style.display = 'none';
      setStatus('✕ Failed to load — site may block iframes (X-Frame-Options)', 'error');
    };

    // Timeout fallback
    setTimeout(() => {
      if (loading && loading.style.display !== 'none') {
        loading.style.display = 'none';
        // Don't error — some sites are slow
      }
    }, 12000);
  };

  // Add this to your script to attempt UA spoofing for JS-based detection
function attemptUASpoof(iframeElement) {
  try {
    const mobileUA = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1";
    
    // We try to override the navigator object inside the iframe
    Object.defineProperty(iframeElement.contentWindow.navigator, 'userAgent', {
      get: function () { return mobileUA; },
      configurable: true
    });
    Object.defineProperty(iframeElement.contentWindow.navigator, 'platform', {
      get: function () { return 'iPhone'; },
      configurable: true
    });
  } catch (err) {
    // This will fail on cross-origin sites (like Google, Facebook) 
    // due to browser security, which is normal.
    console.log("Cross-origin restriction: Could not spoof UA headers.");
  }
}

// Update your loadURL function to call this
function loadURL() {
  const url = normaliseUrl($('urlInput').value);
  // ... existing logic ...
  const iframe = $(state.currentDevice + 'Iframe');
  iframe.src = url;
  
  iframe.onload = () => {
    attemptUASpoof(iframe);
    setStatus('Page Loaded');
  };
}

  // ══════════════════════════════════════════════════════════
  // REFRESH
  // ══════════════════════════════════════════════════════════
  window.refreshPreview = function () {
    if (!state.currentUrl) return;
    const iframeId = state.currentDevice + 'Iframe';
    const iframe = $(iframeId);
    const loading = $(state.currentDevice + 'Loading');
    if (!iframe) return;
    if (loading) loading.style.display = 'flex';
    iframe.src = state.currentUrl;
    iframe.onload = () => {
      if (loading) loading.style.display = 'none';
      setStatus('✓ Refreshed: ' + state.currentUrl, 'success');
    };
  };

  // ══════════════════════════════════════════════════════════
  // OPEN IN NEW TAB
  // ══════════════════════════════════════════════════════════
  window.openInNewTab = function () {
    if (!state.currentUrl) {
      setStatus('⚠ Load a URL first', 'warn');
      return;
    }
    window.open(state.currentUrl, '_blank', 'noopener');
  };

  // ══════════════════════════════════════════════════════════
  // COPY LINK (shareable)
  // ══════════════════════════════════════════════════════════
  window.copyLink = function () {
    if (!state.currentUrl) {
      setStatus('⚠ Load a URL first', 'warn');
      return;
    }
    const shareUrl = window.location.origin + window.location.pathname + '?url=' + encodeURIComponent(state.currentUrl) + '&device=' + state.currentDevice;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setStatus('✓ Shareable link copied to clipboard!', 'success');
    }).catch(() => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = shareUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setStatus('✓ Link copied!', 'success');
    });
  };

  // ══════════════════════════════════════════════════════════
  // QR CODE (native canvas — no external lib needed)
  // ══════════════════════════════════════════════════════════
  window.generateQR = function () {
    if (!state.currentUrl) {
      setStatus('⚠ Load a URL first, then generate QR', 'warn');
      return;
    }
    const modal = $('qrModal');
    const urlDisplay = $('qrUrlDisplay');
    const canvasWrap = $('qrCanvas');
    if (!modal || !canvasWrap) return;

    if (urlDisplay) urlDisplay.textContent = state.currentUrl;
    canvasWrap.innerHTML = '';

    // Use a QR API for the image
    const img = document.createElement('img');
    const encoded = encodeURIComponent(state.currentUrl);
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encoded}&margin=10&color=000000&bgcolor=ffffff`;
    img.alt = 'QR Code for ' + state.currentUrl;
    img.width = 220;
    img.height = 220;
    img.style.borderRadius = '8px';
    img.id = 'qrCodeImg';
    canvasWrap.appendChild(img);

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  window.closeQR = function () {
    const modal = $('qrModal');
    if (modal) modal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  window.downloadQR = function () {
    const img = $('qrCodeImg');
    if (!img) return;
    const link = document.createElement('a');
    link.href = img.src;
    link.download = 'mobile-viewer-qr.png';
    link.target = '_blank';
    link.click();
  };

  // Close QR on backdrop click
  document.addEventListener('click', (e) => {
    const modal = $('qrModal');
    if (modal && modal.classList.contains('is-open') && e.target === modal) {
      window.closeQR();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeQR();
  });

  // ══════════════════════════════════════════════════════════
  // SCROLL TO VIEWER
  // ══════════════════════════════════════════════════════════
  window.scrollToViewer = function () {
    const viewer = $('viewer');
    if (!viewer) return;
    viewer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      const input = $('urlInput');
      if (input) input.focus();
    }, 600);
  };

  // ══════════════════════════════════════════════════════════
  // FAQ ACCORDION
  // ══════════════════════════════════════════════════════════
  window.toggleFaq = function (btn) {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('is-open');

    // Close all others
    document.querySelectorAll('.faq-item.is-open').forEach(el => {
      el.classList.remove('is-open');
      el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      const a = el.querySelector('.faq-a');
      if (a) { a.style.maxHeight = '0'; a.style.opacity = '0'; }
    });

    if (!isOpen) {
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      if (answer) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.opacity = '1';
      }
    }
  };

  // ══════════════════════════════════════════════════════════
  // STAT COUNTER ANIMATION
  // ══════════════════════════════════════════════════════════
  function animateStats() {
    const els = document.querySelectorAll('.stat-number[data-target]');
    els.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = formatNumber(current);
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    });
  }

  // ══════════════════════════════════════════════════════════
  // URL PARAMS (shareable links)
  // ══════════════════════════════════════════════════════════
  function handleUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const url = params.get('url');
    const device = params.get('device');

    if (url) {
      const input = $('urlInput');
      if (input) {
        // Strip protocol from display
        const stripped = url.replace(/^https?:\/\//, '');
        input.value = stripped;
        const clearBtn = $('urlClearBtn');
        if (clearBtn) clearBtn.style.display = 'flex';
      }
      if (device) switchDevice(device);
      setTimeout(() => {
        scrollToViewer();
        setTimeout(loadURL, 800);
      }, 500);
    }
  }

  // ══════════════════════════════════════════════════════════
  // INTERSECTION OBSERVER — reveal animations
  // ══════════════════════════════════════════════════════════
  function initRevealAnimations() {
    const targets = document.querySelectorAll(
      '.feature-card, .tool-card, .why-card, .guide-step, .how-step, .faq-item, .stat-item'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, (entry.target.dataset.delay || 0));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    targets.forEach((el, i) => {
      el.classList.add('reveal');
      el.dataset.delay = (i % 6) * 60;
      observer.observe(el);
    });
  }

  // Stats appear once hero is in view
  function initStatObserver() {
    const statsEl = document.querySelector('.stats');
    if (!statsEl) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateStats();
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(statsEl);
  }

  // ══════════════════════════════════════════════════════════
  // CUSTOM DEVICE SIZE
  // ══════════════════════════════════════════════════════════
  function initCustomSize() {
    const wInput = $('customW');
    const hInput = $('customH');
    if (!wInput || !hInput) return;

    function applyCustom() {
      const w = parseInt(wInput.value, 10);
      const h = parseInt(hInput.value, 10);
      if (w >= 200 && h >= 300) {
        state.dimensions = { width: w, height: h };
        setDimDisplay();
        applyFrameSize();
      }
    }

    wInput.addEventListener('change', applyCustom);
    hInput.addEventListener('change', applyCustom);
  }

  // ══════════════════════════════════════════════════════════
  // INIT
  // ══════════════════════════════════════════════════════════
  function init() {
    initUrlInput();
    initRevealAnimations();
    initStatObserver();
    initCustomSize();
    handleUrlParams();
    setStatus('Enter a URL above and click Load');
    setDimDisplay();

    // Keyboard shortcut: Ctrl+Enter loads URL
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') loadURL();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
