const express = require('express')
const router = express.Router()
const authRoutes = require('./auth.routes')
const userRoutes = require('./user.routes')

const routesIndex = [
    {
        path: '/auth',
        routes: authRoutes
    },
    {
        path: '/users',
        route: userRoutes
    }
]

routesIndex.forEach(route => {
    router.use(route.path, route.routes)
})


module.exports = router