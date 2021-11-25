import React from 'react';
import Styles from'./SearchContainer.module.css'


const SearchContainer = (props) => {
    
    return ( 
    <div className={Styles.Container}>

     <h1>{props.h1}</h1>

     <input type="search" placeholder={props.placeholder} onChange={props.onChange} value={props.value}/>

     <button  className={Styles.delete} onClick={props.onClick}><b>Agregar</b></button>
    </div> );
}
 
export default SearchContainer;