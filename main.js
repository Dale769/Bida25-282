    const products = [
    { name: "Whole Chicken Frozen", price: 30.50, unit: "kg", category: "whole", img: "images/whole-chicken.jpg" },
    { name: "Chicken 2kg (Braai Pack)", price: 56.50, unit: "pack", category: "value", img: "images/braai-pack.jpg" },
    { name: "Chicken 5kg (Braai Pack)", price: 140.00, unit: "pack", category: "value", img: "images/braai-pack.jpg" },
    { name: "Chicken Thighs (retail F/P)", price: 34.90, unit: "kg", category: "cuts", img: "images/chicken-thighs.jpg" },
    { name: "Chicken Wings (retail F/P)", price: 44.00, unit: "kg", category: "cuts", img: "images/chicken-wings.jpg" },
    { name: "Chicken Drumsticks (retail F/P)", price: 35.30, unit: "kg", category: "cuts", img: "images/drumsticks.jpg" },
    { name: "Chicken Breast (retail F/P)", price: 34.90, unit: "kg", category: "cuts", img: "images/whole-chicken.jpg" },
    { name: "Chicken Liver (retail F/P)", price: 22.50, unit: "kg", category: "offal", img: "images/livers.jpg" },
    { name: "Chicken Gizzards (retail F/P)", price: 35.00, unit: "kg", category: "offal", img: "images/gizzards.jpg" },
    { name: "Chicken Necks (retail F/P)", price: 19.50, unit: "kg", category: "offal", img: "images/gizzards.jpg" },
    { name: "Chicken Hearts (retail)", price: 17.90, unit: "kg", category: "offal", img: "images/livers.jpg" },
    { name: "Chicken Feet (retail)", price: 10.00, unit: "kg", category: "offal", img: "images/gizzards.jpg" },
    { name: "Chicken Soup Pack", price: 22.95, unit: "pack", category: "value", img: "images/soup-pack.jpg" },
    { name: "Chicken Broken Pieces", price: 25.90, unit: "kg", category: "value", img: "images/braai-pack.jpg" },
    { name: "Chicken Skins & Fat", price: 13.50, unit: "kg", category: "offal", img: "images/gizzards.jpg" },
    { name: "Chicken (intestines) Mala", price: 21.50, unit: "kg", category: "offal", img: "images/mala.jpg" },
    { name: "Chicken Heads", price: 5.50, unit: "kg", category: "offal", img: "images/gizzards.jpg" },
    { name: "Chicken Bones", price: 19.50, unit: "kg", category: "value", img: "images/soup-pack.jpg" },
    { name: "Chicken Nine Piece Cut", price: 33.00, unit: "pack", category: "cuts", img: "images/whole-chicken.jpg" },
    { name: "Chicken Breast Fillets Skinless", price: 52.60, unit: "kg", category: "cuts", img: "images/whole-chicken.jpg" }
];

// Default image fallback
const defaultImage = "https://placehold.co/400x300/c43a1b/white?text=Chicken+Place";

// Render Products Function
function renderProducts(category = 'all', containerId = 'productsGrid') {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    
    if (filtered.length === 0) {
        grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No products in this category.</p>';
        return;
    }
    
    grid.innerHTML = filtered.map(p => `
        <div class="product-card">
            <div class="product-img" style="background-image: url('${p.img}'); background-size: cover; background-position: center;"></div>
            <div class="product-info">
                <div class="product-title">${p.name}</div>
                <div class="product-price">P${p.price.toFixed(2)} <small>/${p.unit}</small></div>
                <button class="btn-order" data-name="${p.name}" data-price="${p.price}">
                    <i class="fas fa-shopping-cart"></i> Add to Order
                </button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to order buttons
    document.querySelectorAll('.btn-order').forEach(btn => {
        btn.addEventListener('click', () => {
            const productName = btn.getAttribute('data-name');
            alert(`🛒 ${productName} added to your order!\n\nCall us to complete your purchase:\nShop 1: 76630088`);
        });
    });
}

// Render Featured Products on Home Page
function renderFeaturedProducts() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (featuredGrid) {
        const featured = products.slice(0, 4);
        featuredGrid.innerHTML = featured.map(p => `
            <div class="product-card">
                <div class="product-img" style="background-image: url('${p.img}'); background-size: cover; background-position: center;"></div>
                <div class="product-info">
                    <div class="product-title">${p.name}</div>
                    <div class="product-price">P${p.price.toFixed(2)} <small>/${p.unit}</small></div>
                    <a href="products.html" class="btn-order" style="text-decoration: none; text-align: center;">
                        <i class="fas fa-eye"></i> View All
                    </a>
                </div>
            </div>
        `).join('');
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }
}

// Category Filter Logic (for products page)
function initFilters() {
    const filterContainer = document.getElementById('filterContainer');
    if (!filterContainer) return;
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-cat');
            renderProducts(category, 'productsGrid');
        });
    });
}

// Feedback Form Handler
function initFeedbackForm() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const thanksMsg = document.getElementById('feedbackThanks');
        if (thanksMsg) {
            thanksMsg.style.display = 'block';
            setTimeout(() => {
                thanksMsg.style.display = 'none';
            }, 3000);
        }
        form.reset();
    });
}

// Set Active Navigation Link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else if (currentPage === 'index.html' && href === 'index.html') {
            link.classList.add('active');
        } else if (currentPage === '' && href === 'index.html') {
            link.classList.add('active');
        }
    });
}

// Image Error Handling
function handleImageErrors() {
    document.querySelectorAll('.product-img').forEach(el => {
        const bgImage = el.style.backgroundImage;
        if (bgImage && bgImage.includes('url')) {
            const img = new Image();
            img.src = bgImage.slice(5, -2);
            img.onerror = () => {
                el.style.backgroundImage = `url('${defaultImage}')`;
            };
        }
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all', 'productsGrid');
    renderFeaturedProducts();
    initMobileMenu();
    initFilters();
    initFeedbackForm();
    setActiveNavLink();
    
    // Re-run image error handling after products load
    setTimeout(handleImageErrors, 500);
});

// Handle window resize for mobile menu
window.addEventListener('resize', () => {
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth > 768 && navLinks) {
        navLinks.classList.remove('show');
    }
});