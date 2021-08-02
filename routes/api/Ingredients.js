var express = require('express');
const db = require('../../models')
var router = express.Router();

// POST /api/v1/ingredients
router.post('/', function(req, res, next) {
    // check for all required fields
    if (!req.body || !req.body.title || !req.body.ingredients) {
      // if not all, send error
      res.status(422).json({ error: 'must include title and ingredients' })
      return
    }
    // create a new ingredients
    db.Recipe.create({
      title: req.body.title,
      ingredients: req.body.ingredients
     
      
    })
      .then((ingredient) => {
        // send new ingredient as response
        res.status(201).json(ingredient)
      })
  });
  
  router.get('/', (req, res) => {
    db.ingredient.findAll()
      .then(ringredients => {
        res.json(ingredients)
      })
  })
  module.exports = router;
  