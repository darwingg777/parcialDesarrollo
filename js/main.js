// main.js - Lógica principal de la aplicación

// Variables globales
let productsData = [];

// Función para verificar autenticación
function checkAuth() {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
    }
}

// Función para cargar fragmentos HTML
async function loadFragment(url, containerId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al cargar ${url}`);
        }
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
        
        // Si es el header, configurar el botón de logout
        if (containerId === 'header-container') {
            setupLogout();
        }
    } catch (error) {
        console.error('Error cargando fragmento:', error);
    }
}

// Función para configurar el botón de logout
function setupLogout() {
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', function() {
            sessionStorage.clear();
            window.location.href = 'login.html';
        });
    }
}

// Función para cargar productos desde JSON
async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) {
            throw new Error('Error al cargar productos');
        }
        const data = await response.json();
        productsData = data.products;
        
        // Renderizar productos usando diferentes métodos
        renderProductsWithTemplate();
        renderProductsWithWebComponent();
    } catch (error) {
        console.error('Error cargando productos:', error);
        document.getElementById('products-container').innerHTML = 
            '<p class="error">Error al cargar los productos. Por favor, intenta más tarde.</p>';
    }
}

// Renderizar productos usando <template>
function renderProductsWithTemplate() {
    const container = document.getElementById('products-container');
    const template = document.getElementById('product-template');
    
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Usar los primeros 3 productos con template tradicional
    productsData.slice(0, 3).forEach(product => {
        const clone = template.content.cloneNode(true);
        
        clone.querySelector('.product-image').src = product.image;
        clone.querySelector('.product-image').alt = product.name;
        clone.querySelector('.product-name').textContent = product.name;
        clone.querySelector('.product-description').textContent = product.description;
        clone.querySelector('.product-price').textContent = product.price;
        
        // Agregar evento al botón
        const btnBuy = clone.querySelector('.btn-buy');
        btnBuy.addEventListener('click', () => {
            alert(`Producto "${product.name}" agregado al carrito`);
        });
        
        container.appendChild(clone);
    });
}

// Renderizar productos usando Web Component
function renderProductsWithWebComponent() {
    const container = document.getElementById('products-container');
    
    // Usar los productos restantes con Web Component
    productsData.slice(3).forEach(product => {
        const productCard = document.createElement('product-card');
        productCard.setAttribute('name', product.name);
        productCard.setAttribute('price', product.price);
        productCard.setAttribute('description', product.description);
        productCard.setAttribute('image', product.image);
        
        container.appendChild(productCard);
    });
}

// Definición del Web Component <product-card>
class ProductCard extends HTMLElement {
    constructor() {
        super();
        
        // Crear Shadow DOM
        this.attachShadow({ mode: 'open' });
    }
    
    connectedCallback() {
        this.render();
    }
    
    // Atributos observados
    static get observedAttributes() {
        return ['name', 'price', 'description', 'image'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }
    
    render() {
        const name = this.getAttribute('name') || 'Producto';
        const price = this.getAttribute('price') || '$0.00';
        const description = this.getAttribute('description') || 'Sin descripción';
        const image = this.getAttribute('image') || '';
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                
                .product-card {
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
                
                .product-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
                }
                
                .product-image {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                }
                
                .product-info {
                    padding: 20px;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
                
                .product-name {
                    font-size: 1.2rem;
                    font-weight: bold;
                    color: #2c3e50;
                    margin: 0 0 10px 0;
                }
                
                .product-description {
                    color: #7f8c8d;
                    font-size: 0.9rem;
                    line-height: 1.5;
                    margin: 0 0 15px 0;
                    flex: 1;
                }
                
                .product-price {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #27ae60;
                    margin: 0 0 15px 0;
                }
                
                .btn-buy {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: opacity 0.3s ease;
                }
                
                .btn-buy:hover {
                    opacity: 0.9;
                }
                
                .btn-buy:active {
                    transform: scale(0.98);
                }
            </style>
            
            <div class="product-card">
                <img class="product-image" src="${image}" alt="${name}">
                <div class="product-info">
                    <h4 class="product-name">${name}</h4>
                    <p class="product-description">${description}</p>
                    <p class="product-price">${price}</p>
                    <button class="btn-buy">Comprar Ahora</button>
                </div>
            </div>
        `;
        
        // Agregar evento al botón dentro del Shadow DOM
        const btnBuy = this.shadowRoot.querySelector('.btn-buy');
        btnBuy.addEventListener('click', () => {
            alert(`Producto "${name}" agregado al carrito`);
        });
    }
}

// Registrar el Web Component
customElements.define('product-card', ProductCard);

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', async function() {
    // Verificar autenticación
    checkAuth();
    
    // Cargar fragmentos
    await loadFragment('components/header.html', 'header-container');
    await loadFragment('components/sidebar.html', 'sidebar-container');
    await loadFragment('components/footer.html', 'footer-container');
    
    // Cargar productos
    await loadProducts();
});