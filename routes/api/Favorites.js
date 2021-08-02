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


// POST /api/v1/favorite/:id
router.post('/:id', (req, res) => {
    // check for all required fields
    if (!req.body || !req.body.title) {
      // --if not, send error and stop
      res.status(422).json({ error: 'Please select favorite' })
      return
    }
    // add fav to recipe table if from API??

    // check if recipe exists
    db.User.findByPk(req.params.id)
      .then((recipe) => {
        // if there is no user, respond with 404
        if (!recipe) {
          res.status(404).json({ error: 'could not find the recipe' })
          return
        }
  
        // create new favotite
        user.createFavorite({
          title: req.body.title
        })
          .then((favorite) => {
            // respond with new favorite
            res.status(201).json(favorite)
          })
      })
  })
  
module.exports = router;