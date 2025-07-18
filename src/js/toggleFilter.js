const FILTER_OPTIONS = {
  new: 'filter-new',
  available: 'filter-available',
  contract: 'filter-contract',
  exclusive: 'filter-exclusive',
  sale: 'filter-sale'
};

let activeFilters = new Set();
let isDragging = false;
let startY = 0;
let startTranslateY = 0;

export const initToggleFilter = () => {
  const filterContainer = document.querySelector('.toggle-filter');
  const mobileFilterBtn = document.querySelector('.products__filter-btn');
  const closeFilterBtn = document.querySelector('.toggle-filter__close-btn');
  const dragHandle = document.querySelector('.toggle-filter__drag-handle');
  const filterCheckboxes = document.querySelectorAll('.toggle-filter__checkbox');
  
  if (!filterContainer) {
    console.error('Toggle filter container not found');
    return;
  }

  if (mobileFilterBtn) {
    mobileFilterBtn.addEventListener('click', () => {
      openFilter(filterContainer);
    });
  }

  if (closeFilterBtn) {
    closeFilterBtn.addEventListener('click', () => {
      closeFilter(filterContainer);
    });
  }

  filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const filterId = checkbox.id;
      
      if (checkbox.checked) {
        activeFilters.add(filterId);
      } else {
        activeFilters.delete(filterId);
      }
      
      applyFilters();
    });
  });

  if (dragHandle) {
    dragHandle.addEventListener('touchstart', handleDragStart, { passive: false });
    document.addEventListener('touchmove', handleDragMove, { passive: false });
    document.addEventListener('touchend', handleDragEnd, { passive: false });
    
    dragHandle.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
  }

  document.addEventListener('click', (e) => {
    if (
      document.body.classList.contains('filter-open') && 
      !filterContainer.contains(e.target) && 
      e.target !== mobileFilterBtn
    ) {
      closeFilter(filterContainer);
    }
  });

  window.addEventListener('resize', handleResize);
};

const openFilter = (filterContainer) => {
  filterContainer.classList.add('toggle-filter--active');
  document.body.classList.add('filter-open');
};

const closeFilter = (filterContainer) => {
  filterContainer.classList.remove('toggle-filter--active');
  document.body.classList.remove('filter-open');
  filterContainer.style.transform = '';
};

const handleDragStart = (e) => {
  if (window.innerWidth >= 768) return;
  
  isDragging = true;
  
  startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
  
  const filterContainer = document.querySelector('.toggle-filter');
  const transformValue = window.getComputedStyle(filterContainer).transform;
  
  if (transformValue !== 'none') {
    const matrix = transformValue.match(/^matrix\((.+)\)$/);
    if (matrix) {
      const values = matrix[1].split(', ');
      startTranslateY = parseFloat(values[5]);
    }
  }
  
  e.preventDefault();
};

const handleDragMove = (e) => {
  if (!isDragging || window.innerWidth >= 768) return;
  
  const filterContainer = document.querySelector('.toggle-filter');
  const currentY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
  const deltaY = currentY - startY;
  
  const newTranslateY = Math.max(0, startTranslateY + (deltaY / window.innerHeight) * 100);
  
  filterContainer.style.transition = 'none';
  filterContainer.style.transform = `translateY(${newTranslateY}%)`;
  
  e.preventDefault();
};

const handleDragEnd = () => {
  if (!isDragging) return;
  
  isDragging = false;
  
  const filterContainer = document.querySelector('.toggle-filter');
  
  filterContainer.style.transition = 'transform 0.3s ease';
  
  const transformValue = window.getComputedStyle(filterContainer).transform;
  let currentTranslateY = 0;
  
  if (transformValue !== 'none') {
    const matrix = transformValue.match(/^matrix\((.+)\)$/);
    if (matrix) {
      const values = matrix[1].split(', ');
      currentTranslateY = parseFloat(values[5]);
    }
  }
  
  const threshold = 50; 
  
  if (currentTranslateY > threshold) {
    closeFilter(filterContainer);
  } else {
    filterContainer.style.transform = 'translateY(0)';
  }
};

const applyFilters = () => {
  const products = document.querySelectorAll('.product-card');
  
  if (!products.length) {
    console.log('No products found to filter');
    return;
  }

  if (activeFilters.size === 0) {
    products.forEach(product => {
      product.style.display = '';
    });
    return;
  }

  products.forEach(product => {
    const productData = product.dataset;
    let shouldShow = false;
    
    activeFilters.forEach(filter => {
      switch (filter) {
        case FILTER_OPTIONS.new:
          if (productData.isNew === 'true') shouldShow = true;
          break;
        case FILTER_OPTIONS.available:
          if (parseInt(productData.quantity, 10) > 0) shouldShow = true;
          break;
        case FILTER_OPTIONS.contract:
          if (productData.isContract === 'true') shouldShow = true;
          break;
        case FILTER_OPTIONS.exclusive:
          if (productData.isExclusive === 'true') shouldShow = true;
          break;
        case FILTER_OPTIONS.sale:
          if (productData.onSale === 'true') shouldShow = true;
          break;
      }
    });
    
    product.style.display = shouldShow ? '' : 'none';
  });
};

const handleResize = () => {
  const filterContainer = document.querySelector('.toggle-filter');
  
  if (!filterContainer) return;
  
  if (window.innerWidth >= 768) {
    closeFilter(filterContainer);
  }
}; 