const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

// configure dotenv
dotenv.config({ path: "./config.env" });

// express app
const app = express();

// cross origin resource sharing
app.use(
  cors({
    origin: "*",
  })
);

//middleware
app.use(express.json());

// app.use(morgan("dev"));

// route
app.use("/api/workouts", workoutRoutes);
app.use("/api/users", userRoutes);


//error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    error: message,
  });
});

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      // console.log(`server is listening at port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
