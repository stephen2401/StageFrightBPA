document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.querySelector('.cart-container');
  const cartSummary = document.querySelector('.cart-summary p strong');

  // Check if cart is empty
  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    updateCartSummary();
    return;
  }

  // Create cart items dynamically
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-id', item.id);

    if (![1, 2, 3].includes(item.id)) {
      cartItem.innerHTML = `
        <div class="product-details">
          <div class="product-info">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
          </div>
        </div>
        <div class="product-options2">
          <div class="quantity">
            <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
          </div>
          <div class="price-total">
            <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <button class="remove-btn" data-id="${item.id}">Remove</button>
        </div>`;
    } else {
      cartItem.innerHTML = `
        <div class="product-details">
          <div class="product-image">
            <img src="/images/tsshirt.png" alt="Product Image">
          </div>
          <div class="product-info">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
          </div>
        </div>
        <div class="product-options">
          <div class="quantity">
            <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
          </div>
          <div class="price-total">
            <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <button class="remove-btn" data-id="${item.id}">Remove</button>
        </div>
        <div class="options-section">
          <div class="color-options">
            <h3>Color</h3>
            <div class="color-box grey" data-color="grey"></div>
            <div class="color-box dark-grey" data-color="dark-grey"></div>
            <div class="color-box black" data-color="black"></div>
            <div class="color-box red" data-color="red"></div>
            <div class="color-box orange" data-color="orange"></div>
          </div>
          <div class="size-options">
            <h3>Size</h3>
            <div class="size-box xs" data-size="x-small">XS</div>
            <div class="size-box s" data-size="small">S</div>
            <div class="size-box m" data-size="medium">M</div>
            <div class="size-box l" data-size="large">L</div>
            <div class="size-box xl" data-size="x-large">XL</div>
          </div>
        </div>`;
    }

    cartContainer.appendChild(cartItem);
  });

  // Event listeners for quantity changes, removal, color, and size selection
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', (e) => {
      updateQuantity(e.target.dataset.id, e.target.value);
    });
  });

  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      removeFromCart(e.target.dataset.id);
    });
  });

  updateCartSummary();
});

// Update quantity in cart
function updateQuantity(productId, newQuantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(p => p.id == productId);
  if (item && newQuantity > 0) {
    item.quantity = parseInt(newQuantity, 10);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSummary();
    updateCartItem(productId);
  }
}

// Remove item from cart
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(p => p.id != productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
  updateCartSummary();
}

// Update cart summary
function updateCartSummary() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.querySelector('.cart-summary p strong').textContent = `Subtotal: $${subtotal.toFixed(2)}`;
}

// Update total price of a single item
function updateCartItem(productId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(p => p.id == productId);
  if (item) {
    const itemElement = document.querySelector(`.cart-item[data-id="${productId}"] .price-total p`);
    itemElement.textContent = `Total: $${(item.price * item.quantity).toFixed(2)}`;
  }
}
