
document.getElementById('signup-form').addEventListener('submit', function (event) {
    // Prevent the form from being submitted
    event.preventDefault();

    // Clear any previous error messages
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('usernameError').textContent = '';
    console.log("Clear any previous error messages")

    // Get the values of the inputs
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const username = document.getElementById('username').value.trim();


    // Validate the email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
       resetForm()
        return; // Stop further validation
    }

    // Validate the password (e.g., at least 8 characters, includes a number and a special character)
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(password)) {
        alert('Password must be at least 8 characters long, include a number, and a special character.');
        resetForm()
        return; // Stop further validation
    }
    if (username.length === 0) {
        alert('Username is required!');
        document.getElementById('username').reset();
        return;
    }
    if (username.length > 30) {
        alert('Username must not exceed 30 characters!');
        resetForm()
        return;
    }


     // If all validations pass
     alert('Form submitted successfully!');
    resetForm()
//
function resetForm() {
    document.getElementById('signup-form').reset();


}
});
