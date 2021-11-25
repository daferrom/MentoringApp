import React from 'react';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import '../Thanks/thanks.css'

const Thanks = () => {
    return (
        <div> 
            <Navbar/>
            <div className="container">
              <div className="back">
                <div className="card">
                  <div className="box">
                    <div className="content">
                      <h3>¡Hemos recibido tus respuestas!</h3>
                      <p>Te notificaremos por correo cuándo se haya realizado la asginación de tu mentor.</p>
                      <a href="#n" className="next">Siguiente</a>
                    </div>              
                  </div>
                  {/* <h1 className="little">.hola.</h1> */}
                </div>
              </div>  
            </div>
            <Footer/>
        </div>
    )
}

export default Thanks
