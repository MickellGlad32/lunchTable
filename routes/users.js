var express = require('express');
const db = require('../models');
var router = express.Router();
const bcrypt = require('bcrypt')

// POST /api/v1/users
router.post('/register', async (req, res, next) => {

  let name = req.body.name
  let email = req.body.email
  let password = req.body.password

  await db.User.findOne({
    where: {
      email: email
    }
  }).then(existingUser => {
    if (!existingUser) {
      // check for all required fields
      if (!req.body || !name || !email || !password) {
        // if not all, send error
        res.status(422).json({ error: 'must include name, email & password' })
        return
      }

      // hash password
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          res.status(422).json({ error: "error registering user" })
        } else {
          db.User.create({
            name: name,
            email: email,
            password: hash
          })
            .then((user) => {
              // respond with success
              req.session.user = user
              res.redirect("/")
            })
        }
      })
    } else {
      res.status(422).json({error: "user already exists"})
    }
  })



});


// post/users/login
router.post('/login', async(req, res) => {

  let email = req.body.email
  let password = req.body.password

  await db.User.findOne({
    where: {
      email: email
    }
  }).then(user => {
    if (!user) {
      if (!req.body || !email || !password) {
        // respond with error if not included
        res.status(422).json({ error: 'must include email & password' })
        return
      } else {
        res.status(422).json({error: "user does not exist"})
      }
    } else {
      bcrypt.compare(password, user.password)
        .then((success) => {
          if (success) {
            //login user
            req.session.user = user;
            res.redirect("/")
          } else {
            //incorrect password
            res.status(401).json({ error: 'incorrect password' })
          }
        })
    }
  })
})


router.get('/logout', (req, res) => {
  //tell express theat the user logged out
  req.session.destroy()
  // send response to show it successful
  res.json({ message: 'successfully loged out' })
})




module.exports = router;
