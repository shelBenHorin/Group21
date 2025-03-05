document.getElementById('login-form').addEventListener('submit', async function (event) {
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
        document.getElementById('login-form').appendChild(errorMessage);
        return;

        //
        // const form = document.getElementById('login-form');
        // form.appendChild(errorMessage);
        // return;
    }

    // successful sign-in - message and move to feed
    // alert('Sign-in successful!');

    try {
        const response = await fetch('/login', {
            method: 'POST',
            body: new FormData(document.getElementById('login-form'))
        });

        const contentType = response.headers.get('content-type');

        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Expected JSON response but received HTML. Check Flask logs.');
        }

        const data = await response.json();

        if (response.ok) {
            console.log("✅ Login successful:", data);
            window.location.href = data.redirect;
        } else {
            console.error("❌ Login failed:", data);
            const errorMessage = document.createElement('span');
            errorMessage.textContent = data.error || "Invalid credentials";
            errorMessage.className = 'dynamic-error';
            document.getElementById('login-form').appendChild(errorMessage);
        }
    } catch (error) {
        console.error("❌ Network error:", error);
        const errorMessage = document.createElement('span');
        errorMessage.textContent = "Network error. Please try again.";
        errorMessage.className = 'dynamic-error';
        document.getElementById('login-form').appendChild(errorMessage);
    }
});
//     window.location.href = 'feed';
//
// });
//
// // reset the form
// function resetForm() {
//     document.getElementById('login-form').reset();
// }
