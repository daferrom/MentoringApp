import React, { useEffect } from 'react';
import '../Thanks/thanks.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const baseUrl = 'https://fathomless-bastion-33135.herokuapp.com'

const Thanks = () => {

  const idStudent = useSelector(state => state.auth.user.id)
  const navigate = useNavigate() 
  
  useEffect(() => {
    if(idStudent){
      axios.get(`${baseUrl}/api/one/student/${idStudent}`)
      .then(res => {
        const assignedMentor = res.data[0].assignedMentor;
        // console.log(assignedMentor)
        if(assignedMentor.toString() !== "Not assigned"){
          // console.log("entra al if")
          navigate('/student-sessions')
        }
        
      })
    }
  }, [idStudent, navigate])


    return (
        <div> 
            <div className="container">
              <div className="back">
                <div className="card">
                  <div className="box">
                    <div className="content">
                      <h3>¡Hemos recibido tus respuestas!</h3>
                      <p>Te notificaremos por correo cuándo se haya realizado la asignación de tu mentor.</p>
                      
                    </div>              
                  </div>
                  {/* <h1 className="little">.hola.</h1> */}
                </div>
              </div>  
            </div>
        </div>
    )
}

export default Thanks
