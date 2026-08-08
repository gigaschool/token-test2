/**
 * Main Application Logic & Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Canvas Background
  initBackgroundCanvas();

  // Populate Dynamic Content from PORTFOLIO_DATA
  renderHeroStats();
  renderSkills('all');
  renderProjects('all');
  renderTimeline();

  // Initialize Interactive Features
  initTypingEffect();
  initNavigation();
  initThemeSwitch();
  initFilterTabs();
  initCardTiltEffect();
  initScrollAnimations();
  initContactForm();
  initPlayground();
  initModal();
});

/* ==========================================================================
   1. Background Canvas Animation (Interactive Particles & Glow)
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = Math.floor((width * height) / 18000);

  let mouseX = width / 2;
  let mouseY = height / 2;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Mouse influence
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        this.x -= (dx / dist) * 0.6;
        this.y -= (dy / dist) * 0.6;
      }

      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = '#00f2fe';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw subtle glowing background circles
    ctx.save();
    const grad1 = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 400);
    grad1.addColorStop(0, 'rgba(0, 242, 254, 0.04)');
    grad1.addColorStop(1, 'transparent');
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Typing Animation Effect
   ========================================================================== */
function initTypingEffect() {
  const target = document.getElementById('typing-text');
  if (!target) return;

  const words = [
    "Full-Stack Web Developer",
    "Creative UI/UX Engineer",
    "AI & LLM Integration Specialist",
    "TypeScript & Modern Web Passionate"
  ];

  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let speed = 100;

  function type() {
    const currentWord = words[wordIdx];

    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
      speed = 40;
    } else {
      target.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
      speed = 100;
    }

    if (!isDeleting && charIdx === currentWord.length) {
      speed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      speed = 500; // Pause before new word
    }

    setTimeout(type, speed);
  }

  type();
}

/* ==========================================================================
   3. Navigation, Scroll Progress & Mobile Menu
   ========================================================================== */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const scrollProgress = document.getElementById('scroll-progress');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    // Scroll progress bar width
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = `${progress}%`;

    // Sticky navbar styling
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Active nav link highlight
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      mobileToggle.textContent = navLinksContainer.classList.contains('active') ? '✕' : '☰';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        if (mobileToggle) mobileToggle.textContent = '☰';
      });
    });
  }
}

/* ==========================================================================
   4. Theme Switcher (Dark / Light / Cyber)
   ========================================================================== */
function initThemeSwitch() {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;

  const themes = ['dark', 'light', 'cyber'];
  let currentThemeIdx = 0;

  themeBtn.addEventListener('click', () => {
    currentThemeIdx = (currentThemeIdx + 1) % themes.length;
    const newTheme = themes[currentThemeIdx];

    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Icon updates
    if (newTheme === 'dark') themeBtn.textContent = '🌙';
    else if (newTheme === 'light') themeBtn.textContent = '☀️';
    else if (newTheme === 'cyber') themeBtn.textContent = '⚡';

    showToast(`テーマを [ ${newTheme.toUpperCase()} ] に変更しました`);
  });
}

/* ==========================================================================
   5. Dynamic Content Rendering Functions
   ========================================================================== */
