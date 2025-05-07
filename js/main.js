console.log("Script loaded");

// Data with image paths
const products = [
  { id: 1, name: 'Toko Online', price: 25000, category: 'Website', image: 'images/1.jpg' },
  { id: 2, name: 'Landing Page', price: 25000, category: 'Website', image: 'images/2.jpg' },
  { id: 3, name: 'Portfolio', price: 25000, category: 'Website', image: 'images/3.jpg' },
  { id: 4, name: 'Jasa', price: 25000, category: 'Website', image: 'images/4.jpg' },
  { id: 5, name: 'Profil Bisnis', price: 25000, category: 'Website', image: 'images/5.jpg' },
  { id: 6, name: 'Chatbot AI', price: 25000, category: 'Chatbot', image: 'images/6.jpg' },
  { id: 7, name: 'Konten Sosmed 1', price: 25000, category: 'Konten', image: 'images/7.jpg' },
  { id: 8, name: 'Konten Sosmed 2', price: 25000, category: 'Konten', image: 'images/8.jpg' },
  { id: 9, name: 'Konten Sosmed 3', price: 25000, category: 'Konten', image: 'images/9.jpg' },
  { id: 10, name: 'Booster Sosmed', price: 'Klik', category: 'Sosmed Booster', image: 'images/10.jpg' },
];

const banners = [
  { text: 'Flat 50% discount on your first order.', image: 'images/banner1.jpg' },
  { text: 'New Arrivals: Up to 30% Off!', image: 'images/banner2.jpg' },
  { text: 'Free Shipping on Orders Over $100!', image: 'images/banner3.jpg' },
];

// Components
const Header = () => `
  <div class="flex items-center justify-between px-4 py-2">
    <h1 class="font-semibold text-lg text-gray-900">NolanDex</h1>
    <button aria-label="Hamburger menu" class="hamburger-toggle p-2 rounded-lg text-gray-700">
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
          <a href="/NolanDex/paket" class="nav-link block text-gray-700 hover:text-[#3B82F6]">Paket</a>
          <a href="/NolanDex/admin" class="nav-link block text-gray-700 hover:text-[#3B82F6] relative">
            Admin
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
    <a href="/NolanDex/paket" class="nav-link flex flex-col items-center text-gray-400 text-xs font-semibold flex-1">
      <i class="fas fa-shopping-bag text-lg"></i>
      <span class="mt-1">Paket</span>
    </a>
    <a href="/NolanDex/testimoni" class="nav-link flex flex-col items-center text-gray-400 text-xs font-semibold flex-1">
      <i class="fas fa-comment text-lg"></i>
      <span class="mt-1">Testimoni</span>
    </a>
    <a href="/NolanDex/admin" class="nav-link flex flex-col items-center text-gray-400 text-xs font-semibold flex-1">
      <i class="fas fa-user text-lg"></i>
      <span class="mt-1">Admin</span>
    </a>
  </nav>
`;

const ProductCard = ({ id, name, price, isFavorite, image, isLarge = false }) => `
  <article class="relative bg-gray-50 rounded-2xl p-4 shadow-[0_10px_15px_rgba(0,0,0,0.1)] product-card ${isLarge ? 'col-span-2' : ''}">
    <button aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}" class="favorite-btn absolute top-3 right-3 text-${isFavorite ? 'red' : 'gray'}-600 hover:text-red-600" data-id="${id}">
      <i class="${isFavorite ? 'fas' : 'far'} fa-heart text-lg"></i>
    </button>
    <a href="/NolanDex/product?id=${id}" class="nav-link">
      <img src="${image}" alt="${name}" class="w-full ${isLarge ? 'h-40' : 'h-20'} object-cover mb-3 rounded-lg" />
      <h3 class="font-semibold text-gray-900 text-sm mb-1">${name}</h3>
      <div class="text-xs font-semibold text-gray-900">
        <span>${typeof price === 'number' ? `Rp${price.toLocaleString('id-ID')}` : price}</span>
      </div>
    </a>
    <div class="flex items-center mt-2 space-x-2">
      <button class="pay-btn w-full bg-[#3B82F6] text-white text-sm font-semibold py-2 rounded-lg" data-id="${id}" data-name="${name}" data-price="${price}">Bayar</button>
      <a href="https://wa.me/6285156779923" class="whatsapp-btn bg-green-500 text-white p-2 rounded-full" aria-label="Contact via WhatsApp">
        <i class="fab fa-whatsapp text-lg"></i>
      </a>
    </div>
  </article>
`;

