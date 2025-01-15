# What's In My Box

A web application designed to simplify recipe sharing and discovery. The platform allows users to share lunchbox recipes, browse other users' posts, and interact dynamically.

---

## Project Overview
This project implements the client-side functionality of the application using HTML, CSS, and JavaScript. It features a responsive design, interactive components, and dynamic validations.

---

## Key Features
- **Responsive Design (RWD)**: Ensures usability across various devices, including desktops, tablets, and mobile phones.
- **Recipe Sharing**: Users can post recipes with images, descriptions, and instructions.
- **Dynamic Feed**: A visually appealing feed displaying shared recipes.
- **Search Functionality**: Allows users to search for recipes based on keywords.
- **Real-Time Photo Preview**: Preview uploaded recipe images dynamically.
- **Form Validations**: Provides interactive feedback for form inputs.

---

## Main Flows on the Site
1. **User Registration**:
   - Includes username, email, and password validation.
   - Error messages are displayed dynamically for invalid inputs.

2. **Recipe Sharing**:
   - Users can fill out a form to share recipes, including the title, description, ingredients, and instructions.
   - An optional photo upload with real-time preview.

3. **Feed Display**:
   - A grid layout showcases all recipes with images and brief descriptions.
   - Clicking a recipe opens a detailed view.

4. **Search Page**:
   - Users can search for recipes using keywords from titles, ingredients, or descriptions.
   - Real-time filtering dynamically updates the results as the user types.

5. **Interactive Navigation**:
   - A consistent navigation bar links users to the feed, profile, search, and recipe-sharing sections.

---

## Validations and Forms
- **Dynamic Validations**:
  - Checks for empty fields in forms.
  - Highlights invalid inputs with red borders and displays error messages.

- **Forms**:
  - Sign-up form validates username, email, and password strength.
  - Recipe-sharing form validates required fields dynamically.

---

## Repeating Elements
- **Header and Footer**:
  - Consistently styled across all pages.
- **Navigation Bar**:
  - Uniform navigation elements on every page.
- **Error Styling**:
  - Reused error message styles and validation logic for consistency.

---

## Responsive Design
The entire site uses responsive techniques to ensure functionality and aesthetics on all devices. Features include:
- **Media Queries**:
  - Adapt layouts for different screen sizes.
- **Flexible Layouts**:
  - CSS Grid and Flexbox for adaptable components.

---

## CSS Animations
- **Button Animations**:
  - Smooth transitions and scaling effects on hover.
- **Feed Image Effects**:
  - Zoom effects for images in the feed on hover.

---

## Event Functions
1. **Form Validation**:
   - Checks required fields dynamically before form submission.
2. **Photo Preview**:
   - Displays a preview of uploaded recipe images.
3. **Search Filtering**:
   - Dynamically filters recipes based on user input on the Search Page.


---

## Assumptions and Design Decisions

#### 1. Why Style Multiple CSS Files Instead of One
The project uses multiple CSS files to keep the styles modular and maintainable. Each file is dedicated to a specific page or feature, making it easier to debug and scale the application.

#### 2. Why the Search Page is Still Not Functional
The search page currently serves as a placeholder. The focus of this phase was on implementing core features like recipe sharing and the feed. In the next phase, the search functionality will allow users to filter recipes dynamically.

#### 3. Illustrative Content
The recipes, images, and descriptions in the project are placeholders created for demonstration purposes. In future phases, the site will display real user-generated content uploaded through the platform.
