const getAllStudentsRouter = require('express').Router()

const postUserRouter = require('express').Router()

const updatedUserRouter = require('express').Router()

const updatedProfileRouter = require('express').Router()

const Profile = require('../db/models/Profile')

const User = require('../db/models/User')

getAllStudentsRouter.get('/', async (req, res) => {
  // const getAllStudents =
  await Profile.find({})
    .populate('user_id:', {
      name: 1,
      middleName: 1,
      lastName: 1,
      secondSurname: 1
    })
    .then(getAllStudents => {
      if (getAllStudents.length) return res.status(200).send({ getAllStudents })
      return res.status(204).json({ message: 'NO CONTENT' })
    })
    .catch(err => res.status(500).json({ err }))

  // res.json(getAllStudents)
})


postUserRouter.post('/', async (req, res) => {
  const profile = {
    gender: req.body.gender,
    actualAge: req.body.actualAge,
    interestsStudent: req.body.interestsStudent,
    assignedMentor: req.body.assignedMentor,
    interestsMentor: req.body.interestsMentor
  }
  // const gender = (req.body.gender);
  // const actualAge = (req.body.actualAge)
  await User.create(req.body)
    .then(function (dbProfile) {
      // If we were able to successfully create a Product, send it back to the client
      Profile.create({
        user_id: dbProfile.id,
        gender: profile.gender,
        actualAge: profile.actualAge,
        interestsStudent: profile.interestsStudent,
        assignedMentor: profile.assignedMentor,
        interestsMentor: profile.interestsMentor
      })
      res.json(dbProfile)
    })

    .catch(function (err) {
      res.json(err)
    })
})

updatedUserRouter.post('/', (req, res) => {
  const body = req.body


  User.updateOne(
    { _id: body._id },
    {
      $set: {
        name: body.name,
        email: body.email,
        passwordHash: body.passwordHash,
        middleName: body.middleName,
        lastName: body.lastName,
        secondSurname: body.secondSurname,
        contactNumber: body.contactNumber,
        role: body.role,
        avatar: body.avatar,
        program: body.program,
        cohorte: body.cohorte,
        state: body.state
      }
    }
  ).then(function (error, info) {
    if (error) {
      res.json({
        result: false,
        msg: 'No se pudo modificar el usuario',
        error
      })
    } else {
      res.json({
        result: true,
        info: info
      })
    }
  })
})

updatedProfileRouter.post('/:id', async (req, res) => {

  const profile = {
    gender: req.body.gender,
    actualAge: req.body.actualAge,
    interestsStudent: req.body.interestsStudent,
    assignedMentor: req.body.assignedMentor
  }

  const idprofile = await Profile.find({ user_id: request.params.id }, { _id: 1 })

  // console.log(idprofile)

  Profile.updateOne(
    { _id: idprofile[0]._id },
    {
      $set: {
        gender: profile.gender,
        actualAge: profile.actualAge,
        interestsStudent: profile.interestsStudent,
        assignedMentor: profile.assignedMentor
      }
    },
    function (error, info) {
      if (error) {
        res.json({

          resultado: false,
          msg: 'No se pudo modificar el cliente',
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

module.exports = {
  getAllStudentsRouter,
  updatedUserRouter,
  postUserRouter,
  updatedProfileRouter

}
