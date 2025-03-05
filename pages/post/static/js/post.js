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
            document.getElementById("photo"),
        ];
        let isValid = true;

        // Reset styles and error messages
        requiredFields.forEach((field) => field.style.border = "");
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

//         if (validateForm()) {
//         formSuccess.textContent = 'Form submitted successfully!';
//         formSuccess.classList.add('success-message');
//         setTimeout(() => {
//             window.location.href = 'feed'; // Redirect after 1 second
//              resetForm();
//         }, 2000);
//         }
//
//
//     });
// });
       if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append("title", document.getElementById("title").value);
        formData.append("description", document.getElementById("description").value);
        formData.append("ingredients", document.getElementById("ingredients").value);
        formData.append("recipe", document.getElementById("recipe").value);

        const dietaryTags = [];
        document.querySelectorAll('input[name="dietary"]:checked').forEach((checkbox) => {
            dietaryTags.push(checkbox.value);
        });
        formData.append("dietaryTags", JSON.stringify(dietaryTags));

        const file = photoInput.files[0];
        if (file) {
            formData.append("photo", file);
        }

        fetch("/post", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            formSuccess.textContent = "Recipe posted successfully!";
            formSuccess.classList.add("success-message");

            setTimeout(() => {
                window.location.href = '/feed';
            }, 2000);
        })
        .catch(error => console.error("Error:", error));
    });
});