(() => {
  'use strict';
  if (document.getElementById('archive-music')) return;
  const key = 'gokkale-music-v1';
  let prefs = {};
  try { prefs = JSON.parse(sessionStorage.getItem(key) || '{}'); } catch {}
  const audio = new Audio('/five-armies.ogg');
  audio.loop = true;
  audio.preload = 'none';
  audio.volume = Number.isFinite(prefs.volume) ? Math.min(1, Math.max(0, prefs.volume)) : 0.25;
  const panel = document.createElement('section');
  panel.id = 'archive-music';
  panel.innerHTML = `<div class="music-row"><button type="button" class="music-toggle" aria-pressed="false"></button><label class="music-volume"><span></span><input type="range" min="0" max="100" step="1" value="${Math.round(audio.volume * 100)}"></label><details><summary aria-label="Music credits">ⓘ</summary><div class="music-credit"><strong>Five Armies</strong><br>Kevin MacLeod · <a href="https://incompetech.com/" target="_blank" rel="noopener">incompetech.com</a><br><a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a><br><span class="music-conversion"></span></div></details></div><span class="music-status" role="status" aria-live="polite"></span>`;
  document.body.append(panel);
  const button = panel.querySelector('button');
  const volume = panel.querySelector('input');
  const status = panel.querySelector('.music-status');
  let wanted = prefs.enabled !== false;
  let pending = false;
  let failed = false;
  let blocked = false;
  const en = () => document.documentElement.lang.startsWith('en');
  function persist() {
    try { sessionStorage.setItem(key, JSON.stringify({ enabled: wanted, volume: audio.volume, time: audio.currentTime })); } catch {}
  }
  function draw() {
    const playing = !audio.paused;
    button.textContent = pending ? (en() ? 'Loading…' : 'Yükleniyor…') : playing ? (en() ? 'Ⅱ Pause music' : 'Ⅱ Müziği durdur') : (en() ? '▶ Play music' : '▶ Müziği aç');
    button.setAttribute('aria-pressed', String(playing));
    button.disabled = pending;
    panel.setAttribute('aria-label', en() ? 'Archive music' : 'Arşiv müziği');
    volume.setAttribute('aria-label', en() ? 'Music volume' : 'Müzik ses seviyesi');
    panel.querySelector('.music-volume span').textContent = en() ? 'Volume' : 'Ses';
    panel.querySelector('.music-conversion').textContent = en() ? 'Converted to Ogg Opus; composition unchanged.' : 'Ogg Opus biçimine dönüştürüldü; beste değiştirilmedi.';
    status.textContent = blocked ? (en() ? 'Click anywhere to start music.' : 'Müziğin başlaması için sayfaya dokun.') : failed ? (en() ? 'Music could not load. Tap to retry.' : 'Müzik yüklenemedi. Yeniden denemek için bas.') : 'Five Armies · Kevin MacLeod';
  }
  async function play() {
    if (pending || !audio.paused) return;
    wanted = true;
    failed = false;
    blocked = false;
    pending = true;
    draw();
    try { await audio.play(); } catch (error) {
      if (error.name === 'NotAllowedError') blocked = true;
      else { failed = true; wanted = false; }
    }
    finally { pending = false; draw(); persist(); }
  }
  audio.addEventListener('loadedmetadata', () => {
    if (Number.isFinite(prefs.time) && Number.isFinite(audio.duration)) audio.currentTime = prefs.time % audio.duration;
    prefs.time = undefined;
  }, { once: true });
  audio.addEventListener('error', () => { failed = true; pending = false; wanted = false; draw(); persist(); });
  button.addEventListener('click', () => {
    if (audio.paused) play();
    else { audio.pause(); wanted = false; draw(); persist(); }
  });
  volume.addEventListener('input', () => { audio.volume = Number(volume.value) / 100; persist(); });
  // Browsers require a user gesture after full-page navigation.
  function resume(event) {
    if (panel.contains(event.target)) return;
    if (wanted && audio.paused && !failed) play();
  }
  document.addEventListener('pointerdown', resume);
  document.addEventListener('keydown', resume);
  audio.addEventListener('play', draw);
  audio.addEventListener('pause', draw);
  window.addEventListener('pagehide', () => { persist(); audio.pause(); });
  new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  draw();
  if (wanted) play();
})();
