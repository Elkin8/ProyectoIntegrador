import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar1 from "../components/Navbar1";

const ChallengeDetailsPage = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState("");
  const [isInscribed, setIsInscribed] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/challenges/${id}`);
        setChallenge(response.data);
      } catch (error) {
        console.error("Error al obtener los detalles del reto:", error);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/current-user", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserId(response.data.id);
      } catch (error) {
        console.error("Error al obtener el usuario actual:", error);
      }
    };

    const checkUserInscription = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/inscriptions/${userId}/${id}`);
        setIsInscribed(response.data.isInscribed);
      } catch (error) {
        console.error("Error al verificar la inscripción del usuario en el reto:", error);
      }
    };

    fetchChallenge();
    fetchCurrentUser();
    checkUserInscription();
  }, [id, userId]);

  const handleInscribirse = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Error: No se encontró el ID del usuario. Inicia sesión nuevamente.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/inscriptions", { userId, challengeId: id });
      alert("Inscripción exitosa");
      setShowForm(false);
      setIsInscribed(true);
    } catch (error) {
      console.error("Error al inscribirse en el reto:", error.response?.data || error);
      setError(error.response?.data?.error || "Error al inscribirse en el reto");
    }
  };

  const handleDeclareWinner = () => {
    navigate(`/declare-winner/${id}`);
  };

  const handleCancelInscription = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/inscriptions/${userId}/${id}`);
      alert("Inscripción cancelada");
      setIsInscribed(false);
    } catch (error) {
      console.error("Error al cancelar la inscripción:", error.response?.data || error);
      setError(error.response?.data?.error || "Error al cancelar la inscripción");
    }
  };

  if (!challenge) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <Navbar1 />
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card" style={{ width: "35rem", backgroundColor: "#BF8D7A", boxShadow: "8px 8px 10px rgba(0, 0, 0, 0.9)", border: "2px solid black", borderRadius: "20px" }}>
          <img src={challenge.imageUrl} className="card-img-top" alt={challenge.name} style={{ height: "450px", objectFit: "cover" }} />
          <div className="card-body">
            <h5 className="card-title">{challenge.name}</h5>
            <p className="card-text"><strong>Reto número:</strong> {challenge.id}</p>
            <p className="card-text"><strong>Descripción:</strong> {challenge.description}</p>
            <p className="card-text"><strong>Recompensa:</strong> {challenge.reward}</p>
            <p className="card-text"><strong>Descripción de la Recompensa:</strong> {challenge.rewardDescription}</p>
            {challenge.winner ? (
              <div className="mt-3">
                <h5>Felicidades al ganador del reto:</h5>
                <p><strong>Jugador número:</strong> {challenge.winner.user.id}</p>
                <p><strong>Nombre del Ganador:</strong> {challenge.winner.user.username}</p>
                <p><strong>Enlace de Prueba:</strong> <a href={challenge.winner.proofLink} target="_blank" rel="noopener noreferrer">{challenge.winner.proofLink}</a></p>
                <p className="alert alert-info text-center">Este reto ya tiene un ganador</p>
                {isInscribed && (
                  <button type="button" className="btn-form2" onClick={handleCancelInscription}>
                    <p>Cancelar Inscripción</p>
                  </button>
                )}
              </div>
            ) : (
              <>
                {isInscribed ? (
                  <>
                    <button type="button" className="btn-form1" onClick={handleDeclareWinner}>
                      <p>Convertirse en Ganador</p>
                    </button>
                    <button type="button" className="btn-form2" onClick={handleCancelInscription}>
                      <p>Cancelar Inscripción</p>
                    </button>
                  </>
                ) : (
                  <button type="button" className="btn-form3" onClick={handleInscribirse}>
                    <p>Inscribirse</p>
                  </button>
                )}
              </>
            )}
            {showForm && (
              <form onSubmit={handleSubmit} className="mt-3">
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="mb-3">
                  <label htmlFor="userId" className="form-label">Jugador número:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userId"
                    value={userId}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="challengeId" className="form-label">Reto número:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="challengeId"
                    value={id}
                    readOnly
                  />
                </div>
                <button type="submit" className="btn-form1">Confirmar Inscripción</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailsPage;