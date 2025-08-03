// admin-panel.js - Supabase Integration for Nirakaar Silver Website
// This file connects the admin panel with Supabase database

// Supabase Configuration
const SUPABASE_URL = 'https://dsxrxzaelgghjiycxilm.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzeHJ4emFlbGdnaGppeWN4aWxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMDY0NTIsImV4cCI6MjA2OTc4MjQ1Mn0.vWTtSSI3gbAP6OiM4ftzUq61jW6uuPSwa7O6uz8Buq4'

// Initialize Supabase client
const supabase = supabaseCreateClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Product Management System with Supabase
class ProductManager {
    constructor() {
        this.init();
    }

    async init() {
        try {
            // Check if products exist in database
            const { data, error } = await supabase
                .from('nirakaarsilver')
                .select('*')
                .limit(1);
            
            if (error) {
                console.error('Supabase connection error:', error);
                return;
            }

            // If no products exist, initialize with sample data
            if (!data || data.length === 0) {
                await this.initializeSampleProducts();
            }
            
            console.log('✅ Supabase connected successfully!');
        } catch (error) {
            console.error('❌ Supabase initialization error:', error);
        }
    }

    // Get all products from Supabase
    async getProducts() {
        try {
            const { data, error } = await supabase
                .from('nirakaarsilver')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching products:', error);
                return null;
            }

            // Group products by category
            const grouped = {
                frames: data.filter(p => p.category === 'frames'),
                pots: data.filter(p => p.category === 'pots'),
                animals: data.filter(p => p.category === 'animals')
            };

            return grouped;
        } catch (error) {
            console.error('Error in getProducts:', error);
            return null;
        }
    }

    // Get products by category
    async getProductsByCategory(category) {
        try {
            const { data, error } = await supabase
                .from('nirakaarsilver')
                .select('*')
                .eq('category', category)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching products by category:', error);
                return [];
            }

            return data || [];
        } catch (error) {
            console.error('Error in getProductsByCategory:', error);
            return [];
        }
    }

    // Add new product to Supabase
    async addProduct(productData) {
        try {
            const { data, error } = await supabase
                .from('nirakaarsilver')
                .insert([{
                    name: productData.name,
                    price: productData.price,
                    description: productData.description,
                    image_url: productData.image_url || null,
                    category: productData.category
                }])
                .select();

            if (error) {
                console.error('Error adding product:', error);
                return { success: false, error: error.message };
            }

            console.log('✅ Product added successfully:', data[0]);
            return { success: true, data: data[0] };
        } catch (error) {
            console.error('Error in addProduct:', error);
            return { success: false, error: error.message };
        }
    }

    // Update product in Supabase
    async updateProduct(id, productData) {
        try {
            const { data, error } = await supabase
                .from('nirakaarsilver')
                .update({
                    name: productData.name,
                    price: productData.price,
                    description: productData.description,
                    image_url: productData.image_url,
                    category: productData.category
                })
                .eq('id', id)
                .select();

            if (error) {
                console.error('Error updating product:', error);
                return { success: false, error: error.message };
            }

            console.log('✅ Product updated successfully:', data[0]);
            return { success: true, data: data[0] };
        } catch (error) {
            console.error('Error in updateProduct:', error);
            return { success: false, error: error.message };
        }
    }

    // Delete product from Supabase
    async deleteProduct(id) {
        try {
            const { error } = await supabase
                .from('nirakaarsilver')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting product:', error);
                return { success: false, error: error.message };
            }

            console.log('✅ Product deleted successfully');
            return { success: true };
        } catch (error) {
            console.error('Error in deleteProduct:', error);
            return { success: false, error: error.message };
        }
    }

    // Initialize sample products in Supabase
    async initializeSampleProducts() {
        const sampleProducts = [
            // Frames
            {
                name: 'पारंपरिक सिल्वर फ्रेम',
                price: 2500,
                description: 'हस्तनिर्मित पारंपरिक डिज़ाइन के साथ बनाया गया यह सुंदर सिल्वर फ्रेम',
                category: 'frames',
                image_url: null
            },
            {
                name: 'मॉडर्न सिल्वर फ्रेम',
                price: 3200,
                description: 'आधुनिक डिज़ाइन के साथ एलिगेंट फ्रेम जो आपके घर को स्टाइलिश लुक देता है',
                category: 'frames',
                image_url: null
            },
            {
                name: 'डेकोरेटिव मिनी फ्रेम',
                price: 1800,
                description: 'छोटे साइज़ का सुंदर डेकोरेटिव फ्रेम जो टेबल टॉप पर परफेक्ट है',
                category: 'frames',
                image_url: null
            },
            // Pots
            {
                name: 'पारंपरिक सिल्वर पॉट',
                price: 3500,
                description: 'हस्तनिर्मित पारंपरिक डिज़ाइन के साथ',
                category: 'pots',
                image_url: null
            },
            {
                name: 'मॉडर्न सिल्वर पॉट',
                price: 4200,
                description: 'आधुनिक स्टाइल का एलिगेंट पॉट',
                category: 'pots',
                image_url: null
            },
            {
                name: 'डेकोरेटिव मिनी पॉट',
                price: 2800,
                description: 'छोटे साइज़ का सुंदर डेकोरेटिव पॉट',
                category: 'pots',
                image_url: null
            },
            // Animals
            {
                name: 'सिल्वर हाथी',
                price: 5500,
                description: 'सुंदर सिल्वर हाथी की मूर्ति जो आपके घर में सौभाग्य और समृद्धि लाती है',
                category: 'animals',
                image_url: null
            },
            {
                name: 'सिल्वर मोर',
                price: 4800,
                description: 'खूबसूरत सिल्वर मोर की आकृति जो आपके घर की सजावट बढ़ाती है',
                category: 'animals',
                image_url: null
            },
            {
                name: 'सिल्वर घोड़ा',
                price: 6200,
                description: 'प्रीमियम सिल्वर घोड़े की मूर्ति जो शक्ति और गति का प्रतीक है',
                category: 'animals',
                image_url: null
            }
        ];

        try {
            const { data, error } = await supabase
                .from('nirakaarsilver')
                .insert(sampleProducts)
                .select();

            if (error) {
                console.error('Error initializing sample products:', error);
                return false;
            }

            console.log('✅ Sample products initialized successfully:', data.length, 'products added');
            return true;
        } catch (error) {
            console.error('Error in initializeSampleProducts:', error);
            return false;
        }
    }

    // Get product by ID
    async getProductById(id) {
        try {
            const { data, error } = await supabase
                .from('nirakaarsilver')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching product by ID:', error);
                return null;
            }

            return data;
        } catch (error) {
            console.error('Error in getProductById:', error);
            return null;
        }
    }

    // Search products
    async searchProducts(category, searchTerm) {
        try {
            let query = supabase
                .from('nirakaarsilver')
                .select('*');

            if (category && category !== 'all') {
                query = query.eq('category', category);
            }

            if (searchTerm) {
                query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
            }

            const { data, error } = await query.order('created_at', { ascending: false });

            if (error) {
                console.error('Error searching products:', error);
                return [];
            }

            return data || [];
        } catch (error) {
            console.error('Error in searchProducts:', error);
            return [];
        }
    }

    // Get products by price range
    async getProductsByPriceRange(category, minPrice, maxPrice) {
        try {
            let query = supabase
                .from('nirakaarsilver')
                .select('*')
                .gte('price', minPrice)
                .lte('price', maxPrice);

            if (category && category !== 'all') {
                query = query.eq('category', category);
            }

            const { data, error } = await query.order('price', { ascending: true });

            if (error) {
                console.error('Error fetching products by price range:', error);
                return [];
            }

            return data || [];
        } catch (error) {
            console.error('Error in getProductsByPriceRange:', error);
            return [];
        }
    }

    // Get latest products
    async getLatestProducts(category = null, limit = 6) {
        try {
            let query = supabase
                .from('nirakaarsilver')
                .select('*');

            if (category) {
                query = query.eq('category', category);
            }

            const { data, error } = await query
                .order('created_at', { ascending: false })
                .limit(limit);

            if (error) {
                console.error('Error fetching latest products:', error);
                return [];
            }

            return data || [];
        } catch (error) {
            console.error('Error in getLatestProducts:', error);
            return [];
        }
    }

    // Get product stats
    async getProductStats() {
        try {
            const { data, error } = await supabase
                .from('nirakaarsilver')
                .select('category, price');

            if (error) {
                console.error('Error fetching product stats:', error);
                return null;
            }

            const stats = {
                total: data.length,
                frames: data.filter(p => p.category === 'frames').length,
                pots: data.filter(p => p.category === 'pots').length,
                animals: data.filter(p => p.category === 'animals').length,
                avgPrice: data.reduce((sum, p) => sum + p.price, 0) / data.length
            };

            return stats;
        } catch (error) {
            console.error('Error in getProductStats:', error);
            return null;
        }
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

    async initializeWebsite() {
        await this.updateProductGrids();
        this.updateProductModals();
        this.setupAdminPanelIntegration();
        this.setupEnhancedFilters();
    }

    // Update product grids on category pages
    async updateProductGrids() {
        const currentPage = this.getCurrentPage();
        
        if (currentPage === 'frames') {
            await this.updateFramesGrid();
        } else if (currentPage === 'pots') {
            await this.updatePotsGrid();
        } else if (currentPage === 'animals') {
            await this.updateAnimalsGrid();
        }
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('frames.html')) return 'frames';
        if (path.includes('pots.html')) return 'pots';
        if (path.includes('animals.html')) return 'animals';
        return 'index';
    }

    async updateFramesGrid() {
        const grid = document.getElementById('framesGrid');
        if (!grid) return;

        const frames = await this.productManager.getProductsByCategory('frames');
        this.renderProductGrid(grid, frames, 'frames');
    }

    async updatePotsGrid() {
        const grid = document.getElementById('potsGrid');
        if (!grid) return;

        const pots = await this.productManager.getProductsByCategory('pots');
        this.renderProductGrid(grid, pots, 'pots');
    }

    async updateAnimalsGrid() {
        const grid = document.getElementById('animalsGrid');
        if (!grid) return;

        const animals = await this.productManager.getProductsByCategory('animals');
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
            <div class="product-card" data-price="${product.price}" data-category="${product.category}">
                <div class="product-image" onclick="showProductDetail(${product.id})">
                    ${product.image_url ? 
                        `<img src="${product.image_url}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">` : 
                        this.getDefaultIcon(category)
                    }
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
        window.showProductDetail = async (productId) => {
            const product = await this.productManager.getProductById(productId);
            
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
                if (product.image_url) {
                    imageElement.src = product.image_url;
                } else {
                    imageElement.src = this.getDefaultImageSrc(product.category);
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
    }

    // Enhanced filter functions
    setupEnhancedFilters() {
        // Override existing filter functions
        window.filterProducts = async (category, filterValue) => {
            let products;
            if (!filterValue) {
                products = await this.productManager.getProductsByCategory(category);
            } else {
                products = await this.productManager.searchProducts(category, filterValue);
            }

            const grid = document.getElementById(category + 'Grid');
            this.renderProductGrid(grid, products, category);
        };

        window.searchProducts = async (category, searchTerm) => {
            const products = await this.productManager.searchProducts(category, searchTerm);
            const grid = document.getElementById(category + 'Grid');
            this.renderProductGrid(grid, products, category);
        };

        window.sortProducts = async (category, sortOrder) => {
            let products = await this.productManager.getProductsByCategory(category);
            
            switch (sortOrder) {
                case 'price-low':
                    products = products.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    products = products.sort((a, b) => b.price - a.price);
                    break;
                case 'newest':
                    products = products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    break;
                default:
                    // Default by creation date
                    products = products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            }

            const grid = document.getElementById(category + 'Grid');
            this.renderProductGrid(grid, products, category);
        };
    }
}

// Global functions for admin panel use
window.addNewProduct = async function(productData) {
    const productManager = new ProductManager();
    const result = await productManager.addProduct(productData);
    
    if (result.success) {
        alert('✅ Product successfully added to database!');
        // Refresh the current page products if applicable
        if (window.websiteIntegration) {
            await window.websiteIntegration.updateProductGrids();
        }
    } else {
        alert('❌ Error adding product: ' + result.error);
    }
    
    return result;
};

window.updateExistingProduct = async function(id, productData) {
    const productManager = new ProductManager();
    const result = await productManager.updateProduct(id, productData);
    
    if (result.success) {
        alert('✅ Product updated successfully!');
        if (window.websiteIntegration) {
            await window.websiteIntegration.updateProductGrids();
        }
    } else {
        alert('❌ Error updating product: ' + result.error);
    }
    
    return result;
};

window.deleteExistingProduct = async function(id) {
    const productManager = new ProductManager();
    const result = await productManager.deleteProduct(id);
    
    if (result.success) {
        alert('✅ Product deleted successfully!');
        if (window.websiteIntegration) {
            await window.websiteIntegration.updateProductGrids();
        }
    } else {
        alert('❌ Error deleting product: ' + result.error);
    }
    
    return result;
};

window.getAllProducts = async function() {
    const productManager = new ProductManager();
    return await productManager.getProducts();
};

window.getProductStats = async function() {
    const productManager = new ProductManager();
    return await productManager.getProductStats();
};

// Initialize the integration
const websiteIntegration = new WebsiteIntegration();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProductManager, WebsiteIntegration };
}

// Make ProductManager available globally for admin panel
window.ProductManager = ProductManager;
window.websiteIntegration = websiteIntegration;

console.log('🎉 Nirakaar Silver Supabase Integration loaded successfully!');