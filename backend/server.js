const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const workoutRoutes = require("./routes/workoutRoutes");

// configure dotenv
dotenv.config({ path: "./config.env" });

// express app
const app = express();

//middleware
app.use(express.json());

// app.use((req, res, next) => {
//   console.log(req.path);
//   console.log(req.method);
//   next();
// });

app.use(morgan("dev"));

// route
app.use("/api/workouts", workoutRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
  });
});

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`server is listening at port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
