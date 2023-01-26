const { brandService } = require('../services')

const brandController = {
    async addBrand(req, res, next) {
        try {
            const brand = await brandService.addBrand(req.body.brandname)
            res.json(brand)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = brandController