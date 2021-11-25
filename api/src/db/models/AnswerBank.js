const { Schema, model } = require('mongoose')

// required models
const Session = require('../models/Session')
const User = require('../models/User.js')
const Question = require('../models/QuestionBank')

// schema creation for answer bank
const answerBankSchema = new Schema({
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
  // the idQuestion key store the id of the model questionBank
  idQuestion: {
    type: Schema.ObjectId,
    ref: Question
  },
  // the answer key stores the answer
  answer: {
    type: String,
    maxlength: 256
  }
})

// fixes in answerBankSchema
answerBankSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// compilation of answer bank model
const AnswerBank = model('AnswerBank', answerBankSchema)

module.exports = AnswerBank
