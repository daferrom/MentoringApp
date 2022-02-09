import {useState,useEffect} from 'react';
import styles from './CrudMentor.module.css';
import Table from '../../../../components/Table/Table';
import SearchContainer from '../../../../components/SearchContainer/SearchContainer';
import {FontAwesomeIcon}from'@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt }from'@fortawesome/free-solid-svg-icons'
import {makeStyles} from '@material-ui/core/styles';
import { Modal, Button,TextField} from '@material-ui/core';
import Axios from 'axios';
import Sidebar from '../../../../components/Sidebar/Sidebar';





const baseUrl = 'https://fathomless-bastion-33135.herokuapp.com'

 //Yellow row data
 const Articles=[{
    Id:"id" ,
    Nombres :"Nombres" ,
    Apellidos:"Apellidos",
    Edad:"Edad",
    Género:"Género",
    Intereses :"Intereses ",
    Programa :"Programa ",
    Carrera  : " Carrera  ",
    Empresa  :" Empresa  ",
    AsignaciónEst:"Asignación Est"
  }]
 //Table data
  const Database=[{
    Id:"id" ,
    Nombres :"Nombres" ,
    Apellidos:"Apellidos",
    Edad:"Edad",
    Género:"Género",
    Intereses :"Intereses ",
    Programa :"Programa ",
    Carrera  : " Carrera  ",
    Empresa  :" Empresa  ",
    AsignaciónEst:"Asignación Est"  
  },
  {
    Id:"id" ,
    Nombres :"Nombres" ,
    Apellidos:"Apellidos",
    Edad:"Edad",
    Género:"Género",
    Intereses :"Intereses ",
    Programa :"Programa ",
    Carrera  : " Carrera  ",
    Empresa  :" Empresa  ",
    AsignaciónEst:"Asignación Est"
  },
  {
    Id:"id" ,
    Nombres :"Nombres" ,
    Apellidos:"Apellidos",
    Edad:"Edad",
    Género:"Género",
    Intereses :"Intereses ",
    Programa :"Programa ",
    Carrera  : " Carrera  ",
    Empresa  :" Empresa  ",
    AsignaciónEst:"Asignación Est"
  },
  {
    Id:"id" ,
    Nombres :"Nombres" ,
    Apellidos:"Apellidos",
    Edad:"Edad",
    Género:"Género",
    Intereses :"Intereses ",
    Programa :"Programa ",
    Carrera  : " Carrera  ",
    Empresa  :" Empresa  ",
    AsignaciónEst:"Asignación Est" 
  },
  {
    Id:"id" ,
    Nombres :"Nombres" ,
    Apellidos:"Apellidos",
    Edad:"Edad",
    Género:"Género",
    Intereses :"Intereses ",
    Programa :"Programa ",
    Carrera  : " Carrera  ",
    Empresa  :" Empresa  ",
    AsignaciónEst:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi atque quibusdam cum, alias quasi, voluptas soluta neque inventore facilis minima reprehenderit voluptatum ducimus! Dicta, atque eaque. Reiciendis autem quae vitae."
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


const CrudMentor= () => {
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
/*const petitionGet=async()=>{
 await axios.get(Database)
  .then(response=>{
    console.log(response.data)
  })
}
useEffect(async()=>{
 await petitionGet();
},[])*/



//function that inserts data into the database
const [students, setStudents] = useState([])

  useEffect(() => {
    Axios({
      url: `${baseUrl}/api/mentorViewStudent`
    })
      .then(response => {
        setStudents(response.data)
        console.log(response.data);
      })
      .catch(error => {
        console.log(error)
      })
  }, [setStudents])


/*const petitionPost=async()=>{
  await axios.post(Database,SavedData)
  .then(response=>{
    setData(data.concat(response.data),
    openedClosedModalInsertar()
  )
  })
}*/



  //one-button boolean function
 const openedClosedModalInsertar=()=>{
  setmodalinsertar(!modalinsertar)
  
 }
 
 
 //Modal structure Insertar

 const bodyInsertar=(
  <div className={Styles.modal}>
    <h3 className={Styles.h3} >AGREGAR NUEVO MENTOR</h3>
    
    <TextField name="Nombres" className={Styles.inputMaterial} label="Nombre" onChange={InsertData} value={SavedData && SavedData.Nombres}/>
    <br />
    <TextField name="Apellidos" className={Styles.inputMaterial} label="Apellido" onChange={InsertData} value={SavedData && SavedData.Nombres}/>
    <br />
    <TextField name="Género" className={Styles.inputMaterial} label="Género" onChange={InsertData} value={SavedData && SavedData.Nombres}/>
    <br />
    <TextField name="Edad" className={Styles.inputMaterial} label="Edad" onChange={InsertData}/>
    <br />
    <TextField name="Hijos" className={Styles.inputMaterial} label="Hijos" onChange={InsertData}/>
    <br />
    <TextField name="Intereses" className={Styles.inputMaterial} label="Intereses" onChange={InsertData} value={SavedData && SavedData.Nombres}/>
    <br />
    <TextField name="Programa" className={Styles.inputMaterial} label="Programa" onChange={InsertData} value={SavedData && SavedData.Nombres}/>
    <br />
    <TextField name="Carrera" className={Styles.inputMaterial} label="Carrera" onChange={InsertData} value={SavedData && SavedData.Nombres}/>
    <br />
    <TextField name="Empresa" className={Styles.inputMaterial} label="Empresa" onChange={InsertData} value={SavedData && SavedData.Nombres}/>
    <br />
    <TextField name="AsignaciónEst" className={Styles.inputMaterial} label="Asignación Est" onChange={InsertData} value={SavedData && SavedData.Nombres}/>
    <br /><br />
    <div align="right">
      <Button className={Styles.Button } /*onClick={()=>petitionPost()}*/>Insertar</Button>
      <Button className={Styles.Button }  onClick={()=>openedClosedModalInsertar()}>Cancelar</Button>
    </div>
  </div>
 )
 


  return (
  <div>

     { /*title and add button*/}
    <Sidebar/>
     <SearchContainer h1={"TABLA DE CONTROL DE LOS MENTORES "} placeholder={"Busca un Mentor"}
    onClick={()=>openedClosedModalInsertar()}/>

     {/*mapping the yellow row data*/ }

      <Table th={Articles.map((e) =>{
        return( 
                <tr className={styles.column}>
                  <th>{e.Id}</th>
                  <th>{e.Nombres}</th>
                  <th>{e.Apellidos}</th>
                  <th>{e.Edad}</th>
                  <th>{e.Género}</th>
                  <th>{e.Intereses}</th>
                  <th>{e.Programa}</th>
                  <th>{e.Carrera}</th>
                  <th>{e.Empresa}</th>
                  <th>{e.AsignaciónEst}</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              )})
                } 
                
            /*table data mapping*/

          th2={Database.map((e) =>{
            return(
                    <tr className={styles.row}>
                        <br />
                      <td>{e.Id}</td>
                      <td>{e.Nombres}</td>
                      <td> {e.Apellidos}</td>
                      <td>{e.Edad}</td>
                      <td>{e.Género}</td>
                      <td>{e.Intereses}</td>
                      <td>{e.Programa}</td>
                      <td>{e.Carrera}</td>
                      <td>{e.Empresa}</td>
                      <td>{e.AsignaciónEst}</td>
                           <br/>
                      <>
                      <td><button   className={styles.update}><FontAwesomeIcon icon={faEdit}/></button></td>
                      <td><button  className={styles.delete}><FontAwesomeIcon icon={ faTrashAlt}/></button></td>
                      </>
                      <br /><br />
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

export default CrudMentor