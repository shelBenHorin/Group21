function validateForm(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Clear any previous messages and error styles
    const usernameField = document.getElementById('username');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');

    usernameField.classList.remove('input-error');
    emailField.classList.remove('input-error');
    passwordField.classList.remove('input-error');

    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const formSuccess = document.getElementById('formSuccess');

    usernameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    formSuccess.textContent = '';

    // Get the input values
    const username = usernameField.value.trim();
    const email = emailField.value.trim();
    const password = passwordField.value.trim();

    // Track validation status
    let isValid = true;

    // Username validation
    if (username.length === 0) {
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
        passwordError.textContent = 'Password must be at least 8 characters long, include a number, and a special character.';
        passwordField.classList.add('input-error');
        isValid = false;
    }

    // If all validations pass
    if (isValid) {
        formSuccess.textContent = 'Form submitted successfully!';
        formSuccess.classList.add('success-message');
        resetForm(); // Clear the form
        window.location.href = 'feed.html';
    }
}

function resetForm() {
    document.getElementById('signup-form').reset();
    document.getElementById('usernameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    // Clear input error styles
    const inputs = document.querySelectorAll('.input-field');
    inputs.forEach((input) => input.classList.remove('input-error'));
}

// Attach the event listener
document.getElementById('signup-form').addEventListener('submit', validateForm);
