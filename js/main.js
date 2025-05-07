console.log("Script loaded");

// Data with image paths
const products = [
  { id: 1, name: 'Website Basic', price: 85, rating: 4.8, category: 'Website', image: 'images/1.jpg' },
  { id: 2, name: 'Website Pro', price: 85, rating: 4.8, category: 'Website', image: 'images/2.jpg' },
  { id: 3, name: 'Website Premium', price: 85, rating: 4.8, category: 'Website', image: 'images/3.jpg' },
  { id: 4, name: 'Website Enterprise', price: 85, rating: 4.8, category: 'Website', image: 'images/4.jpg' },
  { id: 5, name: 'Website Custom', price: 90, rating: 4.7, category: 'Website', image: 'images/5.jpg' },
  { id: 6, name: 'Chatbot AI', price: 100, rating: 4.9, category: 'Chatbot', image: 'images/6.jpg' },
  { id: 7, name: 'Pratama Content', price: 80, rating: 4.6, category: 'Sosmed Konten', image: 'images/7.jpg' },
  { id: 8, name: 'Content Standard', price: 75, rating: 4.5, category: 'Sosmed Konten', image: 'images/8.jpg' },
  { id: 9, name: 'Content Pro', price: 95, rating: 4.8, category: 'Sosmed Konten', image: 'images/9.jpg' },
  { id: 10, name: 'Booster Basic', price: 110, rating: 4.9, category: 'Sosmed Booster', image: 'images/10.jpg' },
  { id: 11, name: 'Booster Pro', price: 80, rating: 4.7, category: 'Sosmed Booster', image: 'images/11.jpg' },
  { id: 12, name: 'Booster Premium', price: 120, rating: 4.8, category: 'Sosmed Booster', image: 'images/12.jpg' },
  { id: 13, name: 'Booster Elite', price: 85, rating: 4.6, category: 'Sosmed Booster', image: 'images/13.jpg' },
  { id: 14, name: 'Booster Max', price: 70, rating: 4.5, category: 'Sosmed Booster', image: 'images/14.jpg' },
];

const banners = [
  { text: 'Flat 50% discount on your first order.', image: 'images/banner1.jpg' },
  { text: 'New Arrivals: Up to 30% Off!', image: 'images/banner2.jpg' },
  { text: 'Free Shipping on Orders Over $100!', image: 'images/banner3.jpg' },
];

// Components
const Header = () => `
  <div class="flex items-center justify-between mb-4 relative px-4 py-2">
    <h1 class="font-semibold text-lg text-gray-900">NolanDex</h1>
    <button aria-label="Hamburger menu" class="hamburger-toggle p-2 border border-gray-300 rounded-lg text-gray-700">
      <i class="fas fa-bars text-base"></i>
    </button>
    <div class="hamburger-menu fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50">
      <div class="p-4">
        <button class="hamburger-close text-gray-700">
          <i class="fas fa-times text-lg"></i>
        </button>
        <nav class="mt-6 space-y-4">
          <a href="/NolanDex/" class="nav-link block text-gray-700 hover:text-[#3B82F6]">Home</a>
          ${localStorage.getItem('isLoggedIn') === 'true' ? `
            <p class="text-gray-900 font-semibold">Hello, John Doe!</p>
            <button class="logout-btn text-gray-700 hover:text-[#3B82F6] w-full text-left">Logout</button>
          ` : `
            <a href="/NolanDex/login" class="nav-link block text-gray-700 hover:text-[#3B82F6]">Login</a>
          `}
          <a href="/NolanDex/cart" class="nav-link block text-gray-700 hover:text-[#3B82F6]">Bag</a>
          <a href="/NolanDex/alerts" class="nav-link block text-gray-700 hover:text-[#3B82F6] relative">
            Alerts
            <span class="absolute top-0 right-0 bg-[#3B82F6] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">1</span>
          </a>
        </nav>
      </div>
    </div>
  </div>
`;

