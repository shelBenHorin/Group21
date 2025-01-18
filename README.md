## Project Overview

**"What's In My Box"** is a web app where users can share and discover creative lunchbox recipes.  
The platform focuses on being user-friendly, visually appealing, and interactive.  
This phase of the project implements the client-side functionalities using **HTML**, **CSS**, and **JavaScript**.

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
4. **Search Page**: Currently non-functional. The next phase will include real-time filtering based on user input.
5. **Interactive Navigation**: A consistent navigation bar links users to the feed, profile, search, and recipe-sharing sections.

---

## Validations and Forms

- **Forms**:
  - **Sign-Up Form**: Validates username under 30 characters, correct email pattern, and password (must contain at least one number, one special character, and be at least 8 characters long).
  - **Recipe-Sharing Form**: Validates required fields.
  - **Sign-In Form**: Ensures both fields (email and password) are filled before submission.
- **Dynamic Validations**:
  - Checks for empty fields in forms.
  - Highlights invalid inputs with red borders and displays error messages.
- **Successful Submission**:
  - Displays a success message for 1 second.
  - Redirects to the feed page.

---

## Event Functions

1. **Login Form Submit**: Validates email and password fields, highlights errors, and redirects to the feed page on success.
2. **Signup Form Submit**: Validates username, email, and password, provides feedback for errors, and redirects to the feed page on success.
3. **Recipe Form Submit**: Ensures required fields (title, description, ingredients, recipe) are filled, shows error messages, and redirects to the feed page on success.
4. **Photo Upload Feedback**: (Post, Signup) Displays "File selected!" or "No file chosen" when a photo is uploaded.
5. **"Share" Button Click**: Validates recipe-sharing form inputs, displays success message, and redirects to the feed page on success.

---

## Responsive Design

The entire site uses responsive techniques to ensure functionality and aesthetics on all devices. Features include:
- **Media Queries**: Adapt layouts for different screen sizes.
- **Flexible Layouts**: CSS Grid and Flexbox for adaptable components.

---

## CSS Animations

- **Button Animations**: Smooth transitions and scaling effects on hover.
- **Images**: Zoom effects on hover in the feed and profile pages.

---

## Assumptions and Clarifications

1. **Multiple CSS Files Instead of One**  
   Each page has its own CSS file because the pages are designed differently, requiring unique styles for layout and functionality. This modular approach keeps the project organized and easier to manage (consulted with the course team).  

2. **Search Page is Still Not Functional**  
   The search page currently serves as a placeholder. The focus of this phase was on implementing core features like recipe sharing and the feed.  
   In the next phase, the search functionality will allow users to filter recipes dynamically.  

3. **Illustrative Content**  
   The recipes, images, and descriptions in the project are demo content created for demonstration purposes.  
   In the next phase, the site will display real user-generated content uploaded through the platform.  

4. **Sign-In Process**  
   Right now, signing in takes users straight to the feed without checking their credentials.  
   In the next phase, once we add a database, we’ll properly verify users before granting access.
