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

module.exports = router;