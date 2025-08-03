// Global Variables
let products = [];
let cart = [];
let isAdmin = false;
let currentProduct = null;
let selectedQuantity = 1;
const ADMIN_PASSWORD = "nirakaar123"; // Change this to your secure password

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartCount = document.querySelector('.cart-count');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

// Initialize Website
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    loadSampleProducts();
    setupEventListeners();
    updateCartCount();
});

// Initialize Website Functions
function initializeWebsite() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Update active nav item
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Add scroll effects
    window.addEventListener('scroll', handleScroll);
    
    // Add touch effects for mobile
    addTouchEffects();
}

// Handle Scroll Effects
function handleScroll() {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.95) 0%, rgba(255, 237, 74, 0.95) 50%, rgba(243, 156, 18, 0.95) 100%)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #ffd700 0%, #ffed4a 50%, #f39c12 100%)';
        header.style.backdropFilter = 'none';
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Category cards click events
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Navigate to category page
            if (category === 'frames') {
                window.location.href = 'frames.html';
            } else if (category === 'pots') {
                window.location.href = 'pots.html';
            } else if (category === 'animals') {
                window.location.href = 'animals.html';
            }
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // CTA Button
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function() {
            document.querySelector('#categories').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Image upload preview
    const productImage = document.getElementById('productImage');
    if (productImage) {
        productImage.addEventListener('change', previewImage);
    }
}

// Add Touch Effects
function addTouchEffects() {
    const touchElements = document.querySelectorAll('.category-card, .product-card, .nav-item, .cta-btn');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Load Sample Products
function loadSampleProducts() {
    const sampleProducts = [
        {
            id: 1,
            name: "प्रीमियम सिल्वर फ्रेम",
            price: 2500,
            category: "frames",
            description: "हस्तनिर्मित सुंदर सिल्वर फ्रेम",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='250' viewBox='0 0 300 250'%3E%3Crect width='300' height='250' fill='%23f8f9fa'/%3E%3Crect x='20' y='20' width='260' height='210' fill='none' stroke='%23ffd700' stroke-width='4'/%3E%3Crect x='40' y='40' width='220' height='170' fill='none' stroke='%23f39c12' stroke-width='2'/%3E%3Ctext x='150' y='130' text-anchor='middle' fill='%23666' font-size='16'%3ESilver Frame%3C/text%3E%3C/svg%3E"
        },
        {
            id: 2,
            name: "सिल्वर टी पॉट",
            price: 4500,
            category: "pots",
            description: "पारंपरिक डिज़ाइन का सिल्वर पॉट",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='250' viewBox='0 0 300 250'%3E%3Crect width='300' height='250' fill='%23f8f9fa'/%3E%3Cellipse cx='150' cy='140' rx='80' ry='60' fill='none' stroke='%23ffd700' stroke-width='3'/%3E%3Cellipse cx='150' cy='100' rx='60' ry='20' fill='none' stroke='%23f39c12' stroke-width='2'/%3E%3Cpath d='M90 120 Q70 110 80 100' fill='none' stroke='%23ffd700' stroke-width='3'/%3E%3Ctext x='150' y='220' text-anchor='middle' fill='%23666' font-size='16'%3ESilver Pot%3C/text%3E%3C/svg%3E"
        },
        {
            id: 3,
            name: "सिल्वर एलिफेंट",
            price: 3200,
            category: "animals",
            description: "खूबसूरत हाथी की आकृति",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='250' viewBox='0 0 300 250'%3E%3Crect width='300' height='250' fill='%23f8f9fa'/%3E%3Cellipse cx='150' cy='130' rx='70' ry='50' fill='none' stroke='%23ffd700' stroke-width='3'/%3E%3Ccircle cx='120' cy='110' r='25' fill='none' stroke='%23f39c12' stroke-width='2'/%3E%3Cpath d='M95 135 Q80 160 90 180' fill='none' stroke='%23ffd700' stroke-width='3'/%3E%3Ctext x='150' y='220' text-anchor='middle' fill='%23666' font-size='16'%3ESilver Elephant%3C/text%3E%3C/svg%3E"
        }
    ];
    
    products = sampleProducts;
    displayProducts(products);
}

// Display Products
function displayProducts(productsToShow) {
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Add animation
    const cards = productsGrid.querySelectorAll('.product-card');
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

// Create Product Card
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
    
    // Add hover effects
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    return card;
}

// Filter Products by Category
function filterProductsByCategory(category) {
    const filteredProducts = products.filter(product => product.category === category);
    displayProducts(filteredProducts);
    
    // Scroll to products section
    document.querySelector('#featured').scrollIntoView({
        behavior: 'smooth'
    });
    
    // Update section title
    const sectionTitle = document.querySelector('#featured .section-title');
    const categoryNames = {
        'frames': 'Silver Frames',
        'pots': 'Silver Pots',
        'animals': 'Silver Animals'
    };
    sectionTitle.textContent = categoryNames[category] || 'सभी उत्पाद';
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }
        
        updateCartCount();
        showAddToCartAnimation();
        
        // Show success message
        showNotification('प्रोडक्ट कार्ट में जोड़ा गया!', 'success');
    }
}

