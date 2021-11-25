const { Schema, model } = require('mongoose')

// required models
const Session = require('../models/Session')
const User = require('../models/User')

// schema creation for question bank
const questionBankSchema = new Schema({
  // the idSession key store the id of the model session
  idSession: {
    type: Schema.ObjectId,
    ref: Session
  },
  // the idUser key store the id of the model user
  idUser: {
    type: Schema.ObjectId,
    ref: User
  },
  // the respType key stores the type of response that the question will have
  respType: {
    type: String
  },
  // the option key stores the options when the question is multiple-choice or voting
  option: {
    type: Array
  },
  // the question key stores the question
  question: {
    type: String,
    maxlength: 256
  },
  // the vote key stores if the question is a vote or not
  vote: {
    type: Boolean
  },
  // the receiver key stores if the question is for the form or for the report, if the receiver key equals true, it means the question is for the form, otherwise it is for the report
  receiver: {
    type: Boolean
  }
})

// fixes in questionBankSchema
questionBankSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// compilation of question bank model
const QuestionBank = model('QuestionBank', questionBankSchema)

module.exports = QuestionBank