const FooterNav = () => `
  <nav class="footer-nav bg-[#0F172A] flex justify-around items-center py-3 w-full">
    <a href="/NolanDex/" class="nav-link flex flex-col items-center text-white text-xs font-semibold flex-1">
      <i class="fas fa-home text-lg text-[#3B82F6]"></i>
      <span class="mt-1">Home</span>
    </a>
    <a href="/NolanDex/cart" class="nav-link flex flex-col items-center text-gray-400 text-xs font-semibold flex-1">
      <i class="fas fa-shopping-bag text-lg"></i>
      <span class="mt-1">Bag</span>
    </a>
    <a href="/NolanDex/profile" class="nav-link flex flex-col items-center text-gray-400 text-xs font-semibold flex-1">
      <i class="fas fa-user text-lg"></i>
      <span class="mt-1">Profile</span>
    </a>
    <a href="/NolanDex/alerts" class="nav-link flex flex-col items-center text-gray-400 text-xs font-semibold flex-1">
      <i class="fas fa-bell text-lg"></i>
      <span class="mt-1">Alerts</span>
    </a>
  </nav>
`;

const ProductCard = ({ id, name, price, rating, isFavorite, image, isLarge = false, isPratama = false }) => `
  <article class="relative bg-gray-50 rounded-2xl p-4 shadow-[0_10px_15px_rgba(0,0,0,0.1)] product-card ${isLarge ? 'col-span-2' : ''} ${isPratama ? 'col-span-2' : ''}">
    <button aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}" class="favorite-btn absolute top-3 right-3 text-${isFavorite ? 'red' : 'gray'}-600 hover:text-red-600" data-id="${id}">
      <i class="${isFavorite ? 'fas' : 'far'} fa-heart text-lg"></i>
    </button>
    <a href="/NolanDex/product?id=${id}" class="nav-link">
      <img src="${image}" alt="${name}" class="w-full ${isLarge || isPratama ? 'h-40' : 'h-20'} object-cover mb-3 rounded-lg" />
      <h3 class="font-semibold text-gray-900 text-sm mb-1">${name}</h3>
      <div class="flex items-center justify-between text-xs font-semibold text-gray-900">
        <span>$${price}</span>
        <span class="flex items-center space-x-1 text-yellow-400">
          <i class="fas fa-star text-xs"></i>
          <span>${rating}</span>
        </span>
      </div>
    </a>
  </article>
`;

// Slideshow Logic
let currentBanner = parseInt(localStorage.getItem('currentBanner') || '0');
const updateBanner = () => {
  currentBanner = (currentBanner + 1) % banners.length;
  localStorage.setItem('currentBanner', currentBanner);
  const bannerContainer = document.querySelector('.banner-container');
  if (bannerContainer) {
    bannerContainer.innerHTML = banners.map((banner, index) => `
      <div class="banner ${index === currentBanner ? 'banner-active' : 'banner-inactive'} bg-[#0F172A] rounded-2xl p-4 flex items-center justify-between">
        <div class="max-w-[60%]">
          <p class="text-white text-sm font-semibold leading-tight">${banner.text}</p>
          <button class="mt-2 bg-[#FF5C2F] text-white text-xs font-semibold px-4 py-1 rounded-full">Buy Now</button>
        </div>
        <img src="${banner.image}" alt="Banner" class="w-24 h-24 object-cover rounded-lg" />
      </div>
    `).join('');
    const dots = document.querySelector('.banner-dots');
    if (dots) {
      dots.innerHTML = banners.map((_, index) => `
        <span class="w-2 h-2 rounded-full border ${index === currentBanner ? 'bg-gray-900' : 'border-gray-300'}"></span>
      `).join('');
    }
  }
};
setInterval(updateBanner, 5000);

