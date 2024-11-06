
const plansSelectors = document.querySelectorAll(".plans");

console.log("text", plansSelectors);

plansSelectors.forEach((planSelector) => {
    planSelector.addEventListener("click", (event) => {
        // console.log(event);

        if(event.target.checked && event.target.value === "general-ticket-select") {
         //console.log("general-ticket-select");

         document.querySelector(".ticket-type-description").innerHTML = "General Ticket";
         document.querySelector(".ticket-type-amount").innerHTML = "$25.00";
         document.querySelector(".ticket-total").innerHTML = "US $25.00";

        }
        if(event.target.checked && event.target.value === "vip-ticket-select") {
          //console.log("vip-ticket-select");

          document.querySelector(".ticket-type-description").innerHTML = "VIP Ticket";
          document.querySelector(".ticket-type-amount").innerHTML = "$55.00";
          document.querySelector(".ticket-total").innerHTML = "US $55.00";
        }
    });
});
// checkout

document.querySelector(".checkout-btn").onclick = () =>
    {
        document.querySelector(".title").innerHTML = "Checkout";
        document.querySelector('.checkout-cont').innerHTML = `
        <div class="success-container">

        <div class="success-icon">
        &#10004;

        </div>
        <h1>Thanks for your purchase! </h1>

        <button class="back-btn">
        Back
        </button>
        </div>    
        `;

        document.querySelector(".back-btn").onclick = (e) => {
            location.reload();
        };
    };