// ============================================================
// SHOP — Merch Cart + VP Purchase Flow (Simplified)
// ============================================================

// ---- VP BUNDLE DATA ----
const VP_BUNDLES = [
  { id: 'vp-475', vp: 475, bonusVp: 0, totalVp: 475, pricePhp: 230, label: 'Starter', badge: null, popular: false },
  { id: 'vp-1000', vp: 1000, bonusVp: 0, totalVp: 1000, pricePhp: 450, label: 'Basic', badge: null, popular: false },
  { id: 'vp-2050', vp: 2050, bonusVp: 0, totalVp: 2050, pricePhp: 900, label: 'Standard', badge: null, popular: false },
  { id: 'vp-3650', vp: 3650, bonusVp: 200, totalVp: 3850, pricePhp: 1550, label: 'Advanced', badge: 'Bonus 200 VP', popular: false },
  { id: 'vp-5350', vp: 5350, bonusVp: 350, totalVp: 5700, pricePhp: 2200, label: 'Expert', badge: 'Best Value — Bonus 350 VP', popular: true },
  { id: 'vp-11000', vp: 11000, bonusVp: 1000, totalVp: 12000, pricePhp: 4300, label: 'Master', badge: 'Bonus 1000 VP', popular: false }
];

// ---- MERCH PRODUCTS ----
const MERCH_PRODUCTS = {
  'sticker-pack': { title: 'Sticker Pack', price: 49.99 },
  'plushie': { title: 'Plushie', price: 119.25 },
  'keychain': { title: 'Keychain', price: 99.99 }
};

// ---- HELPERS ----
function formatPhp(amount) { return `₱${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`; }
function formatVp(amount) { return `${amount.toLocaleString()} VP`; }
function generateTransactionId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = 'VP-';
  for (let i = 0; i < 10; i++) { id += chars[Math.floor(Math.random() * chars.length)]; if (i === 4) id += '-'; }
  return id;
}
function formatDateTime(isoString) {
  return new Date(isoString).toLocaleString('en-PH', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// ============================================================
// STATE
// ============================================================
let selectedVpBundle = null;
let selectedPaymentMethod = 'gcash';
let selectedRiotId = '';
let currentVpStep = 'bundle';

// ============================================================
// DOM ELEMENTS
// ============================================================
let els = {};

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  cacheElements();
  renderVpBundles();
  initMerch();
  initVpPurchaseModal();
  renderCart();

  // Ensure VP modal stays hidden on page load
  if (els.vpPurchaseModal) {
    els.vpPurchaseModal.hidden = true;
    document.body.style.overflow = '';
  }
});

// ============================================================
// ELEMENT CACHING
// ============================================================
function cacheElements() {
  // VP Bundle Grid
  els.vpBundleGrid = document.getElementById('vp-bundle-grid');

  // VP Purchase Modal
  els.vpPurchaseModal = document.getElementById('vpPurchaseModal');
  els.vpSteps = {
    bundle: document.getElementById('vp-step-bundle'),
    payment: document.getElementById('vp-step-payment'),
    riotid: document.getElementById('vp-step-riotid'),
    processing: document.getElementById('vp-step-processing'),
    success: document.getElementById('vp-step-success')
  };
  // Step 1: Bundle
  els.vpBundleName = document.getElementById('vp-bundle-name');
  els.vpBundleVp = document.getElementById('vp-bundle-vp');
  els.vpBundlePrice = document.getElementById('vp-bundle-price');
  els.vpCancelBtn = document.getElementById('vp-cancel-btn');
  els.vpContinueBtn = document.getElementById('vp-continue-btn');
  // Step 2: Payment
  els.paymentMethods = document.querySelectorAll('.payment-method');
  els.vpBackBtn = document.getElementById('vp-back-btn');
  els.vpContinuePaymentBtn = document.getElementById('vp-continue-payment-btn');
  // Step 3: Riot ID
  els.riotIdInput = document.getElementById('vp-riot-id');
  els.riotIdError = document.getElementById('vp-riot-id-error');
  els.vpBackPaymentBtn = document.getElementById('vp-back-payment-btn');
  els.vpContinueRiotIdBtn = document.getElementById('vp-continue-riotid-btn');
  // Step 4: Processing
  els.processingText = document.getElementById('processing-text');
  // Step 5: Success
  els.vpReceiptId = document.getElementById('vp-receipt-id');
  els.vpReceiptBundle = document.getElementById('vp-receipt-bundle');
  els.vpReceiptVp = document.getElementById('vp-receipt-vp');
  els.vpReceiptRiotId = document.getElementById('vp-receipt-riotid');
  els.vpReceiptPrice = document.getElementById('vp-receipt-price');
  els.vpReceiptMethod = document.getElementById('vp-receipt-method');
  els.vpReceiptDate = document.getElementById('vp-receipt-date');
  els.vpDownloadReceipt = document.getElementById('vp-download-receipt');
  els.vpDoneBtn = document.getElementById('vp-done-btn');
  els.vpModalClose = els.vpPurchaseModal?.querySelector('.modal-close');

  // Merch elements
  els.cartModal = document.getElementById('cartModal');
  els.cartItems = document.getElementById('cartItems');
  els.cartTotal = document.getElementById('cartTotal');
  els.cartActions = document.getElementById('cartActions');
  els.viewCartBtn = document.getElementById('viewCartBtn');
  els.resetCartBtn = document.getElementById('resetCartBtn');
  els.closeCartBtn = document.getElementById('closeCart');
  els.checkoutBtn = document.getElementById('checkoutBtn');
}

