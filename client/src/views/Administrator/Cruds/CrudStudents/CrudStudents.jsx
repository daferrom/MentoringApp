import { useState, useEffect } from 'react';
import styles from './Style.module.css';
import Table from '../../../../components/Table/Table';
import SearchContainer from'../../../../components/SearchContainer/SearchContainer';
import {FontAwesomeIcon}from'@fortawesome/react-fontawesome';
import {faEdit,faTrashAlt} from'@fortawesome/free-solid-svg-icons'
import {makeStyles} from '@material-ui/core/styles';
import { Modal, Button,TextField} from '@material-ui/core';
import Axios from 'axios';
import Sidebar from '../../../../components/Sidebar/Sidebar';

const Articles=[{
   
  name:"Nombres",
  Surnames:"Apellidos",
  Age:"Edad",
  Gender:"Género",
  Interests:"Intereses",
  Program:"Programa",
  MentorAssignment:"Id Mentor"
}]



//Modal styles
const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%',
    height: "2.5rem"
  },
  h3: {
    fontFamily: "Gilroy-ExtraBold ",
    color: "#92C149",
     margin: "0"
  },
  Button: {
    backgroundColor: "#FFCC02",
    color: "#010101",
    margin: "0rem 0.5rem 0rem 0rem",
    "&:hover": {
      backgroundColor: "#92C149"
    }

  },

}));



const CrudStudents = () => {
  
  const [data, setData] = useState([]);
  const Styles = useStyles();
  const [modalinsertar, setmodalinsertar] = useState(false);
  const [modalEdit, setModalEdit]=useState(false);
  //Insert saved module data
  const [SavedData, setSavedData] = useState({
    name:"",
    middleName:"",
    lastName:"",
    secondSurname:"",
    actualAge:"",
    gender:"",
    program:"",
    email:"",
    contactNumber:"",
    cohorte:"",
    role:1
  })
  //base Url of deploy
  const baseUrl = 'https://fathomless-bastion-33135.herokuapp.com'
  //Function to insert the data written in the module.
  const InsertData = e => {
    const { name, value } = e.target;
    setSavedData(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(SavedData)
  }
  //function that searches the database for data
  /* const petitionGet=async()=>{
   await axios.get(Database)
    .then(response=>{
      console.log(response.data)
    })
  }
  useEffect(async()=>{
   await petitionGet();
  },[]) */

  const [students, setStudents] = useState([])

  useEffect(() => {
    Axios({
      url: `${baseUrl}/api/students/control`
    })
      .then(response => {
        setStudents(response.data)
        console.log(response.data);
      })
      .catch(error => {
        console.log(error)
      })
  }, [setStudents])



  //function that inserts data into the database

    const petitionPost = async e => {
      e.preventDefault();
      try{
        await Axios.post(`${baseUrl}/api/students-control-post`,{
          
          gender:SavedData.gender ,
          actualAge:SavedData.actualAge ,
          name:SavedData.name,
          middleName:SavedData.middleName,
          lastName:SavedData.lastName,
          secondSurname:SavedData.secondSurname,
          email:SavedData.email,
          password:SavedData.password,
          contactNumber:SavedData.contactNumber,
          role:SavedData.role,
          cohorte:SavedData.cohorte
        })
      }catch(err){
        console.log(err)
      }
      
  }




  //one-button boolean function
  const openedClosedModalInsertar = () => {
    setmodalinsertar(!modalinsertar)

  }


  //Modal structure Insertar

  const bodyInsertar = (
    <div className={Styles.modal}>
      <h3 className={Styles.h3} >AGREGAR NUEVO ESTUDIANTE   </h3>
      
      
      
      <TextField name="name" className={Styles.inputMaterial} label="Nombres" onChange={InsertData}  />
      <br />
      <TextField name="middleName" className={Styles.inputMaterial} label="Segundo Nombre" onChange={InsertData}  />
      <br />
      <TextField name="lastName" className={Styles.inputMaterial} label="Apellidos" onChange={InsertData} />
      <br />
      <TextField name="secondSurname" className={Styles.inputMaterial} label="Segundo apellidos" onChange={InsertData} />
      <br />
      <TextField name="actualAge" className={Styles.inputMaterial} label="Edad" onChange={InsertData} />
      <br />
      <TextField name="gender" className={Styles.inputMaterial} label="Género" onChange={InsertData}  />
      <br />
      <TextField name="program" className={Styles.inputMaterial} label="Programa" onChange={InsertData}  />
      <br />
      <TextField name="email" className={Styles.inputMaterial} label="Email" onChange={InsertData} />
      <br />
      <TextField name="contactNumber" className={Styles.inputMaterial} label="Celular" onChange={InsertData} />
      <br />
      <TextField name="cohorte" className={Styles.inputMaterial} label="cohorte" onChange={InsertData} />
      <br />
      <TextField name="password" className={Styles.inputMaterial} label="Contraseña" onChange={InsertData} />
    

      <br /><br />
      <div align="right">
        <Button className={Styles.Button}  onClick={petitionPost}>Insertar</Button>
        <br />
        <br />
        <Button className={Styles.Button} onClick={() => openedClosedModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  

  return (
    <>
    <Sidebar/>
    <div className={styles.container}>

      
      <SearchContainer h1={"TABLA CONTROL ESTUDIANTES"} placeholder={"Busca un Estudiante"}
        onClick={() => openedClosedModalInsertar()} />
      <Table th={Articles.map((e) => {
        return (
          <tr className={styles.column}>
            <th>{e.name}</th>
            <th>{e.Surnames}</th>
             <th>{e.Age}</th>
            <th>{e.Gender}</th>
            <th>{e.Interests}</th> 
            <th>{e.Program}</th>
            <th>{e.MentorAssignment}</th>
            <th>Editar</th> 
            <th>Eliminar</th>
             </tr>
        )
      })
      }
        th2={students.map((e) => {
          return (
            <tr className={styles.row}>
              <br />
              <td>{e.user_id.name +" "+ e.user_id.middleName  }</td>
              <td>{e.user_id.lastName +" "+e.user_id.secondSurname}</td>
              <td>{e.actualAge}</td>
              <td>{e.gender}</td>
              <td>{e.interestsStudent[0] + " "+e.interestsStudent[1]+" "+e.interestsStudent[2]}</td>
              <td>{e.user_id.program }</td>
              <td>{e.assignedMentor}</td>
              <td><button className={styles.update}><FontAwesomeIcon icon={faEdit} /></button></td>
              <td><button className={styles.delete}><FontAwesomeIcon icon={faTrashAlt} /></button></td><br />
              
             
            </tr>
                


          )
        })} />

      <Modal
        open={modalinsertar}
        onClose={openedClosedModalInsertar}>
        {bodyInsertar}

      </Modal>

      


    </div >
    </>

  )
}

export default CrudStudents