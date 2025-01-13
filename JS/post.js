document.addEventListener("DOMContentLoaded", function () {
    const shareButton = document.querySelector(".post-btn"); // The "Share" button
    const form = document.getElementById("post-form"); // The form with id 'post-form'

    // Function to validate required fields
    function validateForm() {
        const title = document.getElementById("title");
        const description = document.getElementById("description");
        const ingredients = document.getElementById("ingredients");
        const recipe = document.getElementById("recipe");

        // Array to track all required fields (photo removed)
        const requiredFields = [title, description, ingredients, recipe];
        let isValid = true;

        // Remove previous error styles and message
        requiredFields.forEach((field) => {
            field.style.border = ""; // Reset the border
        });

        const existingError = document.querySelector(".dynamic-error");
        if (existingError) {
            existingError.remove(); // Remove previous error message
        }

        // Check each field and validate
        requiredFields.forEach((field) => {
            if (field.value.trim() === "") {
                field.style.border = "2px solid red"; // Add a red border to invalid fields
                isValid = false;
            }
        });

        // If there are invalid fields, show error message
        if (!isValid) {
            const errorMessage = document.createElement("span");
            errorMessage.textContent = "Please fill all required fields.";
            errorMessage.className = "dynamic-error"; // Add a class for styling
            form.appendChild(errorMessage); // Append the error message to the form
        }

        return isValid; // Return whether the form is valid or not
    }

    // Add an event listener to the "share" button
    shareButton.addEventListener("click", function (e) {
        console.log("Share button clicked!"); // Check if the button click is registered

        // Prevent default form submission (since the button is outside the form)
        e.preventDefault();

        // Validate the form
        if (validateForm()) {
            // If validation is successful, clear all fields
            form.reset(); // This will reset all the fields in the form

            // Optionally, navigate to the "feed" screen (adjust the URL as necessary)
            window.location.href = "feed.html"; // Assuming this is the URL for the "feed" screen
        }
    });
});
