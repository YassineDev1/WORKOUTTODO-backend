const express = require("express");
const auth = require("../middleware/auth");
const Workout = require("../models/Workout");

const router = express.Router();

router.post("/workouts", auth, async (req, res) => {
  const { title, reps, load } = req.body;
console.log(req);
  if (!title || !reps || !load) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const workout = new Workout({
      user: req.user.email, 
      title,
      reps,
      load,
    });

    await workout.save();

    res.status(201).json({ message: "Workout created successfully", workout });
  } catch (error) {
    console.error("Error creating workout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/workouts",auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.email });
    res.json({ workouts });
  } catch (error) {
    console.error("Error retrieving workouts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Update a workout
router.put("/workouts/:id", auth, async (req, res) => {
  const { title, reps, load } = req.body;

  if (!title || !reps || !load) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user.email },
      { title, reps, load },
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.json({ message: "Workout updated successfully", workout });
  } catch (error) {
    console.error("Error updating workout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a workout
router.delete("/workouts/:id", auth, async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      user: req.user.email,
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error("Error deleting workout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a specific workout
router.get("/workouts/:id", auth, async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user.email,
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.json({ workout });
  } catch (error) {
    console.error("Error retrieving workout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
