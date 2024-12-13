const products = {
    category1: [
        { id: 1, name: "T-Shirt (Logo 1)", image: "/images/BPA T-Shirt (White Logo 1).png", price: 20 },
        { id: 2, name: "T-Shirt (Logo 2)", image: "/images/BPA T-Shirt (White Logo 2).png", price: 20 },
        { id: 3, name: "Zip-Up Hoodie (logo 1)", image: "/images/BPA Zip (White Logo 1).png", price: 30 },
        { id: 4, name: "Zip-Up Hoodie (Logo 2)", image: "/images/BPA Zip (White Logo 2).png", price: 20 },
        { id: 5, name: "Hoodie (Logo 1)", image: "/images/BPA Hoodie (White Logo 1).png", price: 20 },
        { id: 6, name: "Hoodie (logo 2)", image: "/images/BPA Hoodie (White Logo 2).png", price: 30 }
    ],
    category2: [
        { id: 7, name: "Song 1", image: "/images/BPA Album Cover.png", price: 35 },
        { id: 8, name: "Song 2", image: "/images/BPA Album Cover.png", price: 40 },
        { id: 9, name: "Song 3", image: "/images/BPA Album Cover.png", price: 45 }
    ],
    category3: [
        { id: 10, name: "Poster 1", image: "/images/Poster 1 (1).png", price: 50 },
        { id: 11, name: "Poster 2", image: "/images/Poster 2.jpg", price: 55 },
    ],
    all: [
        { id: 1, name: "T-Shirt (Logo 1)", image: "/images/BPA T-Shirt (White Logo 1).png", price: 20 },
        { id: 2, name: "T-Shirt (Logo 2)", image: "/images/BPA T-Shirt (White Logo 2).png", price: 20 },
        { id: 3, name: "Zip-Up Hoodie (logo 1)", image: "/images/BPA Zip (White Logo 1).png", price: 30 },
        { id: 4, name: "Zip-Up Hoodie (Logo 2)", image: "/images/BPA Zip (White Logo 2).png", price: 20 },
        { id: 5, name: "Hoodie (Logo 1)", image: "/images/BPA Hoodie (White Logo 1).png", price: 20 },
        { id: 6, name: "Hoodie (logo 2)", image: "/images/BPA Hoodie (White Logo 2).png", price: 30 },
        { id: 7, name: "Song 1", image: "/images/BPA Album Cover.png", price: 35 },
        { id: 8, name: "Song 2", image: "/images/BPA Album Cover.png", price: 40 },
        { id: 9, name: "Song 3", image: "/images/BPA Album Cover.png", price: 45 },
        { id: 10, name: "Poster 1", image: "/images/Poster 1 (1).png", price: 50 },
        { id: 11, name: "Poster 2", image: "/images/Poster 2.jpg", price: 55 }
    ]
};

// Render products based on category
function renderProducts(category) {
    const container = document.getElementById('product-container');
    container.innerHTML = ''; // Clear previous content

    products[category].forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'crab';

        const productImage = document.createElement('div');
        productImage.className = 'img';
        productImage.style.backgroundImage = `url('${product.image}')`;

        const productName = document.createElement('h3');
        productName.textContent = product.name;

        const productPrice = document.createElement('p');
        productPrice.textContent = `$${product.price}`;

        const addButton = document.createElement('button');
        addButton.className = 'crabShop';
        addButton.textContent = 'Add to Cart';
        addButton.onclick = () => addToCart(product.id);

        productCard.appendChild(productImage);
        productCard.appendChild(productName);
        productCard.appendChild(addButton);

        container.appendChild(productCard);
    });
}

// Function to add products to the cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productExists = cart.find(item => item.id === productId);

    if (productExists) {
        productExists.quantity += 1;
    } else {
        let product;
        for (let category in products) {
            product = products[category].find(item => item.id === productId);
            if (product) break;
        }

        if (product) {
            cart.push({ ...product, quantity: 1 });
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showNotification();
}

// Update cart count in the HTML
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

// Change active category button
function changeCategory(category) {
    const buttons = document.querySelectorAll('.crabButton');
    buttons.forEach(button => button.classList.remove('active'));
    document.querySelector(`.crabButton[onclick="changeCategory('${category}')"]`).classList.add('active');
    renderProducts(category);
}


// Function to show a notification when an item is added to the cart
function showNotification() {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerText = "Item added to cart!";
    document.body.appendChild(notification);
  
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Automatically display Category 1 on page load and update the cart count
document.addEventListener("DOMContentLoaded", () => {
    renderProducts("category1"); // Render Category 1 products
    updateCartCount(); // Ensure the cart count is updated on page load
});
// Function to render New Arrivals
function renderNewArrivals() {
    const newArrivals = [
        { id: 1, name: "T-Shirt (Logo 1)", image: "/images/BPA T-Shirt (White Logo 1).png", price: 20 },
        { id: 10, name: "Poster 1", image: "/images/Poster 1 (1).png", price: 50 },
        { id: 11, name: "Poster 2", image: "/images/Poster 2.jpg", price: 55 },
    ];

    const newArrivalsContainer = document.getElementById('new-arrivals');
    newArrivalsContainer.innerHTML = ''; // Clear previous content

    newArrivals.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'crab';

        const productImage = document.createElement('div');
        productImage.className = 'img';
        productImage.style.backgroundImage = `url('${product.image}')`;

        const productName = document.createElement('h3');
        productName.textContent = product.name;

        const productPrice = document.createElement('p');
        productPrice.textContent = `$${product.price}`;

        const addButton = document.createElement('button');
        addButton.className = 'crabShop';
        addButton.textContent = 'Add to Cart';
        addButton.onclick = () => addToCart(product.id);

        productCard.appendChild(productImage);
        productCard.appendChild(productName);
        productCard.appendChild(addButton);

        newArrivalsContainer.appendChild(productCard);
    });
}

// Render New Arrivals on page load
document.addEventListener('DOMContentLoaded', () => {
    renderNewArrivals(); // Populate New Arrivals section
    renderProducts("category1"); // Render Category 1 products by default
    updateCartCount(); // Ensure cart count is updated
});