const navbar = document.getElementById('nav-bar');
const dynamicWord = document.getElementById('dynamic-word');
const words = ['tu vibe', 'tu crew', 'tu presupuesto', 'tu energía'];
let wordIndex = 0;
let sliderTimer;
let currentStep = '1';

const slidesContainer = document.getElementById('slides');
const slides = Array.from(document.querySelectorAll('.slide'));
const stepCards = Array.from(document.querySelectorAll('.step-card'));
const progressDots = Array.from(document.querySelectorAll('.progress-dot'));
const parallaxState = { x: 0, y: 0, scroll: 0 };

function rotateWords() {
  if (!dynamicWord) return;
  dynamicWord.classList.add('fade');
  setTimeout(() => {
    wordIndex = (wordIndex + 1) % words.length;
    dynamicWord.textContent = words[wordIndex];
    dynamicWord.classList.remove('fade');
  }, 260);
}

function handleScroll() {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  parallaxState.scroll = Math.min(window.scrollY / 20, 26);
  updateMockupTransform();
}

function showStep(step) {
  const index = stepCards.findIndex((card) => card.dataset.step === step);
  if (!slidesContainer || index === -1) return;

  slidesContainer.style.transform = `translateX(-${index * 100}%)`;
  slides.forEach((slide) => slide.classList.toggle('active', slide.dataset.step === step));
  stepCards.forEach((card) => card.classList.toggle('active', card.dataset.step === step));
  progressDots.forEach((dot) => dot.classList.toggle('active', dot.dataset.step === step));
  currentStep = step;
}

function setupSteps() {
  stepCards.forEach((card) => {
    card.addEventListener('click', () => {
      showStep(card.dataset.step);
      restartAutoSlide();
    });
  });
}

function restartAutoSlide() {
  if (!stepCards.length) return;
  if (sliderTimer) clearInterval(sliderTimer);
  sliderTimer = setInterval(() => {
    const index = stepCards.findIndex((card) => card.dataset.step === currentStep);
    const next = ((index + 1) % stepCards.length) + 1;
    showStep(String(next));
  }, 5200);
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

function setupParallax() {
  const parallax = document.querySelector('[data-parallax]');
  if (!parallax) return;

  document.addEventListener('mousemove', (e) => {
    const rect = parallax.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    parallaxState.x = x * 14;
    parallaxState.y = y * 14;
    updateMockupTransform();
  });
}

function updateMockupTransform() {
  const heroMockup = document.getElementById('mockup-main');
  if (!heroMockup) return;
  heroMockup.style.transform = `translate(${parallaxState.x}px, ${parallaxState.scroll + parallaxState.y}px)`;
}

if (dynamicWord) {
  setInterval(rotateWords, 2200);
}

window.addEventListener('scroll', handleScroll);

document.addEventListener('DOMContentLoaded', () => {
  handleScroll();
  setupSteps();
  setupReveal();
  setupParallax();
  showStep('1');
  restartAutoSlide();
});
