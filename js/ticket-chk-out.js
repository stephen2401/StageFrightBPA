
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
    if (generalTicketSelect.checked) {
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
    if (vipTicketSelect.checked) {
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

// Checkout functionality
document.querySelector(".checkout-btn").onclick = () => {
    document.querySelector(".title").innerHTML = "Checkout";
    document.querySelector(".checkout-cont").innerHTML = `
        <div class="success-container">
            <div class="success-icon">&#10004;</div>
            <h1>Thanks for your purchase!</h1>
            <button class="back-btn">Back</button>
        </div>`;

    document.querySelector(".back-btn").onclick = () => location.reload();
};


