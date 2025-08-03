// admin-panel.js - Integration script for Nirakaar Silver Website
// This file connects the admin panel with the main website

// Product Management System
class ProductManager {
    constructor() {
        this.storageKey = 'nirakaar_products';
        this.init();
    }

    init() {
        // Initialize with sample data if no products exist
        if (!this.getProducts()) {
            this.initializeSampleProducts();
        }
    }

    // Get all products from localStorage
    getProducts() {
        try {
            const chunkCount = parseInt(localStorage.getItem('nirakaar_products_count') || '0');
            
            if (chunkCount === 0) {
                return null;
            }
            
            let jsonStr = '';
            for (let i = 0; i < chunkCount; i++) {
                const chunk = localStorage.getItem(`nirakaar_products_${i}`);
                if (chunk) {
                    jsonStr += chunk;
                }
            }
            
            if (jsonStr) {
                const data = JSON.parse(jsonStr);
                return data.products || { frames: [], pots: [], animals: [] };
            }
            
            return null;
        } catch (error) {
            console.error('Error loading products:', error);
            return null;
        }
    }

    // Get products by category
    getProductsByCategory(category) {
        const products = this.getProducts();
        return products ? products[category] || [] : [];
    }

    // Initialize sample products
    initializeSampleProducts() {
        const sampleProducts = {
            frames: [
                {
                    id: 101,
                    name: 'पारंपरिक सिल्वर फ्रेम',
                    price: 2500,
                    size: 'medium',
                    style: 'traditional',
                    description: 'हस्तनिर्मित पारंपरिक डिज़ाइन के साथ बनाया गया यह सुंदर सिल्वर फ्रेम',
                    category: 'frames',
                    image: null,
                    featured: true,
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 102,
                    name: 'मॉडर्न सिल्वर फ्रेम',
                    price: 3200,
                    size: 'large',
                    style: 'modern',
                    description: 'आधुनिक डिज़ाइन के साथ एलिगेंट फ्रेम जो आपके घर को स्टाइलिश लुक देता है',
                    category: 'frames',
                    image: null,
                    featured: true,
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 103,
                    name: 'डेकोरेटिव मिनी फ्रेम',
                    price: 1800,
                    size: 'small',
                    style: 'decorative',
                    description: 'छोटे साइज़ का सुंदर डेकोरेटिव फ्रेम जो टेबल टॉप पर परफेक्ट है',
                    category: 'frames',
                    image: null,
                    featured: false,
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 104,
                    name: 'प्रीमियम लार्ज फ्रेम',
                    price: 4500,
                    size: 'large',
                    style: 'traditional',
                    description: 'बड़े साइज़ का प्रीमियम क्वालिटी फ्रेम',
                    category: 'frames',
                    image: null,
                    featured: true,
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 105,
                    name: 'एलिगेंट सिल्वर फ्रेम',
                    price: 2800,
                    size: 'medium',
                    style: 'modern',
                    description: 'एलिगेंट और स्टाइलिश डिज़ाइन',
                    category: 'frames',
                    image: null,
                    featured: false,
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 106,
                    name: 'रॉयल डेकोरेटिव फ्रेम',
                    price: 3800,
                    size: 'large',
                    style: 'decorative',
                    description: 'रॉयल लुक के साथ खूबसूरत डिज़ाइन',
                    category: 'frames',
                    image: null,
                    featured: true,
                    dateAdded: new Date().toISOString()
                }
            ],
            pots: [
                {
                    id: 201,
                    name: 'पारंपरिक सिल्वर पॉट',
                    price: 3500,
                    size: 'medium',
                    type: 'traditional',
                    description: 'हस्तनिर्मित पारंपरिक डिज़ाइन के साथ',
                    category: 'pots',
                    image: null,
                    featured: true,
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 202,
                    name: 'मॉडर्न सिल्वर पॉट',
                    price: 4200,
                    size: 'large',
                    type: 'modern',
                    description: 'आधुनिक स्टाइल का एलिगेंट पॉट',
                    category: 'pots',
                    image: null,
                    featured: true,
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 203,
                    name: 'डेकोरेटिव मिनी पॉट',
                    price: 2800,
                    size: 'small',
                    type: 'decorative',
                    description: 'छोटे साइज़ का सुंदर डेकोरेटिव पॉट',
                    category: 'pots',
                    image: null,
                    featured: false,
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 204,
                    name: 'प्रीमियम लार्ज पॉट',
                    price: 5500,
                    size: 'large',
                    type: 'traditional',
                    description: 'बड़े साइज़ का प्रीमियम पॉट',
                    category: 'pots',
                    image: null,
                    featured: true,
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 205,
                    name: 'एलिगेंट सिल्वर पॉट',
                    price: 3800,
                    size: 'medium',
                    type: 'modern',
                    description: 'एलिगेंट और स्टाइलिश डिज़ाइन का पॉट',
                    category: 'pots',
                    image: null,
                    featured: false,
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 206,
                    name: 'रॉयल डेकोरेटिव पॉट',
                    price: 4800,
                    size: 'large',
                    type: 'decorative',
                    description: 'रॉयल लुक के साथ खूबसूरत पॉट',
                    category: 'pots',
                    image: null,
                    featured: true,
                    dateAdded: new Date().toISOString()
                }
            ],
            animals: [
                {
                    id: 301,
                    name: 'सिल्वर हाथी',
                    price: 5500,
                    size: 'large',
                    animal: 'elephant',
                    description: 'सुंदर सिल्वर हाथी की मूर्ति जो आपके घर में सौभाग्य और समृद्धि लाती है',
                    category: 'animals',
                    image: null,
                    featured: true,
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 302,
                    name: 'सिल्वर मोर',
                    price: 4800,
                    size: 'medium',
                    animal: 'peacock',
                    description: 'खूबसूरत सिल्वर मोर की आकृति जो आपके घर की सजावट बढ़ाती है',
                    category: 'animals',
                    image: null,
                    featured: true,
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 303,
                    name: 'सिल्वर घोड़ा',
                    price: 6200,
                    size: 'large',
                    animal: 'horse',
                    description: 'प्रीमियम सिल्वर घोड़े की मूर्ति जो शक्ति और गति का प्रतीक है',
                    category: 'animals',
                    image: null,
                    featured: true,
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 304,
                    name: 'मिनी सिल्वर हाथी',
                    price: 3800,
                    size: 'small',
                    animal: 'elephant',
                    description: 'छोटे साइज़ का प्यारा हाथी',
                    category: 'animals',
                    image: null,
                    featured: false,
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 305,
                    name: 'सिल्वर शेर',
                    price: 7500,
                    size: 'large',
                    animal: 'lion',
                    description: 'राजसी सिल्वर शेर की मूर्ति',
                    category: 'animals',
                    image: null,
                    featured: true,
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 306,
                    name: 'डांसिंग सिल्वर मोर',
                    price: 4200,
                    size: 'medium',
                    animal: 'peacock',
                    description: 'नृत्य मुद्रा में सुंदर मोर',
                    category: 'animals',
                    image: null,
                    featured: false,
                    dateAdded: new Date().toISOString()
                }
            ]
        };

        this.saveProducts(sampleProducts);
    }

