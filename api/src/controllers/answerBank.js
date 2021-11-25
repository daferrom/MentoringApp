const AnswerBank = require('../db/models/AnswerBank')

// A variable is created to define the controller of the AnswerBank path
const AnswerBankRouter = require('express').Router()

/* AnswerBankRouter.get('/', async (request, response) => {
  const answerBank = await AnswerBank.find({})
    .populate('idSession', { numSession: 1, program: 1, cohort: 1, state: 1 })
    .populate('idUser', { firstName: 1, lastName: 1, rol: 1 })
  response.json(answerBank)
})  */
// Route for creating a new Product
AnswerBankRouter.post('/', (req, res) => {
  console.log('POST /api/answerBank')
  console.log(req.body)
  res.status(200).send({ message: 'se ha recibido' })

  const answer = new AnswerBank()
  answer.idSession = req.body.idSession
  answer.idUser = req.body.idUser
  answer.idQuestion = req.body.idQuestion
  answer.answer = req.body.answer

  answer.save((err, answerStored) => {
    if (err) res.status(500).send({ message: 'error a salvar' })
    res.status(200).send({ answer: answerStored })
  })
})
module.exports = AnswerBankRouter
