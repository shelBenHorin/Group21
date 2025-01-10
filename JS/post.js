document.addEventListener("DOMContentLoaded", function () {
    const shareButton = document.querySelector(".post-btn"); // The "Share" button
    const form = document.getElementById("post-form"); // The form with id 'post-form'

    // Function to validate required fields (excluding dietary tags)
    function validateForm() {
        const title = document.getElementById("title");
        const description = document.getElementById("description");
        const ingredients = document.getElementById("ingredients");
        const recipe = document.getElementById("recipe");
        const photoUpload = document.getElementById("photo");

        // Check if required fields are filled
        if (!title.value || !description.value || !ingredients.value || !recipe.value || !photoUpload.files.length) {
            alert("Please fill out all required fields.");
            return false; // Prevent form submission if validation fails
        }
        return true; // All required fields are filled
    }

    // Add an event listener to the "share" button
    shareButton.addEventListener("click", function (e) {
        console.log("Share button clicked!");  // Check if the button click is registered

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

document.addEventListener("DOMContentLoaded", function () {
    // Get the file input and preview container elements
    const photoInput = document.getElementById("photo");
    const previewContainer = document.getElementById("photo-preview-container");

    // Listen for changes in the file input
    photoInput.addEventListener("change", function (e) {
        const file = e.target.files[0]; // Get the selected file

        if (file) {
            const reader = new FileReader(); // Create a FileReader to read the file

            reader.onload = function (event) {
                const imgElement = document.createElement("img"); // Create an image element
                imgElement.src = event.target.result; // Set the source of the image to the file URL

                // Clear previous preview (if any) and add the new image
                previewContainer.innerHTML = ""; // Clear previous content
                previewContainer.appendChild(imgElement); // Append the new image
            };

            reader.readAsDataURL(file); // Read the file as a data URL
        }
    });
});