const PaymentModal = ({ product, price }) => `
  <div id="paymentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="bg-blue-600 p-6 text-white">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl font-bold" id="modalPlan">Pembayaran</h2>
            <p class="text-blue-100 text-sm mt-1" id="modalProduct">${product}</p>
          </div>
          <button id="closeModal" class="text-white hover:text-blue-200">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      <!-- Body -->
      <div class="p-6">
        <!-- Order Summary -->
        <div class="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 class="font-medium">Total Pembayaran</h3>
            <p class="text-gray-500 text-sm">Termasuk PPN 11%</p>
          </div>
          <div class="text-right">
            <p class="text-gray-500 line-through text-sm" id="modalOldPrice">${typeof price === 'number' ? `Rp${(price * 1.67).toLocaleString('id-ID')}` : 'N/A'}</p>
            <p class="text-blue-600 font-bold text-xl" id="modalAmount">${typeof price === 'number' ? `Rp${price.toLocaleString('id-ID')}` : price}</p>
          </div>
        </div>

        <!-- Payment Methods -->
        <h3 class="text-lg font-bold mb-4">Metode Pembayaran</h3>
        
        <div class="space-y-3 mb-6">
          <!-- QRIS -->
          <div class="payment-method-container">
            <div class="payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm" data-method="qris">
              <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QRIS_logo.svg/1200px-QRIS_logo.svg.png" alt="QRIS" class="h-5">
              </div>
              <div class="flex-grow">
                <h3 class="font-medium text-sm">QRIS</h3>
              </div>
              <i class="fas fa-chevron-down text-gray-400 transform transition-transform duration-300"></i>
            </div>
            
            <div class="payment-details">
              <div class="payment-details-content">
                <div class="text-center mb-4">
                  <div class="qr-code mx-auto w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg mb-3"></div>
                  <p class="text-sm text-gray-500">Scan QR code menggunakan aplikasi mobile banking atau e-wallet</p>
                </div>
                
                <div class="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 mb-4">
                  <p><i class="fas fa-info-circle mr-2"></i> QR code akan kadaluarsa dalam 24 jam</p>
                </div>
                
                <button class="confirm-payment w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold">
                  <i class="fas fa-check-circle mr-2"></i> Saya Sudah Bayar
                </button>
              </div>
            </div>
          </div>
          
          <!-- Virtual Account -->
          <div class="payment-method-container">
            <div class="payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm" data-method="virtual_account">
              <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                <i class="fas fa-university text-blue-600"></i>
              </div>
              <div class="flex-grow">
                <h3 class="font-medium text-sm">Virtual Account</h3>
              </div>
              <i class="fas fa-chevron-down text-gray-400 transform transition-transform duration-300"></i>
            </div>
            
            <div class="payment-details">
              <div class="payment-details-content">
                <h4 class="font-medium mb-3 text-center">Pilih Bank</h4>
                <div class="method-grid mb-4">
                  <div class="method-item bank-option" data-bank="bca">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png" alt="BCA" class="method-logo">
                  </div>
                  <div class="method-item bank-option" data-bank="mandiri">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/1200px-Bank_Mandiri_logo_2016.svg.png" alt="Mandiri" class="method-logo">
                  </div>
                  <div class="method-item bank-option" data-bank="bni">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/BNI_logo.svg/1200px-BNI_logo.svg.png" alt="BNI" class="method-logo">
                  </div>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg mb-4">
                  <div class="mb-3">
                    <label class="block text-gray-500 text-sm mb-1">Nomor Virtual Account</label>
                    <div class="flex items-center">
                      <span class="font-mono va-number bg-gray-100 p-2 rounded flex-1">8888801234567890</span>
                      <button class="copy-btn text-blue-600 hover:text-blue-800 ml-2" onclick="copyToClipboard('8888801234567890', 'Nomor VA')">
                        <i class="fas fa-copy"></i>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label class="block text-gray-500 text-sm mb-1">Jumlah Transfer</label>
                    <span class="font-bold text-blue-600">${typeof price === 'number' ? `Rp${price.toLocaleString('id-ID')}` : price}</span>
                  </div>
                </div>
                
                <div class="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800 mb-4">
                  <p><i class="fas fa-exclamation-circle mr-2"></i> Transfer tepat sesuai nominal untuk proses otomatis</p>
                </div>
                
                <button class="confirm-payment w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold">
                  <i class="fas fa-check-circle mr-2"></i> Konfirmasi Pembayaran
                </button>
              </div>
            </div>
          </div>
          
          <!-- E-Wallets -->
          <div class="payment-method-container">
            <div class="payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm" data-method="ewallet">
              <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                <i class="fas fa-wallet text-green-600"></i>
              </div>
              <div class="flex-grow">
                <h3 class="font-medium text-sm">E-Wallet</h3>
              </div>
              <i class="fas fa-chevron-down text-gray-400 transform transition-transform duration-300"></i>
            </div>
            
            <div class="payment-details">
              <div class="payment-details-content">
                <h4 class="font-medium mb-3 text-center">Pilih E-Wallet</h4>
                <div class="method-grid mb-4">
                  <div class="method-item payment-option" data-wallet="dana">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/1200px-Logo_dana_blue.svg.png" alt="DANA" class="method-logo">
                  </div>
                  <div class="method-item payment-option" data-wallet="gopay">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/1200px-Gopay_logo.svg.png" alt="GoPay" class="method-logo">
                  </div>
                  <div class="method-item payment-option" data-wallet="ovo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/OVO_logo.svg/1200px-OVO_logo.svg.png" alt="OVO" class="method-logo">
                  </div>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg mb-4">
                  <div class="mb-3">
                    <label class="block text-gray-500 text-sm mb-1">Nomor E-Wallet</label>
                    <div class="flex items-center">
                      <span class="font-mono ewallet-number bg-gray-100 p-2 rounded flex-1">081234567890</span>
                      <button class="copy-btn text-blue-600 hover:text-blue-800 ml-2" onclick="copyToClipboard('081234567890', 'Nomor e-wallet')">
                        <i class="fas fa-copy"></i>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label class="block text-gray-500 text-sm mb-1">Jumlah Transfer</label>
                    <span class="font-bold text-blue-600">${typeof price === 'number' ? `Rp${price.toLocaleString('id-ID')}` : price}</span>
                  </div>
                </div>
                
                <div class="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 mb-4">
                  <p><i class="fas fa-info-circle mr-2"></i> Anda akan diarahkan ke aplikasi untuk menyelesaikan pembayaran</p>
                </div>
                
                <button class="confirm-payment w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold">
                  <i class="fas fa-arrow-right mr-2"></i> Lanjut ke Pembayaran
                </button>
              </div>
            </div>
          </div>
          
          <!-- Retail Outlets -->
          <div class="payment-method-container">
            <div class="payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm" data-method="retail">
              <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                <i class="fas fa-store text-orange-600"></i>
              </div>
              <div class="flex-grow">
                <h3 class="font-medium text-sm">Retail</h3>
              </div>
              <i class="fas fa-chevron-down text-gray-400 transform transition-transform duration-300"></i>
            </div>
            
            <div class="payment-details">
              <div class="payment-details-content">
                <h4 class="font-medium mb-3 text-center">Pilih Retail</h4>
                <div class="method-grid mb-4">
                  <div class="method-item payment-option" data-retail="alfamart">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Alfamart_logo_2019.svg/1200px-Alfamart_logo_2019.svg.png" alt="Alfamart" class="method-logo">
                  </div>
                  <div class="method-item payment-option" data-retail="indomaret">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Indomaret_logo.svg/1200px-Indomaret_logo.svg.png" alt="Indomaret" class="method-logo">
                  </div>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg mb-4">
                  <div class="mb-3">
                    <label class="block text-gray-500 text-sm mb-1">Kode Pembayaran</label>
                    <div class="flex items-center">
                      <span class="font-mono retail-code bg-gray-100 p-2 rounded flex-1">ALFA123456</span>
                      <button class="copy-btn text-blue-600 hover:text-blue-800 ml-2" onclick="copyToClipboard('ALFA123456', 'Kode pembayaran')">
                        <i class="fas fa-copy"></i>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label class="block text-gray-500 text-sm mb-1">Jumlah Pembayaran</label>
                    <span class="font-bold text-blue-600">${typeof price === 'number' ? `Rp${price.toLocaleString('id-ID')}` : price}</span>
                  </div>
                </div>
                
                <div class="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800 mb-4">
                  <p><i class="fas fa-exclamation-circle mr-2"></i> Kode pembayaran akan kadaluarsa dalam 24 jam</p>
                </div>
                
                <button class="confirm-payment w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold">
                  <i class="fas fa-check-circle mr-2"></i> Konfirmasi
                </button>
              </div>
            </div>
          </div>
          
          <!-- Credit Card -->
          <div class="payment-method-container">
            <div class="payment-method bg-white rounded-lg p-3 flex items-center cursor-pointer shadow-sm" data-method="credit_card">
              <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                <i class="far fa-credit-card text-purple-600"></i>
              </div>
              <div class="flex-grow">
                <h3 class="font-medium text-sm">Kartu Kredit</h3>
              </div>
              <i class="fas fa-chevron-down text-gray-400 transform transition-transform duration-300"></i>
            </div>
            
  <div class="payment-details">
              <div class="payment-details-content">
                <div class="mb-4">
                  <label class="block text-gray-700 mb-2">Informasi Kartu</label>
                  <div class="space-y-3">
                    <input type="text" placeholder="Nomor Kartu" class="w-full px-4 py-2 border rounded-lg" maxlength="19">
                    <div class="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="MM/YY" class="w-full px-4 py-2 border rounded-lg" maxlength="5">
                      <input type="text" placeholder="CVV" class="w-full px-4 py-2 border rounded-lg" maxlength="3">
                    </div>
                    <input type="text" placeholder="Nama di Kartu" class="w-full px-4 py-2 border rounded-lg">
                  </div>
                </div>
                
                <div class="flex items-center mb-4">
                  <input type="checkbox" id="saveCard" class="mr-2">
                  <label for="saveCard" class="text-sm text-gray-600">Simpan kartu untuk pembayaran berikutnya</label>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg mb-4">
                  <div class="flex justify-between">
                    <span class="text-gray-500">Jumlah Pembayaran</span>
                    <span class="font-bold text-blue-600">${typeof price === 'number' ? `Rp${price.toLocaleString('id-ID')}` : price}</span>
                  </div>
                </div>
                
                <button class="confirm-payment w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold">
                  <i class="fas fa-lock mr-2"></i> Bayar Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Payment Processing Modal -->
  <div id="processingModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-xl max-w-md w-full p-6 text-center">
      <div class="mb-4">
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div id="loadingBar" class="loading-bar h-full bg-blue-500"></div>
        </div>
      </div>
      <h3 class="text-lg font-bold mb-2">Memproses Pembayaran</h3>
      <p class="text-gray-600">Harap tunggu sebentar...</p>
    </div>
  </div>
  
  <!-- Success Modal -->
  <div id="successModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-xl max-w-md w-full p-6 text-center">
      <div class="text-green-500 mb-4">
        <i class="fas fa-check-circle text-5xl"></i>
      </div>
      <h2 class="text-2xl font-bold mb-2">Pembayaran Berhasil!</h2>
      <p class="text-gray-600 mb-4">Terima kasih telah melakukan pembayaran.</p>
      <div class="bg-gray-50 p-4 rounded-lg mb-4 text-left">
        <div class="flex justify-between mb-2">
          <span class="text-gray-500">Invoice</span>
          <span class="font-mono">INV-<span id="invoiceNumber">XXXX</span></span>
        </div>
        <div class="flex justify-between mb-2">
          <span class="text-gray-500">Metode</span>
          <span id="successMethod" class="font-medium">QRIS</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Total</span>
          <span id="successAmount" class="font-bold text-blue-600">${typeof price === 'number' ? `Rp${price.toLocaleString('id-ID')}` : price}</span>
        </div>
      </div>
      
      <button id="closeSuccessModal" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold">
        Selesai
      </button>
    </div>
  </div>
  
  <!-- Toast Notification -->
  <div id="toast" class="toast">
    <i class="fas fa-copy mr-2"></i> Nomor disalin!
  </div>
`;