function renderHeroStats() {
  const statsContainer = document.getElementById('stats-grid');
  if (!statsContainer) return;

  statsContainer.innerHTML = PORTFOLIO_DATA.profile.stats.map(stat => `
    <div class="stat-item glass-card">
      <div class="stat-number" data-count="${parseFloat(stat.value)}">${stat.value}${stat.suffix}</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('');
}

function renderSkills(categoryFilter = 'all') {
  const skillsContainer = document.getElementById('skills-grid');
  if (!skillsContainer) return;

  const filtered = categoryFilter === 'all' 
    ? PORTFOLIO_DATA.skills 
    : PORTFOLIO_DATA.skills.filter(s => s.category === categoryFilter);

  skillsContainer.innerHTML = filtered.map(skill => `
    <div class="skill-card glass-card">
      <div class="skill-header">
        <div class="skill-icon">${skill.icon}</div>
        <div class="skill-title-wrap">
          <div class="skill-name">${skill.name}</div>
          <div class="skill-level-text">Proficiency: ${skill.level}%</div>
        </div>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width: ${skill.level}%"></div>
      </div>
      <p class="skill-desc">${skill.description}</p>
      <div class="skill-tags">
        ${skill.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderProjects(categoryFilter = 'all') {
  const projectsContainer = document.getElementById('projects-grid');
  if (!projectsContainer) return;

  const filtered = categoryFilter === 'all'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === categoryFilter);

  projectsContainer.innerHTML = filtered.map(project => `
    <div class="project-card glass-card" data-project-id="${project.id}">
      <div class="project-img-wrapper">
        <img src="${project.image}" alt="${project.title}" loading="lazy" />
        <span class="project-category-badge">${project.categoryName}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-summary">${project.summary}</p>
        <div class="skill-tags" style="margin-bottom: 16px;">
          ${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="project-footer">
          <button class="btn btn-secondary view-detail-btn" style="padding: 6px 16px; font-size: 0.85rem;" onclick="openProjectModal('${project.id}')">
            詳細を見る 🔍
          </button>
          <div class="project-links">
            <a href="${project.githubUrl}" target="_blank" class="icon-link" title="GitHub Code">💻</a>
            <a href="${project.demoUrl}" target="_blank" class="icon-link" title="Live Preview">🚀</a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderTimeline() {
  const timelineContainer = document.getElementById('timeline-wrapper');
  if (!timelineContainer) return;

  timelineContainer.innerHTML = PORTFOLIO_DATA.experiences.map(exp => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-card glass-card">
        <div class="timeline-header">
          <h4 class="timeline-role">${exp.role}</h4>
          <span class="timeline-period">${exp.period}</span>
        </div>
        <div class="timeline-company">${exp.company}</div>
        <p class="timeline-desc">${exp.description}</p>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   6. Filtering Logic for Skills & Projects
   ========================================================================== */
function initFilterTabs() {
  // Skill Filters
  const skillTabs = document.querySelectorAll('.skill-tab');
  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderSkills(tab.getAttribute('data-filter'));
    });
  });

  // Project Filters
  const projectTabs = document.querySelectorAll('.project-tab');
  projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      projectTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderProjects(tab.getAttribute('data-filter'));
    });
  });
}

/* ==========================================================================
   7. Modal Dialog Logic
   ========================================================================== */
function initModal() {
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');

  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  }
}

window.openProjectModal = function(projectId) {
  const project = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
  if (!project) return;

  const overlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body-content');

  if (overlay && modalBody) {
    modalBody.innerHTML = `
      <img src="${project.image}" alt="${project.title}" style="width:100%; height:260px; object-fit:cover; border-radius:12px; margin-bottom:20px;" />
      <span class="section-subtitle">${project.categoryName}</span>
      <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom:14px;">${project.title}</h2>
      <p style="color: var(--text-muted); font-size: 1.05rem; margin-bottom: 20px;">${project.description}</p>
      
      <h4 style="font-family: var(--font-heading); margin-bottom: 10px; color: var(--accent-cyan);">主な機能 & 実装ポイント</h4>
      <ul style="list-style-type: none; margin-bottom: 24px;">
        ${project.features.map(f => `<li style="padding: 6px 0; color: var(--text-muted); font-size: 0.95rem;">✨ ${f}</li>`).join('')}
      </ul>

      <h4 style="font-family: var(--font-heading); margin-bottom: 10px; color: var(--accent-cyan);">使用テクノロジー</h4>
      <div class="skill-tags" style="margin-bottom: 28px;">
        ${project.tags.map(t => `<span class="tag" style="font-size: 0.85rem; padding: 6px 14px;">${t}</span>`).join('')}
      </div>

      <div style="display: flex; gap: 14px;">
        <a href="${project.demoUrl}" target="_blank" class="btn btn-primary">ライブデモを見る 🚀</a>
        <a href="${project.githubUrl}" target="_blank" class="btn btn-secondary">GitHub リポジトリ 💻</a>
      </div>
    `;
    overlay.classList.add('active');
  }
};

/* ==========================================================================
   8. 3D Card Tilt Effect
   ========================================================================== */
function initCardTiltEffect() {
  document.addEventListener('mousemove', (e) => {
    const avatarCard = document.querySelector('.avatar-card');
    if (!avatarCard) return;

    const rect = avatarCard.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / rect.height) * -15;
    const tiltY = (x / rect.width) * 15;

    avatarCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
  });
}

/* ==========================================================================
   9. Scroll Reveal Animations & Observers
   ========================================================================== */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section-header, .glass-card, .timeline-item').forEach(el => {
    observer.observe(el);
  });
}

/* ==========================================================================
   10. Contact Form & Toast Notification
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name')?.value;
    const email = document.getElementById('form-email')?.value;
    const message = document.getElementById('form-message')?.value;

    if (!name || !email || !message) {
      showToast('⚠️ すべての項目を入力してください', 'error');
      return;
    }

    // Submit Simulation
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = '送信中... ⏳';
    }

    setTimeout(() => {
      showToast(`✉️ ありがとう ${name} さん！メッセージを送信しました。`, 'success');
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'メッセージを送る 🚀';
      }
    }, 1200);
  });
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;

  if (type === 'error') {
    toast.style.borderColor = 'var(--accent-pink)';
  }

  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 50);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ==========================================================================
   11. Interactive Playground Component
   ========================================================================== */
function initPlayground() {
  const promptBtn = document.getElementById('playground-run-btn');
  const outputBox = document.getElementById('playground-output');
  if (!promptBtn || !outputBox) return;

  const responses = [
    "🤖 「Alex RayはTypeScriptとReact、Next.js、Node.jsに非常に強みを持っています。最新のAIモデル統合アプリ開発も得意分野です！」",
    "⚡ 「レスポンシブWebデザインとCSSグラデーション、アニメーションの最適化が得意です。UXの満足度99.4%を維持しています！」",
    "🚀 「フロントエンドからバックエンドAPI、データベース構築まで一貫した開発が可能です。お気軽にお問い合わせください！」"
  ];

  let idx = 0;
  promptBtn.addEventListener('click', () => {
    outputBox.textContent = "AI Agent Executing query...";
    setTimeout(() => {
      outputBox.textContent = responses[idx];
      idx = (idx + 1) % responses.length;
    }, 600);
  });
}
