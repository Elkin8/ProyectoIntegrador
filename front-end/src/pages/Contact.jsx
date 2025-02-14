import React from 'react';
import Navbar1 from '../components/Navbar1';
import instagramLogo from '../assets/instagram.png'; 
import facebookLogo from '../assets/facebook.png'; 
import twitterLogo from '../assets/twitter.png'; 

const ContactPage = () => {
  return (
    <div>
      <Navbar1 />
      <div className="containerf">
        <h1><strong>Contáctanos</strong></h1>
        <p>Si tienes alguna duda o sugerencia, no dudes en contactarnos.</p>
        <p><strong>Correo:</strong> alguncorreo@correo.com</p>
        <p><strong>Teléfono: </strong> 1234567890</p>
        <p className="text-center"><strong>¡¡Síguenos en nuestras redes sociales para que no te pierdas de nada!!</strong></p>
        <p>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="back-link">
            <img src={instagramLogo} alt="Instagram" className="social-logo" /> Instagram
          </a>
        </p>
        <p>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="back-link">
            <img src={facebookLogo} alt="Facebook" className="social-logo" /> Facebook
          </a>
        </p>
        <p>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="back-link">
            <img src={twitterLogo} alt="Twitter" className="social-logo" /> X
          </a>
        </p>
      </div>
    </div>
  );
}

export default ContactPage;