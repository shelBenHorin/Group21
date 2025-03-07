
    const form = document.getElementById("edit-profile-form");
    const fileInput = document.getElementById("profile-picture");
    const fileFeedback = document.getElementById("file-feedback");
    const deleteButton = document.querySelector(".delete-profile-btn");
    const formSuccess = document.getElementById("formSuccess");


    // Update file feedback when a file is selected
    fileInput.addEventListener("change", function () {
    fileFeedback.textContent = this.files.length > 0 ? "File selected!" : "No file chosen";
    });

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("Form submission triggered");

    // Get current user data
    const originalUsername = form.getAttribute("data-original-username");  // Store original username
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // const usernameError = document.getElementById("usernameError") || createErrorElement("usernameError", form);
    // const emailError = document.getElementById("emailError") || createErrorElement("emailError", form);
    // const passwordError = document.getElementById("passwordError") || createErrorElement("passwordError", form);
    const usernameError = document.getElementById("usernameError") ;
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError") ;


    let isValid = true;
    usernameError.textContent = emailError.textContent = passwordError.textContent = "";

    // **Check username only if changed**
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

    // ✅ Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    }

    // ✅ Password Validation (Only validate if changed)
    if (password) {
        const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!passwordPattern.test(password)) {
            passwordError.textContent = "Password must be at least 8 characters, include a number, and a special character.";
            isValid = false;
        }
    }

    if (!isValid) {
        console.log("❌ Validation failed.");
        return;
    }

    // ✅ Prepare form data
    const formData = new FormData(form);

    try {
        const response = await fetch("/edit_profile", {
            method: "POST",
            // headers: { "X-Requested-With": "XMLHttpRequest" },
            body: formData
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Expected JSON response but received HTML. Check Flask logs.");
        }

        const data = await response.json();

        if (response.ok) {
            console.log("✅ Profile updated:", data);
            formSuccess.textContent = "Profile updated successfully!";
            setTimeout(() => {
                window.location.href = "/profile";
            }, 2000);
        } else {
            console.error("❌ Update error:", data);
            formSuccess.textContent = "Update failed: " + (data.error || "Unknown error");
        }
    } catch (error) {
        console.error("❌ Network error:", error);
        formSuccess.textContent = "Network error. Please try again.";
    }
});

console.log("edit_profile.js is successfully connected!");
