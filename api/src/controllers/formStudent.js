const FormStudent = require('../db/models/QuestionBank')
const AnswerForm = require('../db/models/AnswerBank')

// constant for the get method that fetches questions from the question bank
const FormStudentRouter = require('express').Router()

// constant for the post method that brings up responses from the response bank
const AnswerFormRouter = require('express').Router()

// get method to fetch questions from the question bank
FormStudentRouter.get('/:id', async (request, response) => {
  try {
    const formStudent = await FormStudent.find(
      { idSession: request.params.id, receiver: true },
      { question: 1, respType: 1, option: 1, vote: 1 }
    )

    response.json(formStudent)
  } catch (err) {
    return response.status(500).json({ msg: err.message })
  }
})

// post method to fetch load responses from response bank
AnswerFormRouter.post('/', (req, res) => {
  console.log('POST /api/answerform')
  console.log(req.body)
  res.status(200).send({ message: 'se ha recibido' })

  const answerform = new AnswerForm()
  answerform.idSession = req.body.idSession
  answerform.idUser = req.body.idUser
  answerform.idQuestion = req.body.idQuestion
  answerform.answer = req.body.answer

  answerform.save((err, answerformStored) => {
    if (err) res.status(500).send({ message: 'error a salvar' })
    res.status(200).send({ answerform: answerformStored })
  })
})

module.exports = {
  AnswerFormRouter,
  FormStudentRouter
}
