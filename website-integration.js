// website-integration.js - इस file को अपने सभी pages (frames.html, pots.html, animals.html) में include करें

// Supabase Configuration
const SUPABASE_URL = 'https://dsxrxzaelgghjiycxilm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzeHJ4emFlbGdnaGppeWN4aWxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMDY0NTIsImV4cCI6MjA2OTc4MjQ1Mn0.vWTtSSI3gbAP6OiM4ftzUq61jW6uuPSwa7O6uz8Buq4';

let supabaseClient;
let currentCategory = null;

// Initialize Supabase and detect current page
async function initializeWebsite() {
    try {
        // Create Supabase client
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        
        // Detect current page category
        const path = window.location.pathname;
        if (path.includes('frames')) {
            currentCategory = 'frames';
        } else if (path.includes('pots')) {
            currentCategory = 'pots';
        } else if (path.includes('animals')) {
            currentCategory = 'animals';
        }

        console.log(`🎯 Current page: ${currentCategory}`);
        
        // Load products for current category
        if (currentCategory) {
            await loadProductsFromDatabase();
        }
        
        // Setup real-time updates
        setupRealTimeUpdates();
        
        console.log('✅ Website Supabase integration initialized!');
        
    } catch (error) {
        console.error('❌ Website initialization error:', error);
        loadFallbackData();
    }
}

// Load products from Supabase database
async function loadProductsFromDatabase() {
    try {
        const { data, error } = await supabaseClient
            .from('nirakaarsilver')
            .select('*')
            .eq('category', currentCategory)
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        console.log(`📦 Loaded ${data.length} ${currentCategory} from database`);
        
        // Render products on page
        renderProductsOnPage(data);
        
        // Update products count if element exists
        const countElement = document.getElementById('productsCount');
        if (countElement) {
            countElement.textContent = data.length;
        }
        
    } catch (error) {
        console.error('Error loading products:', error);
        loadFallbackData();
    }
}

// Render products on website pages
function renderProductsOnPage(products) {
    // Try different possible grid container IDs
    const possibleGridIds = [
        currentCategory + 'Grid',
        'productsGrid',
        'products-grid',
        'product-container'
    ];
    
    let grid = null;
    for (const id of possibleGridIds) {
        grid = document.getElementById(id);
        if (grid) break;
    }
    
    // Try finding by class if ID not found
    if (!grid) {
        grid = document.querySelector('.products-grid, .product-grid, .products-container');
    }
    
    if (!grid) {
        console.error('❌ Products grid container not found!');
        return;
    }

    if (products.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #7f8c8d;">
                <i class="fas fa-box-open" style="font-size: 48px; margin-bottom: 20px; opacity: 0.5;"></i>
                <h3>कोई प्रोडक्ट नहीं मिला</h3>
                <p>जल्द ही नए प्रोडक्ट्स जोड़े जाएंगे</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}" data-price="${product.price}">
            <div class="product-image" onclick="showProductDetail(${product.id})">
                ${product.image_url ? 
                    `<img src="${product.image_url}" alt="${product.name}" 
                         style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;"
                         onerror="this.parentElement.innerHTML='${getDefaultIcon(currentCategory)}'">` : 
                    getDefaultIcon(currentCategory)
                }
                <div class="product-overlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; 
                     background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; 
                     opacity: 0; transition: opacity 0.3s ease; cursor: pointer; border-radius: 10px;">
                    <div style="color: white; text-align: center;">
                        <i class="fas fa-eye" style="font-size: 24px; margin-bottom: 8px;"></i>
                        <div>विस्तार से देखें</div>
                    </div>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name" onclick="showProductDetail(${product.id})">${product.name}</h3>
                <div class="product-price" style="font-size: 20px; font-weight: bold; color: #e74c3c; margin: 10px 0;">
                    ₹${product.price.toLocaleString()}
                </div>
                <p class="product-description" style="color: #7f8c8d; font-size: 14px; margin-bottom: 15px; line-height: 1.4;">
                    ${product.description || 'Beautiful handcrafted silver product'}
                </p>
                <div class="product-actions" style="display: flex; gap: 10px;">
                    <button class="btn btn-primary" onclick="addToCart(${product.id}, '${product.name}', ${product.price})" 
                            style="flex: 1; padding: 10px; background: linear-gradient(135deg, #ffd700, #f39c12); 
                                   color: #333; border: none; border-radius: 8px; cursor: pointer; transition: all 0.3s ease;">
                        <i class="fas fa-shopping-cart"></i> Cart में जोड़ें
                    </button>
                    <button class="btn btn-secondary" onclick="showProductDetail(${product.id})"
                            style="padding: 10px 15px; background: #6c757d; color: white; border: none; 
                                   border-radius: 8px; cursor: pointer; transition: all 0.3s ease;">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Add hover effects
    const productCards = grid.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const overlay = card.querySelector('.product-overlay');
        if (overlay) {
            card.addEventListener('mouseenter', () => {
                overlay.style.opacity = '1';
            });
            card.addEventListener('mouseleave', () => {
                overlay.style.opacity = '0';
            });
        }
    });

    console.log(`✅ Rendered ${products.length} products on page`);
}

