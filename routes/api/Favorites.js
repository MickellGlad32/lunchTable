const express = require('express')
const db = require('../../models')
const router = express.Router();

router.get('/', (req, res) => {
db.Favorites.findAll({
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

    // check if recipe exists
    db.User.findByPk(req.session.user.id)
      .then((user) => {
        // if there is no user, respond with 404
        if (!user) {
          res.status(404).json({ error: 'could not find the user ' })
          return
        }
        console.log(user)
        // create new favotite
        user.createFavorite({
          RecipeId: req.params.id
        })
          .then((favorite) => {
            // respond with new favorite
            res.status(201).json(favorite)
          })
      })
  })
  
module.exports = router;