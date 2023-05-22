const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.String, ref: "User", required: true },
  title: { type: String, required: true },
  reps: { type: Number, required: true },
  load: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