// Get default icon for category
function getDefaultIcon(category) {
    const icons = {
        'frames': '<i class="fas fa-picture-o" style="font-size: 48px; color: #bdc3c7;"></i>',
        'pots': '<i class="fas fa-cookie-bite" style="font-size: 48px; color: #bdc3c7;"></i>',
        'animals': '<i class="fas fa-horse-head" style="font-size: 48px; color: #bdc3c7;"></i>'
    };
    return icons[category] || '<i class="fas fa-image" style="font-size: 48px; color: #bdc3c7;"></i>';
}

// Setup real-time updates (यह admin panel में changes को automatically detect करेगा)
function setupRealTimeUpdates() {
    if (!supabaseClient || !currentCategory) return;

    // Subscribe to database changes for current category
    const subscription = supabaseClient
        .channel(`public:nirakaarsilver:category=eq.${currentCategory}`)
        .on('postgres_changes', 
            { 
                event: '*', 
                schema: 'public', 
                table: 'nirakaarsilver',
                filter: `category=eq.${currentCategory}`
            }, 
            (payload) => {
                console.log('🔄 Real-time update received:', payload);
                
                // Reload products when data changes
                setTimeout(() => {
                    loadProductsFromDatabase();
                }, 500);
                
                // Show notification
                showUpdateNotification();
            }
        )
        .subscribe();

    console.log(`🔄 Real-time updates enabled for ${currentCategory}`);
}

