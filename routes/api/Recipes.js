var express = require('express');
const db = require('../../models')
var router = express.Router();

// POST /api/v1/recipes
router.post('/', function(req, res, next) {
  // check for all required fields
  if (!req.body || !req.body.title ||!req.body.ingredients || !req.body.instructions) {
    // if not all, send error
    res.status(422).json({ error: 'must include title, ingredients and instructions' })
    return
  }
  // create a new recipes
  db.Recipe.create({
    title: req.body.title,
    category: req.body.category,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions
   
    
  })
    .then((recipe) => {
      // send new recipe as response
      res.status(201).json(recipe)
    })
});

router.get('/', (req, res) => {
  db.Recipe.findAll()
    .then(recipes => {
      res.json(recipes)
    })
})


module.exports = router;

