const PRODUCTS_API_URL = 'https://6877ae0edba809d901f07a0a.mockapi.io/ProductList';
const SLIDER_API_URL = 'https://6877ae0edba809d901f07a0a.mockapi.io/slider';

export const fetchProducts = async () => {
  try {
    const response = await fetch(PRODUCTS_API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchSliderData = async () => {
  try {
    const response = await fetch(SLIDER_API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching slider data:', error);
    return [];
  }
}; 