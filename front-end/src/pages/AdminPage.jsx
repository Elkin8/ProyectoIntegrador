import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const AdminPage = () => {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/winners");
        setWinners(response.data);
      } catch (error) {
        console.error("Error al obtener los ganadores:", error);
      }
    };

    fetchWinners();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div className="container">
        <h2><strong>Lista de Ganadores</strong></h2>
        <table className="transparent-table">
          <thead>
            <tr>
              <th>ID del Usuario</th>
              <th>ID del Reto</th>
              <th>Nombre de Usuario</th>
              <th>Cédula</th>
              <th>Correo</th>
              <th>Enlace de Prueba</th>
            </tr>
          </thead>
          <tbody>
            {winners.map((winner) => (
              <tr key={winner.id}>
                <td>{winner.user.id}</td>
                <td>{winner.challengeId}</td>
                <td>{winner.user.username}</td>
                <td>{winner.user.identity}</td>
                <td>{winner.user.email}</td>
                <td>
                  <a href={winner.proofLink} target="_blank" rel="noopener noreferrer">
                    {winner.proofLink}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
