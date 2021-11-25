const User = require('../db/models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')

const {CLIENT_URL} = process.env

// se crea una variable para definir el controlador de la ruta login
const userRouter = require('express').Router()
const loginRouter = require('express').Router()
const forgotPassRouter = require('express').Router()
const registerAdminRouter = require('express').Router()
const registerRouter = require('express').Router()
const activateEmailRouter = require('express').Router()
const getAccessToken = require('express').Router()

userRouter.get('/', async (req, res) => {
  // using .find() without a paramter will match on all user instances
  try {
    
    const user = await User.findById(req.user.id).select('-password')
    // console.log(user)
    res.json(user)
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
})

loginRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body

    // console.log(email, password)

    const user = await User.findOne({ email })

    // console.log(user)

    const isMatch =
      user === null ? false : await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(401).json({
        error: 'Invalid password or user'
      })
    }

    const refresh_token = createRefreshToken({ id: user._id })

    res.send({
      email: user.email,
      refresh_token,
      msg: 'Login success!'
    })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
})

forgotPassRouter.post('/', async (req, res) => {
  try {
    const {email} = req.body
    const user = await User.findOne({email})
    if(!user) return res.status(400).json({msg: "This email does not exist."})

    const access_token = createAccessToken({id: user._id})
    const url = `${CLIENT_URL}/user/reset/${access_token}`

    sendMail(email, url, "Reset your password")
    res.json({msg: "Re-send the password, please check your email."})
  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
})

registerAdminRouter.post('/', async (req, res) => {
  try{
    const {name, email, password, role} = req.body

    if(!name || !email || !password || !role)
        return res.status(400).json({msg: "Please fill in all fields."})

    if(!validateEmail(email))
        return res.status(400).json({msg: "Invalid emails."})

    const user = await User.findOne({email})

    if(user) return res.status(400).json({msg: "This email already exists."})

    if(password.length < 6)
        return res.status(400).json({msg: "Password must be at least 6 characters."})

    const passwordHash = await bcrypt.hash(password, 12)

    const newUser = new User({
        name, email, passwordHash, role
    })

    // console.log(newUser)
    await newUser.save()
    res.json({msg: "User has been create!"})

  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
})


const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

const  validateEmail = (email) =>{
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

registerRouter.post('/', async (req, res) => {
  try{
    let {name, email, password} = req.body

    // console.log(name, email, password)

    if(!name || !email || !password)
        return res.status(400).json({msg: "Please fill in all fields."})

    if(!validateEmail(email))
        return res.status(400).json({msg: "Invalid emails."})

    const user = await User.findOne({email})

    if(user) return res.status(400).json({msg: "This email already exists."})

    if(password.length < 6)
        return res.status(400).json({msg: "Password must be at least 6 characters."})

    const passwordHash = await bcrypt.hash(password, 12)

    const newUser = {
      name, email, password: passwordHash
    }

    const activation_token = createActivationToken(newUser)

    const url = `${CLIENT_URL}/user/activate/${activation_token}`
    // sendMail(email, url, "Verify your email address")


    res.json({msg: url})

  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
})

activateEmailRouter.post('/', async (req, res) => {
  try {
    const {activation_token} = req.body
    const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

    const {name, email, password} = user

    const check = await User.findOne({email})
    if(check) return res.status(400).json({msg:"This email already exists."})

    const newUser = new User({
        name, email, password
    })

    await newUser.save()

    res.json({msg: "Account has been activated!"})

  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
})

getAccessToken.post('/', async (req, res) => {
  try {
    // console.log(req.body.refreshtoken)
    const rf_token = req.body.refreshtoken
    if(!rf_token) return res.status(400).json({msg: "Please login now!"})

    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(400).json({msg: "Please login now!"})

        const access_token = createAccessToken({id: user.id})
        res.json({access_token})
    })
    // res.json({msg: 'ok'})
  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
})


module.exports = { userRouter, loginRouter, forgotPassRouter, registerAdminRouter, registerRouter, activateEmailRouter, getAccessToken }
