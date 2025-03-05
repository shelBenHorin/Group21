document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");
    const fileInput = document.getElementById("profile-picture");
    const fileFeedback = document.getElementById("file-feedback");
    const formSuccess = document.getElementById("formSuccess");

    // ✅ Update file feedback
    fileInput.addEventListener("change", function () {
        fileFeedback.textContent = this.files.length > 0 ? "File selected!" : "No file chosen";
    });

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        console.log("📤 Form submission triggered");

        // ✅ Validate input fields
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const usernameError = document.getElementById("usernameError");
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");

        let isValid = true;
        usernameError.textContent = emailError.textContent = passwordError.textContent = "";

        if (!username) {
            usernameError.textContent = "Username is required.";
            isValid = false;
        } else if (username.length > 30) {
            usernameError.textContent = "Username must not exceed 30 characters.";
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!passwordPattern.test(password)) {
            passwordError.textContent = "Password must be at least 8 characters, include a number, and a special character.";
            isValid = false;
        }

        if (!isValid) {
            console.log("❌ Validation failed.");
            return;
        }

        // ✅ Prepare form data
        const formData = new FormData(form);

        // try {
            const response = await fetch("/signup", {
                method: "POST",
                body: formData,
            });

            // ✅ Check if response is JSON
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Expected JSON response but received HTML. Check Flask logs.");
            }

            const data = await response.json();

            if (response.ok) {
                console.log("✅ Signup successful:", data);
                formSuccess.textContent = "Signup successful! Redirecting...";
                setTimeout(() => {
                    window.location.href = data.redirect;
                }, 2000);
            } else {
                console.error("❌ Signup error:", data);
                formSuccess.textContent = "Signup failed: " + (data.error || "Unknown error");
            }
        // } catch (error) {
        //     // console.error("❌ Network error:", error);
        //     formSuccess.textContent = "Network error. Please try again.";
        // }
    });
});

console.log("✅ signup.js is successfully connected!");
