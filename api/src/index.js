require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const allRoutes = require('./routes/index')

// Conection MongoDB
require('./db/mongo')

// Init Express
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static('../client/build'))
app.use(allRoutes)

// Setting
const port = process.env.PORT || 'fathomless-bastion-33135.herokuapp.com'
// defines a port and passes the value to it
app.set('port', port)

// Init Server
app.listen(app.get('port'), error => {
  if (error) {
    console.error('Server failed to start')
  } else {
    console.log('Server started on port:' + port)
  }
})

module.exports = app
