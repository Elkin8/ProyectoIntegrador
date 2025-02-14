import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar1 from "../components/Navbar1";

const DeclareWinnerPage = () => {
  const { id } = useParams();
  const [userId, setUserId] = useState("");
  const [proofLink, setProofLink] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchCurrentUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Error: No se encontró el ID del usuario. Inicia sesión nuevamente.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/declare-winner", { userId, challengeId: id, proofLink });
      alert("¡Felicidades! Has sido declarado ganador.");
      navigate(`/challenge/${id}`);
    } catch (error) {
      console.error("Error al declarar el ganador del reto:", error.response?.data || error);
      setError(error.response?.data?.error || "Error al declarar el ganador del reto");
    }
  };

  return (
    <div>
      <Navbar1 />
      <div className="containerf">
        <h2>Declarar Ganador</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="mb-3">
            <label htmlFor="proofLink" className="form-label">Enlace de Prueba:</label>
            <input
              type="text"
              className="form-control"
              id="proofLink"
              value={proofLink}
              onChange={(e) => setProofLink(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-form1">Declarar Ganador</button>
        </form>
      </div>
    </div>
  );
};

export default DeclareWinnerPage;