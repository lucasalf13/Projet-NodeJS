const ingredientsModel = require('../models/ingredientsModel')
const recetteModel = require('../models/recetteModel')


exports.postIngredients = async (req, res) => {
    try {
        req.body.recette = req.params.id
        const newIngredient = new ingredientsModel(req.body)
        await newIngredient.save()
        await recetteModel.findByIdAndUpdate({_id : req.params.id}, { $push: { ingredients: newIngredient._id } })
        res.status(201).json({ message: 'Ingredient ajouté avec succès', ingredient: newIngredient })
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
}

exports.getIngredientsByRecette = async (req, res) => {
    try {
        const Ingredientsrecette = await recetteModel.findById(req.params.id).populate('ingredients')
        if (!Ingredientsrecette) {
            return res.status(404).json({ message: 'Recette non trouvée' })
        }
        res.status(200).json({ Ingredientsrecette})
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
}

exports.putIngredients = async (req, res) => {
    try {
        const ingredient = await ingredientsModel.findByIdAndUpdate(req.params.id, req.body, {new: true })
        res.json(ingredient)
    }
    catch (error) {
        res.status(500).json({ err: error.message })
    }
}

exports.deleteIngredients = async (req, res) => {
    try {
        const deletedIngredients= await ingredientsModel.findById(req.params.recetteid)
        await recetteModel.findByIdAndUpdate(req.params.recetteid, { $pull: { ingredients: req.params.id } })
        res.json({ message: 'Ingredient supprimé avec succès', ingredient: ingredient })
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
}