// Pages
const renderHome = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const selectedCategory = localStorage.getItem('selectedCategory') || 'All';
  let filteredProducts = selectedCategory === 'All' ? products : products.filter(p => p.category === selectedCategory);

  // Limit products based on category
  if (selectedCategory === 'Website') {
    filteredProducts = filteredProducts.slice(0, 5);
  } else if (selectedCategory === 'Chatbot') {
    filteredProducts = filteredProducts.slice(0, 1);
  } else if (selectedCategory === 'Sosmed Konten') {
    filteredProducts = filteredProducts.slice(0, 3);
  }

  return `
    <div class="w-full max-w-sm mx-auto p-4">
      <div class="banner-container relative mb-4" style="min-height: 96px;">
        ${banners.map((banner, index) => `
          <div class="banner ${index === currentBanner ? 'banner-active' : 'banner-inactive'} bg-[#0F172A] rounded-2xl p-4 flex items-center justify-between">
            <div class="max-w-[60%]">
              <p class="text-white text-sm font-semibold leading-tight">${banner.text}</p>
              <button class="mt-2 bg-[#FF5C2F] text-white text-xs font-semibold px-4 py-1 rounded-full">Buy Now</button>
            </div>
            <img src="${banner.image}" alt="Banner" class="w-24 h-24 object-cover rounded-lg" />
          </div>
        `).join('')}
      </div>
      <div class="banner-dots flex justify-center space-x-2 mb-4">
        ${banners.map((_, index) => `
          <span class="w-2 h-2 rounded-full border ${index === currentBanner ? 'bg-gray-900' : 'border-gray-300'}"></span>
        `).join('')}
      </div>
      <div class="flex justify-between items-center mb-3">
        <h2 class="font-bold text-gray-900 text-base">Categories</h2>
      </div>
      <nav class="categories-nav flex space-x-3 mb-6 overflow-x-auto">
        <button class="category-btn flex items-center space-x-2 ${selectedCategory === 'All' ? 'bg-[#3B82F6] text-white' : 'bg-gray-100 text-gray-900'} rounded-lg px-3 py-1.5 font-semibold text-xs" data-category="All">
          <i class="fas fa-shoe-prints text-sm"></i>
          <span>All</span>
        </button>
        <button class="category-btn flex items-center justify-center w-9 h-9 ${selectedCategory === 'Website' ? 'bg-[#3B82F6]' : 'bg-gray-100'} rounded-lg text-gray-900 text-sm" data-category="Website">
          <span>W</span>
        </button>
        <button class="category-btn flex items-center justify-center w-9 h-9 ${selectedCategory === 'Chatbot' ? 'bg-[#3B82F6]' : 'bg-gray-100'} rounded-lg text-gray-900 text-sm" data-category="Chatbot">
          <span>C</span>
        </button>
        <button class="category-btn flex items-center justify-center w-9 h-9 ${selectedCategory === 'Sosmed Booster' ? 'bg-[#3B82F6]' : 'bg-gray-100'} rounded-lg text-gray-900 text-sm" data-category="Sosmed Booster">
          <span>SB</span>
        </button>
        <button class="category-btn flex items-center justify-center w-9 h-9 ${selectedCategory === 'Sosmed Konten' ? 'bg-[#3B82F6]' : 'bg-gray-100'} rounded-lg text-gray-900 text-sm" data-category="Sosmed Konten">
          <span>SK</span>
        </button>
      </nav>
      <section class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        ${filteredProducts.length ? filteredProducts.map(product => ProductCard({
          ...product,
          isFavorite: favorites.includes(product.id),
          isLarge: product.category === 'Chatbot',
          isPratama: product.name === 'Pratama Content'
        })).join('') : '<p class="text-gray-600 col-span-full">No products found.</p>'}
      </section>
    </div>
  `;
};

