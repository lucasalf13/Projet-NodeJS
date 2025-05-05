const mongoose = require('mongoose')

const recetteSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: [true, 'Titre est requis'],
    },
    ingredients: {
        type: String,
        required: [true, 'Ingredients est requis'],
    },
    instructions: {
        type: String,
        required: [true, 'Instructions est requis'],
    },
    tempsPreparation: {
        type: String,
        required: [true, 'Preparation Time est requis'],
    },
    tempsCuisson: {
        type: String,
        required: [true, 'Cuisson Time est requis'],
    },
    difficulté: {
        type: String,
        required: [true, 'Difficulté est requis'],
    },
    catégorie: {
        type: String,
        required: [true, 'Catégorie est requis'],
    },
    image: {
        type: String,
    },
})

const recetteModel = mongoose.model('recettes', recetteSchema)
module.exports = recetteModel