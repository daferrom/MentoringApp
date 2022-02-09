import React from 'react'

import Facebook from '../assets/images/Facebook.svg'
import Instagram from '../assets/images/Instagram.svg'
import Youtube from '../assets/images/Insignificon-YouTube.svg'
import Programate from '../assets/images/programate-blanco-alta.png'
import Educamas from '../assets/images/logo-blanco-alta-.png'
import '../Footer/Footer.css'


const Footer = () => {
  return (
    <section className="footer">
    
    <section className="footer-social-media">
      
      <a href="https://www.facebook.com/somoseducamas" target="_blank" rel="noopener noreferrer">
      <img className="logoSocialMedia" src={Facebook} width="20px" height="20px" alt="Facebook"/></a>
      <a href="https://www.instagram.com/programate_escueladecodigo/" target="_blank" rel="noopener noreferrer">
      <img className="logoSocialMedia"src={Instagram} width="20px" height="20px" alt="Instagram"/></a>
      <a href="https://www.youtube.com/channel/UCmnr_sLPZ1E8H1VgUtaHGPQ" target="_blank" rel="noopener noreferrer">
      <img className="logoSocialMedia"src={Youtube} width="20px" height="20px" alt="Youtube"/></a>
      
    </section>
      <h5 className="rightsResercedText"> 
        Desarrollado por Superteam de Quackcoders.<br></br>
        ©Todos los derechos reservados.
      </h5>
    <section className="footer-info">
      <section className="img">
        <section className="footer-info__name">
        <img src={Programate} width="120px" height="30px" alt="Programate Logo"/>
        </section>
            
      </section>
      <section className="footer-info-right">
      <img src={Educamas} width="120px" height="30px" alt="Educamás Logo"/>
        
       
      </section>
    </section>
    
  </section>
  )
}

export default Footer;

