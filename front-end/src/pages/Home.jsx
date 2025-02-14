import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css"; // Estilos mejorados

const Home = () => {
  const [challenges, setChallenges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener retos desde el backend
    axios
      .get("http://localhost:3000/api/challenges")
      .then((response) => setChallenges(response.data))
      .catch((error) => console.error("Error al obtener los retos:", error));
  }, []);

  const handleParticipate = (challengeId) => {
    // Redirigir al login antes de inscribirse en un reto y pasar el ID del reto
    navigate(`/login?redirect=/challenge/${challengeId}`);
  };

  return (
    <div>
      {/* Barra de navegación */}
      <nav className="navbar">
        <div className="nav-logo">Desafía y Salva</div>
        <ul className="nav-links">
          <li><a href="/">Inicio</a></li>
          <li><a href="#retos">Retos</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>

      {/* Sección principal */}
      <header className="header">
        <h1>🌍 Únete a los Retos y Ayuda al Medio Ambiente 🌱</h1>
        <p>
          Participa en desafíos ecológicos, gana fabulosos premios y contribuye al bienestar del planeta.  
          Nuestra misión es promover acciones sostenibles a través de retos ambientales, donde cada esfuerzo cuenta.  
        </p>
        <h2>📌 Participa y gana increíbles recompensas</h2>
        <p>Inscríbete en los retos, completa el desafío y demuestra tu compromiso con el planeta. ¡Los mejores recibirán premios exclusivos! 🏆</p>
      </header>

      {/* Sección de retos */}
      <section id="retos" className="challenge-section">
        <h2 className="title">🌿 Retos Disponibles 🌿</h2>
        <div className="challenge-grid">
          {challenges.length > 0 ? (
            challenges.map((challenge) => (
              <div key={challenge.id} className="challenge-card">
                <img
                  src={challenge.imageUrl}
                  alt={challenge.name}
                  className="challenge-image"
                />
                <div className="challenge-info">
                  <h3>{challenge.name}</h3>
                  <p>{challenge.description}</p>
                  <button
                    className="btn-participate"
                    onClick={() => handleParticipate(challenge.id)}
                  >
                    Participar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No hay retos disponibles en este momento.</p>
          )}
        </div>
      </section>

      {/* Pie de página */}
      <footer className="footer">
        <div className="footer-content">
          <h2 id="contacto">📩 ¿Tienes dudas? Contáctanos</h2>
          <p>Si necesitas más información, escríbenos a:</p>
          <ul>
            <li>📧 desafiaysalva@gmail.com</li>
            <li>📞 0978632913 | 0997220160 | 0998057250</li>
          </ul>
          <p>&copy; 2024 Desafía y Salva. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
