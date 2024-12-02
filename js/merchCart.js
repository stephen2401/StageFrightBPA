document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartTableBody = document.querySelector('.cart-table tbody');

  if (cart.length === 0) {
    cartTableBody.innerHTML = '<tr><td colspan="8">Your cart is empty.</td></tr>';
    return;
  }

  cart.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = getCartItemRow(item);
    cartTableBody.appendChild(row);
  });

  // Add event listeners
  document.querySelectorAll('.color-select').forEach(select => {
    select.addEventListener('change', (e) => updateColor(e.target.dataset.id, e.target.value));
  });

  document.querySelectorAll('.size-select').forEach(select => {
    select.addEventListener('change', (e) => updateSize(e.target.dataset.id, e.target.value));
  });

  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', (e) => updateQuantity(e.target.dataset.id, e.target.value));
  });

  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (e) => removeFromCart(e.target.dataset.id));
  });

  updateCartSummary();
});

// Helper function to generate cart item row HTML
function getCartItemRow(item) {
  const isFirstCategory = item.category === 'first-category';
  return `
    <td><img src="${item.image}" alt="${item.name}" class="product-image"></td>
    <td>${item.name}</td>
    <td>$${item.price}</td>
    <td>
      ${isFirstCategory ? getColorSelector(item) : item.color}
    </td>
    <td>
      ${isFirstCategory ? getSizeSelector(item) : item.size}
    </td>
    <td><input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input"></td>
    <td>$${(item.price * item.quantity).toFixed(2)}</td>
    <td><button class="remove-btn" data-id="${item.id}">Remove</button></td>
  `;
}

// Helper function to create color selector for first category
function getColorSelector(item) {
  return `
    <select class="color-select select-option" data-id="${item.id}">
      <option value="orange" ${item.color === 'orange' ? 'selected' : ''}>Orange</option>
      <option value="red" ${item.color === 'red' ? 'selected' : ''}>Red</option>
      <option value="black" ${item.color === 'black' ? 'selected' : ''}>Black</option>
      <option value="grey" ${item.color === 'grey' ? 'selected' : ''}>Grey</option>
      <option value="dark-grey" ${item.color === 'dark-grey' ? 'selected' : ''}>Dark Grey</option>
    </select>
  `;
}

// Helper function to create size selector for first category
function getSizeSelector(item) {
  return `
    <select class="size-select select-option" data-id="${item.id}">
      <option value="XS" ${item.size === 'XS' ? 'selected' : ''}>XS</option>
      <option value="S" ${item.size === 'S' ? 'selected' : ''}>Small</option>
      <option value="L" ${item.size === 'L' ? 'selected' : ''}>Large</option>
      <option value="XL" ${item.size === 'XL' ? 'selected' : ''}>XL</option>
    </select>
  `;
}

// Update color in cart
function updateColor(productId, newColor) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(p => p.id == productId);
  if (item) item.color = newColor;
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}

// Update size in cart
function updateSize(productId, newSize) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(p => p.id == productId);
  if (item) item.size = newSize;
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}

// Update quantity in cart
function updateQuantity(productId, newQuantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(p => p.id == productId);
  if (item && newQuantity > 0) item.quantity = parseInt(newQuantity, 10);
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

// Update cart summary
function updateCartSummary() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.querySelector('.cart-summary p strong').textContent = `Subtotal: $${subtotal.toFixed(2)}`;
}
