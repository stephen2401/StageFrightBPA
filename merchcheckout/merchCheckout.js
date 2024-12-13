
document.getElementById("merch-checkout").onsubmit = function (event) {
    event.preventDefault();
    
    const fullName = document.getElementById("name").value;
    const merchEmail = document.getElementById("email").value;
    const merchPhone = document.getElementById("phone").value;
    const merchAddress = document.getElementById("address").value;
    const merchCity = document.getElementById("city").value;
    const merchZip = document.getElementById("zip").value;
    const merchCountry = document.getElementById("country").value;
    const merchCard = document.getElementById("card-number").value;
    const merchExpiry = document.getElementById("expiry-date").value;
    const merchCVV = document.getElementById("cvv").value;

    localStorage.setItem("Full Name", fullName);
    localStorage.setItem("Merch Email", merchEmail);
    localStorage.setItem("Merch Phone", merchPhone);
    localStorage.setItem("Merch Address", merchAddress);
    localStorage.setItem("Merch City", merchCity);
    localStorage.setItem("Merch Zip", merchZip);
    localStorage.setItem("Merch Country", merchCountry);
    localStorage.setItem("Merch Card", merchCard);
    localStorage.setItem("Merch Expiry", merchExpiry);
    localStorage.setItem("Merch CVV", merchCVV);

    alert("Purchase successful! Thank You!");
    location.assign("merch.html");
};