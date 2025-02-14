import React, { useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const DeleteChallengePage = () => {
  const [challengeName, setChallengeName] = useState("");
  const [challenge, setChallenge] = useState(null);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/challenges/${challengeName}`);
      setChallenge(response.data);
      setMessage("");
    } catch (error) {
      setChallenge(null);
      setMessage(error.response?.data?.error || "Error al buscar el reto");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/challenges/${challengeName}`);
      setMessage(response.data.message);
      setChallenge(null);
    } catch (error) {
      setMessage(error.response?.data?.error || "Error al eliminar el reto");
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="containerf">
        <h2><strong>Eliminar Reto</strong></h2>
        <div className="mb-3">
          <label htmlFor="challengeName" className="form-label">Nombre del Reto:</label>
          <input
            type="text"
            className="form-control"
            id="challengeName"
            value={challengeName}
            onChange={(e) => setChallengeName(e.target.value)}
          />
        </div>
        <button className="btn-form3" onClick={handleSearch}>Buscar Reto</button>
        {challenge && (
          <div className="mt-3">
            <h5>Reto encontrado:</h5>
            <p><strong>Nombre:</strong> {challenge.name}</p>
            <p><strong>Descripción:</strong> {challenge.description}</p>
            <button className="btn-form2" onClick={handleDelete}>Eliminar Reto</button>
          </div>
        )}
        {message && <p className="mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default DeleteChallengePage;