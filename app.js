const config = require('./utils/config')
const express = require('express')
const sightsRouter= require('./controllers/sights')

//fullstackopenin tyylillä
import tokenExtractor from "./middlewares/tokenExtractor.js";
import userExtractor from "./middlewares/userExtractor.js";
import * as Users from "./controllers/users.js";

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
app.use(tokenExtractor);

app.use('/api/sights',sightsRouter)


app.post("/api/login", Users.login);
app.post("/api/users", Users.create);
app.get("/api/users", Users.findAll);



app.use(middleware.unknownEndpoint)


module.exports = app