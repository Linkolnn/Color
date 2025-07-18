import './styles/base/main.sass'
import { initSlider } from './js/slider.js'
import { initToggleFilter } from './js/toggleFilter.js'
import { renderProducts } from './js/products.js'
import { initFilterSelect } from './js/filterSelect.js'
import { initCart } from './js/cart.js'
import { initMobileMenu } from './js/mobileMenu.js'

const loadHTML = async (url) => {
  try {
    const response = await fetch(url);
    return await response.text();
  } catch (error) {
    console.error('Ошибка при загрузке HTML:', error);
    return '';
  }
};

const initApp = async () => {
    const appContainer = document.querySelector('#app');

    try {
      const mainHTML = await loadHTML('/src/color.html');
      appContainer.innerHTML = mainHTML;
      
      await initSlider();
      initToggleFilter();
      await renderProducts();
      initFilterSelect();
      initCart();
      initMobileMenu();
    } catch (error) {
        console.error('Error initializing app:', error)
    }
}

document.addEventListener('DOMContentLoaded', initApp)