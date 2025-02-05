import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token almacenado
    navigate("/login"); // Redirige al usuario a la página de login
  };

  return (
    <nav>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </nav>
  );
};

export default Navbar;


