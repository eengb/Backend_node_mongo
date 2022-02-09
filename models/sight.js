const mongoose = require('mongoose')

/** Matkakohteen SCHEMA ja muotoilu */

const sightSchema = new mongoose.Schema({
  destination:String,
  country:String,
  city:String,
  description:String,
  picture:String,
})

sightSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Sight', sightSchema)