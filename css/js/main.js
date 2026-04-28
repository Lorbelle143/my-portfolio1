// ===== AOS =====
AOS.init({ duration: 800, once: true, offset: 60, easing: 'ease-out-cubic' });

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
    outline.style.transform = 'translate(-50%,-50%) scale(1.8)';
    outline.style.borderColor = 'rgba(255,193,7,0.6)';
  });
  el.addEventListener('mouseleave', () => {
    outline.style.transform = 'translate(-50%,-50%) scale(1)';
    outline.style.borderColor = 'rgba(255,193,7,0.35)';
  });
});

// ===== PARTICLES =====
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
    r: Math.random() * 1.2 + 0.3,
    dx: (Math.random() - 0.5) * 0.35,
    dy: (Math.random() - 0.5) * 0.35,
    alpha: Math.random() * 0.4 + 0.1
  };
}

for (let i = 0; i < 70; i++) particles.push(createParticle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    particles.slice(i + 1).forEach(p2 => {
      const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
      if (dist < 90) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(255,193,7,${0.07 * (1 - dist / 90)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });
  });

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,193,7,${p.alpha})`;
    ctx.fill();
    p.x += p.dx; p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== TYPING =====
const phrases = ['Web Developer', 'UI Enthusiast', 'HTML/CSS Specialist', 'JavaScript Developer', 'Responsive Designer'];
let phraseIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const current = phrases[phraseIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 55 : 95);
}
type();

// ===== MOBILE NAV CLOSE =====
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const nc = document.getElementById('nav-menu');
    const bs = bootstrap.Collapse.getInstance(nc);
    if (bs) bs.hide();
  });
});

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  nav.style.background = window.scrollY > 40
    ? 'rgba(13,15,26,0.99)'
    : 'rgba(13,15,26,0.95)';
});

// ===== ACTIVE NAV =====
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) current = s.id; });
  navLinks.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === `#${current}`) l.classList.add('active');
  });
});

// ===== STATS COUNTER =====
let counted = false;
function countUp() {
  if (counted) return;
  const el = document.querySelector('.stats-bar');
  if (!el) return;
  if (el.getBoundingClientRect().top < window.innerHeight - 80) {
    counted = true;
    document.querySelectorAll('.stat-num').forEach(n => {
      const target = +n.dataset.target;
      let count = 0;
      const step = Math.ceil(target / 50);
      const t = setInterval(() => {
        count = Math.min(count + step, target);
        n.textContent = count + (target === 100 ? '%' : '+');
        if (count >= target) clearInterval(t);
      }, 28);
    });
  }
}
window.addEventListener('scroll', countUp);

// ===== TECH BARS =====
let techDone = false;
function animateTech() {
  if (techDone) return;
  const sec = document.getElementById('tech');
  if (!sec) return;
  if (sec.getBoundingClientRect().top < window.innerHeight - 80) {
    techDone = true;
    document.querySelectorAll('.tech-fill').forEach(f => {
      const w = f.dataset.width + '%';
      f.style.width = '0';
      requestAnimationFrame(() => setTimeout(() => { f.style.width = w; }, 50));
    });
  }
}
window.addEventListener('scroll', animateTech);

// ===== SCROLL PROGRESS =====
const bar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  bar.style.width = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100) + '%';
});

// ===== TILT =====
document.querySelectorAll('.skill-card, .tech-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function () {
  const btn = document.getElementById('submitBtn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
  btn.disabled = true;
});
