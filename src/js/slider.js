import { fetchSliderData } from '@api.js';

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const initSlider = async () => {
  try {
    if (window.innerWidth < 859) {
      return;
    }
    
    const sliderContainer = document.querySelector('.slider__container');
    
    if (!sliderContainer) {
      console.error('Slider container not found');
      return;
    }
    
    const sliderData = await fetchSliderData();
    
    if (!sliderData || sliderData.length === 0) {
      console.error('No slider data available');
      return;
    }
    
    const sliderWrapper = document.createElement('div');
    sliderWrapper.className = 'swiper-wrapper';
    
    sliderData.forEach(slide => {
      const slideElement = document.createElement('div');
      slideElement.className = 'swiper-slide';
      
      slideElement.innerHTML = `
        <div class="slider__slide">
          <img src="${slide.img}" alt="${slide.title}" class="slider__image">
          <div class="slider__content">
            <h2 class="slider__title">${slide.title}</h2>
            <p class="slider__description">${slide.description}</p>
          </div>
        </div>
      `;
      
      sliderWrapper.appendChild(slideElement);
    });
    
    const prevButton = document.createElement('div');
    prevButton.className = 'swiper-button-prev';
    
    const nextButton = document.createElement('div');
    nextButton.className = 'swiper-button-next';
    
    const pagination = document.createElement('div');
    pagination.className = 'swiper-pagination';
    
    sliderContainer.appendChild(sliderWrapper);
    sliderContainer.appendChild(prevButton);
    sliderContainer.appendChild(nextButton);
    sliderContainer.appendChild(pagination);
    
    new Swiper(sliderContainer, {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    
  } catch (error) {
    console.error('Error initializing slider:', error);
  }
}; 