const { Schema, model } = require('mongoose')

// schema creation for sessions
const sessionSchema = new Schema({
  // the numSession key stores the number of the session
  numSession: {
    type: Number
  },
  // the sessionObjective key stores the objective of the session
  sessionObjective: {
    type: String,
    maxlenght: 45
  },
  // the program key stores the program of the session
  program: {
    type: String,
    default: 'Programate',
    maxlength: 45
  },
  // the cohort key stores the cohort of the session
  cohort: {
    type: Number
  },
  // the startDate key stores the start date of the session
  startDate: {
    type: String
  },
  // the endDate key stores the end date of the session
  endDate: {
    type: String
  },
  // the file key stores the files of the session
  file: {
    type: String
  },
  // the state key stores the state of the session
  state: {
    type: Boolean,
    default: true
  }
})

// fixes in sessionSchema
sessionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// compilation of session model
const Session = model('Session', sessionSchema)

module.exports = Session
