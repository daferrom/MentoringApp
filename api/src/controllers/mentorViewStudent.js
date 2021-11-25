const ViewStudent = require('../db/models/Profile')
const QuestionForm = require('../db/models/AnswerBank')

const ViewStudentRouter = require('express').Router()
const QuestionFormRouter = require('express').Router()

// get method for view student of mentor collection
ViewStudentRouter.get('/', async (request, response) => {
  const viewStudent = await ViewStudent.find({}).populate(
    'user_id',
    { avatar: 1 },
    { email: 1 },
    { contactNumber: 1 }
  )

  response.json(viewStudent)
})

// get method fot questions and answers of the sessions formularies
QuestionFormRouter.get('/', async (request, response) => {
  const questionForm = await QuestionForm.find({}).populate('idQuestion', {
    question: 1
  })

  response.json(questionForm)
})

module.exports = {
  ViewStudentRouter,
  QuestionFormRouter
}
