import React, { useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const DeleteWinnerPage = () => {
  const [userId, setUserId] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/winners/${userId}/${challengeId}`);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Error al eliminar el ganador");
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="containerf">
        <h2><strong>Eliminar Ganador</strong></h2>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">ID del Usuario:</label>
          <input
            type="text"
            className="form-control"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="challengeId" className="form-label">ID del Reto:</label>
          <input
            type="text"
            className="form-control"
            id="challengeId"
            value={challengeId}
            onChange={(e) => setChallengeId(e.target.value)}
          />
        </div>
        <button className="btn-form2" onClick={handleDelete}>Eliminar Ganador</button>
        {message && <p className="mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default DeleteWinnerPage;