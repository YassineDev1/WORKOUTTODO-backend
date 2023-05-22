const express = require("express");
const mongoose = require("mongoose");
const auth = require("./routes/users");
const workouts = require("./routes/workouts");
const signup = require("./routes/auth");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/gym", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
