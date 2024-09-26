const express = require("express");
const workoutController = require("./../controllers/workoutController");
const requireAuth = require("./../middleware/requireAuth");

const router = express.Router();

// require auth for all routes
router.use(requireAuth);

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
