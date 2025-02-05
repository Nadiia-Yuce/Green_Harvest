(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const menuLinks = document.querySelectorAll('.js-menu-container a');

  const toggleMenu = () => {
    const isMenuOpen = openMenuBtn.getAttribute('aria-expanded') === 'true';
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');

    const scrollLockMethod = !isMenuOpen
      ? 'disableBodyScroll'
      : 'enableBodyScroll';
    bodyScrollLock[scrollLockMethod](document.body);
  };

  const closeMenu = event => {
    if (
      event.target === mobileMenu || // Клік на бекдроп
      event.key === 'Escape' || // Натискання Escape
      event.target.closest('a') // Клік по лінці
    ) {
      openMenuBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-open');
      bodyScrollLock.enableBodyScroll(document.body);
      document.removeEventListener('keydown', closeMenu);
    }
  };

  openMenuBtn.addEventListener('click', () => {
    toggleMenu();
    document.addEventListener('keydown', closeMenu);
  });

  mobileMenu.addEventListener('click', closeMenu);
  menuLinks.forEach(link => link.addEventListener('click', closeMenu));

  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    openMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-open');
    bodyScrollLock.enableBodyScroll(document.body);
  });
})();
