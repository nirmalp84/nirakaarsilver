// Silver Frames Page JavaScript
let framesProducts = [];
let filteredProducts = [];
let currentProduct = null;
let selectedQuantity = 1;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadFramesProducts();
    updateCartCount();
    setupEventListeners();
});

// Load sample frames products
function loadFramesProducts() {
    framesProducts = [
        {
            id: 101,
            name: "राजस्थानी सिल्वर फ्रेम",
            price: 2500,
            category: "frames",
            size: "medium",
            style: "traditional",
            description: "पारंपरिक राजस्थानी डिज़ाइन के साथ हस्तनिर्मित सिल्वर फ्रेम",
            specifications: ["साइज़: 8x10 इंच", "वजन: 250 ग्राम", "सिल्वर प्यूरिटी: 92.5%", "हस्तनिर्मित"],
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='250' viewBox='0 0 300 250'%3E%3Crect width='300' height='250' fill='%23f8f9fa'/%3E%3Crect x='20' y='20' width='260' height='210' fill='none' stroke='%23ffd700' stroke-width='4'/%3E%3Crect x='40' y='40' width='220' height='170' fill='none' stroke='%23f39c12' stroke-width='2'/%3E%3Ctext x='150' y='130' text-anchor='middle' fill='%23666' font-size='14'%3ERajasthani Frame%3C/text%3E%3C/svg%3E"
        },
        {
            id: 102,
            name: "मॉडर्न सिल्वर फ्रेम",
            price: 3200,
            category: "frames",
            size: "large",
            style: "modern",
            description: "आधुनिक डिज़ाइन के साथ स्टाइलिश सिल्वर फ्रेम",
            specifications: ["साइज़: 10x12 इंच", "वजन: 320 ग्राम", "सिल्वर प्यूरिटी: 92.5%", "मैट फिनिश"],
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='250' viewBox='0 0 300 250'%3E%3Crect width='300' height='250' fill='%23f8f9fa'/%3E%3Crect x='30' y='30' width='240' height='190' fill='none' stroke='%23c0c0c0' stroke-width='3'/%3E%3Crect x='50' y='50' width='200' height='150' fill='none' stroke='%23ffd700' stroke-width='1'/%3E%3Ctext x='150' y='130' text-anchor='middle' fill='%23666' font-size='14'%3EModern Frame%3C/text%3E%3C/svg%3E"
        },
        {
            id: 103,
            name: "सजावटी सिल्वर फ्रेम",
            price: 4500,
            category: "frames",
            size: "large",
            style: "decorative",
            description: "खूबसूरत नक्काशी के साथ सजावटी सिल्वर फ्रेम",
            specifications: ["साइज़: 12x14 इंच", "वजन: 450 ग्राम", "सिल्वर प्यूरिटी: 92.5%", "हैंड एंग्रेव्ड"],
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='250' viewBox='0 0 300 250'%3E%3Crect width='300' height='250' fill='%23f8f9fa'/%3E%3Crect x='15' y='15' width='270' height='220' fill='none' stroke='%23ffd700' stroke-width='5'/%3E%3Ccircle cx='30' cy='30' r='8' fill='%23f39c12'/%3E%3Ccircle cx='270' cy='30' r='8' fill='%23f39c12'/%3E%3Ccircle cx='30' cy='220' r='8' fill='%23f39c12'/%3E%3Ccircle cx='270' cy='220' r='8' fill='%23f39c12'/%3E%3Ctext x='150' y='130' text-anchor='middle' fill='%23666' font-size='14'%3EDecorative Frame%3C/text%3E%3C/svg%3E"
        },
        {
            id: 104,
            name: "छोटा सिल्वर फ्रेम",
            price: 1800,
            category: "frames",
            size: "small",
            style: "modern",
            description: "टेबल टॉप के लिए छोटा और प्यारा सिल्वर फ्रेम",
            specifications: ["साइज़: 5x7 इंच", "वजन: 150 ग्राम", "सिल्वर प्यूरिटी: 92.5%", "पोर्टेबल"],
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='250' viewBox='0 0 300 250'%3E%3Crect width='300' height='250' fill='%23f8f9fa'/%3E%3Crect x='60' y='50' width='180' height='150' fill='none' stroke='%23ffd700' stroke-width='3'/%3E%3Crect x='80' y='70' width='140' height='110' fill='none' stroke='%23f39c12' stroke-width='1'/%3E%3Ctext x='150' y='130' text-anchor='middle' fill='%23666' font-size='12'%3ESmall Frame%3C/text%3E%3C/svg%3E"
        },
        {
            id: 105,
            name: "एंटिक सिल्वर फ्रेम",
            price: 5200,
            category: "frames",
            size: "medium",
            style: "traditional",
            description: "पुराने जमाने की शैली में बना एंटिक सिल्वर फ्रेम",
            specifications: ["साइज़: 9x11 इंच", "वजन: 380 ग्राम", "सिल्वर प्यूरिटी: 92.5%", "एंटिक फिनिश"],
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='250' viewBox='0 0 300 250'%3E%3Crect width='300' height='250' fill='%23f8f9fa'/%3E%3Crect x='25' y='25' width='250' height='200' fill='none' stroke='%23b8860b' stroke-width='4'/%3E%3Crect x='45' y='45' width='210' height='160' fill='none' stroke='%23ffd700' stroke-width='2'/%3E%3Ctext x='150' y='130' text-anchor='middle' fill='%23666' font-size='14'%3EAntique Frame%3C/text%3E%3Cpath d='M45 45 L65 65 M235 45 L215 65 M45 185 L65 165 M235 185 L215 165' stroke='%23b8860b' stroke-width='2'/%3E%3C/svg%3E"
        },
        {
            id: 106,
            name: "लक्जरी सिल्वर फ्रेम",
            price: 6800,
            category: "frames",
            size: "large",
            style: "decorative",
            description: "प्रीमियम क्वालिटी का लक्जरी सिल्वर फ्रेम",
            specifications: ["साइज़: 14x16 इंच", "वजन: 550 ग्राम", "सिल्वर प्यूरिटी: 95%", "गोल्ड प्लेटेड"],
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='250' viewBox='0 0 300 250'%3E%3Crect width='300' height='250' fill='%23f8f9fa'/%3E%3Crect x='10' y='10' width='280' height='230' fill='none' stroke='%23ffd700' stroke-width='6'/%3E%3Crect x='30' y='30' width='240' height='190' fill='none' stroke='%23ffed4a' stroke-width='3'/%3E%3Crect x='50' y='50' width='200' height='150' fill='none' stroke='%23f39c12' stroke-width='1'/%3E%3Ctext x='150' y='130' text-anchor='middle' fill='%23666' font-size='14'%3ELuxury Frame%3C/text%3E%3Ccircle cx='20' cy='20' r='5' fill='%23ffd700'/%3E%3Ccircle cx='280' cy='20' r='5' fill='%23ffd700'/%3E%3Ccircle cx='20' cy='230' r='5' fill='%23ffd700'/%3E%3Ccircle cx='280' cy='230' r='5' fill='%23ffd700'/%3E%3C/svg%3E"
        }
    ];
    
    filteredProducts = [...framesProducts];
    displayProducts();
    updateProductCount();
}