    // Save products to localStorage with chunking for large data
    saveProducts(products) {
        try {
            const dataToSave = {
                products: products,
                timestamp: new Date().toISOString(),
                version: '1.0'
            };
            
            const jsonStr = JSON.stringify(dataToSave);
            const chunks = [];
            const chunkSize = 1000000; // 1MB chunks
            
            for (let i = 0; i < jsonStr.length; i += chunkSize) {
                chunks.push(jsonStr.slice(i, i + chunkSize));
            }
            
            // Clear existing chunks
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('nirakaar_products_')) {
                    localStorage.removeItem(key);
                }
            });
            
            // Save new chunks
            chunks.forEach((chunk, index) => {
                localStorage.setItem(`nirakaar_products_${index}`, chunk);
            });
            
            localStorage.setItem('nirakaar_products_count', chunks.length);
            
            return true;
        } catch (error) {
            console.error('Error saving products:', error);
            return false;
        }
    }

    // Get product by ID and category
    getProductById(category, id) {
        const products = this.getProductsByCategory(category);
        return products.find(product => product.id === parseInt(id));
    }

    // Search products
    searchProducts(category, searchTerm) {
        const products = this.getProductsByCategory(category);
        if (!searchTerm) return products;
        
        return products.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Filter products
    filterProducts(category, filterKey, filterValue) {
        const products = this.getProductsByCategory(category);
        if (!filterValue) return products;
        
        return products.filter(product => product[filterKey] === filterValue);
    }

    // Get featured products
    getFeaturedProducts(category, limit = null) {
        const products = this.getProductsByCategory(category);
        const featured = products.filter(product => product.featured);
        return limit ? featured.slice(0, limit) : featured;
    }

    // Get latest products
    getLatestProducts(category, limit = 6) {
        const products = this.getProductsByCategory(category);
        return products
            .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
            .slice(0, limit);
    }

    // Get products by price range
    getProductsByPriceRange(category, minPrice, maxPrice) {
        const products = this.getProductsByCategory(category);
        return products.filter(product => 
            product.price >= minPrice && product.price <= maxPrice
        );
    }
}

