//Navbar cambia de color al hacer scroll
  const navbar = document.getElementById('nav-bar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


// Función para cambiar la imagen al hacer clic en una card
  function cambiarImagen(cardId) {
      const imagen = document.getElementById('displayed-image');
      // Cambiar la imagen dependiendo de la card seleccionada
      if (cardId === 1) {
          imagen.src = 'img/mockup-funtions.png';
      } else if (cardId === 2) {
          imagen.src = 'img/mockup-crearplan-portrait.png';
      } else if (cardId === 3) {
          imagen.src = 'img/mockup-funtions.png';
      }
  }