var express = require('express');
const db = require('../../models');
const User = require('../../models/user');
var router = express.Router();

// POST /api/v1/users
router.post('/', function(req, res, next) {
  // check for all required fields
  if (!req.body || !req.body.name) {
    // if not all, send error
    res.status(422).json({ error: 'must include name' })
    return
  }
  // create a new user
  db.User.create({
    name: req.body.name,
    email: req.body.email
    
  })
    .then((user) => {
      // send new user as response
      res.status(201).json(user)
    })
});

// POST /api/v1/user/:id/favorite
router.post('/:id/favorites', (req, res) => {
  // check for all required fields
  if (!req.body || !req.body.title) {
    // --if not, send error and stop
    res.status(422).json({ error: 'Please select favorite' })
    return
  }

  // check if user exists
  db.User.findByPk(req.params.id)
    .then((user) => {
      // if there is no user, respond with 404
      if (!user) {
        res.status(404).json({ error: 'could not find the user' })
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
