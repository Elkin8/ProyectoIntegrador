import React from "react";
import { useNavigate } from "react-router-dom";


const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="welcome-container">
        <h1>Bienvenido a Proyecto Integrador</h1>
        <p>
          Nuestra aplicación está diseñada para gestionar retos y competiciones. Los usuarios pueden inscribirse en diferentes retos, participar y subir pruebas de sus logros. Los administradores pueden crear, actualizar y eliminar retos, así como declarar ganadores y gestionar inscripciones.
        </p>
        <p>
          Funcionalidades principales:
        </p>
        <ul>
          <li>Crear, actualizar y eliminar retos.</li>
          <li>Inscribirse en retos y subir pruebas de logros.</li>
          <li>Declarar ganadores y gestionar inscripciones.</li>
          <li>Ver la lista de ganadores y sus pruebas.</li>
        </ul>
        <p>
          ¡Esperamos que disfrutes usando nuestra aplicación y que te ayude a gestionar tus retos y competiciones de manera eficiente!
        </p>
        <div className="button-container">
          <button className="btn-custom" onClick={() => navigate("/login")}>Iniciar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;