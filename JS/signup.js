function validateForm(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Clear any previous messages
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const formSuccess = document.getElementById('formSuccess');

    usernameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    formSuccess.textContent = '';

    // Get the input values
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Track validation status
    let isValid = true;

    // Username validation
    if (username.length === 0) {
        usernameError.textContent = 'Username is required.';
        isValid = false;
    } else if (username.length > 30) {
        usernameError.textContent = 'Username must not exceed 30 characters.';
        isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // Password validation
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(password)) {
        passwordError.textContent = 'Password must be at least 8 characters long, include a number, and a special character.';
        isValid = false;
    }

    // If all validations pass
    if (isValid) {
        alert('Form submitted successfully!');
        formSuccess.textContent = 'Form submitted successfully!';
        resetForm(); // Clear the form
        window.location.href = 'feed.html';

    }
}

function resetForm() {
    document.getElementById('signup-form').reset();
    document.getElementById('usernameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
}

// Attach the event listener
document.getElementById('signup-form').addEventListener('submit', validateForm);

