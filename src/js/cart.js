let cartItems = [];
let isCartOpen = false;

export const initCart = () => {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartOpen = false;
    
    const cartButton = document.querySelector('.header__cart-button');
    const cartCount = document.querySelector('#cart-count');
    const mobileCartCount = document.querySelector('.mobile-cart-count');
    const cartPanel = document.createElement('div');
    cartPanel.className = 'cart-panel';
    document.body.appendChild(cartPanel);
    
    const updateCartCount = () => {
        const count = cartItems.reduce((total, item) => total + item.quantity, 0);
        
        if (cartCount) cartCount.textContent = count;
        if (mobileCartCount) mobileCartCount.textContent = count;
        
    };
    
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };
    
    const renderCartItems = () => {
        const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        
        const headerHTML = `
            <div class="cart-panel__header">
                <h3 class="cart-panel__title">Корзина</h3>
                <button class="cart-panel__close">
                    <img src="/src/assets/icons/cross.svg" alt="Закрыть">
                </button>
            </div>
        `;

        let contentHTML = '';
        if (cartItems.length === 0) {
            contentHTML = '<p class="cart-panel__empty">Ваша корзина пуста</p>';
        } else {
            const contentHeaderHTML = `
                <div class="cart-panel__content-header">
                    <span class="cart-panel__content-counter">${itemCount} товара</span>
                    <button class="cart-panel__content-clear">очистить список</button>
                </div>
            `;
            
            const itemsHTML = cartItems.map(item => `
                <div class="cart-item">
                    <img class="cart-item__image" src="${item.image}" alt="${item.title}">
                    <div class="cart-item__content">
                        <div class="cart-item__details">
                            <h4 class="cart-item__name">${item.title}</h4>
                            <p class="cart-item__price">${item.price.toLocaleString()} ₽</p>
                        </div>
                        <div class="cart-item__quantity">
                            <button class="cart-item__quantity-btn">−</button>
                            <span class="cart-item__quantity-num">${item.quantity}</span>
                            <button class="cart-item__quantity-btn">+</button>
                            <button class="cart-item__remove">
                                <img src="/src/assets/icons/cross.svg" alt="Удалить">
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
            
            contentHTML = contentHeaderHTML + itemsHTML;
        }

        const footerHTML = `
            <div class="cart-panel__footer">
                <div class="cart-panel__total">
                    <div class="cart-panel__total-label">Итого</div>
                    <div class="cart-panel__total-value">${calculateTotal().toLocaleString()} ₽</div>
                </div>
                <button class="cart-panel__checkout">Оформить заказ</button>
            </div>
        `;

        cartPanel.innerHTML = `
            ${headerHTML}
            <div class="cart-panel__content">
                ${contentHTML}
            </div>
            ${footerHTML}
        `;
    };
    
    const overlay = document.createElement('div');
    overlay.className = 'cart-panel__overlay';
    document.body.appendChild(overlay);
    
    const toggleCart = () => {
        cartOpen = !cartOpen;
        
        if (cartOpen) {
            cartPanel.classList.add('cart-panel--open');
            overlay.classList.add('cart-panel__overlay--open');
            renderCartItems();
            document.body.style.overflow = 'hidden';
        } else {
            cartPanel.classList.remove('cart-panel--open');
            overlay.classList.remove('cart-panel__overlay--open');
            document.body.style.overflow = '';
        }
    };
    
    const updateQuantity = (id, change) => {
        const itemIndex = cartItems.findIndex(item => item.id === id);
        
        if (itemIndex !== -1) {
            cartItems[itemIndex].quantity += change;
            
            if (cartItems[itemIndex].quantity <= 0) {
                removeFromCart(id);
            } else {
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                
                updateCartCount();
                renderCartItems();
            }
        }
    };
    
    const removeFromCart = (id) => {
        cartItems = cartItems.filter(item => item.id !== id);
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        updateCartCount();
        renderCartItems();
    };
    
    window.addToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
                ...product,
                quantity: 1
            });
        }
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        updateCartCount();
        
    };
    
    if (cartButton) {
        cartButton.addEventListener('click', toggleCart);
    }
    
    const allCartButtons = document.querySelectorAll('.header__cart-button');
    allCartButtons.forEach(button => {
        button.addEventListener('click', toggleCart);
    });
    
    updateCartCount();
    
    cartPanel.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-panel__close') || e.target.closest('.cart-panel__close')) {
            toggleCart();
        }
        if (e.target.classList.contains('cart-panel__content-clear')) {
            cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartCount();
            renderCartItems();
        }
        if (e.target.classList.contains('cart-item__quantity-btn')) {
            const item = e.target.closest('.cart-item');
            const id = cartItems.findIndex(i => i.title === item.querySelector('.cart-item__name').textContent);
            const change = e.target.textContent === '+' ? 1 : -1;
            updateQuantity(cartItems[id].id, change);
        }
        if (e.target.classList.contains('cart-item__remove') || e.target.closest('.cart-item__remove')) {
            const item = e.target.closest('.cart-item');
            const id = cartItems.findIndex(i => i.title === item.querySelector('.cart-item__name').textContent);
            removeFromCart(cartItems[id].id);
        }
    });
    
    overlay.addEventListener('click', () => {
        if (cartOpen) {
            toggleCart();
        }
    });
};

export const addToCart = (product) => {
    if (window.addToCart) {
        window.addToCart(product);
    }
};