// ============================================================
// VP BUNDLES RENDERING
// ============================================================
function renderVpBundles() {
  if (!els.vpBundleGrid) return;
  els.vpBundleGrid.innerHTML = VP_BUNDLES.map(bundle => `
    <article class="vp-bundle-card ${bundle.popular ? 'popular' : ''}" data-bundle-id="${bundle.id}" role="listitem">
      <div class="vp-bundle-header">
        <div class="vp-bundle-vp">${bundle.totalVp.toLocaleString()} VP</div>
        ${bundle.bonusVp > 0 ? `<span class="vp-bundle-bonus">+${bundle.bonusVp} Bonus VP</span>` : ''}
        ${bundle.badge ? `<span class="vp-bundle-badge">${bundle.badge}</span>` : ''}
      </div>
      <div class="vp-bundle-label">${bundle.label}</div>
      <div class="vp-bundle-price">${formatPhp(bundle.pricePhp)}</div>
      ${bundle.bonusVp > 0 ? `<div class="vp-bundle-breakdown">(${bundle.vp.toLocaleString()} VP + ${bundle.bonusVp.toLocaleString()} bonus)</div>` : ''}
      <button class="vp-buy-btn btn btn-primary" aria-label="Buy ${bundle.label} bundle for ${formatPhp(bundle.pricePhp)}">Buy ${bundle.totalVp.toLocaleString()} VP</button>
    </article>
  `).join('');

  // Add click listeners
  els.vpBundleGrid.querySelectorAll('.vp-buy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.vp-bundle-card');
      openVpPurchaseModal(card.dataset.bundleId);
    });
  });
}

// ============================================================
// VP PURCHASE MODAL FLOW
// ============================================================
function openVpPurchaseModal(bundleId) {
  const bundle = VP_BUNDLES.find(b => b.id === bundleId);
  if (!bundle) return;
  selectedVpBundle = bundle;
  currentVpStep = 'bundle';
  selectedPaymentMethod = 'gcash';

  // Update Step 1 content
  els.vpBundleName.textContent = `${bundle.label} Bundle`;
  els.vpBundleVp.textContent = `${formatVp(bundle.totalVp)} ${bundle.bonusVp > 0 ? `(${bundle.vp.toLocaleString()} + ${bundle.bonusVp.toLocaleString()} bonus)` : ''}`;
  els.vpBundlePrice.textContent = formatPhp(bundle.pricePhp);

  // Reset payment selection
  document.querySelectorAll('.payment-method').forEach(m => {
    m.setAttribute('aria-checked', m.dataset.method === 'gcash');
  });

  // Show modal
  showStep('bundle');
  els.vpPurchaseModal.hidden = false;
  els.vpPurchaseModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  els.vpContinueBtn?.focus();
}

function closeVpPurchaseModal() {
  els.vpPurchaseModal.hidden = true;
  els.vpPurchaseModal.style.display = 'none';
  document.body.style.overflow = '';
  selectedVpBundle = null;
}

function showStep(step) {
  currentVpStep = step;
  Object.values(els.vpSteps).forEach(s => {
    if (s) s.classList.remove('active');
  });
  if (els.vpSteps[step]) {
    els.vpSteps[step].classList.add('active');
  }
}

async function handleContinueToPayment() {
  showStep('payment');
  // Focus first payment method
  document.querySelector('.payment-method[data-method="gcash"]')?.focus();
}

function handlePaymentSelection(method) {
  selectedPaymentMethod = method;
  document.querySelectorAll('.payment-method').forEach(m => {
    m.setAttribute('aria-checked', m.dataset.method === method);
  });
}

