var express = require('express');
const db = require('../../models')
var router = express.Router();

// POST /api/v1/recipes
router.post('/', (req, res, next) => {

  // check for all required fields
  if (!req.body || !req.body.title || !req.body.instructions|| !req.body.ingredients) {
    // if not all, send error
    res.status(422).json({ error: 'must include title, ingredients and instructions' })
    return
  }
  // create a new recipes
  db.Recipe.findOrCreate({
    where: {
      instructions: req.body.instructions
    },
    defaults: {

      title: req.body.title,
      category: req.body.category,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions
    }
  })
    .then((recipe) => {
      db.Favorite.create({
        title: recipe[0].dataValues.title,
        RecipeId: recipe[0].dataValues.id,
        UserId: req.session.user.id
      })
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

// router.get('/test', (req, res) => {
//   db.Recipe.sync({alter: true})
//   res.json({message: "Yes b*t#hes"})
// })

module.exports = router;

