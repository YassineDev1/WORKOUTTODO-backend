const express = require("express");
const mongoose = require("mongoose");
const auth = require("./routes/users");
const workouts = require("./routes/workouts");
const signup = require("./routes/auth");
require("dotenv").config();

const app = express();
app.use(express.json());


uri = process.env.MONGO_URI
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 30000,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.use("/api", auth);
app.use("/api", workouts);
app.use("/api", signup);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
