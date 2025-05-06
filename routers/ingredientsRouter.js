const ingredientsRouter = require('express').Router()
const ingredientsController = require('../controllers/ingredientsController')


ingredientsRouter.post('/recettes/:id/ingredients', ingredientsController.postIngredients)
ingredientsRouter.get('/recettes/:id/ingredients', ingredientsController.getIngredientsByRecette)
ingredientsRouter.put('/ingredients/:id', ingredientsController.putIngredients)
ingredientsRouter.delete('/recettes/:recetteid/ingredients/:id', ingredientsController.deleteIngredients)


module.exports = ingredientsRouter
