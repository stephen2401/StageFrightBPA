$('#form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(800);
  
});

document.getElementById("signup").onsubmit = function (event) {
  // Prevent form submission
  event.preventDefault();

  // Get form values
  const firstName = document.getElementById("first_name").value.trim();
  const lastName = document.getElementById("last_name").value.trim();
  const emailSignUp = document.getElementById("emailSet").value.trim();
  const phoneNumber = document.getElementById("phone").value.trim();
  const password = document.getElementById("passwordSet").value.trim();

  // Validation flags
  let isValid = true;
  let errorMessage = "";

  // Check if all fields are filled
  if (!firstName || !lastName || !emailSignUp || !phoneNumber || !password) {
    errorMessage += "All fields are required.\n";
    isValid = false;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailSignUp)) {
    errorMessage += "Please enter a valid email address.\n";
    isValid = false;
  }

  // Validate phone number (basic validation for digits only)
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phoneNumber)) {
    errorMessage += "Please enter a valid 10-digit phone number.\n";
    isValid = false;
  }

  // Validate password (example: minimum 6 characters)
  if (password.length < 6) {
    errorMessage += "Password must be at least 6 characters long.\n";
    isValid = false;
  }

  if (isValid) {
    // Save to localStorage
    localStorage.setItem("First Name", firstName);
    localStorage.setItem("Last Name", lastName);
    localStorage.setItem("Emails", emailSignUp);
    localStorage.setItem("Phone", phoneNumber);
    localStorage.setItem("Password", password);

    alert("Signup successful!");
    location.reload();
  } else {
    // Show error messages
    alert(errorMessage);
  }
};





// Function to check email and password against localStorage
document.getElementById("login").onsubmit = function (event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve input values
  const inputEmail = document.getElementById("inputEmail").value;
  const inputPassword = document.getElementById("inputPassword").value;

  // Retrieve stored credentials from localStorage
  const storedEmail = localStorage.getItem("Emails");
  const storedPassword = localStorage.getItem("Password");

  // Check if both email and password match the stored values
  if (storedEmail && storedPassword) {
      if (inputEmail === storedEmail && inputPassword === storedPassword) {
          alert("Login successful!");
          location.reload();
          // Perform successful login actions here
          return true;
      } else {
          alert("Login failed. Please check your credentials.");
          return false; 
      }
  } else {
      console.error("No email or password found in localStorage.");
      alert("Please Sign up");
      return false; 
  }
  
};

// Example usage to set credentials for testing
// localStorage.setItem('Emails', 'user@example.com');
// localStorage.setItem('Password', 'securepassword');



