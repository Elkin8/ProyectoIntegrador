import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css"; // Importar los estilos mejorados

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", formData);
      
      alert("Login exitoso");

      // Guardar token y rol en localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      // Obtener URL de redirección si existe
      const params = new URLSearchParams(location.search);
      const redirectPath = params.get("redirect");

      // Si el usuario es administrador, lo redirigimos a la página de creación de retos
      if (response.data.role === "admin") {
        navigate("/create-challenge");
      } 
      // Si es un usuario normal y quiere ir a un reto específico, lo redirigimos
      else if (redirectPath) {
        navigate(redirectPath);
      } 
      // Si no hay un reto pendiente, lo enviamos al home
      else {
        navigate("/home");
      }
      
    } catch (error) {
      console.error("Error en el login:", error.response?.data || error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <p>Accede para participar en los retos ambientales</p>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <label>Contraseña:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <button type="submit">Ingresar</button>
        </form>
        <div className="register-link">
          <p>¿No tienes una cuenta? <a href="/register">Regístrate aquí</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
