/**
 * Ando-san's Neon Cyber World - Dynamic Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initNeonParticleCanvas();
  initAndoInteractions();
  initFortuneSystem();
  renderProfileStats();
  renderItemMuseum();
  initSoundSystem();
});

/* --------------------------------------------------------------------------
   1. Cyber Neon Matrix & Energy Dust Canvas Background
   -------------------------------------------------------------------------- */
function initNeonParticleCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = 'sparkle-canvas';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 45;
  const colors = ['#ff007f', '#00f0ff', '#ffe600', '#00ff9f', '#9d4edd'];

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class NeonParticle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 3 + 1.5;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() * -0.6) - 0.2;
      this.alpha = Math.random() * 0.7 + 0.3;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.pulseSpeed = Math.random() * 0.03 + 0.01;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha += Math.sin(Date.now() * this.pulseSpeed) * 0.01;
      if (this.y < -10 || this.x < -10 || this.x > width + 10) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0.1, Math.min(1, this.alpha));
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      
      // Draw neon square / diamond
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) particles.push(new NeonParticle());

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw subtle cyber grid lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 90) * 0.15;
          ctx.strokeStyle = particles[i].color;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    requestAnimationFrame(animate);
  }
  animate();
}

/* --------------------------------------------------------------------------
   2. Ando-san Click / Stroke Interaction & Neon Particles
   -------------------------------------------------------------------------- */
let strokeCount = 0;
let isAudioEnabled = true;

function initAndoInteractions() {
  const andoAvatarBox = document.getElementById('ando-avatar-box');
  const speechBubble = document.getElementById('ando-speech-bubble');
  const counterVal = document.getElementById('pet-count-number');

  if (!andoAvatarBox) return;

  const cyberSymbols = ['⚡', '💖', '✨', '🌟', '🌌', '🍩', '💎'];

  andoAvatarBox.addEventListener('click', (e) => {
    strokeCount++;
    if (counterVal) counterVal.textContent = strokeCount;

    // Random Cyber Speech Bubble Update
    if (speechBubble) {
      const quote = ANDO_DATA.quotes[Math.floor(Math.random() * ANDO_DATA.quotes.length)];
      speechBubble.textContent = quote;
      speechBubble.style.animation = 'none';
      void speechBubble.offsetWidth; // Trigger reflow
      speechBubble.style.animation = 'speech-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }

    // Spawn 5 Floating Neon Particles on click
    for (let i = 0; i < 5; i++) {
      const offsetX = (Math.random() - 0.5) * 80;
      const offsetY = (Math.random() - 0.5) * 50;
      const symbol = cyberSymbols[Math.floor(Math.random() * cyberSymbols.length)];
      spawnFloatingNeonParticle(e.clientX + offsetX, e.clientY + offsetY, symbol);
    }

    // Play cyber synth chime sound
    playCyberSynthSound(520 + Math.random() * 300, 0.12);
  });
}

function spawnFloatingNeonParticle(x, y, symbol = '⚡') {
  const particle = document.createElement('div');
  particle.className = 'floating-heart';
  particle.textContent = symbol;
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  document.body.appendChild(particle);
  setTimeout(() => particle.remove(), 1200);
}

/* --------------------------------------------------------------------------
   3. Quantum Fortune Teller System (おみくじ)
   -------------------------------------------------------------------------- */
function initFortuneSystem() {
  const fortuneBtn = document.getElementById('draw-fortune-btn');
  const fortuneRank = document.getElementById('fortune-rank');
  const fortuneMsg = document.getElementById('fortune-message');

  if (!fortuneBtn) return;

  fortuneBtn.addEventListener('click', () => {
    playCyberSynthSound(600, 0.1);
    setTimeout(() => playCyberSynthSound(900, 0.15), 100);

    if (fortuneMsg) fortuneMsg.textContent = "⚡ 量子AIが運勢マトリクスを走査中... 🔮";
    if (fortuneRank) fortuneRank.textContent = "✨ ANALYZING MATRIX... ✨";

    // Matrix Glitch Text Rolling Effect
    let glitchInterval = setInterval(() => {
      if (fortuneRank) {
        const glitchChars = ['⚡', '💖', '0101', 'CYBER', 'OVERDRIVE', 'SYNC'];
        fortuneRank.textContent = glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
    }, 80);

    setTimeout(() => {
      clearInterval(glitchInterval);
      const fortune = ANDO_DATA.fortunes[Math.floor(Math.random() * ANDO_DATA.fortunes.length)];
      if (fortuneRank) {
        fortuneRank.textContent = fortune.rank;
        fortuneRank.style.color = fortune.color;
        fortuneRank.style.textShadow = `0 0 12px ${fortune.color}`;
      }
      if (fortuneMsg) fortuneMsg.textContent = fortune.message;

      // Spawn celebratory particles
      for (let i = 0; i < 10; i++) {
        const x = window.innerWidth / 2 + (Math.random() - 0.5) * 260;
        const y = window.innerHeight / 2 + (Math.random() - 0.5) * 140;
        spawnFloatingNeonParticle(x, y, '🌟');
      }

      playCyberSynthSound(1046.5, 0.25);
    }, 700);
  });
}

/* --------------------------------------------------------------------------
   4. Render Profile Stats & Cyber Item Vault
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
   5. Cyber Dual-Oscillator Web Audio Synthesizer
   -------------------------------------------------------------------------- */
let audioCtx = null;

function initSoundSystem() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    isAudioEnabled = !isAudioEnabled;
    soundBtn.textContent = isAudioEnabled ? "🔊 SYNTH: ON" : "🔇 SYNTH: OFF";
    if (isAudioEnabled) playCyberSynthSound(659.25, 0.15);
  });
}

function playCyberSynthSound(freq = 440, duration = 0.12) {
  if (!isAudioEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // Dual Oscillator for Cyber Synth Harmonics
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc2.frequency.setValueAtTime(freq * 1.5, audioCtx.currentTime); // 5th Harmonic

    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioCtx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(audioCtx.currentTime + duration);
    osc2.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio Context catch
  }
}
