import {useEffect, useState} from 'react'
import Styles from'./MultipleChoice.module.css'
import Card from '../../../components/Card/Card';

import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';



const MultipleChoice = () => {
    const[value,setValue]=useState(null)
    const onDropdownCange= (value)=>{
      setValue(value)
    }
    const[data, setData]=useState([]);
    const save=[]
  // const [dataselec, setDataselect]=useState([]);
    /*const petitionGet=async()=>{
        await axios.get("http://localhost:3001/api/profile-edit")
         .then(response=>{
             console.log(response.data)
           
         })   
         
       }*/

       
       useEffect(() => {
        axios({
       url: "http://localhost:3001/api/profile-edit",
        })
       .then((response) => {
         setData(response.data);
        //  console.log(response.data);  
       })
       .catch((error) => {
         console.log(error);
       });
      }, [setData]);
       
     //function to transform API data from string to array
      function debugDat(data){
        data.map((interest)=>{
                            
          interest.interestsMentor.map((oneInterest, index)=>{
            return(
              save.push({name: oneInterest, id:index})
              )   
          })
             
     })}

     debugDat(data)
      
      console.log(save)
      // console.log()
      
    return ( 
       <div className={Styles.contenedor}>

           <div className={Styles.heder}>
               <p>Completa la siguiente información para avanzar en la plataforma.</p>
           </div>
           
                <Card  container={

                    <>
                        <h3>Intereses generales</h3>
                        <p>Elige máximo tres intereses</p>
                        {/* <Select
                        // size="3"
                        maximumSelectionLength="3"
                        isMulti
                        name="colors"
                        value={value}
                         options={prueba}
                         onChange={onDropdownCange} */}

                         <Multiselect
                          options={save} // Options to display in the dropdown
                          selectionLimit={3}
                          // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                          // onSelect={this.onSelect} // Function will trigger on select event
                          // onRemove={this.onRemove} // Function will trigger on remove event
                          displayValue="name" // Property name to display in the dropdown options
                          />
                        
                    {/* /> */}
                        
                        <br/> 
                    </>} 
                
                bottom={  <button>Finalizar</button>}
                />
           
           
        </div>
       
     );
} 
 
export default MultipleChoice;