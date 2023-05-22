const express = require("express");
const jwt = require("jsonwebtoken");

const Workout = require("../models/Workout");

const router = express.Router();

router.use((req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  try {
    const { userId } = jwt.verify(token, "secretKey");
    req.userId = userId;
    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(401).json({ message: "Invalid access token" });
  }
});

router.post("/workouts", async (req, res) => {
  const { title, reps, load } = req.body;

  if (!title || !reps || !load) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const workout = new Workout({
      user: req.userId,
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

router.get("/workouts", async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.userId });
    res.json({ workouts });
  } catch (error) {
    console.error("Error retrieving workouts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
