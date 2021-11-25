import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.module.css'
import { BrowserRouter as Router } from 'react-router-dom'
import DataProvider from './redux/store'

ReactDOM.render(
  <DataProvider>
    <Router>
      <App />
    </Router>
  </DataProvider>,
  document.getElementById('root')
)
// import React from 'react';
// import Styles from'./index.module.css'
// import { render } from 'react-dom';
// import { 
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";
// import App from './App';
// import WelcomeUser from './routes/welcome-user'
// import WelcomeStudent from './views/Student/Welcome/WelcomeStudent' 
// import StudentProfile from './routes/student-profile'
// import StudentSession from './routes/student-sessions';
// import CrudStudents from './views/Administrator/Cruds/CrudStudents/CrudStudents';

// import MultipleChoice from './views/Student/MultipleChoice/MultipleChoice';
// import WelcomeCard from './components/welcomeCard/WelcomeCard';
// import TableSectionManager from './views/Student/TableSectionManager/TableSectionManager';



// const rootElement = document.getElementById("root")

// render(
//   <BrowserRouter>
//     <React.StrictMode>

//       <Routes>
        
//         <Route path="/" element={<App/>}/>
//         <Route path="/welcome-user" element={<WelcomeUser/>}/>
//         <Route path="/welcome-student" element={<WelcomeStudent/>}/>  
//         <Route path="/student-profile-interests" element={<StudentProfile/>}/>  
//         <Route path="/student-sessions" element={<StudentSession/>}/>
//         <Route path="/CrudStudents" element={<CrudStudents/>}/>  
//         
//         <Route path="/WelcomeCard" element={<WelcomeCard/>}/> 
//         <Route path="/TableSectionManager" element={<TableSectionManager/>}/> 
        
//       </Routes>
//     </React.StrictMode>
//   </BrowserRouter>,
//   rootElement
// );