const renderProductDetails = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  const product = products.find(p => p.id === productId) || products[0];
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  return `
    <div class="w-full max-w-sm mx-auto p-4">
      <section class="bg-gray-50 rounded-2xl p-4 shadow-[0_10px_15px_rgba(0,0,0,0.1)]">
        <button aria-label="${favorites.includes(product.id) ? 'Remove from favorites' : 'Add to favorites'}" class="favorite-btn absolute top-3 right-3 text-${favorites.includes(product.id) ? 'red' : 'gray'}-600 hover:text-red-600" data-id="${product.id}">
          <i class="${favorites.includes(product.id) ? 'fas' : 'far'} fa-heart text-lg"></i>
        </button>
        <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover mb-3 rounded-lg" />
        <h2 class="font-bold text-lg text-gray-900 mb-2">${ PRODUCT.name}</h2>
        <p class="text-gray-600 text-sm mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div class="flex items-center justify-between text-sm font-semibold text-gray-900 mb-3">
          <span>$${product.price}</span>
          <span class="flex items-center space-x-1 text-yellow-400">
            <i class="fas fa-star text-xs"></i>
            <span>${product.rating}</span>
          </span>
        </div>
        <button class="add-to-cart w-full bg-[#3B82F6] text-white text-sm font-semibold py-2 rounded-lg" data-id="${product.id}">Add to Cart</button>
      </section>
    </div>
  `;
};

const renderCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return { ...product, quantity: item.quantity };
  }).filter(item => item);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const generateWhatsAppMessage = () => {
    const message = cartItems.map(item => `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`).join('\n');
    return encodeURIComponent(`Order Details:\n${message}\nTotal: $${total.toFixed(2)}`);
  };

  return `
    <div class="w-full max-w-sm mx-auto p-4">
      <h2 class="font-bold text-lg text-gray-900 mb-4">Your Cart</h2>
      <section class="space-y-4">
        ${cartItems.length === 0 ? '<p class="text-gray-600">Your cart is empty.</p>' : cartItems.map(item => `
          <div class="cart-item flex items-center justify-between bg-gray-50 rounded-2xl p-4 shadow-[0_10px_15px_rgba(0,0,0,0.1)]">
            <div class="flex items-center space-x-3">
              <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg" />
              <div>
                <h3 class="font-semibold text-gray-900 text-sm">${item.name}</h3>
                <p class="text-gray-600 text-xs">$${item.price}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button class="decrease-quantity bg-gray-200 text-gray-900 text-sm px-2 py-1 rounded" data-id="${item.id}">-</button>
              <span>${item.quantity}</span>
              <button class="increase-quantity bg-gray-200 text-gray-900 text-sm px-2 py-1 rounded" data-id="${item.id}">+</button>
            </div>
          </div>
        `).join('')}
      </section>
      <div class="mt-6">
        <p class="font-semibold text-gray-900">Total: $${total.toFixed(2)}</p>
        <a href="https://wa.me/6285156779923?text=${generateWhatsAppMessage()}" class="w-full bg-[#3B82F6] text-white text-sm font-semibold py-2 rounded-lg mt-4 inline-block text-center ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}" ${cartItems.length === 0 ? 'disabled' : ''}>Checkout via WhatsApp</a>
      </div>
    </div>
  `;
};

const renderProfile = () => `
  <div class="w-full max-w-sm mx-auto p-4">
    <h2 class="font-bold text-lg text-gray-900 mb-43">Profile</h2>
    <section class="bg-gray-50 rounded-2xl p-4 shadow-[0_10px_15px_rgba(0,0,0,0.1)]">
      <div class="flex items-center space-x-4 mb-4">
        <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <i class="fas fa-user text-xl text-gray-600"></i>
        </div>
        <div>
          <h3 class="font-semibold text-gray-900">John Doe</h3>
          <p class="text-gray-600 text-sm">john.doe@example.com</p>
        </div>
      </div>
      <button class="w-full bg-[#3B82F6] text-white text-sm font-semibold py-2 rounded-lg">Edit Profile</button>
    </section>
    <section class="mt-6">
      <h3 class="font-semibold text-gray-900 mb-2">Order History</h3>
      <p class="text-gray-600 text-sm">No orders yet.</p>
    </section>
  </div>
`;

