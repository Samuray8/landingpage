const hoverCard = document.getElementById('hover-card');
const screen = document.getElementById('interactive-screen');
const constellation = document.getElementById('constellation');
const nodes = document.querySelectorAll('.node');
const tiltCards = document.querySelectorAll('[data-tilt]');

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Floating card follows pointer
screen.addEventListener('pointermove', (event) => {
  const rect = screen.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const percentX = (x / rect.width - 0.5) * 2;
  const percentY = (y / rect.height - 0.5) * 2;

  hoverCard.style.transform = `translate(${clamp(percentX * 40, -40, 40)}px, ${clamp(percentY * 30, -30, 30)}px)`;
  hoverCard.style.boxShadow = `0 18px 60px rgba(123, 92, 245, ${0.35 + Math.abs(percentX) * 0.2})`;
});

screen.addEventListener('pointerleave', () => {
  hoverCard.style.transform = 'translate(40px, -10px)';
  hoverCard.style.boxShadow = '';
});

// Constellation reactive nodes
constellation.addEventListener('pointermove', (event) => {
  const rect = constellation.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  nodes.forEach((node, index) => {
    const distanceX = (x - centerX) / (index + 2);
    const distanceY = (y - centerY) / (index + 2);
    const rotation = ((x / rect.width) - 0.5) * 10;
    node.style.transform = `translate(${distanceX * 0.08}px, ${distanceY * 0.08}px) rotate(${rotation}deg)`;
  });
});

constellation.addEventListener('pointerleave', () => {
  nodes.forEach((node) => {
    node.style.transform = 'translate(0,0)';
  });
});

// Tilt effect on cards
function applyTilt(card) {
  const rect = card.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  card.addEventListener('pointermove', (event) => {
    const dx = (event.clientX - centerX) / (rect.width / 2);
    const dy = (event.clientY - centerY) / (rect.height / 2);
    const rotateX = clamp(dy * -8, -10, 10);
    const rotateY = clamp(dx * 8, -10, 10);
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0)';
  });
}

tiltCards.forEach(applyTilt);

// Spark speed based on dataset
const sparks = document.querySelectorAll('.spark, .glow');
let sparkFrame = 0;

function animateSparks() {
  sparkFrame += 1;
  sparks.forEach((spark) => {
    const speed = parseFloat(spark.dataset.speed || '1');
    const offset = Math.sin((sparkFrame / 40) * speed) * 6;
    spark.style.transform = `translateY(${offset}px) scale(${1 + offset * 0.002}) rotate(${offset * 1.3}deg)`;
  });
  requestAnimationFrame(animateSparks);
}

animateSparks();
