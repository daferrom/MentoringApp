const Session = require('../db/models/Session')

// A variable is created to define the controller of the Session path
const sessionRouter = require('express').Router()

// Get all session
sessionRouter.get('/', async (req, res, next) => {
  try {
    const session = await Session.find({})
    res.json(session)
  } catch (error) {
    next(error)
  }
})



// Creates a new session
sessionRouter.post('/new', async (req, res, next) => {
  const body = req.body
  // console.log(body)
  const newSession = new Session(body)
  console.log(newSession)
  await newSession.save()
  res.send('saved')
})

// Update session
sessionRouter.put('/:id', async (req, res) => {
  try {
    const sess = await Session.findById(req.params.id)
    Object.assign(sess, req.body)
    sess.save()
    res.send({ data: sess })
  } catch {
    res.status(404).send({ error: 'Session not found' })
  }
})

module.exports = sessionRouter
