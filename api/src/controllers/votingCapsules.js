const VotingCapsules = require('../db/models/Capsules')

// get method to bring the Capsules collection documents
const VotingCapsulesRouter = require('express').Router()

const updateCapsulesRouter = require('express').Router()

// get method to bring the capsules collection documents
VotingCapsulesRouter.get('/', async (request, response) => {
  const votingCapsules = await VotingCapsules.find({}).populate('idSession', {
    numSession: 1
  })
  response.json(votingCapsules)
})

// update method to bring the capsules colection documents
updateCapsulesRouter.put('/:id', async (req, res) => {
  try {
    const capsules = await VotingCapsules.findById(req.params.id)
    Object.assign(capsules, req.body)
    capsules.save()
    res.send({ data: capsules })
  } catch {
    res.status(404).send({ error: 'capsules not found' })
  }
})

module.exports = {
  VotingCapsulesRouter,
  updateCapsulesRouter
}
