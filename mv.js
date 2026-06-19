// ─── Device Database ───
    const DEVICES = [
      { id: 'iphone15', name: 'iPhone 15', w: 393, h: 852, dpr: 3, os: 'iOS 17', cat: 'iphone', icon: '📱' },
      { id: 'iphone15pm', name: 'iPhone 15 Pro Max', w: 430, h: 932, dpr: 3, os: 'iOS 17', cat: 'iphone', icon: '📱' },
      { id: 'iphone14', name: 'iPhone 14', w: 390, h: 844, dpr: 3, os: 'iOS 16', cat: 'iphone', icon: '📱' },
      { id: 'iphone14pm', name: 'iPhone 14 Plus', w: 428, h: 926, dpr: 3, os: 'iOS 16', cat: 'iphone', icon: '📱' },
      { id: 'iphone13', name: 'iPhone 13', w: 390, h: 844, dpr: 3, os: 'iOS 15', cat: 'iphone', icon: '📱' },
      { id: 'iphone13m', name: 'iPhone 13 Mini', w: 375, h: 812, dpr: 3, os: 'iOS 15', cat: 'iphone', icon: '📱' },
      { id: 'iphone-se', name: 'iPhone SE (3rd)', w: 375, h: 667, dpr: 2, os: 'iOS 16', cat: 'iphone', icon: '📱' },
      { id: 'iphone12', name: 'iPhone 12', w: 390, h: 844, dpr: 3, os: 'iOS 14', cat: 'iphone', icon: '📱' },
      { id: 'iphonexr', name: 'iPhone XR', w: 414, h: 896, dpr: 2, os: 'iOS 12', cat: 'iphone', icon: '📱' },
      { id: 'pixel8', name: 'Google Pixel 8', w: 412, h: 915, dpr: 2.625, os: 'Android 14', cat: 'android', icon: '🤖' },
      { id: 'pixel8pro', name: 'Google Pixel 8 Pro', w: 448, h: 998, dpr: 2.625, os: 'Android 14', cat: 'android', icon: '🤖' },
      { id: 'pixel7', name: 'Google Pixel 7', w: 412, h: 915, dpr: 2.625, os: 'Android 13', cat: 'android', icon: '🤖' },
      { id: 'galaxy-s24', name: 'Samsung Galaxy S24', w: 360, h: 780, dpr: 4, os: 'Android 14', cat: 'android', icon: '🤖' },
      { id: 'galaxy-s24u', name: 'Galaxy S24 Ultra', w: 412, h: 915, dpr: 3.75, os: 'Android 14', cat: 'android', icon: '🤖' },
      { id: 'galaxy-s23', name: 'Samsung Galaxy S23', w: 360, h: 780, dpr: 3, os: 'Android 13', cat: 'android', icon: '🤖' },
      { id: 'fold', name: 'Galaxy Z Fold 5', w: 344, h: 882, dpr: 3, os: 'Android 13', cat: 'android', icon: '🤖' },
      { id: 'fold-open', name: 'Z Fold 5 (Open)', w: 812, h: 882, dpr: 2, os: 'Android 13', cat: 'android', icon: '🤖' },
      { id: 'oneplus12', name: 'OnePlus 12', w: 412, h: 919, dpr: 3.5, os: 'Android 14', cat: 'android', icon: '🤖' },
      { id: 'xiaomi14', name: 'Xiaomi 14', w: 393, h: 852, dpr: 3, os: 'Android 14', cat: 'android', icon: '🤖' },
      { id: 'motog84', name: 'Motorola Moto G84', w: 360, h: 800, dpr: 2.5, os: 'Android 13', cat: 'android', icon: '🤖' },
      { id: 'ipad', name: 'iPad Pro 12.9"', w: 1024, h: 1366, dpr: 2, os: 'iPadOS 17', cat: 'tablet', icon: '📟' },
      { id: 'ipad-mini', name: 'iPad Mini 6', w: 744, h: 1133, dpr: 2, os: 'iPadOS 16', cat: 'tablet', icon: '📟' },
      { id: 'ipad-air', name: 'iPad Air 5', w: 820, h: 1180, dpr: 2, os: 'iPadOS 16', cat: 'tablet', icon: '📟' },
      { id: 'ipad-10', name: 'iPad (10th Gen)', w: 820, h: 1180, dpr: 2, os: 'iPadOS 16', cat: 'tablet', icon: '📟' },
      { id: 'galaxy-tab', name: 'Samsung Galaxy Tab S9', w: 800, h: 1280, dpr: 2, os: 'Android 13', cat: 'tablet', icon: '📟' },
      { id: 'galaxy-tabs9u', name: 'Galaxy Tab S9 Ultra', w: 960, h: 1600, dpr: 2.25, os: 'Android 13', cat: 'tablet', icon: '📟' },
      { id: 'surface-pro', name: 'Surface Pro 9', w: 912, h: 1368, dpr: 2, os: 'Windows 11', cat: 'tablet', icon: '📟' },
      { id: 'kindle-fire', name: 'Kindle Fire HD 10', w: 800, h: 1280, dpr: 1.5, os: 'FireOS 8', cat: 'tablet', icon: '📟' },
    ];

    // ─── State ───
    let state = {
      url: '',
      device: 'iphone15',
      isLandscape: false,
      zoom: 100,
      loaded: false,
    };

    // ─── DOM Refs ───
    const urlInput = document.getElementById('urlInput');
    const loadBtn = document.getElementById('loadBtn');
    const mainIframe = document.getElementById('mainIframe');
    const pdScreen = document.getElementById('pdScreen');
    const pdPlaceholder = document.getElementById('pdPlaceholder');
    const pdNotch = document.getElementById('pdNotch');
    const pdHomeBar = document.getElementById('pdHomeBar');
    const previewDevice = document.getElementById('previewDevice');
    const previewWrap = document.getElementById('previewWrap');
    const deviceDims = document.getElementById('deviceDims');
    const deviceLabel = document.getElementById('deviceLabel');
    const orientationLabel = document.getElementById('orientationLabel');
    const siModel = document.getElementById('siModel');
    const siWidth = document.getElementById('siWidth');
    const siHeight = document.getElementById('siHeight');
    const siDpr = document.getElementById('siDpr');
    const siOs = document.getElementById('siOs');
    const zoomLevel = document.getElementById('zoomLevel');
    const rotateBtn = document.getElementById('rotateBtn');
    const screenshotBtn = document.getElementById('screenshotBtn');
    const shareBtn = document.getElementById('shareBtn');
    const zoomIn = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');
    const customW = document.getElementById('customW');
    const customH = document.getElementById('customH');
    const applyCustom = document.getElementById('applyCustom');
    const quickDeviceList = document.getElementById('quickDeviceList');
    const toast = document.getElementById('toast');

    // ─── Toast ───
    function showToast(msg, duration = 3000) {
      toast.textContent = msg;
      toast.classList.add('show');
      clearTimeout(toast._t);
      toast._t = setTimeout(() => toast.classList.remove('show'), duration);
    }

    // ─── URL Helpers ───
    function normalizeUrl(raw) {
      raw = raw.trim();
      if (!raw) return '';
      if (!/^https?:\/\//i.test(raw)) raw = 'https://' + raw;
      try { new URL(raw); return raw; }
      catch { return ''; }
    }

    function getDevice(id) {
      return DEVICES.find(d => d.id === id) || DEVICES[0];
    }

    // ─── Apply device ───
    function applyDevice(deviceId, landscape) {
      const dev = getDevice(deviceId);
      const isTab = dev.cat === 'tablet';
      const isAndroid = dev.cat === 'android';

      let w = landscape ? dev.h : dev.w;
      let h = landscape ? dev.w : dev.h;

      const maxW = Math.min(previewWrap.clientWidth - 100, 520);
      const maxH = window.innerHeight * 0.75;
      let scale = Math.min(1, maxW / w, maxH / h);
      scale = Math.max(0.3, scale);
      const finalScale = (state.zoom / 100) * scale;

      const framePad = isTab ? 10 : 14;
      const frameW = w + framePad * 2;
      const frameH = h + framePad * 2 + (landscape ? 0 : 60);

      previewDevice.style.width = frameW + 'px';
      previewDevice.style.transform = `scale(${finalScale})`;
      previewDevice.style.transformOrigin = 'top center';
      previewDevice.style.borderRadius = isTab ? '18px' : '40px';

      pdScreen.style.width = w + 'px';
      pdScreen.style.height = h + 'px';
      pdScreen.style.borderRadius = isTab ? '8px' : (landscape ? '18px' : '30px');

      mainIframe.style.width = w + 'px';
      mainIframe.style.height = h + 'px';

      pdNotch.style.display = (isAndroid || landscape || isTab) ? 'none' : 'block';
      pdNotch.style.width = w > 400 ? '100px' : '80px';
      pdHomeBar.style.display = landscape ? 'none' : 'block';

      deviceLabel.textContent = dev.name;
      deviceDims.textContent = `${w} × ${h} px`;
      orientationLabel.textContent = landscape ? 'Landscape' : 'Portrait';
      siModel.textContent = dev.name;
      siWidth.textContent = w + 'px';
      siHeight.textContent = h + 'px';
      siDpr.textContent = dev.dpr + 'x';
      siOs.textContent = dev.os;

      const visualH = frameH * finalScale + 80;
      previewWrap.style.minHeight = Math.max(400, visualH) + 'px';
    }

    // ─── Load URL ───
    function loadUrl() {
      const raw = urlInput.value;
      const url = normalizeUrl(raw);

      if (!url) {
        showToast('⚠️ Please enter a valid URL (e.g. https://example.com)');
        urlInput.focus();
        return;
      }

      state.url = url;
      urlInput.value = url;

      pdPlaceholder.classList.remove('hidden');
      pdPlaceholder.innerHTML = `
        <div class="pdp-icon" style="animation: pulse 1.5s ease-in-out infinite">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        </div>
        <h3>Loading preview…</h3>
        <p style="font-size:0.78rem;word-break:break-all">${url}</p>
      `;

      mainIframe.src = url;
      state.loaded = true;

      mainIframe.onload = () => {
        pdPlaceholder.classList.add('hidden');
        try { showToast(`✓ Preview loaded: ${new URL(url).hostname}`); } catch(e) {}
      };

      mainIframe.onerror = () => {
        pdPlaceholder.classList.remove('hidden');
        pdPlaceholder.innerHTML = `
          <div class="pdp-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg></div>
          <h3>Cannot load preview</h3>
          <p>This website may block embedding. Try opening it directly.</p>
        `;
        showToast('⚠️ This site may block embedding (X-Frame-Options)');
      };

      setTimeout(() => {
        try {
          const doc = mainIframe.contentDocument || mainIframe.contentWindow.document;
          if (doc.body && doc.body.childElementCount === 0) {
            mainIframe.onerror();
          }
        } catch (e) {
          pdPlaceholder.classList.add('hidden');
        }
      }, 3000);
    }

    // ─── Device Picker Buttons ───
    function setupDevicePicker() {
      const btns = document.querySelectorAll('.device-btn');
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          btns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
          btn.classList.add('active');
          btn.setAttribute('aria-pressed', 'true');
          state.device = btn.dataset.device;
          state.isLandscape = false;
          applyDevice(state.device, false);
          updateQuickDevices();
        });
      });
    }

    // ─── Quick Device Sidebar ───
    function updateQuickDevices() {
      const items = DEVICES.slice(0, 8);
      quickDeviceList.innerHTML = items.map(dev => `
        <div class="qd-item ${dev.id === state.device ? 'active' : ''}" data-id="${dev.id}" role="button" tabindex="0" aria-label="Switch to ${dev.name}">
          <span>${dev.icon} ${dev.name}</span>
          <span class="qd-dim">${dev.w}×${dev.h}</span>
        </div>
      `).join('');

      quickDeviceList.querySelectorAll('.qd-item').forEach(item => {
        const activate = () => {
          state.device = item.dataset.id;
          state.isLandscape = false;
          applyDevice(state.device, false);
          updateQuickDevices();
          document.querySelectorAll('.device-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.device === state.device);
          });
        };
        item.addEventListener('click', activate);
        item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') activate(); });
      });
    }

    // ─── Rotate ───
    rotateBtn.addEventListener('click', () => {
      state.isLandscape = !state.isLandscape;
      applyDevice(state.device, state.isLandscape);
      showToast(`Rotated to ${state.isLandscape ? 'Landscape' : 'Portrait'}`);
    });

    // ─── Zoom ───
    zoomIn.addEventListener('click', () => {
      if (state.zoom < 150) {
        state.zoom = Math.min(150, state.zoom + 10);
        zoomLevel.textContent = state.zoom + '%';
        applyDevice(state.device, state.isLandscape);
      }
    });
    zoomOut.addEventListener('click', () => {
      if (state.zoom > 50) {
        state.zoom = Math.max(50, state.zoom - 10);
        zoomLevel.textContent = state.zoom + '%';
        applyDevice(state.device, state.isLandscape);
      }
    });

    // ─── Screenshot ───
    screenshotBtn.addEventListener('click', () => {
      if (typeof html2canvas !== 'undefined') {
        html2canvas(previewDevice).then(canvas => {
          const a = document.createElement('a');
          a.download = `mobileviewer-${state.device}-${Date.now()}.png`;
          a.href = canvas.toDataURL('image/png');
          a.click();
          showToast('📸 Screenshot saved!');
        });
      } else {
        showToast('💡 Use your browser\'s built-in screenshot or Cmd+Shift+4 (Mac)');
      }
    });

    // ─── Share ───
    shareBtn.addEventListener('click', async () => {
      const url = window.location.href;
      if (navigator.share) {
        try {
          await navigator.share({ title: 'MobileViewer.pro Preview', url });
        } catch (e) { /* user cancelled */ }
      } else {
        await navigator.clipboard.writeText(url).catch(() => {});
        showToast('🔗 Share link copied to clipboard!');
      }
    });

    // ─── Custom Size ───
    applyCustom.addEventListener('click', () => {
      const w = parseInt(customW.value);
      const h = parseInt(customH.value);
      if (!w || !h || w < 200 || h < 300) {
        showToast('⚠️ Enter valid dimensions (min 200×300px)');
        return;
      }
      const existing = DEVICES.findIndex(d => d.id === 'custom');
      const customDev = { id: 'custom', name: `Custom (${w}×${h})`, w, h, dpr: 2, os: 'Custom', cat: 'android', icon: '📐' };
      if (existing >= 0) DEVICES[existing] = customDev;
      else DEVICES.push(customDev);

      state.device = 'custom';
      state.isLandscape = false;
      applyDevice('custom', false);
      updateQuickDevices();
      showToast(`Custom size applied: ${w}×${h}px`);
    });

    // ─── Load URL on Enter ───
    urlInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') loadUrl();
    });
    loadBtn.addEventListener('click', loadUrl);

    // ─── Window resize ───
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => applyDevice(state.device, state.isLandscape), 150);
    }, { passive: true });

    // ─── Init ───
    function init() {
      setupDevicePicker();
      updateQuickDevices();
      applyDevice(state.device, false);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
