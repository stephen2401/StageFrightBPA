const products = {
    category1: [
        { id: 1, name: "T-Shirt (Logo 1)", image: "/images/BPA T-Shirt (White Logo 1).png", price: "20" },
        { id: 2, name: "T-Shirt (Logo 2)", image: "/images/BPA T-Shirt (White Logo 2).png", price: "25" },
        { id: 3, name: "Product 3", image: "image3.jpg", price: "30" }
    ],
    category2: [
        { id: 4, name: "Product 4", image: "image4.jpg", price: "35" },
        { id: 5, name: "Product 5", image: "image5.jpg", price: "40" },
        { id: 6, name: "Product 6", image: "image6.jpg", price: "45" }
    ],
    category3: [
        { id: 7, name: "Product 7", image: "image7.jpg", price: "50" },
        { id: 8, name: "Product 8", image: "image8.jpg", price: "55" },
        { id: 9, name: "Product 9", image: "image9.jpg", price: "60" }
    ],
    all: [
        { id: 1, name: "Product 1", image: "image1.jpg", price: "20" },
        { id: 2, name: "Product 2", image: "image2.jpg", price: "25" },
        { id: 3, name: "Product 3", image: "image3.jpg", price: "30" },
        { id: 4, name: "Product 4", image: "image4.jpg", price: "35" },
        { id: 5, name: "Product 5", image: "image5.jpg", price: "40" },
        { id: 6, name: "Product 6", image: "image6.jpg", price: "45" },
        { id: 7, name: "Product 7", image: "image7.jpg", price: "50" },
        { id: 8, name: "Product 8", image: "image8.jpg", price: "55" },
        { id: 9, name: "Product 9", image: "image9.jpg", price: "60" }
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
        productPrice.textContent = product.price;

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
    // Retrieve the cart from localStorage or initialize it if not present
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const productExists = cart.find(item => item.id === productId);

    if (productExists) {
        // Increase the quantity if the product already exists
        productExists.quantity += 1;
    } else {
        // Find the product details from the 'all' category
        const product = products.all.find(item => item.id === productId);
        if (product) {
            cart.push({ ...product, quantity: 1 });
        }
    }

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    // Display a notification
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
  
    // Remove the notification after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
}

// Automatically display Category 1 on page load and update the cart count
document.addEventListener("DOMContentLoaded", () => {
    renderProducts("category1"); // Render Category 1 products
    updateCartCount(); // Ensure the cart count is updated on page load
});
