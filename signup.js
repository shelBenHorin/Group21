document.addEventListener("DOMContentLoaded", () => {
    const profilePictureInput = document.getElementById("profile-picture");
    const profilePicturePreview = document.getElementById("profile-picture-preview");
    const postCounter = document.getElementById("post-counter");
    const uploadPostButton = document.getElementById("upload-post");
    let postCount = 0;

    // Preview uploaded profile picture
    profilePictureInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profilePicturePreview.innerHTML = `<img src=\"${e.target.result}\" alt=\"Profile Picture\" style=\"max-width: 150px; max-height: 150px;\">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // Increment post counter
    uploadPostButton.addEventListener("click", () => {
        postCount += 1;
        postCounter.textContent = postCount;
    });

    // Edit profile functionality (example)
    document.getElementById("edit-profile").addEventListener("click", () => {
        alert("Edit Profile functionality can be implemented here.");
    });
});
