const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const brandController = require('../controllers/brand.controller')


router.get('/allBrands', brandController.getAllBrands)
router.post('/brand', auth('createAny', 'brand'), brandController.addBrand)
router.route('/brand/:id')
    .get(brandController.getBrand)
    .delete(auth('deleteAny', 'brand'), brandController.deleteBrand)


module.exports = router