// Update Cart Count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
        
        if (totalItems > 0) {
            cartCount.style.display = 'flex';
            cartCount.style.animation = 'pulse 0.3s ease';
        } else {
            cartCount.style.display = 'none';
        }
    }
}

// Show Add to Cart Animation
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

// Show Notification
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

// Preview Image
function previewImage(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('imagePreview');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview" />`;
        };
        reader.readAsDataURL(file);
    }
}

// Add Product Function
function addProduct() {
    const name = document.getElementById('productName').value;
    const price = parseInt(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;
    const description = document.getElementById('productDescription').value;
    const imageFile = document.getElementById('productImage').files[0];
    
    if (!name || !price || !description) {
        showNotification('कृपया सभी फील्ड भरें!', 'error');
        return;
    }
    
    const newProduct = {
        id: products.length + 1,
        name: name,
        price: price,
        category: category,
        description: description,
        image: imageFile ? URL.createObjectURL(imageFile) : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="250" viewBox="0 0 300 250"%3E%3Crect width="300" height="250" fill="%23f8f9fa"/%3E%3Ctext x="150" y="130" text-anchor="middle" fill="%23666" font-size="16"%3ENo Image%3C/text%3E%3C/svg%3E'
    };
    
    products.push(newProduct);
    displayProducts(products);
    
    // Clear form
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productImage').value = '';
    document.getElementById('imagePreview').innerHTML = '';
    
    showNotification('प्रोडक्ट सफलतापूर्वक जोड़ा गया!', 'success');
    
    // Scroll to products
    document.querySelector('#featured').scrollIntoView({
        behavior: 'smooth'
    });
}

// Admin Functions
function showAdminLogin() {
    document.getElementById('admin-login').style.display = 'flex';
}

function closeAdminLogin() {
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-password').value = '';
}

function checkAdminLogin() {
    const password = document.getElementById('admin-password').value;
    
    if (password === ADMIN_PASSWORD) {
        isAdmin = true;
        document.querySelector('.add-product-section').style.display = 'block';
        document.querySelector('.admin-access').style.display = 'none';
        closeAdminLogin();
        showNotification('Admin Access Granted!', 'success');
        
        // Scroll to add product section
        document.querySelector('#add-product').scrollIntoView({
            behavior: 'smooth'
        });
    } else {
        showNotification('गलत पासवर्ड!', 'error');
        document.getElementById('admin-password').value = '';
    }
}

function logoutAdmin() {
    isAdmin = false;
    document.querySelector('.add-product-section').style.display = 'none';
    document.querySelector('.admin-access').style.display = 'block';
    showNotification('Admin Logged Out', 'info');
}

// Product Modal Functions
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentProduct = product;
    selectedQuantity = 1;
    
    // Update modal content
    document.getElementById('modal-product-image').src = product.image;
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-price').textContent = `₹${product.price.toLocaleString()}`;
    document.getElementById('modal-product-description').textContent = product.description;
    document.getElementById('quantity-display').textContent = selectedQuantity;
    
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
    const product = products.find(p => p.id === productId);
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

// Order Modal Functions
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
    
    // Here you can send order data to WhatsApp or your backend
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

    const phoneNumber = "919876543210"; // Replace with your WhatsApp number (with country code, no + sign)
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappURL, '_blank');
}

// Calculate Cart Total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Check Free Delivery
function checkFreeDelivery() {
    const total = getCartTotal();
    return total >= 1000;
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.category-card, .product-card, .hero-text');
    animateElements.forEach(el => observer.observe(el));
});

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        nav.classList.remove('active');
    }
});

// Page Visibility API - Pause animations when tab is not active
document.addEventListener('visibilitychange', function() {
    const cards = document.querySelectorAll('.product-card, .category-card');
    
    if (document.hidden) {
        cards.forEach(card => {
            card.style.animationPlayState = 'paused';
        });
    } else {
        cards.forEach(card => {
            card.style.animationPlayState = 'running';
        });
    }
});

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            }, function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addToCart,
        updateCartCount,
        getCartTotal,
        checkFreeDelivery
    };
}