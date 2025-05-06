const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const recetteRouter = require('./routers/recetteRouter')
const ingredientsRouter = require('./routers/ingredientsRouter')
const app = express()

app.use(express.json())
app.use(recetteRouter)
app.use(ingredientsRouter)

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server is running on port ${process.env.PORT}`)
    }
    })

    mongoose.connect(process.env.URL_BDD)
   