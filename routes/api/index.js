const router = require("express").Router()
const {Workout} = require ("../../models")
//Aggregate the duration of workouts
router.get ("/workouts", async (req, res) => {
const allWorkouts = await Workout.aggregate([
    {
        $addFields: {
            totalDuration: {
                $sum: "$exercises.duration"
            }
        }
    }
]) 
    res.json(allWorkouts)
});
// Create a new workout
router.post ("/workouts", async (req, res) => {
const newWorkout = await Workout.create({})
res.json(newWorkout)

});

// Modify workouts by id
router.put ("/workouts/:id", async (req, res) => {
    const updateWorkout = await Workout.findByIdAndUpdate(req.params.id,
        {$push: {exercises: req.body}}, 
        {new: true})
        res.json(updateWorkout)
});
// Get a range of workouts from the past 7 days
router.get ("/workouts/range", async (req, res) => {
    const allWorkouts = await Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ]).sort({_id: -1}).limit(7)
        res.json(allWorkouts)
})
module.exports = router