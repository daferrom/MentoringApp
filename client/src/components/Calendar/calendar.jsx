import '../Calendar/card-calendar.css'
import React, { useState, useEffect} from "react";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import WaitMessage from './WaitMessage';

const Calendar = () => {
  const baseUrl = 'https://fathomless-bastion-33135.herokuapp.com'
  const [date, setDate] = useState([])
  const [avaiDates, setAvaiDates] = useState([])
  const [dateSelect, setDateSelect] = useState()
  const [assiMentor, setAssiMentor] = useState()
  const [dateFilledOut, setDateFilledOut] = useState(false)

  const idStudent = useSelector(state => state.auth.user.id)
  // console.log(idStudent)

  const navigate = useNavigate() 

  let { id } = useParams();

  useEffect(() => {
    if(idStudent){
      axios.get(`${baseUrl}/api/dashboard/assigned-session/${idStudent}/${id}`)
      .then(response => {
        // setSessions(response.data)
        if(response.data.length > 0){
          setDateFilledOut(true)
        }
      
      })
      .catch(error => {
      console.log(error)
      })
    }
  }, [idStudent, id])


  // console.log(dateFilledOut)

  useEffect(() => {
    axios.get(`${baseUrl}/api/mentor-availability/${id}/${idStudent}`).then((response) => {
      setDate(response.data)
      // console.log(response.data)
      if(response.data.length > 0){
        setAvaiDates(response.data[0].mentAvailability)
      }
      
    })
  }, [id, idStudent])

  useEffect(() => {
    // console.log(idStudent)
    if(idStudent){
      axios.get(`${baseUrl}/api/assigned-mentor/${idStudent}`).then((response) => {
      // setDate(response.data)
        setAssiMentor(response.data[0].assignedMentor)
      })
    }
  }, [idStudent])
  // console.log(date)

  // console.log(assiMentor)

  const saveAvaiDates = []

  function saveDates (data) {

    data.forEach(date => saveAvaiDates.push({value: date, label: date}))

  }

  saveDates(avaiDates)

  // console.log(saveAvaiDates)



  const handleDateSelect = (dateSelect) => {
    setDateSelect(dateSelect.value)
  }

  // console.log(dateSelect)
  

  const handleUpdateDate = () => {
    axios
    .post(`${baseUrl}/api/assignedDate`,{
      idSession: id,
      idStudent: idStudent,
      idMentor: assiMentor,
      dateAsig: dateSelect,
      link: "url: http://meet.google.com/new"
    }).then(
      navigate('/student-assignment-sessions')
    )
  }
   


  const MenAvailExist = (req, res) => {
    return(
    <div className='container-card'>
      <h3>Querido estudiante</h3>
      <p>
        Debes escoger el dìa de tu sesión de mentoría dentro del siguiente rango
        de fechas que tu mentor ha programado.
      </p>
      <h3>Rango de fechas para tu sesión</h3>
      <div className='dates-calendar'>
        <div className='date-begin'>
          <h4>Fecha inicial</h4>
          { date.map((Startdate, index) =>(<p key={index}>{Startdate.idSession.startDate}</p> ))}
        </div>

        <div className='date-end'>
          <h4>Fecha final</h4>
          { date.map((EndDate, index) =>(<p key={index}>{EndDate.idSession.endDate}</p> ))}
        </div>

        
      </div>
      <div className="container-select-D">
        <Select
          className="selectDates"
          name="Dates"
          options={saveAvaiDates}
          onChange={handleDateSelect}
        />
        <button  onClick={handleUpdateDate}>Finalizar</button>
      </div>
    </div>
    )
  }

  const NotMentAvail = () => {
    return (
      <>
      <WaitMessage header={"¡Muy pronto podras agendar la sesión!"} message={"Espera a que tu mentor asigne las posibles fechas para la sesión"}></WaitMessage>
      </>
    )
  }

  return (
    <>
    {date.length > 0 ? <MenAvailExist/> : <NotMentAvail/>}
    </>
  )
}


export default Calendar