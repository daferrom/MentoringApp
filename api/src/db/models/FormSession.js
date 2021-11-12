const { Schema, model } = require('mongoose')

// required models
const Session = require('../models/Session')
const QuestionBank =require('../models/QuestionBank')
const Student = require('../models/User')

// schema creation for session form 
const formSessionSchema = new Schema({
  // the idSession key store the id of the model session
  idSession: { type: Schema.ObjectId, ref: Session },
  // the idStudent key store the id of the model User
  idStudent: { type: Schema.ObjectId, ref: Student },
  // the idQuestionBank key store the id of the model QuestionBank
  idQuestionBank: { type: Schema.ObjectId, ref: QuestionBank },
  // the FilledOut key stores if the form was filled out or not
  FilledOut: Boolean
})

// fixes in formSesionSchema
formSessionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// compilation of FormSesion model
const FormSession = model('FormSesion', formSessionSchema)

FormSession.create({
  idSession: '618c4f9bd9222aaf6922ab0c',
  idStudent: '618d9dc4fd3828e8550731c3',
  idQuestionBank: '618d78f66d3cf89d7abfe0cd',
  FilledOut: false
})

module.exports = FormSession
