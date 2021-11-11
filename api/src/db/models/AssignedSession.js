const { Schema, model } = require('mongoose')

const assignedsessionSchema = new Schema({
  numSession: {
    type: Number
  },
  dateAsig: {
    type: Date
  }
})

assignedsessionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Assignedsession = model('Assignedsession', assignedsessionSchema)


module.exports = Assignedsession
