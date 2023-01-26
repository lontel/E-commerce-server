const express = require('express')
const router = express.Router()
const productsController = require('../controllers/product.controller')
const auth = require('../middleware/auth')

router.post('/', auth('createAny', 'product'), productsController.addProduct)

module.exports = router