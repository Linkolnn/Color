let isMobileMenuOpen = false;

export const initMobileMenu = () => {
  const burgerBtn = document.querySelector('.burger-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  
  if (!burgerBtn || !mobileMenu || !mobileMenuOverlay) {
    console.error('Mobile menu elements not found');
    return;
  }
  
  burgerBtn.addEventListener('click', toggleMobileMenu);
  mobileMenuOverlay.addEventListener('click', closeMobileMenu);
  
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 860 && isMobileMenuOpen) {
      closeMobileMenu();
    }
  });
};

const toggleMobileMenu = () => {
  const burgerBtn = document.querySelector('.burger-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const body = document.body;
  
  if (!burgerBtn || !mobileMenu || !mobileMenuOverlay) {
    return;
  }
  
  if (isMobileMenuOpen) {
    closeMobileMenu();
  } else {
    burgerBtn.classList.add('burger-btn--active');
    mobileMenu.classList.add('mobile-menu--open');
    mobileMenuOverlay.classList.add('mobile-menu-overlay--open');
    body.style.overflow = 'hidden';
    isMobileMenuOpen = true;
  }
};

const closeMobileMenu = () => {
  const burgerBtn = document.querySelector('.burger-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const body = document.body;
  
  if (!burgerBtn || !mobileMenu || !mobileMenuOverlay) {
    return;
  }
  
  burgerBtn.classList.remove('burger-btn--active');
  mobileMenu.classList.remove('mobile-menu--open');
  mobileMenuOverlay.classList.remove('mobile-menu-overlay--open');
  body.style.overflow = '';
  isMobileMenuOpen = false;
}; 