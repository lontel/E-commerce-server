const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const usersController = require('../controllers/usersController')

router.route('/profile')
    .get(auth('readOwn', 'profile'), usersController.profile)
   

module.exports = router