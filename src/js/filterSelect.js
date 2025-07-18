const SORT_OPTIONS = {
  EXPENSIVE_FIRST: 'expensive-first',
  CHEAP_FIRST: 'cheap-first',
  POPULAR_FIRST: 'popular-first',
  NEW_FIRST: 'new-first'
};

const SORT_LABELS = {
  [SORT_OPTIONS.EXPENSIVE_FIRST]: 'Сначала дорогие',
  [SORT_OPTIONS.CHEAP_FIRST]: 'Сначала недорогие',
  [SORT_OPTIONS.POPULAR_FIRST]: 'Сначала популярные',
  [SORT_OPTIONS.NEW_FIRST]: 'Сначала новые'
};

const DEFAULT_SORT = SORT_OPTIONS.EXPENSIVE_FIRST;

export const initFilterSelect = (containerSelector = '.products__filter-block') => {
  const container = document.querySelector(containerSelector);
  
  if (!container) {
    console.error(`Filter select container not found: ${containerSelector}`);
    return;
  }
  
  const filterSelect = createFilterSelect();
  container.appendChild(filterSelect);
  
  initEventListeners(filterSelect);
};

const createFilterSelect = () => {
  const filterSelect = document.createElement('div');
  filterSelect.className = 'filter-select';
  
  const header = document.createElement('div');
  header.className = 'filter-select__header';
  
  const selectedText = document.createElement('span');
  selectedText.className = 'filter-select__selected';
  selectedText.textContent = SORT_LABELS[DEFAULT_SORT];
  
  const arrow = document.createElement('span');
  arrow.className = 'filter-select__arrow';
  
  header.appendChild(selectedText);
  header.appendChild(arrow);
  
  const dropdown = document.createElement('div');
  dropdown.className = 'filter-select__dropdown';
  
  Object.entries(SORT_OPTIONS).forEach(([_, value]) => {
    const option = document.createElement('div');
    option.className = 'filter-select__option';
    option.dataset.value = value;
    option.textContent = SORT_LABELS[value];
    
    if (value === DEFAULT_SORT) {
      option.classList.add('filter-select__option--selected');
    }
    
    dropdown.appendChild(option);
  });
  
  filterSelect.appendChild(header);
  filterSelect.appendChild(dropdown);
  
  return filterSelect;
};

const initEventListeners = (filterSelect) => {
  const header = filterSelect.querySelector('.filter-select__header');
  const options = filterSelect.querySelectorAll('.filter-select__option');
  const selectedText = filterSelect.querySelector('.filter-select__selected');
  
  header.addEventListener('click', () => {
    filterSelect.classList.toggle('filter-select--open');
  });
  
  options.forEach(option => {
    option.addEventListener('click', () => {
      const value = option.dataset.value;
      const text = option.textContent;
  
      selectedText.textContent = text;
      
      options.forEach(opt => {
        opt.classList.remove('filter-select__option--selected');
      });
      option.classList.add('filter-select__option--selected');
      
      filterSelect.classList.remove('filter-select--open');
      
      applySorting(value);
    });
  });
  
  document.addEventListener('click', (event) => {
    if (!filterSelect.contains(event.target)) {
      filterSelect.classList.remove('filter-select--open');
    }
  });
};

const applySorting = (sortOption) => {
  const productsContainer = document.querySelector('.products__block');
  
  if (!productsContainer) {
    console.error('Products container not found');
    return;
  }
  
  const products = Array.from(productsContainer.querySelectorAll('.product-card'));
  
  if (!products.length) {
    console.log('No products found to sort');
    return;
  }
  
  products.sort((a, b) => {
    switch (sortOption) {
      case SORT_OPTIONS.EXPENSIVE_FIRST:
        return getPriceValue(b) - getPriceValue(a);
      case SORT_OPTIONS.CHEAP_FIRST:
        return getPriceValue(a) - getPriceValue(b);
      case SORT_OPTIONS.POPULAR_FIRST:
        return getPopularityValue(b) - getPopularityValue(a);
      case SORT_OPTIONS.NEW_FIRST:
        return getNewValue(b) - getNewValue(a);
      default:
        return 0;
    }
  });
  
  products.forEach(product => {
    productsContainer.appendChild(product);
  });
};

const getPriceValue = (product) => {
  const priceElement = product.querySelector('.product-card__price');
  if (!priceElement) return 0;
  
  const priceText = priceElement.textContent;
  const priceMatch = priceText.match(/[\d\s,.]+/);
  
  if (!priceMatch) return 0;
  
  return parseFloat(priceMatch[0].replace(/\s/g, '').replace(',', '.'));
};

const getPopularityValue = (product) => {
  return parseInt(product.dataset.quantity || '0', 10);
};

const getNewValue = (product) => {
  return product.dataset.isNew === 'true' ? 1 : 0;
}; 