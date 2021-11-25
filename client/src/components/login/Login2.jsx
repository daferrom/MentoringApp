import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { 
    showErrMsg,
    showSuccessMsg
  } from '../notification/Notification'
import { dispatchLogin } from '../../redux/actions/authActions'
import { useDispatch } from 'react-redux'
import './login.css'
import logo from '../../assets/Logo/programateLogo.png'
import Input from '../Input/Input'


const Login = () => {

  //Inicializo hooks
  const [user, setUser] = useState({
    email: '',
    password: '',
    err: '',
    success: ''
  }) 

  const dispatch = useDispatch() 
  const navigate = useNavigate() 

  const { email, password, err, success } = user
  //console.log(user)
  const handleChangeInput = e => {
    const { name, value } = e.target
    //console.log(name, value)
    setUser({ ...user, [name]: value, err: '', success: '' })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3001/api/login', {
        email,
        password
      })
      console.log(res)
      setUser({ ...user, err: '', success: res.data.msg })
      window.localStorage.setItem('firstLogin', true)
      window.localStorage.setItem(
        'loggedAgoraUser', JSON.stringify(res.data)
      )
      dispatch(dispatchLogin())
      navigate('/home')
    } catch (err) {
      err.response.data.error &&
        setUser({ ...user, err: err.response.data.error, success: '' })
    }
  }

  return (
    <div className='container-login-main'>
      <div className='container-login-page'>
      <img className='logo' src={logo} alt='logo-programate' />
      <h2>Ingresa a Okhos</h2>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}

      <form className='form' onSubmit={handleSubmit}>
        <div className='container-login-form-content'>
          <label htmlFor='email'>Email Address</label>
          <Input
              label='Correo'
              placeholder='Luis@hotmail.com'
              name='email'
              value={email}
              onChange={handleChangeInput}
            />
        
        <Input
              type='Password'
              label='Contraseña'
              placeholder='********'
              name='password'
              value={password}
              onChange={handleChangeInput}
            />
        </div>
        
        <button className='button-login' type='submit'>
            INGRESAR
          </button>
        
      </form>

      <p>
        New Customer? <Link to='/register'>Register</Link>
      </p>
      </div>
    </div>
  )
}

export default Login
