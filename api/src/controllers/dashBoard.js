const users = require('../db/models/User')
const answers = require('../db/models/AnswerBank')

// A variable is created to define the controllers of the user, aswen  path
const userRouter = require('express').Router()
const answerRouter = require('express').Router()

// Get all students
userRouter.get('/', async (req, res, next) => {
  try {
    const user = await users.find({})
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// Get all answer
answerRouter.get('/', async (req, res, next) => {
  try {
    const answer = await answers.find({})
      .populate('idQuestion', { question: 1 })
    res.json(answer)
  } catch (error) {
    next(error)
  }
})

module.exports = { userRouter, answerRouter }