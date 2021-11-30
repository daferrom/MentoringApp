const { Schema, model } = require('mongoose')

// required models
const User = require('./User')
// const Student = require('./Student')
const Session = require('./Session')

// schema creation for mentor availability
const menAvailabilitySchema = new Schema({
  // the idUser key store the id of the model user
  idUser: {
    type: Schema.ObjectId,
    ref: User
  },
  // the idSession key store the id of the model session
  idSession: {
    type: Schema.ObjectId,
    ref: Session
  },
  // the mentAvailability key stores an array with the available dates that the mentor has for the session
  mentAvailability: [String]
})

// fixes in menAvailabilitySchema
menAvailabilitySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

// compilation of mentor availability model
const menAvailability = model('menAvailability', menAvailabilitySchema)

module.exports = menAvailability
