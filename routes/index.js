const express = require('express')
const router = express.Router()
const authRoutes = require('./auth.routes')

const routesIndex = [
    {
        path: '/auth',
        routes: authRoutes
    }
]

routesIndex.forEach(route => {
    router.use(route.path, route.routes)
})


module.exports = router