function handleContinueToRiotId() {
  showStep('riotid');
  // Focus Riot ID input
  setTimeout(() => els.riotIdInput?.focus(), 100);
}

function validateRiotId(riotId) {
  // Riot ID format: Name#Tag (e.g., TenZ#NA1, testname#1234)
  // Name: 3-16 alphanumeric chars, Tag: 3-5 alphanumeric chars
  const pattern = /^[a-zA-Z0-9]{3,16}#[a-zA-Z0-9]{3,5}$/;
  return pattern.test(riotId.trim());
}

function handleContinueToProcessing() {
  const riotId = els.riotIdInput?.value?.trim() || '';

  if (!riotId) {
    els.riotIdError.hidden = false;
    els.riotIdError.textContent = 'Please enter your Riot ID';
    els.riotIdInput.style.borderColor = 'var(--primary)';
    els.riotIdInput.focus();
    return;
  }

  if (!validateRiotId(riotId)) {
    els.riotIdError.hidden = false;
    els.riotIdError.textContent = 'Invalid format. Use Name#Tag (e.g., TenZ#NA1)';
    els.riotIdInput.style.borderColor = 'var(--primary)';
    els.riotIdInput.focus();
    return;
  }

  // Valid - proceed to processing
  els.riotIdError.hidden = true;
  els.riotIdInput.style.borderColor = '';
  selectedRiotId = riotId;
  showStep('processing');
  runProcessingAnimation();
}

async function runProcessingAnimation() {
  const steps = [
    { text: 'Verifying payment...', delay: 800 },
    { text: 'Processing transaction...', delay: 1000 },
    { text: 'Granting VP...', delay: 800 },
    { text: 'Complete!', delay: 400 }
  ];

  for (const s of steps) {
    if (els.processingText) els.processingText.textContent = s.text;
    await new Promise(r => setTimeout(r, s.delay));
  }

  showSuccessReceipt();
}

function showSuccessReceipt() {
  const txnId = generateTransactionId();
  const now = new Date().toISOString();
  const methodLabels = { gcash: 'GCash', paymaya: 'Maya (PayMaya)', card: 'Credit/Debit Card', cod: 'Over-the-Counter' };

  els.vpReceiptId.textContent = txnId;
  els.vpReceiptBundle.textContent = `${selectedVpBundle.label} Bundle`;
  els.vpReceiptVp.textContent = formatVp(selectedVpBundle.totalVp);
  if (els.vpReceiptRiotId) els.vpReceiptRiotId.textContent = selectedRiotId;
  els.vpReceiptPrice.textContent = formatPhp(selectedVpBundle.pricePhp);
  els.vpReceiptMethod.textContent = methodLabels[selectedPaymentMethod];
  els.vpReceiptDate.textContent = formatDateTime(now);

  showStep('success');
}

