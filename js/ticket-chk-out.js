const plansSelectors = document.querySelectorAll(".plans");

console.log("text", plansSelectors);


plansSelectors.forEach((planSelector) => {
    planSelector.addEventListener("click", (event) => {
        // console.log(event);

        if(event.target.checked && event.target.value === "general-ticket-select") {
         //console.log("general-ticket-select");
         const ticketCost = 25.00;
         let ticketCount = document.getElementById("ticket-count").value = 1;
         document.querySelector(".ticket-type-description").innerHTML = "General Ticket " + "x" + ticketCount;
         document.querySelector(".ticket-type-amount").innerHTML = "$25.00";
         document.querySelector(".ticket-total").innerHTML = "US $" + (ticketCost * ticketCount);
        

        
        }
        if(event.target.checked && event.target.value === "vip-ticket-select") {
          //console.log("vip-ticket-select");
          const ticketCost = 55.00;
          let ticketCount1 = document.getElementById("ticket-count1").value = 1;

          document.querySelector(".ticket-type-description").innerHTML = "VIP Ticket " + "x" + ticketCount1;
          document.querySelector(".ticket-type-amount").innerHTML = "$55.00";
          document.querySelector(".ticket-total").innerHTML = "US $" + (ticketCost * ticketCount1);
        }
    });
});
//Credit cart and billing info.





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