// Payment Modal Logic (moved to static execution)
let selectedMethod = null;

function formatRupiah(amount) {
  return 'Rp' + parseInt(amount).toLocaleString('id-ID');
}

function copyToClipboard(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} disalin!`);
  }).catch(err => {
    console.error('Gagal menyalin: ', err);
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.innerHTML = `<i class="fas fa-copy mr-2"></i> ${message}`;
    toast.style.display = 'flex';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 2000);
  }
}

function getMethodName(method) {
  const methods = {
    'qris': 'QRIS',
    'virtual_account': 'Virtual Account',
    'bank_transfer': 'Transfer Bank',
    'ewallet': 'E-Wallet',
    'retail': 'Retail',
    'credit_card': 'Kartu Kredit'
  };
  return methods[method] || 'Pembayaran';
}

function processPayment() {
  const paymentModal = document.getElementById('paymentModal');
  const processingModal = document.getElementById('processingModal');
  const successModal = document.getElementById('successModal');
  const loadingBar = document.getElementById('loadingBar');
  const successAmount = document.getElementById('successAmount');
  const successMethod = document.getElementById('successMethod');
  const invoiceNumber = document.getElementById('invoiceNumber');

  if (paymentModal && processingModal && successModal && loadingBar && successAmount && successMethod && invoiceNumber) {
    paymentModal.classList.add('hidden');
    processingModal.classList.remove('hidden');
    
    setTimeout(() => {
      loadingBar.style.width = '100%';
    }, 100);
    
    setTimeout(() => {
      processingModal.classList.add('hidden');
      successAmount.textContent = typeof window.currentPrice === 'number' ? formatRupiah(window.currentPrice) : window.currentPrice;
      successMethod.textContent = getMethodName(selectedMethod);
      invoiceNumber.textContent = 'INV-' + Math.floor(1000 + Math.random() * 9000);
      successModal.classList.remove('hidden');
    }, 1500);
  }
}

function attachPaymentListeners(modalContainer) {
  const modal = modalContainer.querySelector('#paymentModal');
  if (!modal) return;

  // Initialize modal content
  const modalPlan = modal.querySelector('#modalPlan');
  const modalProduct = modal.querySelector('#modalProduct');
  const modalAmount = modal.querySelector('#modalAmount');
  const modalOldPrice = modal.querySelector('#modalOldPrice');

  if (modalPlan && modalProduct && modalAmount && modalOldPrice) {
    modalPlan.textContent = 'Pembayaran';
    modalProduct.textContent = window.currentProduct || 'Layanan Premium';
    modalAmount.textContent = typeof window.currentPrice === 'number' ? formatRupiah(window.currentPrice) : window.currentPrice;
    modalOldPrice.textContent = typeof window.currentPrice === 'number' ? formatRupiah(window.currentPrice * 1.67) : 'N/A';
  }

  // Payment method toggles
  modal.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', function() {
      const container = this.closest('.payment-method-container');
      const details = container.querySelector('.payment-details');
      const chevron = this.querySelector('i.fa-chevron-down');
      
      modal.querySelectorAll('.payment-details').forEach(d => {
        if (d !== details) {
          d.classList.remove('active');
        }
      });
      
      modal.querySelectorAll('.payment-method i.fa-chevron-down').forEach(icon => {
        if (icon !== chevron) {
          icon.classList.remove('rotate-180');
        }
      });
      
      details.classList.toggle('active');
      chevron.classList.toggle('rotate-180');
      
      selectedMethod = this.getAttribute('data-method');
    });
  });

  // Bank, e-wallet, and retail options
  modal.addEventListener('click', function(e) {
    if (e.target.closest('.bank-option')) {
      const option = e.target.closest('.bank-option');
      const container = option.closest('.payment-details');
      const vaNumber = container.querySelector('.va-number');
      const copyBtn = container.querySelector('.copy-btn');
      
      container.querySelectorAll('.bank-option').forEach(opt => {
        opt.classList.remove('bg-blue-100');
      });
      
      option.classList.add('bg-blue-100');
      
      const bank = option.getAttribute('data-bank');
      const vaNumbers = {
        'bca': '8888801234567890',
        'mandiri': '8888802345678901',
        'bni': '8888803456789012'
      };
      
      if (vaNumbers[bank]) {
        vaNumber.textContent = vaNumbers[bank];
        copyBtn.setAttribute('onclick', `copyToClipboard('${vaNumbers[bank]}', 'Nomor VA')`);
      }
    }
    
    if (e.target.closest('.payment-option')) {
      const option = e.target.closest('.payment-option');
      const container = option.closest('.payment-details');
      
      if (container.querySelector('.ewallet-number')) {
        const ewalletNumber = container.querySelector('.ewallet-number');
        const copyBtn = container.querySelector('.copy-btn');
        
        container.querySelectorAll('.payment-option').forEach(opt => {
          opt.classList.remove('bg-blue-100');
        });
        
        option.classList.add('bg-blue-100');
        
        const wallet = option.getAttribute('data-wallet');
        const numbers = {
          'dana': '081234567890',
          'gopay': '081987654321',
          'ovo': '082345678901'
        };
        
        if (numbers[wallet]) {
          ewalletNumber.textContent = numbers[wallet];
          copyBtn.setAttribute('onclick', `copyToClipboard('${numbers[wallet]}', 'Nomor e-wallet')`);
        }
      }
      
      if (container.querySelector('.retail-code')) {
        const retailCode = container.querySelector('.retail-code');
        const copyBtn = container.querySelector('.copy-btn');
        
        container.querySelectorAll('.payment-option').forEach(opt => {
          opt.classList.remove('bg-blue-100');
        });
        
        option.classList.add('bg-blue-100');
        
        const retail = option.getAttribute('data-retail');
        const codes = {
          'alfamart': 'ALFA' + Math.floor(100000 + Math.random() * 900000),
          'indomaret': 'INDO' + Math.floor(100000 + Math.random() * 900000)
        };
        
        if (codes[retail]) {
          retailCode.textContent = codes[retail];
          copyBtn.setAttribute('onclick', `copyToClipboard('${codes[retail]}', 'Kode pembayaran')`);
        }
      }
    }
    
    if (e.target.closest('.confirm-payment')) {
      processPayment();
    }
  });

  // Close buttons
  const closeModal = modal.querySelector('#closeModal');
  const closeSuccessModal = modal.querySelector('#closeSuccessModal');
  
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modalContainer.remove();
      document.body.style.overflow = 'auto';
    });
  }
  
  if (closeSuccessModal) {
    closeSuccessModal.addEventListener('click', () => {
      modalContainer.remove();
      document.body.style.overflow = 'auto';
    });
  }
}

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

  if (selectedCategory === 'Website') {
    filteredProducts = filteredProducts.slice(0, 5);
  } else if (selectedCategory === 'Chatbot') {
    filteredProducts = filteredProducts.slice(0, 1);
  } else if (selectedCategory === 'Konten') {
    filteredProducts = filteredProducts.slice(0, 3);
  } else if (selectedCategory === 'Sosmed Booster') {
    filteredProducts = filteredProducts.slice(0, 1);
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
        <h2 class="font-bold text-gray-900 text-base">Kategori</h2>
      </div>
      <nav class="categories-nav flex space-x-3 mb-6 overflow-x-auto">
        <button class="category-btn flex items-center space-x-2 ${selectedCategory === 'All' ? 'bg-[#3B82F6] text-white' : 'bg-gray-100 text-gray-900'} rounded-lg px-3 py-1.5 font-semibold text-xs" data-category="All">
          <i class="fas fa-shoe-prints text-sm"></i>
          <span>Semua</span>
        </button>
        <button class="category-btn flex items-center space-x-2 ${selectedCategory === 'Website' ? 'bg-[#3B82F6] text-white' : 'bg-gray-100 text-gray-900'} rounded-lg px-3 py-1.5 font-semibold text-xs" data-category="Website">
          <span>Website</span>
        </button>
        <button class="category-btn flex items-center space-x-2 ${selectedCategory === 'Chatbot' ? 'bg-[#3B82F6] text-white' : 'bg-gray-100 text-gray-900'} rounded-lg px-3 py-1.5 font-semibold text-xs" data-category="Chatbot">
          <span>Chatbot</span>
        </button>
        <button class="category-btn flex items-center space-x-2 ${selectedCategory === 'Sosmed Booster' ? 'bg-[#3B82F6] text-white' : 'bg-gray-100 text-gray-900'} rounded-lg px-3 py-1.5 font-semibold text-xs" data-category="Sosmed Booster">
          <span>Sosmed Booster</span>
        </button>
        <button class="category-btn flex items-center space-x-2 ${selectedCategory === 'Konten' ? 'bg-[#3B82F6] text-white' : 'bg-gray-100 text-gray-900'} rounded-lg px-3 py-1.5 font-semibold text-xs" data-category="Konten">
          <span>Konten</span>
        </button>
      </nav>
      <section class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        ${filteredProducts.length ? filteredProducts.map((product, index) => ProductCard({
          ...product,
          isFavorite: favorites.includes(product.id),
          isLarge: (product.category === 'Website' && index === 0) || product.category === 'Sosmed Booster'
        })).join('') : '<p class="text-gray-600 col-span-full">Tidak ada produk ditemukan.</p>'}
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
        <h2 class="font-bold text-lg text-gray-900 mb-2">${product.name}</h2>
        <p class="text-gray-600 text-sm mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div class="text-sm font-semibold text-gray-900 mb-3">
          <span>${typeof product.price === 'number' ? `Rp${product.price.toLocaleString('id-ID')}` : product.price}</span>
        </div>
        <div class="flex items-center mt-2 space-x-2">
          <button class="pay-btn w-full bg-[#3B82F6] text-white text-sm font-semibold py-2 rounded-lg" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Bayar</button>
          <a href="https://wa.me/6285156779923" class="whatsapp-btn bg-green-500 text-white p-2 rounded-full" aria-label="Contact via WhatsApp">
            <i class="fab fa-whatsapp text-lg"></i>
          </a>
        </div>
      </section>
    </div>
  `;
};

