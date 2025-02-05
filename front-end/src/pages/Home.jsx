import React from "react";
import Navbar from "../components/Navbar1.jsx";

const Home = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginLeft: "250px", padding: "20px", width: "calc(100% - 250px)" }}>
        <h1>Bienvenido al Dashboard</h1>
        <p>Aquí es donde puedes gestionar todo lo relacionado con tu cuenta.</p>
        <Navbar />
        </div>
      </div>
  );
};

export default Home;
