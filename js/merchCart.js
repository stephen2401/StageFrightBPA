document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartTableBody = document.querySelector('.cart-table tbody');

  if (cart.length === 0) {
    cartTableBody.innerHTML = '<tr><td colspan="5">Your cart is empty.</td></tr>';
    return;
  }

  cart.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${item.image}" alt="${item.name}" class="product-image" width="50"></td>
      <td>${item.name}</td>
      <td>$${item.price}</td>
      <td><input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input"></td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
      <td><button class="remove-btn" data-id="${item.id}">Remove</button></td>
    `;

    // Add color and size options below the first three items (index 0, 1, 2)
    if (index < 3) {
      const optionsSection = document.createElement('div');
      optionsSection.classList.add('options-section');

      // Color Options
      optionsSection.innerHTML += `
        <h3>Color</h3>
        <div class="color-options">
          <div class="grey" data-color="grey"></div>
          <div class="dark-grey" data-color="dark-grey"></div>
          <div class="black" data-color="black"></div>
          <div class="red" data-color="red"></div>
          <div class="orange" data-color="orange"></div>
        </div>
      `;

      // Size Options
      optionsSection.innerHTML += `
        <h3>Size</h3>
        <div class="size-options">
          <div class="xs" data-size="x-small">XS</div>
          <div class="s" data-size="small">S</div>
          <div class="m" data-size="medium">M</div>
          <div class="l" data-size="large">L</div>
          <div class="xl" data-size="x-large">XL</div>
        </div>
      `;

      row.appendChild(optionsSection);
    }

    cartTableBody.appendChild(row);
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

  // Event listeners for color and size selections
  document.querySelectorAll('.color-options div').forEach(colorBox => {
    colorBox.addEventListener('click', (e) => {
      updateColor(e.target.dataset.color, e.target.closest('tr').querySelector('.quantity-input').dataset.id);
    });
  });

  document.querySelectorAll('.size-options div').forEach(sizeBox => {
    sizeBox.addEventListener('click', (e) => {
      updateSize(e.target.dataset.size, e.target.closest('tr').querySelector('.quantity-input').dataset.id);
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
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}

// Remove item from cart
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(p => p.id != productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}

// Update color in cart
function updateColor(color, productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(p => p.id == productId);
  if (item) {
    item.color = color;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}

// Update size in cart
function updateSize(size, productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(p => p.id == productId);
  if (item) {
    item.size = size;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}

// Update cart summary
function updateCartSummary() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.querySelector('.cart-summary p strong').textContent = `Subtotal: $${subtotal.toFixed(2)}`;
}
