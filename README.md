# What's in My Box?

## Overview
**What's in My Box?** is a web app where users can share and discover creative lunchbox recipes. The platform focuses on being user-friendly, visually appealing, and interactive. This phase of the project introduces backend functionalities using **MongoDB and Flask**, enabling user authentication, data storage, and retrieval.

---

## Key Features
-  **Responsive Design** – Works well on desktops, tablets, and mobile devices.
-  **Share Recipes** – Users can post recipes with titles, descriptions, ingredients, and optional photos.
-  **Dynamic Feed** – Recipes are displayed in an easy-to-navigate grid layout.
-  **Form Validations** – Provides real-time feedback for input errors.
-  **Backend Integration** – Connected to **MongoDB** for storing user data and recipes.
-  **Search Page** – Allowes user to search easily for a specific recipe, user or tags.

---

## Order of Operations
1. **Sign Up** – Users create an account by providing a username, email, password, and an optional profile picture.
2. **Login** – Users enter their credentials to access the platform.
3. **Explore Feed** – Users browse recipes posted by others, with images and short descriptions.
4. **Click on a Recipe** – Users can click on any recipe from the feed or their profile to view the full details, including ingredients and instructions.
5. **Share a Recipe** – Users fill out a form to post a new recipe with a title, description, ingredients, and an optional image.
6. **Search Recipes** – Users can search for specific recipes, tags, or other users.
7. **View Personal Profile** – Users can access their profile page to see all their posted recipes in one place.
8. **Logout** – Users can log out from their session securely.

---

## Screenshots
1. **Login Page** – Displays a welcome message and an allows users to enter their credentials to access the platform if they are signed up, if not they can go to sign up. ![image](https://github.com/user-attachments/assets/edaaa011-7725-450e-b0f2-a3cc588e0a77)
2. **Sign-Up Page** – Allows users to register with form validation, it they have an account they can go to login page. ![image](https://github.com/user-attachments/assets/5a7ed87b-1f7e-4a07-af21-d4d5eb81ce19)

3. **Feed** - Displays a grid of shared recipes, each with an image, title and user. Users can click on a recipe to view full details. ![image](https://github.com/user-attachments/assets/c82b9ff2-694b-477e-950f-cbd14715e33d)
4. **Recipe Page** – Displays the full details of a recipe, including its title, description, ingredients, recipe, dietary tage and image.![image](https://github.com/user-attachments/assets/73b12194-55d2-4543-a406-34daf8f82ae1) ![image](https://github.com/user-attachments/assets/7b302582-c426-4172-b502-67bd8ad30ea4)
5.  **Profile Page** – Shows all the recipes posted by a specific user. !!!!!!!!!!!!!!!!!!!!!!!!


6. **Post Page** – Provides a form where users can submit a new recipe by adding a title, description, ingredients, recipe, dietary tags and an optional image. ![image](https://github.com/user-attachments/assets/73704f39-7190-44ae-be8a-f6bcf2194539)
7. **Search Page** – Allows users to search for recipes, tags, and other users, helping them quickly find relevant content. ![image](https://github.com/user-attachments/assets/b87ac313-0317-43b9-acab-61788ba0c378)

8. **Search Results Page** – Displays the search results based on user queries. Recipes, users, and tags matching the input are listed dynamically, allowing users to navigate directly to the relevant content.![image](https://github.com/user-attachments/assets/1625ce6c-4402-4227-a07b-7d0caacdb3c6)



---

## Assumptions and Clarifications

1. **Multiple CSS Files Instead of One**  
   Each page has its own CSS file because the pages are designed differently, requiring unique styles for layout and functionality. This modular approach keeps the project organized and easier to manage (consulted with the course team).  

4. **Sign-In Process**  
   Right now, signing in takes users straight to the feed without checking their credentials.  
   In the next phase, once we add a database, we’ll properly verify users before granting access.
