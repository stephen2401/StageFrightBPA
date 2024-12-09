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
        { id: 7, name: "Product 4", image: "image4.jpg", price: 35 },
        { id: 8, name: "Product 5", image: "image5.jpg", price: 40 },
        { id: 9, name: "Product 6", image: "image6.jpg", price: 45 }
    ],
    category3: [
        { id: 10, name: "Product 7", image: "image7.jpg", price: 50 },
        { id: 11, name: "Product 8", image: "image8.jpg", price: 55 },
        { id: 12, name: "Product 9", image: "image9.jpg", price: 60 }
    ],
    all: [
        { id: 1, name: "helosks", image: "image1.jpg", price: 20 },
        { id: 2, name: "Product 2", image: "image2.jpg", price: 25 },
        { id: 3, name: "Product 3", image: "image3.jpg", price: 30 },
        { id: 4, name: "Product 4", image: "image4.jpg", price: 35 },
        { id: 5, name: "Product 5", image: "image5.jpg", price: 40 },
        { id: 6, name: "Product 6", image: "image6.jpg", price: 45 },
        { id: 7, name: "Product 7", image: "image7.jpg", price: 50 },
        { id: 8, name: "Product 8", image: "image8.jpg", price: 55 },
        { id: 9, name: "Product 9", image: "image9.jpg", price: 60 },
        { id: 10, name: "jjjjj", image: "image7.jpg", price: 50 },
        { id: 11, name: "Product 8", image: "image8.jpg", price: 55 },
        { id: 12, name: "Product 9", image: "image9.jpg", price: 60 }
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
        productCard.appendChild(productPrice);
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
    const activeButton = document.querySelector(`.crabButton[data-category="${category}"]`);
    if (activeButton) activeButton.classList.add('active');
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
