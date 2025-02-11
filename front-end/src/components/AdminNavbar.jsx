import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
      <nav class="adminnavbar">

        <div>
          <h1>Bienvenido administrador</h1>
        </div>

        <div class="container-fluid w-100 p-0"> 
          <div class="row g-0"> 
            <div class="col text-center border-end py-2"> 
              <button onClick={() => navigate("/create-challenge")}>
                <p>Crear reto</p>
              </button>
            </div>
            <div class="col text-center border-end py-2"> 
              <button onClick={() => navigate("/update-challenge")}>
                <p>Actualizar reto</p>
              </button>
            </div>
            <div class="col text-center border-end py-2"> 
              <button onClick={() => navigate("/delete-challenge")}>
                <p>Eliminar reto</p>
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

export default AdminNavbar;