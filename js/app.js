/**
 * Ando-san's 8-Bit World - Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initSparkleCanvas();
  initAndoInteractions();
  initFortuneSystem();
  renderProfileStats();
  renderItemMuseum();
  initSoundSystem();
});

/* --------------------------------------------------------------------------
   1. Sparkle & Floating Hearts Canvas Background
   -------------------------------------------------------------------------- */
function initSparkleCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = 'sparkle-canvas';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const sparkles = [];
  const sparkleCount = 35;
  const colors = ['#ff7597', '#52b788', '#ffb703', '#b5179e', '#ffd166'];

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Sparkle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 4 + 2;
      this.vy = (Math.random() * 0.3) + 0.1;
      this.alpha = Math.random() * 0.7 + 0.3;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.y -= this.vy;
      if (this.y < -10) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      // Draw 8-bit square star
      ctx.fillRect(this.x, this.y, this.size, this.size);
      ctx.restore();
    }
  }

  for (let i = 0; i < sparkleCount; i++) sparkles.push(new Sparkle());

  function animate() {
    ctx.clearRect(0, 0, width, height);
    sparkles.forEach(s => { s.update(); s.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

/* --------------------------------------------------------------------------
   2. Ando-san Click / Stroke Interaction & Floating Particles
   -------------------------------------------------------------------------- */
let strokeCount = 0;
let isAudioEnabled = true;

function initAndoInteractions() {
  const andoAvatarBox = document.getElementById('ando-avatar-box');
  const speechBubble = document.getElementById('ando-speech-bubble');
  const counterVal = document.getElementById('pet-count-number');

  if (!andoAvatarBox) return;

  const heartSymbols = ['💖', '🌸', '✨', '⭐', '🎀', 'どら焼き'];

  andoAvatarBox.addEventListener('click', (e) => {
    strokeCount++;
    if (counterVal) counterVal.textContent = strokeCount;

    // Random Speech Bubble Update
    if (speechBubble) {
      const quote = ANDO_DATA.quotes[Math.floor(Math.random() * ANDO_DATA.quotes.length)];
      speechBubble.textContent = quote;
      speechBubble.style.animation = 'none';
      void speechBubble.offsetWidth; // Trigger reflow
      speechBubble.style.animation = 'speech-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }

    // Spawn 5 Floating Hearts on click
    for (let i = 0; i < 4; i++) {
      const offsetX = (Math.random() - 0.5) * 60;
      const offsetY = (Math.random() - 0.5) * 40;
      const symbol = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      spawnFloatingHeart(e.clientX + offsetX, e.clientY + offsetY, symbol);
    }

    // Play retro beep sound
    play8BitSound(440 + Math.random() * 200, 0.08);
  });
}

function spawnFloatingHeart(x, y, symbol = '💖') {
  const particle = document.createElement('div');
  particle.className = 'floating-heart';
  particle.textContent = symbol;
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  document.body.appendChild(particle);
  setTimeout(() => particle.remove(), 1200);
}

/* --------------------------------------------------------------------------
   3. Fortune Teller System (おみくじ)
   -------------------------------------------------------------------------- */
function initFortuneSystem() {
  const fortuneBtn = document.getElementById('draw-fortune-btn');
  const fortuneRank = document.getElementById('fortune-rank');
  const fortuneMsg = document.getElementById('fortune-message');
  const fortuneBox = document.getElementById('fortune-result-box');

  if (!fortuneBtn) return;

  fortuneBtn.addEventListener('click', () => {
    play8BitSound(587, 0.1);
    setTimeout(() => play8BitSound(880, 0.15), 100);

    if (fortuneMsg) fortuneMsg.textContent = "あんどうさんが運勢を判定中... 🔮";
    if (fortuneRank) fortuneRank.textContent = "✨ ガチャガチャ... ✨";

    setTimeout(() => {
      const fortune = ANDO_DATA.fortunes[Math.floor(Math.random() * ANDO_DATA.fortunes.length)];
      if (fortuneRank) {
        fortuneRank.textContent = fortune.rank;
        fortuneRank.style.color = fortune.color;
      }
      if (fortuneMsg) fortuneMsg.textContent = fortune.message;

      // Spawn celebratory particles
      for (let i = 0; i < 8; i++) {
        const x = window.innerWidth / 2 + (Math.random() - 0.5) * 200;
        const y = window.innerHeight / 2 + (Math.random() - 0.5) * 100;
        spawnFloatingHeart(x, y, '🌟');
      }
    }, 600);
  });
}

/* --------------------------------------------------------------------------
   4. Render Data (Stats & Item Museum)
   -------------------------------------------------------------------------- */
function renderProfileStats() {
  const statsContainer = document.getElementById('stats-row');
  if (!statsContainer) return;

  statsContainer.innerHTML = ANDO_DATA.profile.stats.map(s => `
    <div class="stat-card">
      <div class="stat-val">${s.value}</div>
      <div class="stat-lbl">${s.label} (${s.unit})</div>
    </div>
  `).join('');
}

function renderItemMuseum() {
  const itemsContainer = document.getElementById('items-grid');
  if (!itemsContainer) return;

  itemsContainer.innerHTML = ANDO_DATA.items.map(item => `
    <div class="item-card">
      <div class="item-icon-box">
        ${item.isImage ? `<img src="${item.icon}" alt="${item.name}" />` : item.icon}
      </div>
      <div class="item-name">${item.name}</div>
      <span class="item-rarity">${item.rarity}</span>
      <p class="item-desc">${item.desc}</p>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   5. Web Audio API 8-Bit Sound Synthesizer
   -------------------------------------------------------------------------- */
let audioCtx = null;

function initSoundSystem() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    isAudioEnabled = !isAudioEnabled;
    soundBtn.textContent = isAudioEnabled ? "🎵 BGM: ON" : "🔇 BGM: OFF";
    if (isAudioEnabled) play8BitSound(523.25, 0.1);
  });
}

function play8BitSound(freq = 440, duration = 0.1) {
  if (!isAudioEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'square'; // 8-bit retro square wave
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio Context unlock catch
  }
}
