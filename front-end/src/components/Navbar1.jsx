import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
      <nav class="navbar">

        <div>
          <h1>Bienvenido a nuestros retos</h1>
        </div>

        <div class="container-fluid w-100 p-0"> 
          <div class="row g-0"> 
            <div class="col text-center border-end py-2"> 
              <button onClick={() => navigate("/home")}>
                <p>Menú principal</p>
              </button>
            </div>
            <div class="col text-center border-end py-2"> 
              <button onClick={() => navigate("/contact")}>
                <p>Contáctanos</p>
              </button>
            </div>
            <div class="col text-center py-2"> 
              <button onClick={handleLogout}>
                <p>Cerrar Sesión</p>
              </button>
            </div>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