// Display products
function displayProducts() {
    const grid = document.getElementById('framesGrid');
    grid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        grid.appendChild(productCard);
    });
    
    // Add animation
    const cards = grid.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image" onclick="openProductModal(${product.id})">
            <img src="${product.image}" alt="${product.name}" />
            <div class="product-overlay">
                <i class="fas fa-eye"></i>
                <span>विस्तार से देखें</span>
            </div>
        </div>
        <div class="product-info">
            <h3 class="product-name" onclick="openProductModal(${product.id})">${product.name}</h3>
            <div class="product-price">₹${product.price.toLocaleString()}</div>
            <p class="product-description">${product.description}</p>
            <div class="product-meta">
                <span class="product-size">साइज़: ${getSizeLabel(product.size)}</span>
                <span class="product-style">स्टाइल: ${getStyleLabel(product.style)}</span>
            </div>
            <div class="product-buttons">
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> कार्ट में जोड़ें
                </button>
                <button class="quick-order" onclick="quickOrder(${product.id})">
                    <i class="fas fa-bolt"></i> तुरंत ऑर्डर
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Helper functions
function getSizeLabel(size) {
    const labels = { small: 'छोटा', medium: 'मध्यम', large: 'बड़ा' };
    return labels[size] || size;
}

function getStyleLabel(style) {
    const labels = { traditional: 'पारंपरिक', modern: 'आधुनिक', decorative: 'सजावटी' };
    return labels[style] || style;
}

// Filter functions
function filterProducts() {
    const priceFilter = document.getElementById('priceFilter').value;
    const sizeFilter = document.getElementById('sizeFilter').value;
    const styleFilter = document.getElementById('styleFilter').value;
    
    filteredProducts = framesProducts.filter(product => {
        let passPrice = true, passSize = true, passStyle = true;
        
        // Price filter
        if (priceFilter === 'low') passPrice = product.price <= 3000;
        else if (priceFilter === 'medium') passPrice = product.price > 3000 && product.price <= 5000;
        else if (priceFilter === 'high') passPrice = product.price > 5000;
        
        // Size filter
        if (sizeFilter !== 'all') passSize = product.size === sizeFilter;
        
        // Style filter
        if (styleFilter !== 'all') passStyle = product.style === styleFilter;
        
        return passPrice && passSize && passStyle;
    });
    
    displayProducts();
    updateProductCount();
}

function sortProducts() {
    const sortOrder = document.getElementById('sortOrder').value;
    
    switch(sortOrder) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        default:
            // Featured - original order
            filteredProducts = framesProducts.filter(product => 
                filteredProducts.find(fp => fp.id === product.id)
            );
    }
    
    displayProducts();
}

function updateProductCount() {
    document.getElementById('productsCount').textContent = filteredProducts.length;
}