// Show update notification
function showUpdateNotification() {
    // Create or update notification
    let notification = document.getElementById('updateNotification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'updateNotification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(39, 174, 96, 0.3);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 10px;
            transform: translateX(300px);
            transition: transform 0.3s ease;
            font-size: 14px;
        `;
        document.body.appendChild(notification);
    }
    
    notification.innerHTML = `
        <i class="fas fa-sync-alt fa-spin"></i>
        <span>नए प्रोडक्ट्स लोड हो रहे हैं...</span>
    `;
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
    }, 3000);
}

// Enhanced product detail function
window.showProductDetail = async function(productId) {
    try {
        const { data, error } = await supabaseClient
            .from('nirakaarsilver')
            .select('*')
            .eq('id', productId)
            .single();

        if (error) {
            throw error;
        }

        const product = data;
        
        // Update existing modal or create new one
        updateProductModal(product);
        
    } catch (error) {
        console.error('Error loading product details:', error);
        alert('प्रोडक्ट डिटेल लोड करने में error हुई!');
    }
};

// Update product modal with database data
function updateProductModal(product) {
    // Try to find existing modal
    let modal = document.getElementById('productModal') || 
                document.getElementById('product-detail-modal') ||
                document.querySelector('.modal');
    
    if (!modal) {
        // Create new modal if none exists
        createProductModal(product);
        return;
    }
    
    // Update modal content
    const nameElement = modal.querySelector('.modal-product-name, #modal-product-name, .product-modal-name');
    const priceElement = modal.querySelector('.modal-product-price, #modal-product-price, .product-modal-price');
    const descriptionElement = modal.querySelector('.modal-product-description, #modal-product-description, .product-modal-description');
    const imageElement = modal.querySelector('.modal-product-image, #modal-product-image, .product-modal-image');
    
    if (nameElement) nameElement.textContent = product.name;
    if (priceElement) priceElement.textContent = `₹${product.price.toLocaleString()}`;
    if (descriptionElement) descriptionElement.textContent = product.description || 'Beautiful handcrafted silver product';
    if (imageElement && product.image_url) {
        imageElement.src = product.image_url;
        imageElement.alt = product.name;
    }
    
    // Show modal
    modal.style.display = 'block';
    
    // Store current product for cart functionality
    window.currentModalProduct = product;
}

// Create new product modal
function createProductModal(product) {
    const modal = document.createElement('div');
    modal.id = 'dynamicProductModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="background: white; max-width: 600px; width: 100%; border-radius: 15px; padding: 30px; position: relative; max-height: 90vh; overflow-y: auto;">
            <button onclick="this.closest('#dynamicProductModal').remove()" 
                    style="position: absolute; top: 15px; right: 20px; background: none; border: none; font-size: 24px; cursor: pointer; color: #999;">
                &times;
            </button>
            <div style="text-align: center;">
                ${product.image_url ? 
                    `<img src="${product.image_url}" alt="${product.name}" 
                         style="max-width: 100%; height: 300px; object-fit: contain; border-radius: 10px; margin-bottom: 20px;">` :
                    `<div style="height: 200px; background: #f8f9fa; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                        ${getDefaultIcon(currentCategory)}
                    </div>`
                }
                <h2 style="font-family: 'Playfair Display', serif; color: #2c3e50; margin-bottom: 15px;">${product.name}</h2>
                <div style="font-size: 28px; font-weight: bold; color: #e74c3c; margin-bottom: 20px;">₹${product.price.toLocaleString()}</div>
                <p style="color: #7f8c8d; line-height: 1.6; margin-bottom: 30px;">${product.description || 'Beautiful handcrafted silver product'}</p>
                <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}); this.closest('#dynamicProductModal').remove();"
                        style="background: linear-gradient(135deg, #ffd700, #f39c12); color: #333; border: none; padding: 15px 30px; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer;">
                    <i class="fas fa-shopping-cart"></i> Cart में जोड़ें
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Enhanced search functionality
window.searchProducts = async function(searchTerm) {
    if (!currentCategory || !supabaseClient) return;
    
    try {
        let query = supabaseClient
            .from('nirakaarsilver')
            .select('*')
            .eq('category', currentCategory);
        
        if (searchTerm && searchTerm.trim()) {
            query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
        }
        
        const { data, error } = await query.order('created_at', { ascending: false });
        
        if (error) throw error;
        
        renderProductsOnPage(data);
        
    } catch (error) {
        console.error('Error searching products:', error);
    }
};

// Enhanced filter functionality
window.filterProducts = async function(filterType, filterValue) {
    if (!currentCategory || !supabaseClient) return;
    
    try {
        let query = supabaseClient
            .from('nirakaarsilver')
            .select('*')
            .eq('category', currentCategory);
        
        // Add price filters
        if (filterType === 'price' && filterValue) {
            const [min, max] = filterValue.split('-').map(Number);
            if (max) {
                query = query.gte('price', min).lte('price', max);
            } else {
                query = query.gte('price', min);
            }
        }
        
        const { data, error } = await query.order('created_at', { ascending: false });
        
        if (error) throw error;
        
        renderProductsOnPage(data);
        
    } catch (error) {
        console.error('Error filtering products:', error);
    }
};

// Enhanced sort functionality
window.sortProducts = async function(sortType) {
    if (!currentCategory || !supabaseClient) return;
    
    try {
        const { data, error } = await supabaseClient
            .from('nirakaarsilver')
            .select('*')
            .eq('category', currentCategory)
            .order(
                sortType === 'price-low' ? 'price' : 
                sortType === 'price-high' ? 'price' :
                sortType === 'newest' ? 'created_at' : 'created_at',
                { ascending: sortType === 'price-low' ? true : false }
            );
        
        if (error) throw error;
        
        renderProductsOnPage(data);
        
    } catch (error) {
        console.error('Error sorting products:', error);
    }
};

// Cart functionality (if not already defined)
window.addToCart = function(productId, productName, productPrice) {
    // Get existing cart from localStorage or create new one
    let cart = JSON.parse(localStorage.getItem('nirukaarCart') || '[]');
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1,
            category: currentCategory
        });
    }
    
    // Save to localStorage
    localStorage.setItem('nirukaarCart', JSON.stringify(cart));
    
    // Show success notification
    showCartNotification(`${productName} को cart में जोड़ दिया गया!`);
    
    // Update cart count if element exists
    updateCartCount();
};

// Show cart notification
function showCartNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #27ae60, #2ecc71);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 8px 25px rgba(39, 174, 96, 0.3);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(300px);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Update cart count display
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('nirukaarCart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update cart count elements
    const cartCountElements = document.querySelectorAll('.cart-count, #cart-count, .cart-counter');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
        element.style.display = totalItems > 0 ? 'inline' : 'none';
    });
}

// Load fallback data if Supabase fails
function loadFallbackData() {
    console.log('📦 Loading fallback sample data...');
    
    const sampleData = {
        frames: [
            {
                id: 1,
                name: 'पारंपरिक सिल्वर फ्रेम',
                price: 2500,
                description: 'हस्तनिर्मित पारंपरिक डिज़ाइन के साथ बनाया गया सुंदर सिल्वर फ्रेम',
                image_url: null,
                category: 'frames'
            },
            {
                id: 2,
                name: 'मॉडर्न सिल्वर फ्रेम',
                price: 3200,
                description: 'आधुनिक डिज़ाइन के साथ एलिगेंट फ्रेम',
                image_url: null,
                category: 'frames'
            }
        ],
        pots: [
            {
                id: 3,
                name: 'पारंपरिक सिल्वर पॉट',
                price: 3500,
                description: 'हस्तनिर्मित पारंपरिक डिज़ाइन के साथ',
                image_url: null,
                category: 'pots'
            }
        ],
        animals: [
            {
                id: 4,
                name: 'सिल्वर हाथी',
                price: 5500,
                description: 'सुंदर सिल्वर हाथी की मूर्ति',
                image_url: null,
                category: 'animals'
            }
        ]
    };
    
    if (currentCategory && sampleData[currentCategory]) {
        renderProductsOnPage(sampleData[currentCategory]);
    }
}

// Refresh products manually
window.refreshProducts = async function() {
    if (currentCategory) {
        await loadProductsFromDatabase();
        showUpdateNotification();
    }
};

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count
    updateCartCount();
    
    // Initialize website with Supabase
    initializeWebsite();
    
    console.log('🎉 Nirakaar Silver Website Integration loaded successfully!');
});

// Export functions for use in other scripts
if (typeof window !== 'undefined') {
    window.NirukaarWebsite = {
        loadProducts: loadProductsFromDatabase,
        searchProducts: window.searchProducts,
        filterProducts: window.filterProducts,
        sortProducts: window.sortProducts,
        addToCart: window.addToCart,
        refreshProducts: window.refreshProducts
    };
}