// Website Integration Functions
class WebsiteIntegration {
    constructor() {
        this.productManager = new ProductManager();
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeWebsite();
            });
        } else {
            this.initializeWebsite();
        }
    }

    initializeWebsite() {
        this.updateProductGrids();
        this.updateProductModals();
        this.setupAdminPanelIntegration();
    }

    // Update product grids on category pages
    updateProductGrids() {
        const currentPage = this.getCurrentPage();
        
        if (currentPage === 'frames') {
            this.updateFramesGrid();
        } else if (currentPage === 'pots') {
            this.updatePotsGrid();
        } else if (currentPage === 'animals') {
            this.updateAnimalsGrid();
        }
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('frames.html')) return 'frames';
        if (path.includes('pots.html')) return 'pots';
        if (path.includes('animals.html')) return 'animals';
        return 'index';
    }

    updateFramesGrid() {
        const grid = document.getElementById('framesGrid');
        if (!grid) return;

        const frames = this.productManager.getProductsByCategory('frames');
        this.renderProductGrid(grid, frames, 'frames');
    }

    updatePotsGrid() {
        const grid = document.getElementById('potsGrid');
        if (!grid) return;

        const pots = this.productManager.getProductsByCategory('pots');
        this.renderProductGrid(grid, pots, 'pots');
    }

    updateAnimalsGrid() {
        const grid = document.getElementById('animalsGrid');
        if (!grid) return;

        const animals = this.productManager.getProductsByCategory('animals');
        this.renderProductGrid(grid, animals, 'animals');
    }

    renderProductGrid(grid, products, category) {
        if (!products || products.length === 0) {
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
            <div class="product-card" data-price="${product.price}" data-size="${product.size}" data-${this.getDataAttribute(category)}="${this.getDataValue(product, category)}">
                <div class="product-image" onclick="showProductDetail(${product.id})">
                    ${product.image ? `<img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">` : this.getDefaultIcon(category)}
                    ${this.hasProductOverlay() ? `
                        <div class="product-overlay">
                            <i class="fas fa-eye"></i>
                            <span>विस्तार से देखें</span>
                        </div>
                    ` : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-name" onclick="showProductDetail(${product.id})">${product.name}</h3>
                    <div class="product-price">₹${product.price.toLocaleString()}</div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-actions">
                        <button class="add-to-cart" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="view-details" onclick="showProductDetail(${product.id})">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Update products count
        const countElement = document.getElementById('productsCount');
        if (countElement) {
            countElement.textContent = products.length;
        }
    }

    getDataAttribute(category) {
        const attributes = {
            'frames': 'style',
            'pots': 'type',
            'animals': 'animal'
        };
        return attributes[category] || 'type';
    }

    getDataValue(product, category) {
        const values = {
            'frames': product.style,
            'pots': product.type,
            'animals': product.animal
        };
        return values[category] || '';
    }

    getDefaultIcon(category) {
        const icons = {
            'frames': '<i class="fas fa-picture-o"></i>',
            'pots': '<i class="fas fa-cookie-bite"></i>',
            'animals': '<i class="fas fa-horse-head"></i>'
        };
        return icons[category] || '<i class="fas fa-image"></i>';
    }

    hasProductOverlay() {
        return document.querySelector('.product-overlay') !== null;
    }

    // Update product modals with dynamic data
    updateProductModals() {
        // Override the existing showProductDetail function
        window.showProductDetail = (productId) => {
            const currentPage = this.getCurrentPage();
            const product = this.productManager.getProductById(currentPage, productId);
            
            if (!product) {
                console.error('Product not found:', productId);
                return;
            }

            // Update modal content
            const modal = document.getElementById('product-detail-modal');
            if (!modal) return;

            const nameElement = document.getElementById('modal-product-name');
            const priceElement = document.getElementById('modal-product-price');
            const descriptionElement = document.getElementById('modal-product-description');
            const imageElement = document.getElementById('modal-product-image');

            if (nameElement) nameElement.textContent = product.name;
            if (priceElement) priceElement.textContent = `₹${product.price.toLocaleString()}`;
            if (descriptionElement) descriptionElement.textContent = product.description;
            if (imageElement) {
                if (product.image) {
                    imageElement.src = product.image;
                } else {
                    imageElement.src = this.getDefaultImageSrc(currentPage);
                }
            }

            // Store current product for modal actions
            window.currentModalProduct = product;
            
            modal.style.display = 'block';
        };
    }

    getDefaultImageSrc(category) {
        // Return a default SVG image for each category
        const svgImages = {
            'frames': `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23ecf0f1"/%3E%3Ctext x="200" y="150" text-anchor="middle" dy="0.3em" font-family="Arial" font-size="24" fill="%23bdc3c7"%3ESilver Frame%3C/text%3E%3C/svg%3E`,
            'pots': `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23ecf0f1"/%3E%3Ctext x="200" y="150" text-anchor="middle" dy="0.3em" font-family="Arial" font-size="24" fill="%23bdc3c7"%3ESilver Pot%3C/text%3E%3C/svg%3E`,
            'animals': `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23ecf0f1"/%3E%3Ctext x="200" y="150" text-anchor="middle" dy="0.3em" font-family="Arial" font-size="24" fill="%23bdc3c7"%3ESilver Animal%3C/text%3E%3C/svg%3E`
        };
        return svgImages[category] || svgImages['frames'];
    }

    // Setup admin panel integration
    setupAdminPanelIntegration() {
        // Override loadAdminPanel function if it exists
        if (typeof window.loadAdminPanel === 'function') {
            window.loadAdminPanel = () => {
                window.open('admin-panel.html', '_blank', 'width=1200,height=800');
            };
        }

        // Listen for storage changes to update the website when admin makes changes
        window.addEventListener('storage', (e) => {
            if (e.key && e.key.startsWith('nirakaar_products')) {
                // Reload products when admin panel updates them
                setTimeout(() => {
                    this.updateProductGrids();
                }, 500);
            }
        });
    }

    // Enhanced filter functions
    setupEnhancedFilters() {
        // Override existing filter functions
        window.filterProducts = (category, filterValue) => {
            const currentPage = this.getCurrentPage();
            if (currentPage !== category) return;

            let products;
            if (!filterValue) {
                products = this.productManager.getProductsByCategory(category);
            } else {
                const filterKey = this.getDataAttribute(category);
                products = this.productManager.filterProducts(category, filterKey, filterValue);
            }

            const grid = document.getElementById(category + 'Grid');
            this.renderProductGrid(grid, products, category);
        };

        window.searchProducts = (category, searchTerm) => {
            const currentPage = this.getCurrentPage();
            if (currentPage !== category) return;

            const products = this.productManager.searchProducts(category, searchTerm);
            const grid = document.getElementById(category + 'Grid');
            this.renderProductGrid(grid, products, category);
        };

        window.sortProducts = (category, sortOrder) => {
            const currentPage = this.getCurrentPage();
            if (currentPage !== category) return;

            let products = this.productManager.getProductsByCategory(category);
            
            switch (sortOrder) {
                case 'price-low':
                    products = products.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    products = products.sort((a, b) => b.price - a.price);
                    break;
                case 'newest':
                    products = products.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                    break;
                default:
                    // Featured first, then by date
                    products = products.sort((a, b) => {
                        if (a.featured && !b.featured) return -1;
                        if (!a.featured && b.featured) return 1;
                        return new Date(b.dateAdded) - new Date(a.dateAdded);
                    });
            }

            const grid = document.getElementById(category + 'Grid');
            this.renderProductGrid(grid, products, category);
        };
    }
}

// Initialize the integration
const websiteIntegration = new WebsiteIntegration();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProductManager, WebsiteIntegration };
}

// Make ProductManager available globally for admin panel
window.ProductManager = ProductManager;
window.websiteIntegration = websiteIntegration;

console.log('🎉 Nirakaar Silver Admin Integration loaded successfully!');