// Product modal functions
function openProductModal(productId) {
    const product = framesProducts.find(p => p.id === productId);
    if (!product) return;
    
    currentProduct = product;
    selectedQuantity = 1;
    
    // Update modal content
    document.getElementById('modal-product-image').src = product.image;
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-price').textContent = `₹${product.price.toLocaleString()}`;
    document.getElementById('modal-product-description').textContent = product.description;
    document.getElementById('quantity-display').textContent = selectedQuantity;
    
    // Update specifications
    const specsList = document.getElementById('product-specs');
    specsList.innerHTML = '';
    product.specifications.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        specsList.appendChild(li);
    });
    
    // Show modal
    document.getElementById('product-detail-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    document.getElementById('product-detail-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
    currentProduct = null;
}

function changeQuantity(change) {
    selectedQuantity = Math.max(1, selectedQuantity + change);
    document.getElementById('quantity-display').textContent = selectedQuantity;
}

function addToCartFromModal() {
    if (currentProduct) {
        for (let i = 0; i < selectedQuantity; i++) {
            addToCart(currentProduct.id);
        }
        closeProductModal();
    }
}

function quickOrder(productId) {
    const product = framesProducts.find(p => p.id === productId);
    if (product) {
        currentProduct = product;
        selectedQuantity = 1;
        openOrderModal();
    }
}

function orderNow() {
    if (currentProduct) {
        closeProductModal();
        openOrderModal();
    }
}

// Cart functions
function addToCart(productId) {
    const product = framesProducts.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showAddToCartAnimation();
        showNotification('प्रोडक्ट कार्ट में जोड़ा गया!', 'success');
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = totalItems;
        
        if (totalItems > 0) {
            cartCount.style.display = 'flex';
        } else {
            cartCount.style.display = 'none';
        }
    }
}

function showAddToCartAnimation() {
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.style.transform = 'scale(1.2)';
        cartBtn.style.background = '#27ae60';
        
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
            cartBtn.style.background = '#fff';
        }, 300);
    }
}

// Order modal functions
function openOrderModal() {
    if (!currentProduct) return;
    
    // Update order summary
    document.getElementById('order-product-image').src = currentProduct.image;
    document.getElementById('order-product-name').textContent = currentProduct.name;
    document.getElementById('order-product-price').textContent = `₹${currentProduct.price.toLocaleString()}`;
    document.getElementById('order-product-quantity').textContent = `मात्रा: ${selectedQuantity}`;
    
    // Calculate totals
    const productTotal = currentProduct.price * selectedQuantity;
    const deliveryCharge = productTotal >= 1000 ? 0 : 50;
    const finalTotal = productTotal + deliveryCharge;
    
    document.getElementById('product-total').textContent = `₹${productTotal.toLocaleString()}`;
    document.getElementById('delivery-charge').textContent = deliveryCharge === 0 ? 'मुफ्त' : `₹${deliveryCharge}`;
    document.getElementById('final-total').textContent = `₹${finalTotal.toLocaleString()}`;
    
    // Show modal
    document.getElementById('order-form-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
    document.getElementById('order-form-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function submitOrder(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const orderData = {
        product: currentProduct,
        quantity: selectedQuantity,
        customer: {
            name: formData.get('customerName'),
            phone: formData.get('customerPhone'),
            address: formData.get('customerAddress'),
            city: formData.get('customerCity'),
            pincode: formData.get('customerPincode')
        },
        total: currentProduct.price * selectedQuantity + (currentProduct.price * selectedQuantity >= 1000 ? 0 : 50),
        orderDate: new Date().toLocaleString('hi-IN')
    };
    
    // Send order to WhatsApp
    sendOrderToWhatsApp(orderData);
    
    closeOrderModal();
    showNotification('आपका ऑर्डर सफलतापूर्वक भेजा गया!', 'success');
    
    // Clear form
    event.target.reset();
}

function sendOrderToWhatsApp(orderData) {
    const message = `🛍️ *नया ऑर्डर - Nirakaar Silver*

📦 *प्रोडक्ट:* ${orderData.product.name}
💰 *कीमत:* ₹${orderData.product.price.toLocaleString()}
📊 *मात्रा:* ${orderData.quantity}
💵 *कुल राशि:* ₹${orderData.total.toLocaleString()}

👤 *ग्राहक की जानकारी:*
नाम: ${orderData.customer.name}
फोन: ${orderData.customer.phone}
पता: ${orderData.customer.address}
शहर: ${orderData.customer.city}
पिन कोड: ${orderData.customer.pincode}

📅 *ऑर्डर डेट:* ${orderData.orderDate}

कृपया जल्दी कन्फर्म करें! 🙏`;

    const phoneNumber = "919876543210"; // Replace with your WhatsApp number
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappURL, '_blank');
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: linear-gradient(135deg, #27ae60, #2ecc71);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 8px 25px rgba(39, 174, 96, 0.3);
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(300px);
        transition: transform 0.3s ease;
    `;
    
    if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function loadMoreProducts() {
    // This can be used to load more products from server
    showNotification('सभी प्रोडक्ट्स लोड हो चुके हैं!', 'info');
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Close modals on outside click
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('product-modal') || e.target.classList.contains('order-modal')) {
            closeProductModal();
            closeOrderModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProductModal();
            closeOrderModal();
        }
    });
}