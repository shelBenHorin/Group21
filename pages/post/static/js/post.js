document.addEventListener("DOMContentLoaded", function () {
    const shareButton = document.querySelector(".post-btn");
    const form = document.getElementById("post-form");
    const photoInput = document.getElementById("photo");
    const fileFeedback = document.getElementById("file-feedback");
    const formSuccess = document.getElementById('formSuccess');


    // Update feedback when a photo is selected
    photoInput.addEventListener("change", function () {
        fileFeedback.textContent = this.files.length > 0 ? "File selected!" : "No file chosen";
    });

     formSuccess.textContent = '';

    // Function to validate required fields
    function validateForm() {
        const requiredFields = [
            document.getElementById("title"),
            document.getElementById("description"),
            document.getElementById("ingredients"),
            document.getElementById("recipe"),
        ];
        let isValid = true;

        // Reset styles and error messages
        requiredFields.forEach((field) => (field.style.border = ""));
        const existingError = document.querySelector(".dynamic-error");
        if (existingError) existingError.remove();

        // Validate each field
        requiredFields.forEach((field) => {
            if (!field.value.trim()) {
                field.style.border = "2px solid red";
                isValid = false;
            }
        });

        // Show error message if validation fails
        if (!isValid) {
            const errorMessage = document.createElement("span");
            errorMessage.textContent = "Please fill all required fields.";
            errorMessage.className = "dynamic-error";
            form.appendChild(errorMessage);
        }

        return isValid;
    }

    // Handle "Share" button click
    shareButton.addEventListener("click", function (e) {
        e.preventDefault();

        if (validateForm()) {
        formSuccess.textContent = 'Form submitted successfully!';
        formSuccess.classList.add('success-message');
        setTimeout(() => {
            window.location.href = 'feed'; // Redirect after 1 second
             resetForm();
        }, 2000);
        }
            // form.reset(); // Clear the form
            // window.location.href = "feed.html"; // Redirect to the feed screen

               // If valid, show success and reset form

    });
});
