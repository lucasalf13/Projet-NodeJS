const mongoose = require('mongoose')

const recetteSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: [true, 'Le titre est requis'],
        match: [
           /^[a-zA-Z0-9\s]+$/,
            'Le titre ne doit pas contenir de caractères spéciaux',
        ],
        validate: {
            validator: async function (value) {
                const count = await mongoose.models.recettes.countDocuments({ titre: value })
                return count === 0
            },
            message: 'Le titre doit être unique',
        }
        },
        ingredients: {
            type: String,
            required: [true, 'Les ingredients sont requis'],
            match: [
                /^[a-zA-Z0-9\s,]+$/,
                'Les ingredients ne doivent pas contenir de caractères spéciaux',
            ],
        },
        instructions: {
            type: String,
            required: [true, 'Les instructions sont requises'],
            match: [
                /^[a-zA-Z0-9\s,\.]+$/,
                'Les instructions ne doivent pas contenir de caractères spéciaux',
            ],
        },
        tempsPreparation: {
            type: String,
            required: [true, 'Le temps de prépa est requis'],
            match: [
                /^[a-zA-Z0-9\s,\.]+$/,
                'Le temps de prépa ne doit pas contenir de caractères spéciaux',
            ],
        },
        tempsCuisson: {
            type: String,
            required: [true, 'Le temps cuisson est requis'],
            match: [
                /^[a-zA-Z0-9\s,\.]+$/,
                'Le temps de cuisson ne doit pas contenir de caractères spéciaux',
            ],
        },
        difficulte: {
            type: String,
            required: [true, 'La difficulté est requise'],
            enum: {
                values: ['facile', 'moyen', 'difficile'],
                message: '{VALUE} n\'est pas un niveau de difficulté valide',
            },
        },
        categorie: {
            type: String,
            required: [true, 'La catégorie est requise'],
            enum: {
                values: ['entree', 'plat', 'dessert'],
                message: '{VALUE} n\'est pas une catégorie valide',
            },
        },
    })

const recetteModel = mongoose.model('recettes', recetteSchema)
module.exports = recetteModel
