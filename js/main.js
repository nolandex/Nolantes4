console.log("Script loaded");

// Data produk
const products = [
  { id: 1, name: 'Nike Air Max', price: 85, rating: 4.8, category: 'Shoes' },
  { id: 2, name: 'Adidas Sneakers', price: 85, rating: 4.8, category: 'Shoes' },
  // Data lainnya...
];

const banners = [
  { text: 'Flat 50% discount on your first order.' },
  { text: 'New Arrivals: Up to 30% Off!' },
  { text: 'Free Shipping on Orders Over $100!' },
];

// Komponen Header
const Header = () => `
  <header class="flex items-center justify-between mb-4 relative px-4">
    <h1 class="font-semibold text-lg text-gray-900">Explore</h1>
    <button aria-label="Hamburger menu" class="hamburger-toggle p-2 border border-gray-300 rounded-lg text-gray-700">
      <i class="fas fa-bars text-base"></i>
    </button>
    <div class="hamburger-menu fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50">
      <div class="p-4">
        <button class="hamburger-close text-gray-700">
          <i class="fas fa-times text-lg"></i>
        </button>
        <nav class="mt-6 space-y-4">
          <a href="/" class="nav-link block text-gray-700 hover:text-[#3B82F6]">Home</a>
          <a href="/cart" class="nav-link block text-gray-700 hover:text-[#3B82F6]">Bag</a>
          <a href="/alerts" class="nav-link block text-gray-700 hover:text-[#3B82F6] relative">
            Alerts
            <span class="absolute top-0 right-0 bg-[#3B82F6] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">1</span>
          </a>
        </nav>
      </div>
    </div>
  </header>
`;

// Komponen Footer
const FooterNav = () => `
  <nav class="footer-nav bg-[#0F172A] flex justify-around items-center py-3 w-full">
    <a href="/" class="nav-link flex flex-col items-center text-white text-xs font-semibold flex-1">
      <i class="fas fa-home text-lg text-[#3B82F6]"></i>
      <span class="mt-1">Home</span>
    </a>
    <a href="/cart" class="nav-link flex flex-col items-center text-gray-400 text-xs font-semibold flex-1">
      <i class="fas fa-shopping-bag text-lg"></i>
      <span class="mt-1">Bag</span>
    </a>
    <a href="/alerts" class="nav-link flex flex-col items-center text-gray-400 text-xs font-semibold flex-1">
      <i class="fas fa-bell text-lg"></i>
      <span class="mt-1">Alerts</span>
    </a>
  </nav>
`;

// Router
const routes = {
  '/': () => `<h1>Welcome to Explore Shoes</h1>`,
  '/cart': () => `<h1>Your Cart</h1>`,
  '/alerts': () => `<h1>Alerts</h1>`,
};

function router() {
  const app = document.getElementById('app');
  const footer = document.getElementById('footer');
  if (!app || !footer) {
    console.error('App or footer element not found');
    return;
  }
  const path = window.location.pathname;
  const render = routes[path] || routes['/'];
  app.innerHTML = render();
  footer.innerHTML = FooterNav();
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
}

window.addEventListener('popstate', router);
document.addEventListener('DOMContentLoaded', router);
