import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../components/InputFields.jsx";
import SelectField from "../components/SelectFields.jsx";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    identity: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users", formData);
      alert("Usuario registrado con éxito");
      navigate("/"); 
      console.log(response.data);
    } catch (error) {
      console.error("Error al registrar usuario:", error.response?.data || error);
      alert("Error al registrar usuario");
    }
  };

  return (
    <div class="containerf">
      <form onSubmit={handleSubmit}>
      <h2><strong>Regístrate</strong></h2>
      <div class="mb-3">
        <label for="exampleInputUser1" class="form-label">Nombre de Usuario:</label>
        <InputField type="text" name="username" class="form-control" aria-describedby="emailHelp" placeholder="Nombre de usuario" value={formData.username} onChange={handleChange} />
      </div>
      <div class="mb-3">
        <label for="exampleInputIdentity1" class="form-label">Cédula o Pasaporte:</label>
        <InputField type="number" name="identity" placeholder="Identidad" value={formData.identity} onChange={handleChange} />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Correo Electónico:</label>
        <InputField type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Contraseña:</label>
        <InputField type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Rol:</label>
        <SelectField name="role" value={formData.role} onChange={handleChange} options={[{ value: "user", label: "Usuario" }]} />
      </div>
        <button type="submit" class="btn-form4">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterPage;
