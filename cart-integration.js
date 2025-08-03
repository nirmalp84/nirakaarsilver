// Enhanced Cart Integration Script
// Add this script to all your product pages (frames.html, pots.html, animals.html)

// Global cart management
let cart = JSON.parse(localStorage.getItem('nirankaar_cart') || '[]');

// Enhanced cart functions
function addToCart(productId, productName, productPrice) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    saveCart();
    showNotification('प्रोडक्ट कार्ट में जोड़ दिया गया!');
}

function saveCart() {
    localStorage.setItem('nirankaar_cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Enhanced cart modal for viewing cart
function showCartModal() {
    if (cart.length === 0) {
        showNotification('आपका कार्ट खाली है!', 'error');
        return;
    }

    // Create cart modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 2001;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    let cartSummary = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartSummary += `
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>₹${item.price.toLocaleString()} x ${item.quantity}</small>
                </div>
                <div style="font-weight: bold;">₹${itemTotal.toLocaleString()}</div>
            </div>
        `;
    });

    const deliveryCharges = total >= 1000 ? 0 : 100;
    const finalTotal = total + deliveryCharges;

    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0;">Shopping Cart</h2>
                <button onclick="closeCartModal()" style="background: none; border: none; font-size: 24px; cursor: pointer;">&times;</button>
            </div>
            
            ${cartSummary}
            
            <div style="padding: 15px 0; border-top: 2px solid #333; margin-top: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Subtotal:</span>
                    <span>₹${total.toLocaleString()}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Delivery:</span>
                    <span>${total >= 1000 ? 'FREE' : '₹' + deliveryCharges}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px;">
                    <span>Total:</span>
                    <span>₹${finalTotal.toLocaleString()}</span>
                </div>
            </div>
            
            <div style="margin-top: 20px; display: flex; gap: 10px;">
                <button onclick="closeCartModal()" style="flex: 1; padding: 12px; background: #95a5a6; color: white; border: none; border-radius: 8px; cursor: pointer;">
                    Continue Shopping
                </button>
                <button onclick="goToCheckout()" style="flex: 1; padding: 12px; background: linear-gradient(135deg, #3498db, #2980b9); color: white; border: none; border-radius: 8px; cursor: pointer;">
                    <i class="fas fa-arrow-right"></i> Checkout
                </button>
            </div>
            
            <div style="margin-top: 10px;">
                <button onclick="orderViaWhatsApp()" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #25d366, #128c7e); color: white; border: none; border-radius: 8px; cursor: pointer;">
                    <i class="fab fa-whatsapp"></i> Order via WhatsApp
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.id = 'cart-modal';
}

function closeCartModal() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}

function goToCheckout() {
    window.location.href = 'orders.html?tab=checkout';
}

function orderViaWhatsApp() {
    let message = `🛍️ *नया ऑर्डर - Nirakaar Silver*\n\n`;
    message += `📦 *ऑर्डर डिटेल्स:*\n`;
    
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `• ${item.name}\n  ₹${item.price.toLocaleString()} x ${item.quantity} = ₹${itemTotal.toLocaleString()}\n\n`;
    });
    
    const deliveryCharges = total >= 1000 ? 0 : 100;
    const finalTotal = total + deliveryCharges;
    
    message += `💰 *पेमेंट डिटेल्स:*\n`;
    message += `Subtotal: ₹${total.toLocaleString()}\n`;
    message += `Delivery: ${total >= 1000 ? 'FREE' : '₹' + deliveryCharges}\n`;
    message += `*कुल राशि: ₹${finalTotal.toLocaleString()}*\n\n`;
    message += `कृपया ऑर्डर कन्फर्म करें! 🙏`;

    const phoneNumber = "9001048718"; // Replace with your WhatsApp number
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappURL, '_blank');
    closeCartModal();
    showNotification('WhatsApp पर ऑर्डर भेजा गया!');
}

// Enhanced notification system
function showNotification(message, type = 'success') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    const notification = document.createElement('div');
    notification.className = 'notification';
    
    const colors = {
        success: 'linear-gradient(135deg, #27ae60, #2ecc71)',
        error: 'linear-gradient(135deg, #e74c3c, #c0392b)',
        info: 'linear-gradient(135deg, #3498db, #2980b9)'
    };
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle'
    };

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        z-index: 9999;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(300px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    notification.innerHTML = `
        <i class="fas fa-${icons[type]}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Enhanced product modal functions
function addToCartFromModal() {
    if (currentProduct && currentQuantity) {
        for (let i = 0; i < currentQuantity; i++) {
            addToCart(currentProduct.id, currentProduct.name, currentProduct.price);
        }
        closeProductModal();
    }
}

function orderNow() {
    if (currentProduct && currentQuantity) {
        // First add to cart
        for (let i = 0; i < currentQuantity; i++) {
            addToCart(currentProduct.id, currentProduct.name, currentQuantity);
        }
        
        closeProductModal();
        
        // Show quick order options
        const quickOrderModal = document.createElement('div');
        quickOrderModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 2002;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        quickOrderModal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 15px; text-align: center; max-width: 400px; width: 90%;">
                <h3 style="margin-bottom: 20px;">Order करने के लिए चुनें:</h3>
                
                <button onclick="goToFullCheckout()" style="width: 100%; padding: 15px; margin-bottom: 10px; background: linear-gradient(135deg, #3498db, #2980b9); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">
                    <i class="fas fa-credit-card"></i> Complete Checkout Form
                </button>
                
                <button onclick="quickWhatsAppOrder()" style="width: 100%; padding: 15px; margin-bottom: 10px; background: linear-gradient(135deg, #25d366, #128c7e); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">
                    <i class="fab fa-whatsapp"></i> Quick WhatsApp Order
                </button>
                
                <button onclick="closeQuickOrderModal()" style="width: 100%; padding: 10px; background: #95a5a6; color: white; border: none; border-radius: 8px; cursor: pointer;">
                    Cancel
                </button>
            </div>
        `;
        
        quickOrderModal.id = 'quick-order-modal';
        document.body.appendChild(quickOrderModal);
    }
}

function goToFullCheckout() {
    closeQuickOrderModal();
    window.location.href = 'orders.html?tab=checkout';
}

function quickWhatsAppOrder() {
    closeQuickOrderModal();
    orderViaWhatsApp();
}

function closeQuickOrderModal() {
    const modal = document.getElementById('quick-order-modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Update cart button click handler
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.onclick = showCartModal;
    }
});