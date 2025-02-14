import React from "react";
import { useNavigate } from "react-router-dom";


const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-background">
      <div className="welcome-container">
        <h1><strong>Bienvenido a Desafía y Salva</strong></h1>
        <p>
        En esta página podrás desafiarte a ti mismo y competir contra otros usuarios en emocionantes retos ambientales diseñados para fomentar hábitos sostenibles. Si logras completar los desafíos antes que los demás, podrás recibir increíbles recompensas otorgadas por nuestros patrocinadores. Pero lo más importante es que, al participar, estarás contribuyendo activamente a la reducción de la huella de carbono y ayudando a proteger nuestro planeta. ¡Únete a la competencia y sé parte del cambio!        </p>
        <p>
        Esperamos que disfrutes participando en nuestros desafíos y que, a través de ellos, podamos seguir fomentando una mayor conciencia sobre la importancia de reducir nuestra huella de carbono. Cada acción que tomamos, por pequeña que parezca, contribuye a la protección del medio ambiente y al bienestar de nuestro planeta. Juntos, podemos generar un impacto positivo y promover hábitos sostenibles en nuestra vida diaria. ¡Anímate a formar parte del cambio y a inspirar a otros a unirse a esta causa!
        </p>
        <div className="button-container">
          <button className="btn-form1" onClick={() => navigate("/login")}>Iniciar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;