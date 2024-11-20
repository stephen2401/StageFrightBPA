
    const plansSelectors = document.querySelectorAll(".plans");
const ticketTypeDescription = document.querySelector(".ticket-type-description");
const ticketTypeAmount = document.querySelector(".ticket-type-amount");
const ticketTotal = document.querySelector(".ticket-total");

// General ticket elements
const generalTicketSelect = document.getElementById("general-ticket-select");
const generalTicketCount = document.getElementById("ticket-count");
const generalPlusBtn = document.querySelector(".general-tickets .plus");
const generalMinusBtn = document.querySelector(".general-tickets .minus");

// VIP ticket elements
const vipTicketSelect = document.getElementById("vip-ticket-select");
const vipTicketCount = document.getElementById("ticket-count1");
const vipPlusBtn = document.querySelector(".vip-tickets .plus");
const vipMinusBtn = document.querySelector(".vip-tickets .minus");

let ticketCost = 0;
let ticketCount = 1;

// Function to update the display based on ticket type and count
function updateTicketDisplay(ticketName, ticketPrice, count) {
    ticketTypeDescription.innerHTML = `${ticketName} x ${count}`;
    ticketTypeAmount.innerHTML = `$${ticketPrice.toFixed(2)}`;
    ticketTotal.innerHTML = `US $${(ticketPrice * count).toFixed(2)}`;
}

// Event listeners for ticket type selection
plansSelectors.forEach((planSelector) => {
    planSelector.addEventListener("click", (event) => {
        if (event.target.checked && event.target.value === "general-ticket-select") {
            ticketCost = 25.00;
            ticketCount = 1; // Reset ticket count to 1
            generalTicketCount.value = ticketCount; // Update general ticket count display
            vipTicketCount.value = 1; // Reset VIP ticket count display in case it was changed
            updateTicketDisplay("General Ticket", ticketCost, ticketCount);
        }
        if (event.target.checked && event.target.value === "vip-ticket-select") {
            ticketCost = 55.00;
            ticketCount = 1; // Reset ticket count to 1
            vipTicketCount.value = ticketCount; // Update VIP ticket count display
            generalTicketCount.value = 1; // Reset General ticket count display in case it was changed
            updateTicketDisplay("VIP Ticket", ticketCost, ticketCount);
        }
    });
});

// General ticket count adjustment
generalPlusBtn.addEventListener("click", () => {
    if (generalTicketSelect.checked && ticketCount < 10) {
        ticketCount++;
        generalTicketCount.value = ticketCount;
        updateTicketDisplay("General Ticket", 25.00, ticketCount);
    }
});

generalMinusBtn.addEventListener("click", () => {
    if (generalTicketSelect.checked && ticketCount > 1) {
        ticketCount--;
        generalTicketCount.value = ticketCount;
        updateTicketDisplay("General Ticket", 25.00, ticketCount);
    }
});

// VIP ticket count adjustment
vipPlusBtn.addEventListener("click", () => {
    if (vipTicketSelect.checked && ticketCount < 10) {
        ticketCount++;
        vipTicketCount.value = ticketCount;
        updateTicketDisplay("VIP Ticket", 55.00, ticketCount);
    }
});

vipMinusBtn.addEventListener("click", () => {
    if (vipTicketSelect.checked && ticketCount > 1) {
        ticketCount--;
        vipTicketCount.value = ticketCount;
        updateTicketDisplay("VIP Ticket", 55.00, ticketCount);
    }
});

// Initial checkout button action
document.querySelector(".checkout-btn").onclick = () => {
    // Hide ticket selection and show payment form
    document.querySelector(".checkout-cont").style.display = "none";
    document.querySelector(".checkout-form").style.display = "flex";
    if (generalTicketSelect.checked) {
        sessionStorage.setItem("General Ticket", generalTicketCount.value);
        console.log(generalTicketCount.value, "General Ticket");
        sessionStorage.removeItem("VIP Ticket");
    }
    if (vipTicketSelect.checked) {
        sessionStorage.setItem("VIP Ticket", vipTicketCount.value);
        console.log(vipTicketCount.value, "VIP Ticket");
        sessionStorage.removeItem("General Ticket");
    }
};

// Payment form validation
document.getElementById("payment-form").onsubmit = function (event) {
    event.preventDefault(); // Prevent page reload on submit

    const email = document.getElementById("email").value;
    const cardNumber = document.getElementById("card-number").value;
    const expiry = document.getElementById("expiry").value;
    const cvv = document.getElementById("cvv").value;

    // Basic validation for card number, expiry, and CVV
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cardPattern = /^\d{16}$/;
    const expiryPattern = /^\d{2}\/\d{2}$/;
    const cvvPattern = /^\d{3}$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email.");
        return;
    }
    if (!cardPattern.test(cardNumber)) {
        alert("Please enter a valid 16-digit card number.");
        return;
    }
    if (!expiryPattern.test(expiry)) {
        alert("Please enter a valid expiry date (MM/YY).");
        return;
    }
    if (!cvvPattern.test(cvv)) {
        alert("Please enter a valid 3-digit CVV.");
        return;
    }

    

    // Show confirmation message
    document.querySelector(".title").innerHTML = "Checkout Complete";
    document.querySelector(".checkout-form").innerHTML = `
        <div class="success-container">
            <div class="success-icon">&#10004;</div>
            <h1>Thank you for your purchase!</h1>
            <p>A receipt has been sent to ${email}.</p>
            <button class="back-btn">Back</button>
        </div>
    `;
    if (sessionStorage.getItem("General Ticket") > 1) {
    let ticketData = sessionStorage.getItem("General Ticket");
    localStorage.setItem("General Ticket", ticketData);
    sessionStorage.removeItem("General Ticket");
    }
    if (sessionStorage.getItem("VIP Ticket") > 1) {
        let ticketData = sessionStorage.getItem("VIP Ticket");
        localStorage.setItem("VIP Ticket", ticketData);
        sessionStorage.removeItem("VIP Ticket");
        }
    document.querySelector(".back-btn").onclick = () => location.reload();
};

// Optional: handle cancel button if it exists
const cancelButton = document.querySelector(".cancel-btn");
if (cancelButton) {
    cancelButton.onclick = () => location.reload();
}

// Optional: handle return button if it exists
const returnButton = document.querySelector(".return-btn");
if (returnButton) {
    returnButton.onclick = () => location.assign("tours.html");
}

    