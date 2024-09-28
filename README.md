## Overview 🔎
Workout Buddy is a full stack web application built using the MERN stack that enables users to track and manage their workouts efficiently.
With an intuitive user interface, users can easily add, delete and specific workouts allowing them to maintain a personalized exercise 
routine. This app simplifies the processof organizing and monitoring workout progress, helping users stay motivated and achieve their fitness goals.

## Features ⚙️
- <b>User Authentication:</b> Secure user registration and login using JWT authentication.
- <b>Exercise Logging:</b> Users can log different exercises with details such as name, load, reps and sets.
- <b>Workout History</b>: View a comprehensive history of all logged workouts, with options to edit or delete specific workouts.

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
    cd workout-buddy
    
### 2. Install all dependencies

    cd backend
    npm install
    
### 3. Create .env file
Create .env file in the backend folder and add the following

    PORT=<your-port-no>
    MONGO_URI=<your-mongodb-connection-string>
    SECRET=<your-secret-string>
    
### 3. Run the project locally
First run the server on a terminal (make sure you are in backend folder)
    
    npm run dev
    
Open new terminal and run the website 

    cd frontend
    npm install
    npm start
### Note :

Please add following to the package.json file in the frontend folder iside the curly braces:

    "proxy": "http://localhost:< your-server-port-no >"
    
## Usage
- Create a new user account and log in.
- Add your workout specifying sets, reps, and weights.
- Monitor your progress.
