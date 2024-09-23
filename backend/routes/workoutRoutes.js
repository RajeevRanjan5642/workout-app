const express = require("express");
const workoutController = require("./../controllers/workoutController");
const router = express.Router();

router
  .route("/")
  .get(workoutController.getAllWorkouts)
  .post(workoutController.createWorkout);

router
  .route("/:id")
  .get(workoutController.getWorkout)
  .delete(workoutController.deleteWorkout)
  .patch(workoutController.updateWorkout);

module.exports = router;
