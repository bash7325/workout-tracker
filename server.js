const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workoutTracker",
  { useNewUrlParser: true, useFindAndModify: false }
);

require("./workout-tracker/routes/api-routes")(app);
require("./workout-tracker/routes/html-routes")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}..`);
});
