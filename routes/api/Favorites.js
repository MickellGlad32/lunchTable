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
          res.redirect("/favorites.html")
        })
      })
    })
})


router.post('/', function (req, res, next) {
  // check for all required fields
  if (!req.body || !req.body.title || !req.body.ingredients || !req.body.instructions) {
    // if not all, send error
    res.status(422).json({ error: 'must include title, ingredients and instructions' })
    return
  }

  // create a new recipes
  db.Recipe.findOrCreate({
    where: {
      instructions: req.body.instructions,

    },
    defaults: {
      title: req.body.title,
      category: req.body.category,
      ingredients: req.body.ingredients.join(", "),
      instructions: req.body.instructions

    }
  })
    .then((recipe) => {
      console.log(recipe[0].id)
      db.Favorite.findOrCreate({
        where: {
          UserId: req.session.user.id,
          RecipeId: recipe[0].id
        }
      }).then((favorite) => {
        // send new recipe as response
        console.log(favorite)
        res.redirect("/favorites.html")
      })
    })
});


router.get('/:UserId', (req, res) => {

  db.Favorite.findAll({
    where: {
      UserId: req.session.user.id
    }
  }).then((favorites) => {
    console.log(favorites)
    res.json(favorites)
  })
})

router.delete('/api/v1/favorites/:id', (req, res) => {
  // get id
  const id = parseInt(req.params.id)

  db.result("DELETE FROM FAVORITES WHERE id = $1", id)
    .then((results) => {
      // if nothing was deleted, then there was nothing to delete
      if (results.rowCount === 0) {
        res.status(404).json({ error: 'could not find favorite with that id' })

      } else {
        res.status(204).json()

      }
    })

})
module.exports = router;