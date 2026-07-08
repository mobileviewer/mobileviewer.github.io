/**
 * Mobile Viewer — Speaker Test Component
 * Audio testing functionality for speakers and headphones
 */
(function () {
  'use strict';

  // Audio engine state
  let audioCtx = null;
  let masterGain = null;
  let currentNodes = [];
  let sweepOsc = null;
  let sweepGain = null;
  let sweepInterval = null;
  let meterInterval = null;
  let oscAnimFrame = null;
  let oscAnalyser = null;
  
  // DOM refs
  const DOM = {};
  
  // Test configurations
  const TEST_CONFIGS = {
    left:     { label: 'Left Channel', freq: 440, pan: -1, wave: 'sine', chan: 'Left Only' },
    right:    { label: 'Right Channel', freq: 440, pan: 1, wave: 'sine', chan: 'Right Only' },
    both:     { label: 'Both Channels', freq: 440, pan: 0, wave: 'sine', chan: 'Stereo' },
    stereo:   { label: 'Stereo Ping-Pong', freq: 440, pan: 0, wave: 'sine', chan: 'Alternating' },
    bass:     { label: 'Bass Test (60 Hz)', freq: 60, pan: 0, wave: 'sine', chan: 'Both' },
    midrange: { label: 'Midrange Test (1 kHz)', freq: 1000, pan: 0, wave: 'sine', chan: 'Both' },
    treble:   { label: 'Treble Test (8 kHz)', freq: 8000, pan: 0, wave: 'sine', chan: 'Both' },
    noise:    { label: 'White Noise', freq: null, pan: 0, wave: 'noise', chan: 'Both' },
  };

  // Initialize DOM references
  function initDOM() {
    DOM.meterL = document.getElementById('meterL');
    DOM.meterR = document.getElementById('meterR');
    DOM.oscCanvas = document.getElementById('oscCanvas');
    DOM.statusDot = document.getElementById('statusDot');
    DOM.statusText = document.getElementById('statusText');
    DOM.volSlider = document.getElementById('masterVolume');
    DOM.volPct = document.getElementById('volPct');
    DOM.freqSlider = document.getElementById('freqSlider');
    DOM.freqVal = document.getElementById('freqVal');
    DOM.panSlider = document.getElementById('panSlider');
    DOM.panVal = document.getElementById('panVal');
    DOM.waveType = document.getElementById('waveType');
    DOM.infoFreq = document.getElementById('infoFreq');
    DOM.infoWave = document.getElementById('infoWave');
    DOM.infoChan = document.getElementById('infoChan');
    DOM.vizToggle = document.getElementById('vizToggle');
    DOM.btnStopAll = document.getElementById('btnStopAll');
    DOM.btnPlayTone = document.getElementById('btnPlayTone');
    DOM.btnStopTone = document.getElementById('btnStopTone');
    DOM.btnSweep = document.getElementById('btnSweep');
    DOM.testCards = document.querySelectorAll('.test-btn-card');
  }

  // Canvas setup
  function setupOscCanvas() {
    if (!DOM.oscCanvas) return;
    const ctx = DOM.oscCanvas.getContext('2d');
    const resize = () => {
      const wrap = DOM.oscCanvas.parentElement;
      DOM.oscCanvas.width = wrap.clientWidth;
      DOM.oscCanvas.height = 80;
    };
    resize();
    window.addEventListener('resize', resize);
    return ctx;
  }

  // Audio initialization
  function initAudio() {
    if (audioCtx) return;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = parseFloat(DOM.volSlider?.value || 0.7);
      masterGain.connect(audioCtx.destination);
    } catch (e) {
      console.warn('Web Audio API not supported');
    }
  }

  // Stop all sounds
  function stopAllSounds() {
    currentNodes.forEach(n => { try { n.stop(); } catch(e){} });
    currentNodes = [];
    if (sweepOsc) { try { sweepOsc.stop(); } catch(e){} sweepOsc = null; }
    if (sweepInterval) { clearInterval(sweepInterval); sweepInterval = null; }
    if (meterInterval) { clearInterval(meterInterval); meterInterval = null; }
    if (oscAnimFrame) { cancelAnimationFrame(oscAnimFrame); oscAnimFrame = null; }
    
    if (DOM.meterL) DOM.meterL.style.width = '0%';
    if (DOM.meterR) DOM.meterR.style.width = '0%';
    
    DOM.testCards?.forEach(c => c.classList.remove('is-playing'));
    
    if (DOM.statusDot) DOM.statusDot.className = 'status-dot';
    if (DOM.statusText) DOM.statusText.textContent = 'Speaker Test Ready — Select a test below';
    if (DOM.infoFreq) DOM.infoFreq.textContent = '—';
    if (DOM.infoWave) DOM.infoWave.textContent = '—';
    if (DOM.infoChan) DOM.infoChan.textContent = '—';
  }

  // Set status
  function setStatus(text, type) {
    if (DOM.statusDot) DOM.statusDot.className = 'status-dot ' + (type || '');
    if (DOM.statusText) DOM.statusText.textContent = text;
  }

  // Play tone
  function playTone(freq, pan, waveType, durationOrLoop) {
    initAudio();
    if (!audioCtx || audioCtx.state === 'suspended') audioCtx?.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const panner = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null;

    osc.type = waveType || 'sine';
    osc.frequency.value = freq;
    gain.gain.value = 0.5;

    if (panner) {
      panner.pan.value = pan || 0;
      osc.connect(gain);
      gain.connect(panner);
      panner.connect(masterGain);
    } else {
      osc.connect(gain);
      gain.connect(masterGain);
    }

    osc.start();
    if (durationOrLoop && durationOrLoop > 0) {
      osc.stop(audioCtx.currentTime + durationOrLoop);
    }
    currentNodes.push(osc);
    return osc;
  }

  // Play white noise
  function playWhiteNoise(pan) {
    initAudio();
    if (!audioCtx || audioCtx.state === 'suspended') audioCtx?.resume();

    const bufLen = audioCtx.sampleRate * 2;
    const buf = audioCtx.createBuffer(2, bufLen, audioCtx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const data = buf.getChannelData(c);
      for (let i = 0; i < bufLen; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
    }
    const src = audioCtx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const gain = audioCtx.createGain();
    gain.gain.value = 0.4;
    const panner = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null;
    if (panner) {
      panner.pan.value = pan || 0;
      src.connect(gain); gain.connect(panner); panner.connect(masterGain);
    } else {
      src.connect(gain); gain.connect(masterGain);
    }
    src.start();
    currentNodes.push(src);
    return src;
  }

  // Update channel meters
  function updateChannelMeters(leftPct, rightPct) {
    if (DOM.meterL) DOM.meterL.style.width = leftPct + '%';
    if (DOM.meterR) DOM.meterR.style.width = rightPct + '%';
  }

  // Run quick test
  function runQuickTest(testKey) {
    stopAllSounds();
    const cfg = TEST_CONFIGS[testKey];
    if (!cfg) return;

    initAudio();
    if (audioCtx?.state === 'suspended') audioCtx.resume();

    DOM.testCards?.forEach(c => {
      if (c.dataset.test === testKey) c.classList.add('is-playing');
    });
    
    setStatus('Playing: ' + cfg.label, 'playing');
    if (DOM.infoFreq) DOM.infoFreq.textContent = cfg.freq ? cfg.freq + ' Hz' : 'Broadband';
    if (DOM.infoWave) DOM.infoWave.textContent = cfg.wave.charAt(0).toUpperCase() + cfg.wave.slice(1);
    if (DOM.infoChan) DOM.infoChan.textContent = cfg.chan;

    if (cfg.wave === 'noise') {
      playWhiteNoise(0);
      updateChannelMeters(75, 75);
      meterInterval = setInterval(() => {
        const v = 60 + Math.random() * 30;
        updateChannelMeters(v, v);
      }, 80);
    } else if (testKey === 'stereo') {
      let left = true;
      const pingPong = () => {
        if (!audioCtx) return;
        const osc = playTone(440, left ? -1 : 1, 'sine', 0.35);
        updateChannelMeters(left ? 80 : 5, left ? 5 : 80);
        left = !left;
      };
      pingPong();
      const interval = setInterval(() => {
        if (!currentNodes.length && !sweepOsc) { clearInterval(interval); return; }
        const playing = document.querySelector('.test-btn-card[data-test="stereo"].is-playing');
        if (!playing) { clearInterval(interval); return; }
        pingPong();
      }, 400);
      currentNodes.push({ stop: () => clearInterval(interval) });
    } else {
      playTone(cfg.freq, cfg.pan, cfg.wave);
      const lv = cfg.pan <= 0 ? 80 : (cfg.pan < 0.5 ? 80 : 10);
      const rv = cfg.pan >= 0 ? 80 : (cfg.pan > -0.5 ? 80 : 10);
      updateChannelMeters(lv, rv);
      meterInterval = setInterval(() => {
        const jitter = Math.random() * 10;
        updateChannelMeters(lv + jitter, rv + jitter);
      }, 80);
    }

    startOscDraw(cfg.freq, cfg.wave);
  }

  // Oscilloscope drawing
  function startOscDraw(freq, waveType) {
    if (!DOM.vizToggle?.checked) return;
    if (oscAnimFrame) cancelAnimationFrame(oscAnimFrame);
    if (!audioCtx) return;

    oscAnalyser = audioCtx.createAnalyser();
    oscAnalyser.fftSize = 512;
    masterGain.connect(oscAnalyser);

    const canvas = DOM.oscCanvas;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const drawOsc = () => {
      oscAnimFrame = requestAnimationFrame(drawOsc);
      if (!DOM.vizToggle?.checked) { ctx.clearRect(0, 0, canvas.width, canvas.height); return; }
      const W = canvas.width, H = canvas.height;
      const bufLen = oscAnalyser.frequencyBinCount;
      const timeData = new Uint8Array(bufLen);
      oscAnalyser.getByteTimeDomainData(timeData);

      ctx.clearRect(0, 0, W, H);
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,79,216,0.85)';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = 'rgba(255,79,216,0.3)';
      ctx.shadowBlur = 4;
      const sliceW = W / bufLen;
      let x = 0;
      for (let i = 0; i < bufLen; i++) {
        const v = timeData[i] / 128;
        const y = v * H / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceW;
      }
      ctx.stroke();
    };
    drawOsc();
  }

  // Event bindings
  function bindEvents() {
    // Volume control
    DOM.volSlider?.addEventListener('input', function() {
      if (DOM.volPct) DOM.volPct.textContent = Math.round(this.value * 100) + '%';
      if (masterGain) masterGain.gain.value = parseFloat(this.value);
    });

    // Stop all
    DOM.btnStopAll?.addEventListener('click', stopAllSounds);

    // Frequency slider
    DOM.freqSlider?.addEventListener('input', function() {
      const hz = parseInt(this.value);
      if (DOM.freqVal) DOM.freqVal.textContent = hz >= 1000 ? (hz / 1000).toFixed(1) + ' kHz' : hz + ' Hz';
      if (sweepOsc) sweepOsc.frequency.value = hz;
    });

    // Pan slider
    DOM.panSlider?.addEventListener('input', function() {
      const p = parseFloat(this.value);
      if (DOM.panVal) {
        if (p === 0) DOM.panVal.textContent = 'Center';
        else if (p < 0) DOM.panVal.textContent = Math.round(Math.abs(p) * 100) + '% L';
        else DOM.panVal.textContent = Math.round(p * 100) + '% R';
      }
    });

    // Play tone
    DOM.btnPlayTone?.addEventListener('click', () => {
      stopAllSounds();
      initAudio();
      if (audioCtx?.state === 'suspended') audioCtx.resume();
      const freq = parseInt(DOM.freqSlider?.value || 440);
      const pan = parseFloat(DOM.panSlider?.value || 0);
      const wave = DOM.waveType?.value || 'sine';
      sweepOsc = audioCtx.createOscillator();
      sweepGain = audioCtx.createGain();
      sweepGain.gain.value = 0.5;
      const panner = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null;
      sweepOsc.type = wave;
      sweepOsc.frequency.value = freq;
      if (panner) {
        panner.pan.value = pan;
        sweepOsc.connect(sweepGain); sweepGain.connect(panner); panner.connect(masterGain);
      } else {
        sweepOsc.connect(sweepGain); sweepGain.connect(masterGain);
      }
      sweepOsc.start();
      currentNodes.push(sweepOsc);
      setStatus('Playing: ' + freq + ' Hz ' + wave + ' wave', 'playing');
      if (DOM.infoFreq) DOM.infoFreq.textContent = freq + ' Hz';
      if (DOM.infoWave) DOM.infoWave.textContent = wave;
      if (DOM.infoChan) DOM.infoChan.textContent = pan < -0.3 ? 'Left' : pan > 0.3 ? 'Right' : 'Center';
      startOscDraw(freq, wave);
    });

    // Stop tone
    DOM.btnStopTone?.addEventListener('click', stopAllSounds);

    // Auto sweep
    DOM.btnSweep?.addEventListener('click', () => {
      stopAllSounds();
      initAudio();
      if (audioCtx?.state === 'suspended') audioCtx.resume();
      const wave = DOM.waveType?.value || 'sine';
      sweepOsc = audioCtx.createOscillator();
      sweepGain = audioCtx.createGain();
      sweepGain.gain.value = 0.45;
      sweepOsc.type = wave;
      sweepOsc.frequency.value = 20;
      sweepOsc.connect(sweepGain);
      sweepGain.connect(masterGain);
      sweepOsc.start();
      currentNodes.push(sweepOsc);
      setStatus('Auto Sweep: 20 Hz → 20 kHz', 'playing');

      let freq = 20;
      sweepInterval = setInterval(() => {
        if (!sweepOsc) { clearInterval(sweepInterval); return; }
        freq = freq < 1000 ? freq + 5 : freq + 200;
        if (freq > 20000) { freq = 20; }
        sweepOsc.frequency.value = freq;
        if (DOM.freqSlider) DOM.freqSlider.value = freq;
        if (DOM.freqVal) DOM.freqVal.textContent = freq >= 1000 ? (freq / 1000).toFixed(1) + ' kHz' : freq + ' Hz';
        if (DOM.infoFreq) DOM.infoFreq.textContent = freq >= 1000 ? (freq/1000).toFixed(1) + ' kHz' : freq + ' Hz';
      }, 50);
    });

    // Test cards
    DOM.testCards?.forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn')) return;
        const testKey = card.dataset.test;
        if (card.classList.contains('is-playing')) { stopAllSounds(); return; }
        runQuickTest(testKey);
      });
      const stopBtn = card.querySelector('.test-stop');
      if (stopBtn) stopBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        stopAllSounds();
      });
    });
  }

  // Init speaker test
  function initSpeakerTest() {
    initDOM();
    if (DOM.oscCanvas) {
      setupOscCanvas();
    }
    bindEvents();
    
    // Expose functions globally for inline onclick
    window.runQuickTest = runQuickTest;
    window.stopAllSounds = stopAllSounds;
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSpeakerTest);
  } else {
    initSpeakerTest();
  }
})();
