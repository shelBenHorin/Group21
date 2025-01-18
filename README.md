## Project Overview

What's In My Box is a simple and responsive web app where users can share and discover lunchbox recipes. 
The platform is designed to be user-friendly, visually appealing, and interactive.
This project focuses on the client-side of the application, built using HTML, CSS, and JavaScript.

---

## Key Features
- **Responsive Design**: The site works well on desktops, tablets, and mobile devices.
- **Share Recipes**: Users can post recipes with titles, descriptions, ingredients, and optional photos.
- **Dynamic Feed**: Recipes are displayed in an easy-to-navigate grid layout.
- **Form Validations**: Provides real-time feedback for input errors to ensure better user experience.
- **Interactive Navigation**: A consistent navigation bar links to all the main sections of the site.

---

## Main Flows on the Site
1. **Sign Up**: Users create an account with an optional profile picture, username, email, and password.
2. **Share a Recipe**: Users can fill out a simple form to post recipes, complete with an optional image upload.
3. **Explore the Feed**: Browse recipes displayed with images and short descriptions. Clicking on a recipe shows more details.
4. **Search Page**: Currently, the search page is non functionall. The next phase will include real-time filtering based on user input.
5. **Interactive Navigation**: A consistent navigation bar links users to the feed, profile, search, and recipe-sharing sections.
---

## Validations and Forms
- **Dynamic Validations**:
  - Checks for empty fields in forms.
  - Highlights invalid inputs with red borders and displays error messages.

- **Forms**:
  - Sign-up form validates username, email, and password strength.
  - Recipe-sharing form validates required fields dynamically.
  - sign in forms validates both fields - password and email, are filled when trying to log in.

---

## Responsive Design
The entire site uses responsive techniques to ensure functionality and aesthetics on all devices. Features include:
- **Media Queries**: Adapt layouts for different screen sizes.
- **Flexible Layouts**: CSS Grid and Flexbox for adaptable components.

---

## CSS Animations
- **Button Animations**: Smooth transitions and scaling effects on hover.
- **Image Effects**: Zoom effects for images in the feed and in the profile on hover.

---

## Event Functions
1. **Login Validation**:
   - Validates email and password fields.
   - Highlights errors and redirects to the feed page on success.

2. **Signup Validation**:
   - Checks username, email, and password inputs.
   - Provides feedback for errors and clears the form on success.

3. **Recipe Form Validation**:
   - Ensures required fields (title, description, ingredients, and recipe) are filled.
   - Displays error messages or redirects to the feed page on success.

4. **Photo Upload Feedback**:
   - Shows "File selected!" or "No file chosen" when a photo is uploaded.
---

## Assumptions and Clarifications

#### 1. Multiple CSS Files Instead of One
Each page has its own CSS file because the pages are designed differently, requiring unique styles for layout and functionality. This modular approach keeps the project organized and easier to manage (consulted with the course team). 

#### 2. Search Page is Still Not Functional
The search page currently serves as a placeholder. The focus of this phase was on implementing core features like recipe sharing and the feed. 
In the next phase, the search functionality will allow users to filter recipes dynamically.

#### 3. Illustrative Content
The recipes, images, and descriptions in the project are demo content we created for demonstration purposes. 
In the next phase, the site will display real user-generated content uploaded through the platform.
