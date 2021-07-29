var express = require('express');
const bcrypt = require('bcrypt');
const db = require('../models');
var router = express.Router();

// post/users/register
router.post('/register', function (req, res, next) {
  // cehck for email and password
  if (!req.body || !req.body.email || !req.body.password) {
    // respond with error if not included
    res.status(422).json({ error: 'musct include email & password' })
    return
  }
  // hash password
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      // store user details
      db.Username.create({
        email: req.body.email,
        password: hash
      })
        .then((username) => {
          // respond with success
          res.status(201).json(username);
        })


    })

});

// post/users/login
router.post('/login', (req, res) => {
  if (!req.body || !req.body.email || !req.body.password) {
    // respond with error if not included
    res.status(422).json({ error: 'musct include email & password' })
    return
  }
  // find user
  db.Username.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((username) => {
      //check user password
      bcrypt.compare(req.body.password, username.password)
        .then((success) => {
          if (success) {

            //login user
            req.session.user = username;
            res.json({ message: 'successfully logged in' })
          } else {
            //incorrect password
            res.status(401).json({ error: 'incorrect password' })
          }
        })
    })




})

router.get('/logout' , (req, res) => {
  //tell express theat the user logged out
  req.session.username = null;
  // send response to show it successful
  res.json({ message: 'successfully loged out'})
})

module.exports = router;