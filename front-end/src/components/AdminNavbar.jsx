import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
      <nav className="adminnavbar">

        <div>
          <h1>Bienvenido administrador</h1>
        </div>

        <div className="container-fluid w-100 p-0"> 
          <div className="row g-0"> 
            <div className="col text-center border-end py-2"> 
              <button onClick={() => navigate("/create-challenge")}>
                <p>Crear reto</p>
              </button>
            </div>
            <div className="col text-center border-end py-2"> 
              <button onClick={() => navigate("/update-challenge")}>
                <p>Actualizar reto</p>
              </button>
            </div>
            <div className="col text-center border-end py-2"> 
              <button onClick={() => navigate("/delete-challenge")}>
                <p>Eliminar reto</p>
              </button>
            </div>
            <div className="col text-center border-end py-2"> 
              <button onClick={() => navigate("/delete-winner")}>
                <p>Eliminar ganador</p>
              </button>
            </div>
            <div className="col text-center py-2"> 
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