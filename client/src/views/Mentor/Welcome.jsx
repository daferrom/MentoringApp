import './welcome.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Welcome= () => {

  const [data, setData] = useState([])

  const idMentor = useSelector(state => state.auth.user.id)

  useEffect(() => {
    axios({
      url: `http://localhost:3001/api/one/mentor/${idMentor}`
    })
      .then(response => {
        setData(response.data)
        //console.log(response.data);
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const navigate = useNavigate()

  if(data.length > 0){
    console.log(data[0])
  }
  
  
  const getInterest = () => {
    if(data[0].interestsMentor.length > 0) {
      navigate('/')
    }
  }

  getInterest()

  return (
    <div className='Welcome'>
      <h2>Estimado Mentor(a)</h2>
      <ul>
        <li>Gracias por realizar la inscripción</li>

        <li> No olvides completar los 3 pasos para tu perfil como Mentor</li>
        <li>
          contactar con el equipo administrativo de educamás si tienes alguna
          duda.
        </li>
      </ul>
      <Link className="btn-welcom-mentor" to="/FormMentor"> Siguiente</Link>
    </div>
  )
}

export default Welcome
