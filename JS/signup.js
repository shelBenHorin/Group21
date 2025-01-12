//
// document.getElementById('signup-form').addEventListener('submit', function (event) {
//     // Prevent the form from being submitted
//     event.preventDefault();
//
//     // Clear any previous error messages (if applicable)
//     // console.log("Clear any previous error messages");
//     console.clear()
//     // Get the values of the inputs
//     const username = document.getElementById('username').value.trim()
//     const email = document.getElementById('email').value.trim()
//     const password = document.getElementById('password').value.trim()
//
//
//       console.log("Validating username...");
//
//     // Username validation
//     if (username.length === 0) {
//         alert('Username is required!')
//         console.log("no user name")
//         return
//     }
//     if (username.length > 30) {
//         console.log("too long user name")
//         alert('Username must not exceed 30 characters!')
//         return
//     }
//     else {
//         console.log("Username is valid.");
//     }
//
//             console.log("Validating email...");
//
//     // Email validation
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(email)) {
//         console.log("email problem")
//         alert('Please enter a valid email address.')
//         return // Stop further validation
//     }
//     else {
//         console.log("Email is valid.")
//     }
//
//     console.log("Validating password...")
//     // Password validation (at least 8 characters, includes a number and a special character)
//     const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
//     if (!passwordPattern.test(password)) {
//         console.log("password problem")
//         alert('Password must be at least 8 characters long, include a number, and a special character.')
//         return // Stop further validation
//     }
// else {
//         console.log("Password is valid.")
//     }
//
//
//     // If all validations pass
//     console.log("All validations passed.")
//     alert('Form submitted successfully!')
//     resetForm(); // Clear the form
// })
//
// function resetForm() {
//     document.getElementById('signup-form').reset()
// }

  // function validateForm(event) {
  //           // Prevent the default form submission behavior
  //           event.preventDefault();
  //
  //           // Debugging: Trace and clear console
  //           console.clear();
  //           console.log("Form submission triggered");
  //
  //           // Get the input values
  //           const username = document.getElementById('username').value.trim();
  //           const email = document.getElementById('email').value.trim();
  //           const password = document.getElementById('password').value.trim();
  //
  //           // Flag to track validation status
  //           let validationFailed = false;
  //
  //           console.log("Validating username...");
  //
  //           // Username validation
  //           if (username.length === 0) {
  //               console.trace("Username validation failed (empty)");
  //               alert('Username is required!');
  //               validationFailed = true;
  //           } else if (username.length > 30) {
  //               console.trace("Username validation failed (too long)");
  //               alert('Username must not exceed 30 characters!');
  //               validationFailed = true;
  //           } else {
  //               console.log("Username is valid.");
  //           }
  //
  //           console.log("Validating email...");
  //
  //           // Email validation
  //           const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //           if (!emailPattern.test(email)) {
  //               console.trace("Email validation failed");
  //               alert('Please enter a valid email address.');
  //               validationFailed = true;
  //           } else {
  //               console.log("Email is valid.");
  //           }
  //
  //           console.log("Validating password...");
  //
  //           // Password validation
  //           const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  //           if (!passwordPattern.test(password)) {
  //               console.trace("Password validation failed");
  //               alert('Password must be at least 8 characters long, include a number, and a special character.');
  //               validationFailed = true;
  //           } else {
  //               console.log("Password is valid.");
  //           }
  //
  //           // Stop execution if validation failed
  //           if (validationFailed) {
  //               console.log("Validation failed. Stopping submission.");
  //               return;
  //           }
  //
  //           console.log("All validations passed. Submitting form...");
  //           alert('Form submitted successfully!');
  //           resetForm(); // Reset the form
  //       }
  //
  //       function resetForm() {
  //           console.log("Resetting form...");
  //           document.getElementById('signup-form').reset();
  //       }
  //
  //       // Remove existing listener to prevent duplication
  //       document.getElementById('signup-form').removeEventListener('submit', validateForm);
  //       console.log('Removed existing event listener');
  //
  //       // Attach the event listener once
  //       document.getElementById('signup-form').addEventListener('submit', validateForm);
  //       console.log('Added event listener');

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

