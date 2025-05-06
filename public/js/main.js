// Data
const products = [
  { id: 1, name: 'Nike Shoe', price: 85, rating: 4.8, image: 'public/assets/images/nike-shoe.jpg', category: 'Shoes' },
  { id: 2, name: 'Sneakers ft', price: 85, rating: 4.8, image: 'public/assets/images/sneakers-ft.jpg', category: 'Shoes' },
  { id: 3, name: 'Black Heels', price: 85, rating: 4.8, image: 'public/assets/images/black-heels.jpg', category: 'High Heels' },
  { id: 4, name: 'Casual Shoes', price: 85, rating: 4.8, image: 'public/assets/images/casual-shoes.jpg', category: 'Shoes' },
];

// Components
const Header = () => `
  <header class="flex items-center justify-between mb-4">
    <button aria-label="Grid menu" class="p-2 border border-gray-300 rounded-lg text-gray-700">
      <i class="fas fa-th-large text-base"></i>
    </button>
    <h1 class="font-semibold text-lg text-gray-900">Explore</h1>
    <button aria-label="Search" class="p-2 border border-gray-300 rounded-lg text-gray-700">
      <i class="fas fa-search text-base"></i>
    </button>
  </header>
`;

const FooterNav = () => `
  <nav class="fixed bottom-0 left-0 right-0 bg-[#0F172A] flex justify-around items-center py-3 rounded-t-3xl max-w-sm mx-auto">
    <a href="/" class="nav-link flex flex-col items-center text-white text-xs font-semibold">
      <i class="fas fa-home text-lg text-[#3B82F6]"></i>
      <span class="mt-1">Home</span>
    </a>
    <a href="/cart" class="nav-link flex flex-col items-center text-gray-400 text-xs font-semibold">
      <i class="fas fa-shopping-bag text-lg"></i>
      <span class="mt-1">Bag</span>
    </a>
    <a href="/alerts" class="nav-link relative flex flex-col items-center text-gray-400 text-xs font-semibold">
      <i class="fas fa-bell text-lg"></i>
      <span class="mt-1">Alerts</span>
      <span class="absolute -top-1 -right-2 bg-[#3B82F6] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">1</span>
    </a>
    <a href="/profile" class="nav-link flex flex-col items-center text-gray-400 text-xs font-semibold">
      <i class="fas fa-user text-lg"></i>
      <span class="mt-1">Profile</span>
    </a>
  </nav>
`;

