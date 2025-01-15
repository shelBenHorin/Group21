function validateForm(event) {
    event.preventDefault();

    // Input fields and error messages
    const usernameField = document.getElementById('username');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');

    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const formSuccess = document.getElementById('formSuccess');

    // Clear errors and styles
    [usernameField, emailField, passwordField].forEach((field) =>
        field.classList.remove('input-error')
    );

    usernameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    formSuccess.textContent = '';

    // Validation logic
    const username = usernameField.value.trim();
    const email = emailField.value.trim();
    const password = passwordField.value.trim();
    let isValid = true;

    // Username validation
    if (!username) {
        usernameError.textContent = 'Username is required.';
        usernameField.classList.add('input-error');
        isValid = false;
    } else if (username.length > 30) {
        usernameError.textContent = 'Username must not exceed 30 characters.';
        usernameField.classList.add('input-error');
        isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailField.classList.add('input-error');
        isValid = false;
    }

    // Password validation
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(password)) {
        passwordError.textContent =
            'Password must be at least 8 characters long, include a number, and a special character.';
        passwordField.classList.add('input-error');
        isValid = false;
    }

    // If valid, show success and reset form
    if (isValid) {
        formSuccess.textContent = 'Form submitted successfully!';
        formSuccess.classList.add('success-message');
        resetForm();
        window.location.href = 'feed.html';
    }
}

function resetForm() {
    const form = document.getElementById('signup-form');
    form.reset();

    // Clear error messages
    document.getElementById('usernameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    // Remove input error styles
    const inputs = form.querySelectorAll('.input-field');
    inputs.forEach((input) => input.classList.remove('input-error'));
}

// Attach event listener
document
    .getElementById('signup-form')
    .addEventListener('submit', validateForm);