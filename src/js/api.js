const PRODUCTS_API_URL = import.meta.env.VITE_PRODUCTS_API_URL;
const SLIDER_API_URL = import.meta.env.VITE_SLIDER_API_URL;

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