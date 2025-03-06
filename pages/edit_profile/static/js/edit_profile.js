document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("edit-profile-form");
    const fileInput = document.getElementById("profile-picture");
    const fileFeedback = document.getElementById("file-feedback");
    const deleteButton = document.querySelector(".delete-profile-btn");

    // Update file feedback when a file is selected
    fileInput.addEventListener("change", function () {
        fileFeedback.textContent = this.files.length > 0 ? "File selected!" : "No file chosen";
    });

    // Delete button confirmation
    deleteButton.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            window.location.href = "/delete_user";
        }
    });

    // Handle form submission
    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        console.log("Form submission triggered");

        // Get form inputs
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const usernameError = document.getElementById("usernameError") || createErrorElement("usernameError", form);
        const emailError = document.getElementById("emailError") || createErrorElement("emailError", form);
        const passwordError = document.getElementById("passwordError") || createErrorElement("passwordError", form);

        let isValid = true;
        usernameError.textContent = emailError.textContent = passwordError.textContent = "";

        // Username Validation (Only check if changed)
        const originalUsername = form.getAttribute("data-original-username");
        if (username !== originalUsername) {
            if (!username) {
                usernameError.textContent = "Username is required.";
                isValid = false;
            } else if (username.length > 30) {
                usernameError.textContent = "Username must not exceed 30 characters.";
                isValid = false;
            } else {
                try {
                    const usernameCheck = await fetch(`/check_username/${username}`);
                    if (!usernameCheck.ok) throw new Error("Error checking username.");
                    const usernameExists = await usernameCheck.json();
                    if (usernameExists.exists) {
                        usernameError.textContent = "Username is already taken.";
                        isValid = false;
                    }
                } catch (error) {
                    console.error("Username check failed:", error);
                    usernameError.textContent = "Could not verify username. Try again.";
                    isValid = false;
                }
            }
        }

        // Email Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        // Password Validation (Only validate if changed)
        if (password) {
            const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
            if (!passwordPattern.test(password)) {
                passwordError.textContent = "Password must be at least 8 characters, include a number, and a special character.";
                isValid = false;
            }
        }

        if (!isValid) {
            console.log("Validation failed.");
            return;
        }

        // Prepare form data
        const formData = new FormData(form);

        try {
            const response = await fetch("/edit_profile", {
                method: "POST",
                body: formData,
            });

            // Check if response is JSON
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Expected JSON response but received HTML. Check Flask logs.");
            }

            const data = await response.json();

            if (response.ok) {
                console.log("Profile updated:", data);
                document.getElementById("formSuccess").textContent = "Profile updated successfully! Redirecting...";
                setTimeout(() => {
                    window.location.href = "/profile";
                }, 2000);
            } else {
                console.error("Update error:", data);
                document.getElementById("formSuccess").textContent = "Update failed: " + (data.error || "Unknown error");
            }
        } catch (error) {
            console.error("Network error:", error);
            document.getElementById("formSuccess").textContent = "Network error. Please try again.";
        }
    });

    // Helper function to create error elements if missing
    function createErrorElement(id, parent) {
        let element = document.createElement("span");
        element.id = id;
        element.className = "error-message";
        parent.appendChild(element);
        return element;
    }
});

console.log("edit_profile.js is successfully connected!");
