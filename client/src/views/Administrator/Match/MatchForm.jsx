import { useState } from 'react'
import Styles from './matchform.css'
import Card from '../../../components/Card/Card'
import Select from 'react-select'
import axios from 'axios'
import Sidebar from '../../../components/Sidebar/Sidebar'

const MatchForm = () => {
  let cohort = 0
  let program = ""
  const [students, setStudents] = useState([])
  const [mentors, setMentors] = useState([])
  const [chosenProgram, setChosenProgram] = useState(false)
  const [done, setDone] = useState(false)

  const handleTypeSelect = e => {
    cohort = e.label
    console.log(cohort)
  };

  const handleSelectPrograms = i => {
    program = i.label
    console.log(program)
  };

  const cohorte = [
    {
      value: 1,
      label: 1
    },
    {
      value: 2,
      label: 2
    },
    {
      value: 3,
      label: 3
    },
    {
      value: 4,
      label: 4
    }
  ]

  const programs = [
    {
      value: 'Programate',
      label: 'Programate'
    },
    {
      value: 'Administración de Empresas',
      label: 'Administración de Empresas'
    }
  ]

  const getValuesFinal = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/match/students/${program}/${cohort}`)
      // console.log(res)
      console.log(cohort)
      if (res.status === 200) {
        setStudents(res.data)
      }
    } catch (err) {
      console.log(err)
    }
    getValuesMentor()
  }

  const getValuesMentor = async () => {
    try {
      const resp = await axios.get(`http://localhost:3001/api/match/mentor/${program}/${cohort}`)
      // console.log(resp)
      if (resp.status === 200) {
        setChosenProgram(true)
        setMentors(resp.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const [match, setMatch] = useState([])
  

  let resultInterest = 0
  let resultAge = 0
  let competencies = 0
  let gender = 0
  let total = 0
  let count = 0

  function Interests(est, m) {
    let count = 0
    // Interests the student and mentor
    for (let i = 0; i < 3; i++) {
      const result = mentors[m].interestsMentor.includes(students[est].interestsStudent[i])
      // console.log("Result: " + result)
      if (result === true) {
        if (count === 0) {
          count = 5
        } else {
          count += 10
        }
      }
      // debugger
    } console.log(count)

    return count
  }

  function Age(est, m) {
    let count = 0
    // Actual age the student and mentor
    if (students[est].actualAge === mentors[m].actualAge) {
      count = 25
    } else if (students[est].actualAge + 5 >= mentors[m].actualAge & students[est].actualAge - 5 <= mentors[m].actualAge) {
      count = 15
    } else {
      count = 5
    }
    return count
  }

  function Competencies(est, m) {
    let count = 0
    // Commitment the student and mentor
    if (students[est].commitment === 3 && mentors[m].commitment === 1) {
      count += 10
    } else if (students[est].commitment < 3 && mentors[m].commitment < 3) {
      count += 10
    }
    // Achievement Orientation the student and mentor
    if (students[est].achievementOrientation === 3 && mentors[m].achievementOrientation === 1) {
      count += 10
    } else if (students[est].achievementOrientation < 3 && mentors[m].achievementOrientation < 3) {
      count += 10
    }
    // Flexibility the student and mentor
    if (students[est].flexibility === 3 && mentors[m].flexibility === 1) {
      count += 10
    } else if (students[est].flexibility < 3 && mentors[m].flexibility < 3) {
      count += 10
    }
    // Communication the student and mentor
    if (students[est].assertiveCommunication === 3 && mentors[m].assertiveCommunication === 1) {
      count += 10
    } else if (students[est].assertiveCommunication < 3 && mentors[m].assertiveCommunication < 3) {
      count += 10
    }
    return count
  }

  function Gender(est, m) {
    let count = 0
    if (students[est].studentsGenderPrefer === mentors[m].gender) {
      count = 10
    }
    return count
  }

  const Match = () => {
    for (let est = 0; est < students.length; est++) {
      for (let m = count; m < mentors.length; m++) {
        // Interests the student and mentor
        resultInterest = Interests(est, m)
        console.log(resultInterest)
        // Actual age the student and mentor
        resultAge = Age(est, m)
        console.log(resultAge)
        // Competencies the student and mentor
        competencies = Competencies(est, m)
        console.log(competencies)
        // Gender preference 
        gender = Gender(est, m)
        console.log(gender)
        // Total
        total = resultInterest + resultAge + competencies + gender
        console.log("Total" + total)
        console.log(students[est].user_id.name + "-" + mentors[m].user_id.name)
        if (total > 50) {
          match.push({
            nameEstudent: students[est].user_id.name,
            nameMentor: mentors[m].user_id.name
          })
          count += 1
          break
        }
        // debugger
      }
    }
    console.log("El listado del Match")
    console.log(match)
    setDone(true)
  }
    
    
  console.log(students)

  const ListStudentMentor = () => {
    return(
      <div>
      <Sidebar/>
          <div className="listStudent-Container">
            <h2 className="listStudent-title">Lista de Estudiantes</h2>
            <table>
              <tr className="listStudent-tr">
                <th className="listStudent-th"> </th>
                <th className="listStudent-th">Nombre</th>
                <th className="listStudent-th">Apellido</th>
                
              </tr>
              
            {students.map((e, index) => {
              return ( 
                <tr className="listStudent-tr-map" key={e.id}>
                    <td className="td-number">{index + 1}</td>
                    <td className="td-data">{e.user_id.name}</td>
                    <td className="td-data">{e.user_id.lastName}</td>
                </tr> 
              )
            })}
            </table>  
          </div>
          <div className="listStudent-Container">
            <h2 className="listStudent-title mg-top">Lista de Mentores</h2>
            <table>
              <tr className="listStudent-tr">
                <th className="listStudent-th"> </th>
                <th className="listStudent-th">Nombre</th>
                <th className="listStudent-th">Apellido</th>
                
              </tr>
              
            {mentors.map((e, index) => {
              return ( 
                <tr className="listStudent-tr-map" key={e.id}>
                    <td className="td-number">{index + 1}</td>
                    <td className="td-data">{e.user_id.name}</td>
                    <td className="td-data">{e.user_id.lastName}</td>
                </tr> 
              )
            })}
            </table> 
          </div>
          {done && 
          <div className="listStudent-Container margin-bottom">
            <h2 className="listStudent-title mg-top">Macth Estudiante Mentor</h2>
            <table>
              <tr className="listStudent-tr">
                <th className="listStudent-th"> </th>
                <th className="listStudent-th">Estudiante</th>
                <th className="listStudent-th">Mentor</th>
                
              </tr>
              
            {match.map((e, index) => {
              return ( 
                <tr className="listStudent-tr-map" key={e.id}>
                    <td className="td-number">{index + 1}</td>
                    <td className="td-data">{e.nameEstudent}</td>
                    <td className="td-data">{e.nameMentor}</td>
                </tr> 
              )
            })}
            </table> 
          </div>
          }
          <button style={{display: done ? 'none' : 'block'}} onClick={Match}>Hacer Match</button>
          
    </div>
    )
  }
  const ProgramAndCohort = () => {

    return (
      <div className={Styles.contenedor}>
        <Sidebar/>
        <div className={Styles.heder}></div>

        <Card
          container={
            <>
              <h3>Elige la cohorte y el programa para realizar el Match</h3>
              <p>Elige la cohorte</p>

              <Select
                name='cohorte'
                options={cohorte} // Options to display in the dropdown
                onChange={handleTypeSelect}
              />

              <p>Elige el programa.</p>

              <Select
                name='programs'
                options={programs} // Options to display in the dropdown
                onChange={handleSelectPrograms}
              />

              <br />
            </>
          }
          bottom={<button onClick={getValuesFinal}>Aceptar</button>}
        />
      </div>
    )
  }

  return <>{chosenProgram ? <ListStudentMentor /> : <ProgramAndCohort />}</>
}

export default MatchForm