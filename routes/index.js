const express = require('express')
const router = express.Router()
const authRoutes = require('./auth.routes')
const userRoutes = require('./user.routes')
const brandRoutes = require('./brand.routes')

const routesIndex = [
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/brands',
        route: brandRoutes
    }
]

routesIndex.forEach(route => {
    router.use(route.path, route.route)
})


module.exports = router