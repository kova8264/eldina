document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const cartPanel = document.getElementById('cartPanel');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const cartCount = document.querySelector('.cart-count');
  const cartButton = document.querySelector('.cart-button');
  const closeCartButton = document.querySelector('.close-cart');
  let cart = [];

  const formatMoney = (value) => `${value.toFixed(2)} KM`;

  const renderCart = () => {
    if (!cartItems || !cartTotal || !cartCount) return;

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = formatMoney(total);
    cartCount.textContent = cart.length;

    if (cart.length === 0) {
      cartItems.innerHTML = '<li class="empty-cart">Vaša košarica je prazna.</li>';
      return;
    }

    cartItems.innerHTML = cart
      .map(
        (item) => `
          <li class="cart-item">
            <div>
              <strong>${item.name}</strong>
              <span>${formatMoney(item.price)}</span>
            </div>
            <button class="remove-item" type="button" data-name="${item.name}" aria-label="Ukloni ${item.name}">×</button>
          </li>
        `
      )
      .join('');

    document.querySelectorAll('.remove-item').forEach((button) => {
      button.addEventListener('click', () => {
        const itemName = button.dataset.name;
        cart = cart.filter((item) => item.name !== itemName);
        renderCart();
      });
    });
  };

  const openCart = () => {
    if (cartPanel) cartPanel.classList.add('open');
  };

  const closeCart = () => {
    if (cartPanel) cartPanel.classList.remove('open');
  };

  cartButton?.addEventListener('click', openCart);
  closeCartButton?.addEventListener('click', closeCart);

  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const product = button.closest('.product-item');
      if (!product) return;

      const name = product.dataset.name;
      const price = Number(product.dataset.price || 0);

      cart.push({ name, price });
      renderCart();
      openCart();
    });
  });

  const form = document.querySelector('.newsletter form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const button = form.querySelector('button');
      const input = form.querySelector('input');

      if (button) {
        button.textContent = 'Hvala!';
        button.disabled = true;
      }

      if (input) {
        input.value = '';
      }
    });
  }

  renderCart();
});
