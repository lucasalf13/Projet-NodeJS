const recetteRouter = require('express').Router()
const recetteModel = require('../models/recetteModel')
const recetteController = require('../controllers/recetteController')


recetteRouter.post('/recettes', recetteController.postRecette)
recetteRouter.get("/recettes", recetteController.getRecette)
recetteRouter.get('/recettes/:id', recetteController.getRecetteById)
recetteRouter.put('/recettes/:id', recetteController.putRecetteById)
recetteRouter.delete('/recettes/:id', recetteController.deleteRecetteById)

module.exports = recetteRouter
