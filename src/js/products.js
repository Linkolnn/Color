import { fetchProducts } from '@js/api.js';
import { addToCart } from '@js/cart.js';

export const renderProducts = async (containerSelector = '.products__block') => {
  try {
    const productsContainer = document.querySelector(containerSelector);
    
    if (!productsContainer) {
      console.error(`Products container not found: ${containerSelector}`);
      return;
    }
        
    const products = await fetchProducts();
    
    if (!products || products.length === 0) {
      productsContainer.innerHTML = '<div class="no-products">No products available</div>';
      updateProductCounter(0);
      return;
    }
    
    updateProductCounter(products.length);
    
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
      const isNew = Math.random() > 0.7;
      const isContract = Math.random() > 0.6;
      const isExclusive = Math.random() > 0.8;
      const onSale = Math.random() > 0.75;
      
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      
      productCard.dataset.productId = product.id;
      productCard.dataset.isNew = isNew;
      productCard.dataset.quantity = product.quantity;
      productCard.dataset.isContract = isContract;
      productCard.dataset.isExclusive = isExclusive;
      productCard.dataset.onSale = onSale;
      
      productCard.innerHTML = `
        <div class="product-card__image-container">
          <img src="${product.image}" alt="${product.title}" class="product-card__image">
        </div>
        <div class="product-card__content">
          <h3 class="product-card__title">${product.title}</h3>
          <div class="product-card__price-button-block">
            <div class="product-card__price">${formatPrice(product.price)}</div>
            <button class="product-card__button" aria-label="Добавить в корзину" data-product-id="${product.id}">
              <img class="product-card__button-icons" src="/icons/plus.svg" alt="Добавить в корзину">
            </button>
          </div>
        </div>
      `;
      
      productsContainer.appendChild(productCard);
    });
  
    addProductButtonListeners();
    
  } catch (error) {
    console.error('Error rendering products:', error);
    updateProductCounter(0);
  }
};

const updateProductCounter = (count) => {
  const counterElement = document.querySelector('.products__count-number');
  if (counterElement) {
    counterElement.textContent = count + " товаров";
  }
};

const formatPrice = (price) => {
  if (!price) return 'Цена не указана';
  
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numPrice);
};

const addProductButtonListeners = () => {
  const buttons = document.querySelectorAll('.product-card__button');
  
  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      const productId = event.target.dataset.productId;
      const productCard = event.target.closest('.product-card');
      
      if (!productCard) return;
      
      const product = {
        id: productId,
        title: productCard.querySelector('.product-card__title').textContent,
        price: getProductPrice(productCard),
        image: productCard.querySelector('.product-card__image').src
      };
      
      addToCart(product);
    });
  });
};

const getProductPrice = (productCard) => {
  const priceElement = productCard.querySelector('.product-card__price');
  if (!priceElement) return 0;
  
  const priceText = priceElement.textContent;
  const priceMatch = priceText.match(/[\d\s,.]+/);
  
  if (!priceMatch) return 0;
  
  return parseFloat(priceMatch[0].replace(/\s/g, '').replace(',', '.'));
}; 