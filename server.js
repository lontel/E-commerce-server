const express = require('express')
const app = express()
const mongoose = require('mongoose')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const { handleError, convertToApiError } = require('./middleware/apiError')
const routes = require('./routes')
const passport = require('passport')
const { jwtStrategy } = require('./middleware/passport')
require('dotenv').config()

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`

mongoose
    .set("strictQuery", false)
    .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((x) => {
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`
        )
    })
    .catch((err) => {
        console.error("Error connecting to Mongo: ", err)
    })


//// body parse
app.use(express.json())


//// sanitize
app.use(xss())
app.use(mongoSanitize())

//// passport 
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

//// routes
app.use('/api', routes)

//// handle errors
app.use(convertToApiError)
app.use((err, req, res, next) => {
    handleError(err, res)
})
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://techstore-vqde.onrender.com")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
// app.use(express.static('client/build'))
// if(process.env.NODE_ENV === 'production'){
//     const path = require('path')
//     app.get('/*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'../client','build','index.html'))
//     })
// }



const port = process.env.PORT || 5005
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})