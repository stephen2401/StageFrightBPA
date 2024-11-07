const products = {
    category1: [
        { id: 1, name: "Product 1", image: "image1.jpg", price: "$20" },
        { id: 2, name: "Product 2", image: "image2.jpg", price: "$25" },
        { id: 3, name: "Product 3", image: "image3.jpg", price: "$30" }
    ],
    category2: [
        { id: 4, name: "Product 4", image: "image4.jpg", price: "$35" },
        { id: 5, name: "Product 5", image: "image5.jpg", price: "$40" },
        { id: 6, name: "Product 6", image: "image6.jpg", price: "$45" }
    ],
    category3: [
        { id: 7, name: "Product 7", image: "image7.jpg", price: "$50" },
        { id: 8, name: "Product 8", image: "image8.jpg", price: "$55" },
        { id: 9, name: "Product 9", image: "image9.jpg", price: "$60" }
    ],
    all: [
        { id: 1, name: "Product 1", image: "image1.jpg", price: "$20" },
        { id: 2, name: "Product 2", image: "image2.jpg", price: "$25" },
        { id: 3, name: "Product 3", image: "image3.jpg", price: "$30" },
        { id: 4, name: "Product 4", image: "image4.jpg", price: "$35" },
        { id: 5, name: "Product 5", image: "image5.jpg", price: "$40" },
        { id: 6, name: "Product 6", image: "image6.jpg", price: "$45" },
        { id: 7, name: "Product 7", image: "image7.jpg", price: "$50" },
        { id: 8, name: "Product 8", image: "image8.jpg", price: "$55" },
        { id: 9, name: "Product 9", image: "image9.jpg", price: "$60" }
    ]
};

// Cart array
let cart = [];

// Render products based on category
function renderProducts(category) {
    const container = document.getElementById('product-container');
    container.innerHTML = '';
    products[category].forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'crab';
        productCard.innerHTML = `
            <div class="img" style="background-image: url('${product.image}');"></div>
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button class="crabShop" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        container.appendChild(productCard);
    });
}

// Change active category button
function changeCategory(category) {
    const buttons = document.querySelectorAll('.crabButton');
    buttons.forEach(button => button.classList.remove('active'));
    document.querySelector(`.crabButton[onclick="changeCategory('${category}')"]`).classList.add('active');
    renderProducts(category);
}

// Add product to cart
function addToCart(productId) {
    const product = [...products.category1, ...products.category2, ...products.category3, ...products.all].find(product => product.id === productId);
    cart.push(product);
    document.getElementById('cart-count').textContent = cart.length;
}

// Toggle cart visibility
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.toggle('visible');
    updateCartItems();
}

// Update cart items in the modal
function updateCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>${item.price}</span>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

// Checkout function
function checkout() {
    alert('Proceeding to checkout...');
}

window.onload = () => {
    renderProducts('all');
};