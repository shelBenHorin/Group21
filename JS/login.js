document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Clear previous error messages and remove red borders
    const existingError = document.querySelector('.dynamic-error');
    if (existingError) {
        existingError.remove(); // Remove any previous error message
    }
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    emailField.style.border = ''; // Reset border
    passwordField.style.border = ''; // Reset border

    const email = emailField.value.trim();
    const password = passwordField.value.trim();

    let isValid = true;

    // Check if email field is empty
    if (email.length === 0) {
        emailField.style.border = '2px solid red'; // Add red border to the email field
        isValid = false;
    }

    // Check if password field is empty
    if (password.length === 0) {
        passwordField.style.border = '2px solid red'; // Add red border to the password field
        isValid = false;
    }

    // Show an error message if any field is empty
    if (!isValid) {
        const errorMessage = document.createElement('span');
        errorMessage.textContent = 'Please fill both fields.';
        errorMessage.className = 'dynamic-error'; // Add a class for styling

        // Append the error message to the form
        const form = document.getElementById('login-form');
        form.appendChild(errorMessage);

        return; // Stop further execution
    }

    // If both fields are filled
    alert('Sign-in successful!');
    window.location.href = 'feed.html';

function resetForm() {
    document.getElementById('login-form').reset();

}})