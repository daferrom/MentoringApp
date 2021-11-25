const UpdateMentorRouter = require('express').Router()
const Profile = require('../db/models/Profile')

UpdateMentorRouter.put('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id)
    Object.assign(profile, req.body)
    profile.save()
    res.send({ data: profile })
  } catch {
    res.status(404).send({ error: 'capsules not found' })
  }
})

module.exports = UpdateMentorRouter
