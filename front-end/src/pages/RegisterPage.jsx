import { useState } from "react";
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users", formData);
      alert("Usuario registrado con éxito");
      console.log(response.data);
    } catch (error) {
      console.error("Error al registrar usuario:", error.response?.data || error);
      alert("Error al registrar usuario");
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <InputField type="text" name="username" placeholder="Nombre de usuario" value={formData.username} onChange={handleChange} />
        <InputField type="number" name="identity" placeholder="Identidad" value={formData.identity} onChange={handleChange} />
        <InputField type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} />
        <InputField type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} />
        <SelectField name="role" value={formData.role} onChange={handleChange} options={[{ value: "user", label: "Usuario" }]} />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterPage;
