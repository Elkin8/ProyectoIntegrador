import React from "react";
import Navbar from "../components/Navbar1.jsx";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div>
        <h1>Bienvenido al Dashboard</h1>
        <p>Aquí es donde puedes gestionar todo lo relacionado con tu cuenta.</p>
      </div>
    </div>
  );
};

export default Home;
