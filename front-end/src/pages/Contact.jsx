import React from 'react';
import Navbar1 from '../components/Navbar1';

const ContactPage = () => {
  return (
    <div>
        <Navbar1/>
        <div className="containerf">
            <h1>Contáctanos</h1>
            <p>Si tienes alguna duda o sugerencia, no dudes en contactarnos.</p>
            <p><strong>Correo:</strong> alguncorreo@correo.com</p>
            <p><strong>Teléfono: </strong> 1234567890</p>
        </div>
    </div>
  );
}


export default ContactPage;