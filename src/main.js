import { initSlider } from '@js/slider.js'
import { initToggleFilter } from '@js/toggleFilter.js'
import { renderProducts } from '@js/products.js'
import { initFilterSelect } from '@js/filterSelect.js'
import { initCart } from '@js/cart.js'
import { initMobileMenu } from '@js/mobileMenu.js'

const initApp = async () => {
  await initSlider();
  initToggleFilter();
  await renderProducts();
  initFilterSelect();
  initCart();
  initMobileMenu();
}

document.addEventListener('DOMContentLoaded', initApp)