function downloadVpReceipt() {
  const txnId = els.vpReceiptId.textContent;
  const bundle = els.vpReceiptBundle.textContent;
  const vp = els.vpReceiptVp.textContent;
  const riotId = els.vpReceiptRiotId?.textContent || 'N/A';
  const price = els.vpReceiptPrice.textContent;
  const method = els.vpReceiptMethod.textContent;
  const date = els.vpReceiptDate.textContent;

  const text = `
╔══════════════════════════════════════╗
║           VALORANT RECEIPT           ║
║        🎓 SIMULATION ONLY 🎓         ║
╠══════════════════════════════════════╣
║ Date:      ${date.padEnd(28)} ║
║ Trans ID:  ${txnId.padEnd(28)} ║
╠══════════════════════════════════════╣
║ Bundle:    ${bundle.padEnd(28)} ║
║ VP:        ${vp.padEnd(28)} ║
║ Riot ID:   ${riotId.padEnd(28)} ║
║ Price:     ${price.padEnd(28)} ║
║ Method:    ${method.padEnd(28)} ║
╠══════════════════════════════════════╣
║ TOTAL:     ${price.padStart(20)} ║
╚══════════════════════════════════════╝

This is a simulated receipt from the VAL Shop
student project. No real transaction occurred.
Purchase VP only through the official Valorant client.
  `.trim();

  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `valorant-vp-receipt-${txnId}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function initVpPurchaseModal() {
  // Step 1: Continue to payment
  if (els.vpContinueBtn) {
    els.vpContinueBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleContinueToPayment();
    });
  }
  if (els.vpCancelBtn) {
    els.vpCancelBtn.addEventListener('click', closeVpPurchaseModal);
  }

  // Step 2: Payment method selection
  document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', () => handlePaymentSelection(method.dataset.method));
    method.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handlePaymentSelection(method.dataset.method);
      }
    });
  });
  if (els.vpBackBtn) {
    els.vpBackBtn.addEventListener('click', () => showStep('bundle'));
  }
  if (els.vpContinuePaymentBtn) {
    els.vpContinuePaymentBtn.addEventListener('click', handleContinueToRiotId);
  }

  // Step 3: Riot ID input
  if (els.vpBackPaymentBtn) {
    els.vpBackPaymentBtn.addEventListener('click', () => showStep('payment'));
  }
  if (els.vpContinueRiotIdBtn) {
    els.vpContinueRiotIdBtn.addEventListener('click', handleContinueToProcessing);
  }
  if (els.riotIdInput) {
    els.riotIdInput.addEventListener('input', () => {
      els.riotIdError.hidden = true;
      els.riotIdInput.style.borderColor = '';
    });
  }

  // Step 5: Success actions
  if (els.vpDownloadReceipt) {
    els.vpDownloadReceipt.addEventListener('click', downloadVpReceipt);
  }
  if (els.vpDoneBtn) {
    els.vpDoneBtn.addEventListener('click', closeVpPurchaseModal);
  }

  // Modal close
  if (els.vpModalClose) {
    els.vpModalClose.addEventListener('click', closeVpPurchaseModal);
  }
  if (els.vpPurchaseModal) {
    els.vpPurchaseModal.addEventListener('click', (e) => {
      if (e.target === els.vpPurchaseModal) closeVpPurchaseModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && els.vpPurchaseModal && !els.vpPurchaseModal.hidden) closeVpPurchaseModal();
  });
}

// ============================================================
// MERCH CART LOGIC
// ============================================================
function getCartKey() { return 'cart_guest'; }
function readCart() { return JSON.parse(localStorage.getItem(getCartKey()) || '{}'); }
function writeCart(cart) { localStorage.setItem(getCartKey(), JSON.stringify(cart)); }
function clearCart() { localStorage.removeItem(getCartKey()); }

function openCart() {
  els.cartModal?.setAttribute('aria-hidden', 'false');
  renderCart();
}
function closeCart() { els.cartModal?.setAttribute('aria-hidden', 'true'); }

function renderCart() {
  if (!els.cartItems || !els.cartTotal) return;
  const cart = readCart();
  els.cartItems.innerHTML = '';
  let total = 0;
  Object.entries(cart).forEach(([id, qty]) => {
    const product = MERCH_PRODUCTS[id];
    if (!product) return;
    const li = document.createElement('li');
    li.textContent = `${product.title} — ₱${product.price.toFixed(2)} × ${qty}`;
    els.cartItems.appendChild(li);
    total += product.price * qty;
  });
  els.cartTotal.textContent = total.toFixed(2);
  if (els.cartActions) els.cartActions.style.display = Object.keys(cart).length > 0 ? 'flex' : 'none';
}

function initMerch() {
  document.addEventListener('click', (e) => {
    // Add to cart
    if (e.target.matches('.add-btn')) {
      const card = e.target.closest('.product-card');
      if (!card) return;
      const id = card.dataset.id;
      const cart = readCart();
      cart[id] = (cart[id] || 0) + 1;
      writeCart(cart);
      openCart();
    }
    // Buy Now
    if (e.target.matches('.buy-btn')) {
      const card = e.target.closest('.product-card');
      if (!card) return;
      const id = card.dataset.id;
      const product = MERCH_PRODUCTS[id];
      let quantity = prompt(`How many ${product.title}s would you like to buy?`, 1);
      quantity = parseInt(quantity, 10);
      if (isNaN(quantity) || quantity <= 0) { alert('Please enter a valid quantity.'); return; }
      const totalPrice = product.price * quantity;
      if (confirm(`You are about to buy ${quantity} ${product.title}(s) for ${formatPhp(totalPrice)}. Proceed?`)) {
        alert(`You successfully bought ${quantity} ${product.title}(s).`);
      }
    }
    // Close cart modal
    if (e.target.id === 'closeCart' || e.target.id === 'cartModal') closeCart();
    // Checkout
    if (e.target.id === 'checkoutBtn') {
      const cart = readCart();
      if (Object.keys(cart).length === 0) { alert('Your cart is empty.'); return; }
      if (confirm('Do you want to buy the item(s)?')) {
        alert('Your order has been placed!');
        clearCart();
        renderCart();
        closeCart();
      }
    }
  });

  els.viewCartBtn?.addEventListener('click', openCart);
  els.resetCartBtn?.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your cart?')) { clearCart(); renderCart(); }
  });
}