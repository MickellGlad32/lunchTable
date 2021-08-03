const express = require('express')
const db = require('../../models')
const router = express.Router();

router.get('/', (req, res) => {
db.Favorite.findAll({
    include: [db.User, db.Recipe]
})
.then((favorites) => {
    res.json(favorites)

})
})

// ??????????
// POST /api/v1/favorite/:id
router.post('/:id', (req, res) => {
    // check for all required fields
  
    // add fav to recipe table if from API??

    // check if user exists
    db.User.findByPk(req.session.user.id)
      .then((user) => {
        // if there is no user, respond with 404
        if (!user) {
          res.status(404).json({ error: 'could not find the user ' })
          return
        }
        db.Recipe.findByPk(req.params.id).then(recipe => {          
          // create new favotite        
          db.Favorite.create({
            UserId: user.id,
            RecipeId: recipe.id,
            title: recipe.title
          }).then((favorite) => {
              // respond with new favorite
              res.status(201).json(favorite)
            })
        })
      })
  })
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
        db.Instruction.create({
          steps: recipe.instructions,
          RecipeId: recipe.id,
        })
        // send new recipe as response
        res.status(201).json(recipe)
      })
  });
module.exports = router;