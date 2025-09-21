(function(){
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if(saved === 'light') root.setAttribute('data-theme','light');

  themeBtn.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if(isLight){
      root.removeAttribute('data-theme');
      localStorage.removeItem('theme');
      themeBtn.textContent = '🌙';
    } else {
      root.setAttribute('data-theme','light');
      localStorage.setItem('theme','light');
      themeBtn.textContent = '☀️';
    }
  });

  // menú hamburguesa: abrir/cerrar al clicar y cerrar al clicar fuera / redimensionar
  const menuBtn = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  const header = document.querySelector('.site-header');

  if (menuBtn && nav && header) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const opened = nav.classList.toggle('open');
      header.classList.toggle('menu-open', opened);
      menuBtn.setAttribute('aria-expanded', opened ? 'true' : 'false');
    });

    // cerrar al clicar en un enlace del nav (móvil)
    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        header.classList.remove('menu-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // cerrar al clicar fuera del header
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !header.contains(e.target)) {
        nav.classList.remove('open');
        header.classList.remove('menu-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // cerrar al volver a tamaño de escritorio
    window.addEventListener('resize', () => {
      if (window.innerWidth > 880 && nav.classList.contains('open')) {
        nav.classList.remove('open');
        header.classList.remove('menu-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Form submit -> abrir wa.me directamente al número 584129158899
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name ? form.name.value.trim() : '';
      const email = form.email ? form.email.value.trim() : '';
      const message = form.message ? form.message.value.trim() : '';

      if (!name || !email || !message) {
        if (status) status.textContent = 'Rellena todos los campos.';
        return;
      }

      const text = `Nombre: ${name}\nEmail: ${email}\n\n${message}`;
      const phone = '584129158899'; // tu número destino
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

      window.open(url, '_blank');
      if (status) status.textContent = 'Abriendo WhatsApp...';
      form.reset();
    });
  }


})();