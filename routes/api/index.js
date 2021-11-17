const router = require("express").Router()
const {Workout} = require ("../../models")

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

router.post ("/workouts", async (req, res) => {
const newWorkout = await Workout.create({})
res.json(newWorkout)

});


router.put ("/workouts/:id", async (req, res) => {
    const updateWorkout = await Workout.findByIdAndUpdate(req.params.id,
        {$push: {exercises: req.body}}, 
        {new: true})
        res.json(updateWorkout)
});

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