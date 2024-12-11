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

document.getElementById("sign-up").onsubmit = function (event)  {
  event.onclick
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
//document.getElementById("sign-up").onsubmit = () => location.reload();
