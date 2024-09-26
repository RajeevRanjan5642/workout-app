const Workout = require("./../models/workoutModel");
const mongoose = require("mongoose");
const errorHandler = require("./../utils/errorHandler");
// get all workouts
exports.getAllWorkouts = async (req, res, next) => {
  const user_id = req.user._id;
  try {
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (err) {
    next(err);
  }
};

// get a single workout
exports.getWorkout = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(errorHandler(404, "Workout not found"));
  }
  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return next(errorHandler(404, "Workout not found"));
    }
    res.status(200).json(workout);
  } catch (err) {
    next(err);
  }
};

// create a new workout
exports.createWorkout = async (req, res, next) => {
  const { title, load, reps } = req.body;
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (err) {
    next(err);
  }
};

// delete a workout
exports.deleteWorkout = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(errorHandler(400, "No such workout"));
  }
  try {
    const workout = await Workout.findByIdAndDelete(id);
    res.status(200).json(workout);
  } catch (err) {
    next(err);
  }
};

// update a workout
exports.updateWorkout = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(errorHandler(400, "No such workout"));
  }
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedWorkout);
  } catch (err) {
    next(err);
  }
};
