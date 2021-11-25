const Profile = require('../db/models/Profile')

const profilEditRouter = require('express').Router()
const updatedprofilEditRouter = require('express').Router()

profilEditRouter.get('/', async (req, res, next) => {
  try {
    const mentor = await Profile.find({ interestsMentor: { $size: 3 } }, { _id: 1, interestsMentor: 1 })
    res.json(mentor)
  } catch (error) {
    next(error)
  }
})

updatedprofilEditRouter.post('/:id', async (req, res) => {
  const profile = {
    interestsStudent: req.body.interestsStudent
  }

  const idprofile = await Profile.find({ user_id: req.params.id }, { _id: 1 })

  console.log(idprofile)

  Profile.updateOne(
    { _id: idprofile[0]._id },
    {
      $set: {
        interestsStudent: profile.interestsStudent
      }
    },
    function (error, info) {
      if (error) {
        res.json({
          result: false,
          msg: 'Profile could not be modified',
          error
        })
      } else {
        res.json({
          result: true,
          info: info
        })
      }
    }
  )
})

module.exports = { profilEditRouter, updatedprofilEditRouter }
