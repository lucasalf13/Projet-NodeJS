const recetteRouter = require('express').Router()
const recetteModel = require('../models/recetteModel')

recetteRouter.post("/recettes", async (req, res) => {
    try {
        const recette = new recetteModel({
            titre: req.body.titre,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            tempsPreparation: req.body.tempsPreparation,
            tempsCuisson: req.body.tempsCuisson,
            difficulté: req.body.difficulté,
            catégorie: req.body.catégorie,
            image: req.body.image,
        })
        await recette.save()
        res.json({message: 'Recette ajoutée avec succès', recette: recette})
    } catch (error) {
        console.log(error)
        res.json({err : error, message: 'Erreur lors de l\'ajout de la recette'})
    }
})

recetteRouter.get("/recettes", async (req, res) => {
    try {
        const search = {};
        const {titre} = req.query;
        const {ingredients} = req.query;
        const {catégorie} = req.query;
         if (titre) {
            search.titre = { $regex: titre, $options: 'i' }
        }
        if (ingredients) {
            search.ingredients = { $regex: ingredients, $options: 'i' }
        }
        if (catégorie) {
            search.catégorie = { $regex: catégorie, $options: 'i' }
        }
        const recettes = await recetteModel.find(search)
        res.status(201).json({recettes: recettes});
    } catch (error) {
        console.log(error)
        res.status(500).json({err : error.message})
    }
}
)

recetteRouter.get('/recettes/:id', async (req, res) => {
    try{
        const livre = await recetteModel.findById(req.params.id);
        res.json(livre);
    }catch(error){
        console.log(error);
        res.json({err : error.message});
    }
}
)


recetteRouter.put('/recettes/:id', async (req, res) => {
    try{
        const recette = await recetteModel.findByIdAndUpdate(req.params.id, req.body);
        res.json({message: "Recette bien modifiée", recette: recette});
    }catch(error){
        console.log(error);
        res.json({err : error.message});
    }
}
)

recetteRouter.delete('/recettes/:id', async (req, res) => {
    try {
        const recette = await recetteModel.findByIdAndDelete(req.params.id)
        res.json({message: 'Recette supprimée avec succès', recette: recette})
    } catch (error) {
        console.log(error)
        res.json({err : error.message})
    }
}
)

module.exports = recetteRouter