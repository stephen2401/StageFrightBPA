document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.querySelector('.cart-container');
  const cartSummary = document.querySelector('.cart-summary p strong');

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    updateCartSummary();
    return;
  }

  // Mapping product IDs to their respective images
  const productImages = {
    1: {
      grey: '/images/BPA T-Shirt (Grey Logo 1).png',
      darkgrey: '/images/BPA T-Shirt (White Logo 1).png',
      black: '/images/BPA T-Shirt (Black Logo 1) (1).png',
      red: '/images/BPA T-Shirt (Red Logo 1).png',
      orange: '/images/BPA T-Shirt (Orange Logo 1).png',
    },
    2: {
      grey: '/images/product2-grey.png',
      darkgrey: '/images/product2-darkgrey.png',
      black: '/images/product2-black.png',
      red: '/images/BPA T-Shirt (Red Logo 1).png',
      orange: '/images/product2-orange.png',
    },
    3: {
      grey: '/images/product3-grey.png',
      darkgrey: '/images/product3-darkgrey.png',
      black: '/images/product3-black.png',
      red: '/images/product3-red.png',
      orange: '/images/product3-orange.png',
    }
  };

  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-id', item.id);

    if (!productImages[item.id]) {
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
            <img src="/images/BPA T-Shirt (Grey Logo ${item.id}).png" alt="Product Image">
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
            <div class="color-box grey" data-color="grey" data-product-id="${item.id}"></div>
            <div class="color-box dark-grey" data-color="darkgrey" data-product-id="${item.id}"></div>
            <div class="color-box black" data-color="black" data-product-id="${item.id}"></div>
            <div class="color-box red" data-color="red" data-product-id="${item.id}"></div>
            <div class="color-box orange" data-color="orange" data-product-id="${item.id}"></div>
          </div>
          <div class="size-options">
            <h3>Size</h3>
            <div class="size-box xs" data-size="XS">XS</div>
            <div class="size-box s" data-size="S">S</div>
            <div class="size-box m" data-size="M">M</div>
            <div class="size-box l" data-size="L">L</div>
            <div class="size-box xl" data-size="XL">XL</div>
          </div>
        </div>`;
    }

    cartContainer.appendChild(cartItem);
  });

  // Event listeners for quantity changes, removal, color selection, and size selection
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

  document.querySelectorAll('.color-box').forEach(box => {
    box.addEventListener('click', (e) => {
      const selectedColor = e.target.dataset.color;
      const productId = e.target.dataset.productId;
      const productImage = e.target.closest('.cart-item').querySelector('.product-image img');

      if (productImages[productId] && productImage) {
        productImage.src = productImages[productId][selectedColor];
        productImage.alt = `${selectedColor} T-shirt`;
      }

      e.target.parentNode.querySelectorAll('.color-box').forEach(box => box.classList.remove('selected'));
      e.target.classList.add('selected');
    });
  });

  document.querySelectorAll('.size-box').forEach(box => {
    box.addEventListener('click', (e) => {
      const selectedSize = e.target.dataset.size;

      e.target.parentNode.querySelectorAll('.size-box').forEach(box => box.classList.remove('selected'));
      e.target.classList.add('selected');
      console.log(`Size ${selectedSize} selected for this item.`);
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