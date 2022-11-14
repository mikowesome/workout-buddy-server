const Workout = require('../models/WorkoutModel.js')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({createdAt: -1})
        res.status(200).json(workouts)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

// get a single workout
const getSingleWorkout = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({error: "Workout doesn't exist"})
        }

        const workout = await Workout.findById(id)
        if (!workout) {
            res.status(404).json({error: "Workout doesn't exist"})
        } else {
            res.status(200).json(workout)
        }
    } catch (error) {
        
    }
}

// create a new workout
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({
            error: 'Please fill in all the fields',
            emptyFields
        })
    }

    try {
        const workout = await Workout.create({
            title,
            load,
            reps
        })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({error: "Workout doesn't exist"})
        }

        const workout = await Workout.findOneAndDelete({_id: id})
        
        if (!workout) {
            res.status(404).json({error: "Workout doesn't exist"})
        } else {
            res.status(200).json(workout)
        }
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

// update a workout
const updateWorkout = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({message: "Workout doesn't exist"})
        }

        const workout = await Workout.findOneAndUpdate({_id: id}, {
            ...req.body
        })

        if (!workout) {
            res.status(404).json({error: "Workout doesn't exist"})
        } else {
            res.status(200).json(workout)
        }
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}



module.exports = {
    getWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}