const renderLogin = () => `
  <div class="w-full max-w-sm mx-auto p-4">
    <h2 class="font-bold text-lg text-gray-900 mb-4">Login</h2>
    <section class="bg-gray-50 rounded-2xl p-4 shadow-[0_10px_15px_rgba(0,0,0,0.1)]">
      <form class="login-form space-y-4">
        <div>
          <label class="block text-sm font-semibold text-gray-900">Email</label>
          <input type="email" class="w-full p-2 border border-gray-300 rounded-lg" placeholder="john.doe@example.com" required>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-900">Password</label>
          <input type="password" class="w-full p-2 border border-gray-300 rounded-lg" placeholder="********" required>
        </div>
        <button type="submit" class="w-full bg-[#3B82F6] text-white text-sm font-semibold py-2 rounded-lg">Login</button>
      </form>
    </section>
  </div>
`;

const renderAlerts = () => `
  <div class="w-full max-w-sm mx-auto p-4">
    <h2 class="font-bold text-lg text-gray-900 mb-4">Alerts</h2>
    <section class="bg-gray-50 rounded-2xl p-4 shadow-[0_10px_15px_rgba(0,0,0,0.1)]">
      <p class="text-gray-600">You have 1 new notification: New arrivals are here!</p>
    </section>
  </div>
`;

// Router
const routes = {
  '/NolanDex/': renderHome,
  '/NolanDex/product': renderProductDetails,
  '/NolanDex/cart': renderCart,
  '/NolanDex/profile': renderProfile,
  '/NolanDex/login': renderLogin,
  '/NolanDex/alerts': renderAlerts,
};

function router() {
  console.log("Router running");
  const app = document.getElementById('app');
  const footer = document.getElementById('footer');
  const header = document.getElementById('header');
  if (!app || !footer || !header) {
    console.error('App, footer, or header element not found');
    return;
  }
  const path = window.location.pathname;
  const render = routes[path] || routes['/NolanDex/'];
  app.innerHTML = render();
  footer.innerHTML = FooterNav();
  header.innerHTML = Header();
  attachEventListeners();
}

function attachEventListeners() {
  // Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
      window.history.pushState({}, '', href);
      router();
    });
  });

  // Hamburger Menu
  const hamburgerToggle = document.querySelector('.hamburger-toggle');
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const hamburgerClose = document.querySelector('.hamburger-close');
  if (hamburgerToggle && hamburgerMenu) {
    hamburgerToggle.addEventListener('click', () => {
      hamburgerMenu.classList.add('open');
    });
  }
  if (hamburgerClose && hamburgerMenu) {
    hamburgerClose.addEventListener('click', () => {
      hamburgerMenu.classList.remove('open');
    });
  }

  // Favorites
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (favorites.includes(id)) {
        favorites = favorites.filter(fav => fav !== id);
      } else {
        favorites.push(id);
      }
      localStorage.setItem('favorites', JSON.stringify(favorites));
      router();
    });
  });

  // Cart
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const item = cart.find(i => i.id === id);
      if (item) {
        item.quantity += 1;
      } else {
        cart.push({ id, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Added to cart!');
    });
  });

  document.querySelectorAll('.increase-quantity').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const item = cart.find(i => i.id === id);
      if (item) {
        item.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        router();
      }
    });
  });

  document.querySelectorAll('.decrease-quantity').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const item = cart.find(i => i.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart = cart.filter(i => i.id !== id);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      router();
    });
  });

  // Categories
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      localStorage.setItem('selectedCategory', category);
      router();
    });
  });

  // Login
  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      localStorage.setItem('isLoggedIn', 'true');
      window.history.pushState({}, '', '/NolanDex/');
      router();
    });
  }

  // Logout
  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.setItem('isLoggedIn', 'false');
      window.history.pushState({}, '', '/NolanDex/');
      router();
    });
  }
}

window.addEventListener('popstate', router);
document.addEventListener('DOMContentLoaded', router);
