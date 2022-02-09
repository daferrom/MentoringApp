import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchGetUser, dispatchLogin, fetchUser } from '../../redux/actions/authActions'
import { Link } from "react-router-dom"

const PrincipalView = () => {

  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const baseUrl = 'https://fathomless-bastion-33135.herokuapp.com'

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAgoraUser')
    const firstLogin = localStorage.getItem('firstLogin')
    // console.log(firstLogin && loggedUserJSON)
    if (firstLogin && loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      const refreshtoken = user.refresh_token
      
      const getToken = async () =>{
        const res = await axios.post(`${baseUrl}/api/refresh_token`, {refreshtoken})
        // console.log(res)
        dispatch({ type: 'GET_TOKEN', payload: res.data.access_token })
      }
      getToken()

    }
  }, [auth.isLogged, dispatch])


  useEffect(() => {
    if (token) {
      // console.log(token, "user")
      const getUser = () => {
        dispatch(dispatchLogin())
        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }

  }, [token, dispatch])


  return (
    <div className="App">
      <h1>Bienvenido Usuario genérico</h1>



      <Link to="/welcome-user">| Pagina Bienvenida Usuario |</Link>
      <Link to="/welcome-student">| Pagina Bienvenida estudiante |</Link>
      <Link to="/student-profile-interests">| Perfil de estudiante |</Link>
      <Link to="/student-sessions">| Sesiones |</Link>
      <Link to="/AdminPanel">| admin |</Link>
      <Link to="/admin-panel">| admin |</Link>
      <Link to="/WelcomeCard">| WelcomeCard |</Link>
      <Link to="/CrudStudents">| CrudStudents |</Link>
      <Link to="/MultipleChoice">| MultipleChoice |</Link>
      <Link to="/SessionesMentor">| SessionesMentor |</Link>
      <Link to="/formControl">| formControl |</Link>
    </div>
  )
  }

export default PrincipalView
