// ================================
// CURSOR PERSONALIZADO
// ================================
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Cursor dot segue imediatamente
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

// Cursor ring com suavidade
function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.12;
  cursorY += (mouseY - cursorY) * 0.12;

  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Efeito hover em elementos interativos
const interactiveEls = document.querySelectorAll(
  'a, button, .project-card, .skill-pill, .stat-card, .contact-card'
);

interactiveEls.forEach((el) => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});


// ================================
// NAVBAR — scroll
// ================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ================================
// REVEAL ON SCROLL
// ================================
const revealEls = document.querySelectorAll(
  '.section-label, .section-title, .about-text p, .stat-card, ' +
  '.project-card, .skills-category, .contact-card, .contact-desc'
);

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  // Delay escalonado para filhos próximos
  el.style.transitionDelay = (i % 6) * 0.07 + 's';
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => observer.observe(el));


// ================================
// ACTIVE LINK NO NAV
// ================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((section) => sectionObserver.observe(section));


// ================================
// PARALLAX SUAVE NOS BLOBS
// ================================
const blob1 = document.querySelector('.blob-1');
const blob2 = document.querySelector('.blob-2');

document.addEventListener('mousemove', (e) => {
  const xRatio = e.clientX / window.innerWidth;
  const yRatio = e.clientY / window.innerHeight;

  blob1.style.transform = `translate(${xRatio * 20}px, ${yRatio * 20}px)`;
  blob2.style.transform = `translate(${-xRatio * 15}px, ${-yRatio * 15}px)`;
});


// ================================
// SUAVIDADE NOS LINKS DO NAV
// ================================
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
