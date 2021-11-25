const notifMentorRouter = require('express').Router()
const transporter = require('../config/mailer')

// const [email, setemail] = useState(initialState)
const email = 'dbedoya0408@gmail.com'

const contentHTML = `
  <h1>User Information</h1>
    <ul>
        <li>Username: David </li>
        <li>User Email: prueba@gmail.com</li>
        <li>Phone: 2345</li>
    </ul>
    <p>Prueba de Correo</p>`

notifMentorRouter.put('/', async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: '"Confirmación de Mentoria" <info@educamas.com.co>',
      to: email,
      subject: 'Asignación de Mentoria',
      html: contentHTML
    })

    console.log('Messages sent', info)
  } catch (error) {
    console.error(error)
  }

  res.send('send')
})

module.exports = notifMentorRouter
