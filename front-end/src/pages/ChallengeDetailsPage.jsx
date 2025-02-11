import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar1 from "../components/Navbar1";

const ChallengeDetailsPage = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

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

    fetchChallenge();
    fetchCurrentUser();
  }, [id]);

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
    } catch (error) {
      console.error("Error al inscribirse en el reto:", error.response?.data || error);
      setError(error.response?.data?.error || "Error al inscribirse en el reto");
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
            <p className="card-text"><strong>Descripción:</strong> {challenge.description}</p>
            <p className="card-text"><strong>Recompensa:</strong> {challenge.reward}</p>
            <p className="card-text"><strong>Descripción de la Recompensa:</strong> {challenge.rewardDescription}</p>
            <button type="button" className="btn-form3" onClick={handleInscribirse}>
              <p>Inscribirse</p>
            </button>
            {showForm && (
              <form onSubmit={handleSubmit} className="mt-3">
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="mb-3">
                  <label htmlFor="userId" className="form-label">ID del Usuario:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userId"
                    value={userId}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="challengeId" className="form-label">ID del Reto:</label>
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