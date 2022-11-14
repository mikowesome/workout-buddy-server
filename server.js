const express = require('express')
require('dotenv').config()

// express app
const app = express()
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts.js')

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`connected to db & listening on port ${process.env.PORT}`)
        })
    }).catch(error => {
        console.log(error)
    })
