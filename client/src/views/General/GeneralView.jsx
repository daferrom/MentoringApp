import React from 'react';
import './GeneralView.css'

const GeneralView = () => {
    return (
        <div>
          <h1 className="barnav">BARNAV</h1>
          <div className="all">
            <div className="intro">
              <h1 className="title">Bienvenido/a a Okhlos</h1>
              <br></br>
              <p className="description">Para conseguir tus objetivos profesionales y personales en el mundo tech.</p>
              <br></br>
              <h2 className="go">¡Empieza aquí!</h2>
            </div>
            <div className="container">
              <div className="back">
                <div className="card">
                  <div className="box">
                    <div className="content">
                      <h3>Aprendizaje personalizado</h3>
                      <p>Tendrás un mentor y sesiones personalizadas, según tus intereses.</p>
                      <a href="#" >Ingreso estudiantes</a>
                    </div>              
                  </div>
                  {/* <h1 className="little">.hola.</h1> */}
               </div>
              </div>  

              <div className="back">
                <div className="card">
                  <div className="box">
                    <div className="content">
                      <h3>Haz la diferencia</h3>
                      <p>Fomenta tu conocimiento y participa del proceso de crecimiento de nuevos líderes tech.</p>
                      <a href="#">Ingreso mentores</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="back">
                <div className="card">
                  <div className="box">
                    <div className="content">
                      <h3>Admin</h3>
                      <p>Todo lo que necesitas</p>
                      <a href="#">Ingreso administradores</a>
                    </div>
                  </div>
                </div>
                </div>
            </div>
          </div>
          {/* <h1 className="footer">FOOTER</h1> */}
        </div>
    )
}

export default GeneralView
