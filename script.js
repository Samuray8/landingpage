const rotatingWord = document.getElementById('rotating-word');
const words = ['tus gustos', 'tu estado de ánimo', 'tu presupuesto'];
let wordIndex = 0;

function rotateWord() {
  wordIndex = (wordIndex + 1) % words.length;
  rotatingWord.textContent = words[wordIndex];
  rotatingWord.classList.add('swap');
  setTimeout(() => rotatingWord.classList.remove('swap'), 400);
}

setInterval(rotateWord, 2200);

const steps = {
  1: {
    label: 'Paso 1',
    title: 'Crea tu cuenta o accede como invitado',
    text: 'Elige tus gustos y tu estado de ánimo. TooPlan te acompaña sin importar el día.'
  },
  2: {
    label: 'Paso 2',
    title: 'Crea el plan como lo deseas',
    text: 'Ajusta duración, presupuesto, compañía y vibra del plan para que encaje perfecto.'
  },
  3: {
    label: 'Paso 3',
    title: 'Selecciona, guarda o sigue explorando',
    text: 'Guarda tus favoritos, comparte o deja que TooPlan proponga algo nuevo al instante.'
  }
};

const stepButtons = document.querySelectorAll('.step-card');
const stepLabel = document.getElementById('step-label');
const stepTitle = document.getElementById('step-title');
const stepText = document.getElementById('step-text');

stepButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const step = button.dataset.step;
    stepButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    stepLabel.textContent = steps[step].label;
    stepTitle.textContent = steps[step].title;
    stepText.textContent = steps[step].text;
  });
});
