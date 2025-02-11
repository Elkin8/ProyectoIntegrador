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

      // Almacenar el token y el nombre de usuario que recibimos desde el backend
      const token = response.data.token;
      const username = response.data.username; // Asegúrate de que el backend envíe el nombre de usuario
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);

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
    <div className="containerf">
      <form onSubmit={handleSubmit}>
        <h2><strong>Iniciar Sesión</strong></h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Correo Electrónico:</label>
          <input type="email" name="email" className="form-control" aria-describedby="emailHelp" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password:</label>
          <input type="password" name="password" className="form-control" placeholder="Contraseña" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit" className="btn-form3">Iniciar Sesión</button>
        <p>------------------------------------------------------------------------------------------------------------------</p>
        <button type="button" className="btn-form4" onClick={handleRegisterRedirect}>Registrarse</button>
      </form>
    </div>
  );
};

export default LoginForm;