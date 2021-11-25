import { Outlet, Link } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'


import axios from 'axios'

import { dispatchGetUser, dispatchLogin, fetchUser } from './redux/actions/authActions'

// import Styles from'./index.module.css'
// import { render } from 'react-dom';
import { 
  // BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// login
import Login from './components/login/Login.jsx'
import NotFound from './views/General/NotFound'
import ForgotPassword from './components/login/ForgotPassword.jsx'

//others
import WelcomeUser from './views/Student/Welcome/WelcomeStudent.jsx'
import WelcomeStudent from './views/Student/Welcome/WelcomeStudent' 
import StudentSession from './views/Student/SessionsBoard/SessionsBoard';
import Thanks from './views/Student/Thanks/Thanks';
import NavBar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import FirstStudentForm from './views/Student/Form/FirstStudentForm';
import FirstStudentInform from './views/Student/Inform/FirstStudentInfrom';
import MultipleChoice from './views/Student/MultipleChoice/MultipleChoice';
import CrudStudents from './views/Administrator/Cruds/CrudStudents/CrudStudents';
import PrincipalView from './views/Principal/PrincipalView';






function App() {
  
  

  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)

  const {isLogged, isAdmin} = auth



  useEffect(()=> {
    const loggedUserJSON = window.localStorage.getItem('loggedAgoraUser')
    const firstLogin = localStorage.getItem('firstLogin')
    // console.log(firstLogin && loggedUserJSON)
    if(firstLogin && loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      const refreshtoken = user.refresh_token
      
      const getToken = async () =>{
        const res = await axios.post('http://localhost:3001/api/refresh_token', {refreshtoken})
        // console.log(res)
        dispatch({type:'GET_TOKEN', payload: res.data.access_token})
      }
      getToken()
      
    }
  }, [auth.isLogged, dispatch])


  useEffect(()=> {
    if(token){
      console.log(token, "user")
      const getUser = () => {
        dispatch(dispatchLogin())
        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
    
  }, [token, dispatch])
  

  return(
    <>
      <NavBar></NavBar>
       <Routes>
         {/* login */}
         
         <Route path= '/login' element={ isLogged ? <WelcomeUser/> :<Login/>} exact/>
        <Route path= '/forgot_password' element={isLogged ? <WelcomeUser/> :<Login/>} exact/>
 
         {/* others */}
         <Route path="/" element={<PrincipalView/>}/>
         <Route path="/welcome-user" element={<WelcomeUser/>}/>
         <Route path="/welcome-student" element={<WelcomeStudent/>}/>
         <Route path="/form-student/:id" element={<FirstStudentForm/>}/>
         <Route path="/thanks-student" element={<Thanks/>}/>
         <Route path="/inform-student" element={<FirstStudentInform/>}/> 
         <Route path="/student-sessions" element={<StudentSession/>}/>   
         <Route path="/admin-panel" element={<admin-panel/>}/> 
         <Route path="/MultipleChoice" element={<MultipleChoice/>}/>
         <Route path="/CrudStudents" element={<CrudStudents/>}/>
         <Route path="*" element={
         <main style={{ padding: "1rem" }}>
           <p>There's nothing here!</p>
         </main>
         }/>
 
 
  
       </Routes>
       
       <Footer></Footer>
    </>
  ) 
  
  
  // return (
  //   <div className="App">
  //     <h1>Bienvenido Usuario genérico</h1>
  //     <nav
  //       style={{
  //         borderBottom: "solid 1px",
  //         paddingBottom: "1rem"
  //       }}
  //     >
  //     {/*<CrudStudent/>*/}
  //     <Link to="/welcome-user">| Pagina Bienvenida Usuario |</Link>
  //     <Link to="/welcome-student">| Pagina Bienvenida estudiante |</Link>
  //     <Link to="/student-profile-interests">| Perfil de estudiante |</Link>
  //     <Link to="/student-sessions">| Sesiones |</Link>
  //     <Link to="/admin-panel">| admin |</Link>
  //     <Link to="/WelcomeCard">| WelcomeCard |</Link>
  //     <Link to="/CrudStudents">| CrudStudents |</Link>
  //     <Link to="/MultipleChoice">| MultipleChoice |</Link>
  //     <Link to="/TableSectionManager">| TableSectionManager |</Link>
 

  //     </nav>
  //     <Outlet />
  //   </div>
  // );  
}

export default App;
