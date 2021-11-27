import React, { useEffect, useState } from 'react'
import SchedulledSession from '../../../components/schedulledSessionCard/SchedulledSessionCard'
import Styles from './SessionsBoard.module.css'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector } from 'react-redux'
// import NavRes from '../../../components/NavRes/NavRes'
import WaitMessage from '../../../components/Calendar/WaitMessage';

function SessionsBoard () {
  // const idStudent = useSelector(state => state.auth.user.id)
  const [sessions, setSessions] = useState([])
  const [sessionsExist, setSessionsExist] = useState(false)
  const studentProgram = useSelector(state => state.auth.user.program)
  // const { user }= auth

  useEffect(
    sessionsExist => {
      //  const studentProgram = user.program
      Axios.get(`http://localhost:3001/api/session/${studentProgram}`).then(
        res => {
          const sessionsResult = res.data
          //  console.log(sessionsResult)
          setSessions(sessionsResult)
          if (sessionsResult.length > 0) {
            //  console.log("esta entrando al if")
            // setSessions (sessionsResult)
            setSessionsExist(!sessionsExist)
          } else {
            setSessionsExist(sessionsExist)
          }
        }
      )
    },
    [studentProgram]
  )

  // function checkSessions (){
  //   if(sessions.length > 0){
  //     //  console.log("esta entrando al if")
  //     // setSessions (sessionsResult)
  //     setSessionsExist(!sessionsExist)
  //    }else{
  //     setSessionsExist(sessionsExist)
  //    }
  // }

  // checkSessions

  const SessionExist = () => {
    return (
      <div>
        <div className={Styles.board}>
          {sessions.map(session => (
            <SchedulledSession
              numSession={session.numSession}
              startDate={session.startDate}
              key={session.id}
              id={session.id}
              endDate={session.endDate}
            ></SchedulledSession>
          ))}
        </div>
      </div>
    )
  }

  const SessionNotExists = () => {
    return (
      <>
        <WaitMessage header={"¡Muy pronto podras ver las sesiones habilitadas!"} message={"Espera a que las sesiones sean habilitadas"}></WaitMessage>
      </>
    )
  }

  return <>{sessionsExist ? <SessionExist /> : <SessionNotExists />}</>
}

export default SessionsBoard
