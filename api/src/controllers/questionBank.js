const QuestionBank = require('../db/models/QuestionBank')

// A variable is created to define the controller of the QuestionBank path
const QuestionBankRouter = require('express').Router()

QuestionBankRouter.get('/', async (request, response) => {
  const questionBank = await QuestionBank.find({})
    .populate('idSession', { numSession: 1, program: 1, cohort: 1, state: 1 })
    .populate('idUser', { firstName: 1, lastName: 1, rol: 1 })
  response.json(questionBank)
})

module.exports = QuestionBankRouter
