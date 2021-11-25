const users = require('../db/models/User')
const answers = require('../db/models/AnswerBank')
const assigSession = require('../db/models/AssignedSession')
const profile = require('../db/models/Profile')
// const formSession = require('../db/models/FormSession')

// A variable is created to define the controllers of the user, aswen  path
const userRouter = require('express').Router()
const answerRouter = require('express').Router()
const assigSessionRouter = require('express').Router()
const infoStudentRouter = require('express').Router()

// Get all students active
userRouter.get('/students-active', async (req, res, next) => {
  try {
    const user = await users.find(
      { state: true, role: 1 },
      { _id: 1, program: 1 }
    )
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// Get all mentor active
userRouter.get('/mentor-active', async (req, res, next) => {
  try {
    const mentor = await users.find(
      { state: true, role: 4 },
      { _id: 1, program: 1 }
    )
    res.json(mentor)
  } catch (error) {
    next(error)
  }
})

// Get all students with mentor
userRouter.get('/students-mentor', async (req, res, next) => {
  try {
    // const mentor = await profile.find({ assignedMentor: 1 }, { _id: 1, assignedMentor: 1 })
    const mentor = await profile.find(
      { assignedMentor: { $regex: '.*$' } },
      { assignedMentor: 1 }
    )
    res.json(mentor)
  } catch (error) {
    next(error)
  }
})

// Get all answer
answerRouter.get('/', async (req, res, next) => {
  try {
    const answer = await answers
      .find({})
      .populate('idQuestion', { question: 1, receiver: 1 })
    res.json(answer)
  } catch (error) {
    next(error)
  }
})

// Get all assignedsession
assigSessionRouter.get('/', async (req, res, next) => {
  try {
    const assig = await assigSession.find({})
    res.json(assig)
  } catch (error) {
    next(error)
  }
})

// Get all info the student
infoStudentRouter.get('/show', async (req, res, next) => {
  try {
    const info = await profile
      .find({})
      .populate('user_id', {
        name: 1,
        email: 1,
        middleName: 1,
        lastName: 1,
        secondSurname: 1,
        contactNumber: 1,
        state: 1
      })
    res.json(info)
  } catch (error) {
    next(error)
  }
})

module.exports = {
  userRouter,
  answerRouter,
  assigSessionRouter,
  infoStudentRouter
}
