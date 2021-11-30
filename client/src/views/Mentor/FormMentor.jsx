import './formmentor.css'

import Card from '../../../src/components/Card/Card'
import Select from 'react-select'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function FormMentor () {
  const baseUrl = 'https://fathomless-bastion-33135.herokuapp.com'

  const [updateMentor, setUpdateMentor] = useState({
    academic_level: '',
    ActualJobPosition: '',
    Company: '',
    actualAge: '',
    gender: '1',
    sons: '',
    numeStudents: ''
  })

  const interestMentor = [
    { value: 'React.JS', label: 'React.JS' },
    { value: 'Angular.JS', label: 'Angular.JS' },
    { value: 'Blockchain', label: 'Blockchain' },
    { value: 'Vue.JS', label: 'Vue.JS' },
    { value: 'MySQL', label: 'MySQL' },
    { value: 'Mongo.db', label: 'Mongo.db' },
    { value: 'Node.JS', label: 'Node.JS' },
    { value: 'Express.JS', label: 'Express.JS' },
    { value: 'Django', label: 'Django' },
    { value: 'Next.JS', label: 'Next.JS' },
    { value: 'Java', label: 'Java' },
    { value: 'Machine Learning', label: 'Machine Learning' },
    { value: 'Linux', label: 'Linux' },
    { value: 'PHP', label: 'PHP' }
  ]

  // const handleChange = (selectedOption) => {

  // }

  const maxOptions = 3

  const [selectedOption, setSelectedOption] = useState([])

  const handleTypeSelect = e => {
    setSelectedOption(e)
  }

  const handleChangeInput = e => {
    const { name, value } = e.target
    setUpdateMentor({ ...updateMentor, [name]: value })
  }

  // console.log(selectedOption)

  const sendSelect = selectedOption.map(option => option.value)

  const auth = useSelector(state => state.auth)
  // console.log(auth)

  const { user } = auth

  const navigate = useNavigate()

  const handleUpdateInterest = e => {
    e.preventDefault()
    if (sendSelect.length === 3) {
      const userinterestsMentor = sendSelect

      const idMentor = user.id

      axios.post(`${baseUrl}/api/formControl/${idMentor}`, {
        gender: updateMentor.gender,
        academic_level: updateMentor.academic_level,
        ActualJobPosition: updateMentor.ActualJobPosition,
        Company: updateMentor.Company,
        actualAge: updateMentor.actualAge,
        sons: updateMentor.sons,
        interestsMentor: userinterestsMentor,
        numeStudents: updateMentor.numeStudents
      })
      navigate('/thanks-student')
    } else {
      alert('Por favor selecciona 3 intereses')
    }
  }

  return (
    <div className='container-Q'>
      <form className='form-mentor' onSubmit={handleUpdateInterest}>
        <div className='containerList'>
          <label className='mg-bottom'>Estudios</label>
          <input
            onChange={handleChangeInput}
            className='mg-bottom'
            name='academic_level'
            required
          ></input>
          <label className='mg-bottom'>Cargo actual</label>
          <input
            onChange={handleChangeInput}
            className='mg-bottom'
            name='ActualJobPosition'
            required
          ></input>
          <label className='mg-bottom'>Empresa en donde trabajas</label>
          <input
            onChange={handleChangeInput}
            className='mg-bottom'
            name='Company'
            required
          ></input>
          <label className='mg-bottom'>Edad</label>
          <input
            onChange={handleChangeInput}
            className='mg-bottom'
            name='actualAge'
            required
          ></input>
          <label className='mg-bottom'>Género</label>
          <select
            onChange={handleChangeInput}
            name='gender'
            className='mg-bottom'
            required
          >
            <option value='1'>Hombre</option>
            <option value='2'>Mujer</option>
            <option value='3'>Personalizado</option>
          </select>
          {/* <input
           
          className="mg-bottom" 
          name=""></input> */}
          <label className='mg-bottom'>Hijos</label>
          <input
            onChange={handleChangeInput}
            className='mg-bottom'
            name='sons'
            required
          ></input>

          <label className='mg-bottom'>
            Cantidad de estudiantes que quieres en el proceso
          </label>
          <input
            onChange={handleChangeInput}
            className='mg-bottom'
            name='numeStudents'
            required
          ></input>
        </div>

        <Card
          container={
            <>
              <h3>Intereses generales</h3>
              <p>Elige máximo tres intereses</p>

              <Select
                name='interest'
                options={
                  selectedOption.length === maxOptions ? [] : interestMentor
                }
                isMulti
                onChange={handleTypeSelect}
                noOptionsMessage={() => {
                  return selectedOption.length === maxOptions
                    ? 'You have reached the max options value'
                    : 'No options available'
                }}
              />

              <br />
            </>
          }
        />
        <button className='button-formMentor' type='submit'>
          Enviar
        </button>
      </form>
    </div>
  )
}

export default FormMentor