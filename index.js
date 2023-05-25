const express = require("express");
const mongoose = require("mongoose");
const auth = require("./routes/users");
const workouts = require("./routes/workouts");
const signup = require("./routes/auth");
const cors = require('cors')
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // or specify the origin(s) of your client application
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.use("/api", auth);
app.use("/api", workouts);
app.use("/api", signup);


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