const renderPaket = () => `
  <div class="w-full max-w-sm mx-auto p-4">
    <h2 class="font-bold text-lg text-gray-900 mb-4">Paket Anda</h2>
    <section class="space-y-4">
      <p class="text-gray-600">Paket Anda kosong.</p>
    </section>
  </div>
`;

const renderTestimoni = () => `
  <div class="w-full max-w-sm mx-auto p-4">
    <h2 class="font-bold text-lg text-gray-900 mb-4">Testimoni</h2>
    <section class="bg-gray-50 rounded-2xl p-4 shadow-[0_10px_15px_rgba(0,0,0,0.1)]">
      <div class="flex items-center space-x-4 mb-4">
        <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <i class="fas fa-comment text-xl text-gray-600"></i>
        </div>
        <div>
          <h3 class="font-semibold text-gray-900">John Doe</h3>
          <p class="text-gray-600 text-sm">john.doe@example.com</p>
        </div>
      </div>
      <button class="w-full bg-[#3B82F6] text-white text-sm font-semibold py-2 rounded-lg">Edit Profile</button>
    </section>
    <section class="mt-6">
      <h3 class="font-semibold text-gray-900 mb-2">Testimoni</h3>
      <p class="text-gray-600 text-sm">Belum ada testimoni.</p>
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

const renderAdmin = () => `
  <div class="w-full max-w-sm mx-auto p-4">
    <h2 class="font-bold text-lg text-gray-900 mb-4">Admin</h2>
    <section class="bg-gray-50 rounded-2xl p-4 shadow-[0_10px_15px_rgba(0,0,0,0.1)]">
      <p class="text-gray-600">Anda memiliki 1 notifikasi baru: Produk baru telah tiba!</p>
    </section>
  </div>
`;

// Router
const routes = {
  '/NolanDex/': renderHome,
  '/NolanDex/product': renderProductDetails,
  '/NolanDex/paket': renderPaket,
  '/NolanDex/testimoni': renderTestimoni,
  '/NolanDex/login': renderLogin,
  '/NolanDex/admin': renderAdmin,
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

  // Payment Modal
  document.querySelectorAll('.pay-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const name = btn.dataset.name;
      const price = btn.dataset.price === 'Klik' ? 'Klik' : parseInt(btn.dataset.price);
      
      window.currentProduct = name;
      window.currentPrice = price;

      const modalContainer = document.createElement('div');
      modalContainer.innerHTML = PaymentModal({ product: name, price: price });
      document.body.appendChild(modalContainer);
      document.body.style.overflow = 'hidden';

      attachPaymentListeners(modalContainer);
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
