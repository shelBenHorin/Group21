document.getElementById('login-form').addEventListener('submit', function (event) {
     // Prevent the form from being submitted
     event.preventDefault();

     // Clear any previous error messages
     document.getElementById('emailError').textContent = '';
     document.getElementById('passwordError').textContent = '';
     console.log("Clear any previous error messages")

     // Get the values of the inputs
     const email = document.getElementById('email').value.trim();
     const password = document.getElementById('password').value.trim();

     // Validate the email
     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailPattern.test(email)) {
         alert ( 'Please enter a valid email address.');
         resetForm();
         return; // Stop further validation
     }

     // Validate the password (e.g., at least 8 characters, includes a number and a special character)
     const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
     if (!passwordPattern.test(password)) {
         alert ('Password must be at least 8 characters long, include a number, and a special character.');
         resetForm();
         return; // Stop further validation

     }

     // If all validations pass
     alert('Form submitted successfully!');

function resetForm() {
    document.getElementById('login-form').reset();


}})