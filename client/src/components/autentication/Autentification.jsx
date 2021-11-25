// import React from 'react'
// import { useSelector } from 'react-redux'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Login from '../login/Login'
// import ForgotPassword from '../login/ForgotPassword'
// // import ResetPassword from '../../pages/auth/resetPassword/ResetPassword'
// import NotFound from '../../views/General/NotFound'
// import Landing from '../../views/Principal/PrincipalView'


// function Autentification () {
//   const auth = useSelector(state => state.auth)
//   console.log(auth)
//   const { isLogged } = auth
//   return (
//     <>
//       <Routes>
//         <Route
//           path='/login'
//           element={isLogged ? <NotFound /> : <Login />}
//           exact
//         />
//         <Route path='/forgot_password' element={<ForgotPassword />} exact />
//         {/* <Route
//           path='/user/reset/:token'
//           element={isLogged ? <NotFound /> : <ResetPassword />}
//           exact
//         /> */}
//         <Route path= '/landing' element={<Landing/>} exact/>
//       </Routes>
//     </>
//   )
// }
// export default Autentification