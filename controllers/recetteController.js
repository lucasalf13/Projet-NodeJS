const recetteModel = require('../models/recetteModel')

exports.postRecette = async (req, res) => {
    try {
        const recette = new recetteModel(req.body)        
        await recette.save()
        res.json({message: 'Recette ajoutée avec succès', recette: recette})
    } catch (error) {
        res.json({err: error.message})
    }
}

exports.getRecette = async (req, res) => {
    try {
        const search = {};
        const {titre} = req.query;
        const {ingredients} = req.query;
        const {categorie} = req.query;
         if (titre) {
            search.titre = { $regex: titre, $options: 'i' }
        }
        if (ingredients) {
            search.ingredients = { $regex: ingredients, $options: 'i' }
        }
        if (categorie) {
            search.categorie = { $regex: categorie, $options: 'i' }
        }
        const recettes = await recetteModel.find(search)
        res.status(201).json({recettes: recettes});
    } catch (error) {
        console.log(error)
        res.status(500).json({err : error.message})
    }
}

exports.getRecetteById = async (req, res) => {
        try{
            const recette = await recetteModel.findById(req.params.id);
            res.json(recette);
        }catch(error){
            res.json({message : error.message});
        }
}

exports.putRecetteById = async (req, res) => {
      try{
          const recette = await recetteModel.findByIdAndUpdate(req.params.id, req.body, {runValidators: true, new: true});
          res.json({message: "Recette bien modifiée", recette: recette});
      }catch(error){
          res.json({message : error.message});
      }
}

exports.deleteRecetteById = async (req, res) => {
        try {
            const recette = await recetteModel.findByIdAndDelete(req.params.id)
            res.json({message: 'Recette supprimée avec succès', recette: recette})
        } catch (error) {
            res.json({message : error.message})
        }
}