const { Schema, model } = require('mongoose')

// required models
const Session = require('../models/Session')
const User = require('../models/User')
// const Profile = require('../models/Profile')

// schema creation for assigned session
const assignedSessionSchema = new Schema({
  // the idSession key store the id of the model session
  idSession: {
    type: Schema.ObjectId,
    ref: Session
  },
  // the idStudent key store the id of the model User
  idStudent: {
    type: Schema.ObjectId,
    ref: User
  },
  // the idMentor key store the id of the model mentor
  idMentor: {
    type: Schema.ObjectId,
    ref: User
  },
  // The dateAsig key stores the date assigned for the session
  dateAsig: {
    type: String
  },
  // The link key stores the link for the assigned session
  link: String
})

// fixes in assignedSessionSchema
assignedSessionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// compilation of assigned session
const assignedSession = model('assignedsession', assignedSessionSchema)

module.exports = assignedSession
