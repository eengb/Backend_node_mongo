const config = require('./utils/config')
const express = require('express')
const sightsRouter= require('./controllers/sights')

//FullstackOpen tyylillä
const usersRouter= require('./controllers/users')

const middleware = require('./utils/middleware')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')


console.log('connecting...', )
mongoose.connect(config.MONGODB_URI)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


app.use(cors())
app.use(express.json())

app.use('/api/sights',sightsRouter)
app.use('/api/users', usersRouter)


app.use(middleware.unknownEndpoint)


module.exports = app