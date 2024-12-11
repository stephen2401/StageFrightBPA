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

  document.getElementById("signup").onsubmit = function (event)  {
  event.onsubmit = () => location.reload();

  const firstName = document.getElementById("first_name").value;
  const lastName = document.getElementById("last_name").value;
  const emailSignUp = document.getElementById("emailSet").value;
  const phoneNumber = document.getElementById("phone").value;
  const password = document.getElementById("passwordSet").value;


  localStorage.setItem("First Name", firstName);
  localStorage.setItem("Last Name", lastName);
  localStorage.setItem("Emails", emailSignUp);
  localStorage.setItem("Phone", phoneNumber);
  localStorage.setItem("Password", password);
  
};

/*
document.getElementById("login").onsubmit = function validateLogin(inputEmail, inputPassword) {
  const storedEmail = localStorage.getItem("Emails");
    const storedPassword = localStorage.getItem("Password");
    const inputEmail = document.getElementById("inputEmail").value;
    const inputPassword = document.getElementById("inputPassword").value;

    if (storedEmail && storedPassword) {
      if (inputEmail === storedEmail && inputPassword === storedPassword) {
          return true; // Login successful
      } else {
          return false; // Login failed
      }
  } else {
      console.error("No email or password found in localStorage.");
      return false; // Login failed because no credentials are stored
  }
}

const email = 'user@example.com'; // Replace with user input
const password = 'securepassword'; // Replace with user input

if (validateLogin(email, password)) {
    console.log("Login successful!");
} else {
    console.log("Login failed. Please check your credentials.");
}
*/

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
          console.log("Login successful!");
          location.reload();
          // Perform successful login actions here
          return true;
      } else {
          console.log("Login failed. Please check your credentials.");
          return false; 
      }
  } else {
      console.error("No email or password found in localStorage.");
      return false; 
  }
  
};

// Example usage to set credentials for testing
// localStorage.setItem('Emails', 'user@example.com');
// localStorage.setItem('Password', 'securepassword');



