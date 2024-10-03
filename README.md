## Overview 🔎
Workout Buddy is a full stack web application built using the MERN stack that enables users to track and manage their workouts efficiently.
With an intuitive user interface, users can easily add, delete and specific workouts allowing them to maintain a personalized exercise 
routine. This app simplifies the processof organizing and monitoring workout progress, helping users stay motivated and achieve their fitness goals.

## Features ⚙️
- <b>User Authentication:</b> Secure user registration and login using JWT authentication and email verification through nodemailer.
- <b>CRUD Operation</b> : Allow users to create , read , update and delete thier workout plans.
- <b>Responsive Design</b>: The app is fully responsive, ensuring a seamless experience across all devices.

## Tech Stack 🛠️
- MongoDB
- Express.js
- React
- Node.js
- Mongoose

## How to run the project 🎮

Before running the project, ensure you have the following installed:
- Node.js (https://nodejs.org/)
- You can either install MongoDB locally in your system (https://www.mongodb.com/) or you can use cloud based MongoDB Atlas Database (https://www.mongodb.com/products/platform/atlas-database).

### 1. Clone the repository

    git clone https://github.com/RajeevRanjan5642/workout-app.git
    
### 2. Install all dependencies

    cd workout-app
    cd backend
    npm install
    cd ../frontend
    npm install
    
### 3. Configure evironment variables:
Create .env file in the backend folder and add the following

    PORT=<your-port-no>
    MONGO_URI=<your-mongodb-connection-string>
    SECRET=<your-secret-string>
    
### 3. Run the application locally
First run the server on a terminal (make sure you are in backend folder)
    
    npm run dev
    
Open new terminal and run the website 

    cd frontend
    npm install
    npm start
    
## Usage
- Create a new user account and log in.
- Add your workout specifying sets, reps, and weights.
- Monitor your progress.

## Deployment

The site is live at:

🔗 https://muscle-map.vercel.app/
