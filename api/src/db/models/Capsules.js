const { Schema, model } = require('mongoose')

// required models
const Session = require('../models/Session')

// schema creation for capsules
const capsuleSchema = new Schema({
  // the idSession key store the id of the model session
  idSession: {
    type: Schema.ObjectId,
    ref: Session
  },
  // the theme_1 key stores the vote for topic 1
  theme_1: {
    type: Number
  },
  // the theme_2 key stores the vote for topic 2
  theme_2: {
    type: Number
  },
  // the theme_3 key stores the vote for topic 3
  theme_3: {
    type: Number
  },
  // the ft WinCapsule stores the winning theme
  WinCapsule: {
    type: String
  }
})

// fixes in capsuleSchema
capsuleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// compilation of answer bank model
const Capsules = model('Capsules', capsuleSchema)

module.exports = Capsules
