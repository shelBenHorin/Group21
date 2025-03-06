# What's in My Box?

## Overview
**What's in My Box?** is a web app where users can share and discover creative lunchbox recipes. The platform focuses on being user-friendly, visually appealing, and interactive. This phase of the project introduces backend functionalities using **MongoDB and Flask**, enabling user authentication, data storage, and retrieval.

---

## Order of Operations
1. **Sign Up** – New users create an account by providing a username, email, password, and an optional profile picture.
2. **Login** – Existing users enter their credentials to access the platform.
3. **Explore Feed** – Users browse recipes posted by them and other users, with images and short descriptions.
4. **Click on a Recipe** – Users can click on any recipe from the feed or their profile to view the full details, including ingredients and instructions.
5. **Share a Recipe** – Users fill out a form to post a new recipe with a title, description, ingredients, and an optional image.
6. **Search Recipes** – Users can search for specific recipes by their name, tags, or users.
7. **View Personal Profile** – Users can access their profile page from the navigation bar to see all their posted recipes in one place.
8. **Logout** – Users can log out from their session securely by clicking log out on the navigation bar.

---

## Screenshots
1. **Login Page** – Displays a welcome message and an allows users to enter their credentials to access the platform if they are signed up, if not they can go to sign up. ![image](https://github.com/user-attachments/assets/edaaa011-7725-450e-b0f2-a3cc588e0a77)
2. **Sign-Up Page** – Allows users to register with form validation, it they have an account they can go to login page. ![image](https://github.com/user-attachments/assets/5a7ed87b-1f7e-4a07-af21-d4d5eb81ce19)

3. **Feed** - Displays a grid of shared recipes, each with an image, title and user. Users can click on a recipe to view full details. ![image](https://github.com/user-attachments/assets/c82b9ff2-694b-477e-950f-cbd14715e33d)
4. **Recipe Page** – Displays the full details of a recipe, including its title, description, ingredients, recipe, dietary tage and image.![image](https://github.com/user-attachments/assets/73b12194-55d2-4543-a406-34daf8f82ae1) ![image](https://github.com/user-attachments/assets/7b302582-c426-4172-b502-67bd8ad30ea4)
5.  **Profile Page** – Shows all the recipes posted by a specific user. ![image](https://github.com/user-attachments/assets/71fa9755-1ab0-4633-8ab1-db879198a08e)

6. **Post Page** – Provides a form where users can submit a new recipe by adding a title, description, ingredients, recipe, dietary tags and an optional image. ![image](https://github.com/user-attachments/assets/73704f39-7190-44ae-be8a-f6bcf2194539)
7. **Search Page** – Allows users to search for recipes, tags, and other users, helping them quickly find relevant content. ![image](https://github.com/user-attachments/assets/b87ac313-0317-43b9-acab-61788ba0c378)

8. **Search Results Page** – Displays the search results based on user queries. Recipes, users, and tags matching the input are listed dynamically, allowing users to navigate directly to the relevant content.![image](https://github.com/user-attachments/assets/1625ce6c-4402-4227-a07b-7d0caacdb3c6)

---

## Clarifications
To test the platform, you have two options for logging in:

1. **Sign Up with a New User** 
   - You can create a new account by signing up.  
   - **Important:** Remember the password you set, as you will need it to log in after registration.  

2. **Use an Existing Test Account**  
   - **Email:** `adicohen@gmail.com`  
   - **Password:** `adi123!!`  

## Running the AnalyzeDB Page

To run the **AnalyzeDB** page and view the database analysis, you need to execute the following command in the terminal:
python analyzeDB.py

### AnalyzeDB screenshots:
1. Users collection: ![WhatsApp Image 2025-03-06 at 16 56 56_3b06cf56](https://github.com/user-attachments/assets/08e09b0a-69b3-44f9-a20e-8705e3c3dc3f)
2. Recipes collection: ![WhatsApp Image 2025-03-06 at 16 57 15_27c27e87](https://github.com/user-attachments/assets/ec9c4edf-e1a7-479e-9c00-91514b2d2300)

