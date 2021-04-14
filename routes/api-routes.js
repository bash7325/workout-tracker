const db = require("../models");

module.exports = (app) => {
  // get info for the workouts page
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
  // get info for the range page
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
          totalWeight: { $sum: "$exercises.weight" },
          totalSets: { $sum: "$exercises.sets" },
          totalReps: { $sum: "$exercises.reps" },
          totalDistance: { $sum: "$exercises.distance" },
        },
      },
      { $sort: { _id: -1 } },
      { $limit: 7 },
    ])
      .then((WorkoutDB) => {
        console.log(WorkoutDB);
        res.json(WorkoutDB);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  // submit new completed workouts
  app.post("/api/workouts/", (req, res) => {
    db.Workout.create(req.body)
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
  // update workouts
  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(
      { _id: req.params.id },
      { exercises: req.body }
    )
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
};
