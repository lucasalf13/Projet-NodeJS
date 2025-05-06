const mongoose = require('mongoose')

const ingredientsSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Le nom est requis'],
        match: [
            /^[a-zA-Z0-9\s]+$/,
            'Le nom ne doit pas contenir de caractères spéciaux',
        ],
    },
    qty: {
        type: Number,
        required: [true, 'La quantité est requise'],
        match: [
            /^\d+$/,
            'La quantité doit contenir uniquement des chiffres',
        ],
    },
    recette: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recettes',
    },
})



const ingredientsModel = mongoose.model('ingredients', ingredientsSchema)
module.exports = ingredientsModel