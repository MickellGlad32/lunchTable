var express = require('express');
const db = require('../../models')
var router = express.Router();

// POST /api/v1/ingredients
router.post('/', function(req, res, next) {
    // check for all required fields
    if (!req.body || !req.body.title || !req.body.instructions) {
      // if not all, send error
      res.status(422).json({ error: 'must include title and instructions' })
      return
    }
    // create a new instructions
    db.Recipe.create({
      title: req.body.title,
      instructions: req.body.instructions
     
      
    })
      .then((instruction) => {
        // send new ingredient as response
        res.status(201).json(instruction)
      })
  });
  
  router.get('/', (req, res) => {
    db.instruction.findAll()
      .then(instructions => {
        res.json(instructions)
      })
  })
  module.exports = router;