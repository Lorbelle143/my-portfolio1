// ===== AOS =====
AOS.init({ duration: 850, once: true, offset: 70 });

// ===== CUSTOM CURSOR =====
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

document.addEventListener('mousemove', e => {
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';
  outline.style.left = e.clientX + 'px';
  outline.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    outline.style.transform = 'translate(-50%, -50%) scale(1.6)';
    outline.style.borderColor = 'rgba(255,193,7,0.7)';
  });
  el.addEventListener('mouseleave', () => {
    outline.style.transform = 'translate(-50%, -50%) scale(1)';
    outline.style.borderColor = 'rgba(255,193,7,0.4)';
  });
});

// ===== PARTICLES CANVAS =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.5,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.5 + 0.1
  };
}

for (let i = 0; i < 80; i++) particles.push(createParticle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,193,7,${p.alpha})`;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== TYPING ANIMATION =====
const phrases = ['Web Developer', 'Chess Enthusiast', 'Problem Solver', 'Creative Thinker'];
let phraseIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const current = phrases[phraseIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ===== MOBILE NAV AUTO-CLOSE =====
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navCollapse = document.getElementById('nav-menu');
    const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
    if (bsCollapse) bsCollapse.hide();
  });
});

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.style.boxShadow = window.scrollY > 50 ? '0 4px 24px rgba(0,0,0,0.5)' : 'none';
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// ===== STATS COUNTER =====
const statNums = document.querySelectorAll('.stat-num');
let counted = false;

function countUp() {
  if (counted) return;
  const statsSection = document.querySelector('.stats-section');
  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    counted = true;
    statNums.forEach(el => {
      const target = +el.dataset.target;
      let count = 0;
      const step = Math.ceil(target / 50);
      const timer = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = count + (target === 100 ? '' : '+');
        if (count >= target) clearInterval(timer);
      }, 30);
    });
  }
}
window.addEventListener('scroll', countUp);

// ===== TECH BAR ANIMATION =====
const techFills = document.querySelectorAll('.tech-fill');
let techAnimated = false;

function animateTech() {
  if (techAnimated) return;
  const techSection = document.getElementById('tech');
  if (!techSection) return;
  const rect = techSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    techAnimated = true;
    techFills.forEach(fill => {
      fill.style.width = fill.style.width; // trigger reflow
    });
  }
}
window.addEventListener('scroll', animateTech);

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function () {
  const btn = document.getElementById('submitBtn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
  btn.disabled = true;
});
