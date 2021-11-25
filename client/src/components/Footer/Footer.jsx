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
    <hr className="footer-seperator" />
    <section className="footer-social-media">
      
    <a href="https://www.facebook.com/somoseducamas" target="_blank" rel="noopener noreferrer">
      <img className="facebook" src={Facebook} width="20px" height="20px" alt="Facebook"/></a>
      <a href="https://www.instagram.com/programate_escueladecodigo/" target="_blank" rel="noopener noreferrer">
      <img className="instagram"src={Instagram} width="20px" height="20px" alt="Instagram"/></a>
      <a href="https://www.youtube.com/channel/UCmnr_sLPZ1E8H1VgUtaHGPQ" target="_blank" rel="noopener noreferrer">
      <img className="youtube"src={Youtube} width="20px" height="20px" alt="Youtube"/></a>
      
    </section>
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
    <hr className="footer-seperator" />
  </section>
  )
}

export default Footer;

