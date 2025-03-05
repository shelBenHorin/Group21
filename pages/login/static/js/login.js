document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');

    const email = emailField.value.trim();
    const password = passwordField.value.trim();

    if (!email || !password) {
        document.getElementById('emailError').textContent = "Email and password are required.";
        return;
    }

    console.log("📤 Sending login request...", { email, password });

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' // Ensure correct content type
            },
            body: new URLSearchParams({ email, password }) // Encode form data correctly
        });

        const data = await response.json();

        if (response.ok) {
            console.log("✅ Login successful:", data);
            window.location.href = data.redirect;
        } else {
            console.error("❌ Login failed:", data);
            document.getElementById('emailError').textContent = data.error || "Invalid credentials.";
        }
    } catch (error) {
        console.error("❌ Network error:", error);
        document.getElementById('emailError').textContent = "Network error. Try again.";
    }
});
