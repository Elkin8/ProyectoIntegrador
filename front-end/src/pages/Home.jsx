import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar1 from "../components/Navbar1.jsx"; // Asegúrate de que la ruta es correcta

const Home = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/challenges");
        setChallenges(response.data);
      } catch (error) {
        console.error("Error al obtener los retos:", error);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <div>
      <Navbar1 />
      <div className="container mt-5">
        <h2><strong>Retos</strong></h2>
        <div className="row">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="col-md-4 mb-4">
              <div className="card" style={{ width: "25rem", 
                backgroundColor: "#D6BA97", 
                boxShadow: "8px 8px 10px rgba(0, 0, 0, 0.9)", 
                border: "2px solid black",
                borderRadius: "20px" }} >
                <img src={challenge.imageUrl} className="card-img-top" alt={challenge.name} style={{ height: "450px", objectFit: "cover" }} />
                <div className="card-body">
                  <h5 className="card-title">{challenge.name}</h5>
                  <button className="btn-custom">Ver más</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;