const ProductCard = ({ id, name, price, rating, image, isFavorite }) => `
  <article class="relative bg-gray-50 rounded-2xl p-4 shadow-[0_10px_15px_rgba(0,0,0,0.1)] product-card">
    <button aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}" class="favorite-btn absolute top-3 right-3 text-${isFavorite ? 'red' : 'gray'}-600 hover:text-red-600" data-id="${id}">
      <i class="${isFavorite ? 'fas' : 'far'} fa-heart text-lg"></i>
    </button>
    <a href="/product?id=${id}" class="nav-link">
      <img alt="${name}" class="w-full h-20 object-contain mb-3 drop-shadow-[0_10px_6px_rgba(0,0,0,0.1)]" height="80" src="${image}" width="120"/>
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

// Pages
const renderHome = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  return `
    <div class="max-w-sm mx-auto p-4">
      ${Header()}
      <section class="relative bg-[#0F172A] rounded-2xl p-4 flex items-center justify-between mb-4" style="min-height: 96px;">
        <div class="max-w-[60%]">
          <p class="text-white text-sm font-semibold leading-tight">Flat 50% discount on<br>your first order.</p>
          <button class="mt-2 bg-[#FF5C2F] text-white text-xs font-semibold px-4 py-1 rounded-full">Buy Now</button>
        </div>
        <img alt="White sneakers" class="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-24 object-contain" src="public/assets/images/sneaker-banner.jpg" style="filter: drop-shadow(0 10px 6px rgba(0,0,0,0.1));"/>
      </section>
      <div class="flex justify-center space-x-2 mb-4">
        <span class="w-2 h-2 rounded-full border border-gray-300"></span>
        <span class="w-2 h-2 rounded-full border border-gray-300"></span>
        <span class="w-2 h-2 rounded-full border border-gray-300"></span>
        <span class="w-2 h-2 rounded-full border border-gray-300"></span>
      </div>
      <div class="flex justify-between items-center mb-3">
        <h2 class="font-bold text-gray-900 text-base">Categories</h2>
        <button class="text-xs text-gray-500 font-semibold">View all</button>
      </div>
      <nav class="flex space-x-3 mb-6">
        <button class="flex items-center space-x-2 bg-[#3B82F6] rounded-lg px-3 py-1.5 text-white font-semibold text-xs">
          <i class="fas fa-shoe-prints text-sm"></i>
          <span>Shoes</span>
        </button>
        <button aria-label="High heel category" class="flex items-center justify-center w-9 h-9 bg-gray-100 rounded-lg text-gray-900 text-sm">
          <img alt="Black high heel shoe icon" class="object-contain" height="20" src="public/assets/images/high-heel-icon.jpg" width="20"/>
        </button>
        <button aria-label="Running shoes category" class="flex items-center justify-center w-9 h-9 bg-gray-100 rounded-lg text-gray-900 text-sm">
          <img alt="Black running shoes icon" class="object-contain" height="20" src="public/assets/images/running-shoes-icon.jpg" width="20"/>
        </button>
        <button aria-label="Loafers category" class="flex items-center justify-center w-9 h-9 bg-gray-100 rounded-lg text-gray-900 text-sm">
          <img alt="Black loafers shoe icon" class="object-contain" height="20" src="public/assets/images/loafers-icon.jpg" width="20"/>
        </button>
        <button aria-label="Boots category" class="flex items-center justify-center w-9 h-9 bg-gray-100 rounded-lg text-gray-900 text-sm">
          <img alt="Black boots shoe icon" class="object-contain" height="20" src="public/assets/images/boots-icon.jpg" width="20"/>
        </button>
      </nav>
      <section class="grid grid-cols-2 gap-4">
        ${products.map(product => ProductCard({ ...product, isFavorite: favorites.includes(product.id) })).join('')}
      </section>
    </div>
    ${FooterNav()}
  `;
};

const renderProductDetails = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  const product = products.find(p => p.id === productId) || products[0];
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  return `
    <div class="max-w-sm mx-auto p-4">
      ${Header()}
      <section class="bg-gray-50 rounded-2xl p-4 shadow-[0_10px_15px_rgba(0,0,0,0.1)]">
        <button aria-label="${favorites.includes(product.id) ? 'Remove from favorites' : 'Add to favorites'}" class="favorite-btn absolute top-3 right-3 text-${favorites.includes(product.id) ? 'red' : 'gray'}-600 hover:text-red-600" data-id="${product.id}">
          <i class="${favorites.includes(product.id) ? 'fas' : 'far'} fa-heart text-lg"></i>
        </button>
        <img alt="${product.name}" class="w-full h-40 object-contain mb-3 drop-shadow-[0_10px_6px_rgba(0,0,0,0.1)]" src="${product.image}"/>
        <h2 class="font-bold text-lg text-gray-900 mb-2">${product.name}</h2>
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
    ${FooterNav()}
  `;
};

const renderCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return { ...product, quantity: item.quantity };
  });
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return `
    <div class="max-w-sm mx-auto p-4">
      ${Header()}
      <h2 class="font-bold text-lg text-gray-900 mb-4">Your Cart</h2>
      <section class="space-y-4">
        ${cartItems.length === 0 ? '<p class="text-gray-600">Your cart is empty.</p>' : cartItems.map(item => `
          <div class="cart-item flex items-center justify-between bg-gray-50 rounded-2xl p-4 shadow-[0_10px_15px_rgba(0,0,0,0.1)]">
            <div class="flex items-center space-x-3">
              <img alt="${item.name}" class="w-16 h-16 object-contain" src="${item.image}"/>
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
        <button class="w-full bg-[#3B82F6] text-white text-sm font-semibold py-2 rounded-lg mt-4 ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}" ${cartItems.length === 0 ? 'disabled' : ''}>Checkout</button>
      </div>
    </div>
    ${FooterNav()}
  `;
};

const renderProfile = () => `
  <div class="max-w-sm mx-auto p-4">
    ${Header()}
    <h2 class="font-bold text-lg text-gray-900 mb-4">Profile</h2>
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
  ${FooterNav()}
`;

// Router
const routes = {
  '/': renderHome,
  '/product': renderProductDetails,
  '/cart': renderCart,
  '/profile': renderProfile,
};

function router() {
  const path = window.location.pathname;
  const render = routes[path] || routes['/'];
  document.getElementById('app').innerHTML = render();
  attachEventListeners();
}

function attachEventListeners() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
      window.history.pushState({}, '', href);
      router();
    });
  });

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
}

window.addEventListener('popstate', router);
document.addEventListener('DOMContentLoaded', router);
