const navbar = document.getElementById('nav-bar');
const dynamicWord = document.getElementById('dynamic-word');
const words = ['tus gustos', 'tu energía', 'tu presupuesto', 'tu mood'];
let wordIndex = 0;

const stepImages = {
  1: 'img/mockup-funtions.png',
  2: 'img/mockup-crearplan-portrait.png',
  3: 'img/mockup-funtions.png',
};

function rotateWords() {
  wordIndex = (wordIndex + 1) % words.length;
  dynamicWord.textContent = words[wordIndex];
}

function handleScroll() {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

function setupSteps() {
  const cards = document.querySelectorAll('.step-card');
  const image = document.getElementById('displayed-image');

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      cards.forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
      const step = card.getAttribute('data-step');
      image.src = stepImages[step] ?? image.src;
    });
  });
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

setInterval(rotateWords, 2200);
window.addEventListener('scroll', handleScroll);

document.addEventListener('DOMContentLoaded', () => {
  handleScroll();
  setupSteps();
  setupReveal();
});
