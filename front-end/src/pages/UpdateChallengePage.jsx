import React, { useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const UpdateChallengePage = () => {
  const [challengeName, setChallengeName] = useState("");
  const [challenge, setChallenge] = useState(null);
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/challenges/${challengeName}`);
      setChallenge(response.data);
      setImageUrl(response.data.imageUrl);
      setMessage("");
    } catch (error) {
      setChallenge(null);
      setImageUrl("");
      setMessage(error.response?.data?.error || "Error al buscar el reto");
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/challenges/${challengeName}`, challenge);
      setMessage(response.data.message);
      setChallenge(null);
      setImageUrl("");
    } catch (error) {
      setMessage(error.response?.data?.error || "Error al actualizar el reto");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChallenge({ ...challenge, [name]: value });
    if (name === "imageUrl") {
      setImageUrl(value);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="containerf">
        <h2><strong>Actualizar Reto</strong></h2>
        <div className="mb-3">
          <label htmlFor="challengeName" className="form-label">Id del Reto:</label>
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
            <h5>Actualizar Reto:</h5>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre del reto:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={challenge.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Descripción:</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={challenge.description}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="reward" className="form-label">Recompensa:</label>
              <input
                type="text"
                className="form-control"
                id="reward"
                name="reward"
                value={challenge.reward}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="rewardDescription" className="form-label">Descripción de la Recompensa:</label>
              <input
                type="text"
                className="form-control"
                id="rewardDescription"
                name="rewardDescription"
                value={challenge.rewardDescription}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="imageUrl" className="form-label">URL de la Imagen:</label>
              <input
                type="text"
                className="form-control"
                id="imageUrl"
                name="imageUrl"
                value={challenge.imageUrl}
                onChange={handleChange}
              />
              {imageUrl && (
                <div className="mt-3">
                  <img src={imageUrl} alt="Vista previa" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
              )}
            </div>
            <button className="btn-form1" onClick={handleUpdate}>Actualizar Reto</button>
          </div>
        )}
        {message && <p className="mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default UpdateChallengePage;