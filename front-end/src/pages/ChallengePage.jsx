import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../components/InputFields.jsx";
import Textarea from "../components/Textarea.jsx";
import AdminNavbar from "../components/AdminNavbar";

const ChallengePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    reward: "",
    rewardDescription: "",
    imageUrl: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/challenges", formData);
      alert("Reto creado con éxito");
      navigate("/admin");
    } catch (error) {
      console.error("Error al crear el reto:", error.response?.data || error);
      alert("Error al crear el reto");
    }
  };

  return (
    <div>
      <AdminNavbar />
    <div className="containerf">
      <form onSubmit={handleSubmit}>
        <h2><strong>Crear Reto</strong></h2>
        <div className="mb-3">
          <label className="form-label">Nombre del Reto:</label>
          <InputField
            type="text"
            name="name"
            className="form-control"
            placeholder="Nombre del reto"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción:</label>
          <Textarea
            name="description"
            placeholder="Descripción"
            rows="3"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Recompensa:</label>
          <InputField
            type="text"
            name="reward"
            placeholder="Recompensa"
            value={formData.reward}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción de la recompensa:</label>
          <Textarea
            name="rewardDescription"
            placeholder="Descripción"
            rows="3"
            value={formData.rewardDescription}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">URL de la Imagen:</label>
          <InputField
            type="text"
            name="imageUrl"
            placeholder="URL de la imagen"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>
        {formData.imageUrl && (
          <div className="mb-3">
            <img
              src={formData.imageUrl}
              alt="Vista previa"
              style={{ maxWidth: "100%", borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
            />
          </div>
        )}
        <button type="submit" className="btn-form1">Crear</button>
      </form>
    </div>
    </div>
  );
};

export default ChallengePage;