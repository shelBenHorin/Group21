document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Reset error messages and styles
    const existingError = document.querySelector('.dynamic-error');
    if (existingError) {
        existingError.remove();
    }

    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    emailField.style.border = '';
    passwordField.style.border = '';

    const email = emailField.value.trim();
    const password = passwordField.value.trim();
    let isValid = true;

    // Validate email field
    if (!email) {
        emailField.style.border = '2px solid red';
        isValid = false;
    }

    // Validate password field
    if (!password) {
        passwordField.style.border = '2px solid red';
        isValid = false;
    }

    // Display error message if there is an empty field
    if (!isValid) {
        const errorMessage = document.createElement('span');
        errorMessage.textContent = 'Please fill both fields.';
        errorMessage.className = 'dynamic-error';

        const form = document.getElementById('login-form');
        form.appendChild(errorMessage);
        return;
    }

    // successful sign-in - message and move to feed
    alert('Sign-in successful!');
    window.location.href = 'feed.html';
});

// reset the form
function resetForm() {
    document.getElementById('login-form').reset();
}
