
import {useState,useEffect} from 'react';
import styles from './CrudSessionDetail.module.css';
import Table from '../../../../components/Table/Table';
import SearchContainer from '../../../../components/SearchContainer/SearchContainer';
import {FontAwesomeIcon}from'@fortawesome/react-fontawesome';
import {faEdit,faTrashAlt,faPlusSquare}from'@fortawesome/free-solid-svg-icons'
import {makeStyles} from '@material-ui/core/styles';
import { Modal, Button,TextField} from '@material-ui/core';
import axios from 'axios';


const Articles=[{
  Id:"id " ,
  Estudiante:"Estudiante",
  Mentor :" Mentor ",
  Programa :"Programa",
  FechadeInicio:" Fecha de Inicio",
  FechadeFinalización :"Fecha de Finalización" 
}]

const Database=[{
  Id:"id " ,
  Estudiante:"Estudiante",
  Mentor :" Mentor ",
  Programa :"Programa",
  FechadeInicio:" Fecha de Inicio",
  FechadeFinalización :"Fecha de Finalización"  
},
{
  Id:"id " ,
  Estudiante:"Estudiante",
  Mentor :" Mentor ",
  Programa :"Programa",
  FechadeInicio:" Fecha de Inicio",
  FechadeFinalización :"Fecha de Finalización" 
},
{
  Id:"id " ,
  Estudiante:"Estudiante",
  Mentor :" Mentor ",
  Programa :"Programa",
  FechadeInicio:" Fecha de Inicio",
  FechadeFinalización :"Fecha de Finalización" 
},
{
  Id:"id " ,
  Estudiante:"Estudiante",
  Mentor :" Mentor ",
  Programa :"Programa",
  FechadeInicio:" Fecha de Inicio",
  FechadeFinalización :"Fecha de Finalización" 
},
{
  Id:"id " ,
  Estudiante:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis facere eveniet veritatis voluptas non similique, est vel quos asperiores eaque dolorum sunt nisi, hic consectetur eligendi! Nobis aperiam eius repudiandae.",
  Mentor :" Mentor ",
  Programa :"Programa",
  FechadeInicio:" Fecha de Inicio",
  FechadeFinalización :"Fecha de Finalización" 
}
]

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
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  },
  h3:{
    fontFamily:"Gilroy-ExtraBold ",
    color:"#92C149"
  },
  Button:{
    backgroundColor:"#FFCC02",
    color:"#010101",
    margin:"0rem 0.5rem 0rem 0rem",
    "&:hover":{
      backgroundColor:"#92C149"
    }
  },
  
}));

const CrudSessionDetail = () => {
  
  const [data, setData]=useState([]);
  const Styles= useStyles();
  const[modalinsertar,setmodalinsertar]=useState(false);
  //Insert saved module data
  const[SavedData,setSavedData]=useState({
    id:"",
    Nombres:"",
    Apellidos:"",
    Edad:"",
    Género:"",
    Intereses:"",
    Programa:"",
    Carrera:"",
    Empresa:"",
    AsignaciónEst:""
  })
//Function to insert the data written in the module.
const InsertData=e=>{
  const {name,value}=e.target;
  setSavedData(prevState=>({
   ...prevState,
    [name]:value
  }))
  console.log(SavedData)
}
//function that searches the database for data
const petitionGet=async()=>{
 await axios.get(Database)
  .then(response=>{
    console.log(response.data)
  })
}
useEffect(async()=>{
 await petitionGet();
},[])



//function that inserts data into the database

const petitionPost=async()=>{
  await axios.post(Database,SavedData)
  .then(response=>{
    setData(data.concat(response.data),
    openedClosedModalInsertar()
  )
  })
}



  //one-button boolean function
 const openedClosedModalInsertar=()=>{
  setmodalinsertar(!modalinsertar)
  
 }
 
 
 //Modal structure Insertar

 const bodyInsertar=(
  <div className={Styles.modal}>
    <h3 className={Styles.h3} >ASIGNAR UNA SESIÓN </h3>
    <TextField name="Id" className={Styles.inputMaterial} label="Id" onChange={InsertData} value={SavedData && SavedData.Nombres}/>
    <br />
    <TextField name="Estudiante" className={Styles.inputMaterial} label="Estudiante" onChange={InsertData} value={SavedData && SavedData.Nombres}/>
    <br />
    <TextField name="Mentor" className={Styles.inputMaterial} label="Mentor" onChange={InsertData} value={SavedData && SavedData.Nombres}/>
    <br />
    <TextField name="Programa" className={Styles.inputMaterial} label="Programa" onChange={InsertData} value={SavedData && SavedData.Nombres}/>
    <br />
    <TextField name="Fecha de Inicio" className={Styles.inputMaterial} label="Fecha de Inicio" onChange={InsertData}/>
    <br />
    <TextField name="Fecha de Finalización" className={Styles.inputMaterial} label="Fecha de Finalización" onChange={InsertData} value={SavedData && SavedData.Nombres}/>
  
    <br /><br />
    <div align="right">
      <Button className={Styles.Button } onClick={()=>petitionPost()}>Insertar</Button>
      <Button className={Styles.Button }  onClick={()=>openedClosedModalInsertar()}>Cancelar</Button>
    </div>
  </div>
 )
 
   
 
  return (
  <div>
     <SearchContainer h1={"TABLA DE SESIONES ASIGNADAS "} placeholder={"Buscar Una Sesión  "}
     onClick={()=>openedClosedModalInsertar()}/>
      <Table th={Articles.map((e) =>{
        return( 
                <tr className={styles.column}>
                  <th>{e.Id}</th>
                  <th>{e.Estudiante}</th>
                  <th>{e.Mentor}</th>
                  <th>{e.Programa}</th>
                  <th>{e.FechadeInicio}</th>
                  <th>{e.FechadeFinalización }</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                 
                </tr>
              )})
                } 
          th2={Database.map((e) =>{
            return(
                    <tr className={styles.row}>
                      <td className={styles.rowone}>{e.Id}</td>
                      <td className={styles.rowone}>{e.Estudiante}</td>
                      <td className={styles.rowone}>{e.Mentor}</td>
                      <td className={styles.rowone}> {e.Programa}</td>
                      <td className={styles.rowone}>{e.FechadeInicio}</td>
                      <td className={styles.rowone}>{e.FechadeFinalización}</td>
                     
                      <>
                      <td><button   className={styles.update}><FontAwesomeIcon icon={faEdit}/></button></td>
                      <td><button  className={styles.delete}><FontAwesomeIcon icon={ faTrashAlt}/></button></td>
                      </>
                      </tr>
                      
                        
                  
                  )})}/>

                  <Modal
                  open={modalinsertar}
                  onClose={openedClosedModalInsertar}>

                   {bodyInsertar}
                
                  </Modal>

  </div>
    
  )
}

export default CrudSessionDetail