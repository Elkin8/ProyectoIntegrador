import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);

    try {
      const response = await axios.post("http://localhost:3000/api/login", formData, { withCredentials: true });
      console.log('Respuesta del backend:', response);

      // Almacenar el token que recibimos desde el backend
      const token = response.data.token;
      localStorage.setItem('token', token);

      // Decodificar el token para obtener los datos (rol)
      const decodedToken = decodeJWT(token);

      // Redirigir según el rol del usuario
      if (decodedToken.role === 'admin') {
        navigate('/admin');  // Redirige a la página de administración
      } else {
        navigate('/home');  // Redirige a la página de inicio
      }

    } catch (error) {
      console.error('Error:', error.response);
      setError("Credenciales incorrectas");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register"); // Redirige a la página de registro
  };

  // Función para decodificar el token JWT
  const decodeJWT = (token) => {
    const payload = token.split('.')[1];  // Obtener la parte del payload (segunda parte del JWT)
    const decoded = atob(payload);  // Decodificar la cadena Base64
    return JSON.parse(decoded);  // Parsear el JSON
  };

  return (
    <div class="containerf">
      <form onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Correo Electrónico:</label>
          <input type="email" name="email" class="form-control" aria-describedby="emailHelp" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} />
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password:</label>
          <input type="password" name="password"  class="form-control" placeholder="Contraseña" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
        <p>------------------------------------------------------------------------------------------------------------------</p>
        <button type="button" class="btn btn-secondary" onClick={handleRegisterRedirect}>Registrarse</button>
      </form>
    </div>
  );
};

export default LoginForm;