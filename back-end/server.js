const express = require("express");
const { connectDB, sequelize } = require("./db");
const userRoutes = require("./routes/routes.js");
const cors = require("cors"); 


const app = express();
const port = process.env.PORT || 3000;

// 🔹 Configuración correcta de CORS
app.use(
  cors({
    origin: "http://localhost:3001", // Especifica el frontend
    credentials: true, // Permite enviar cookies y headers de autenticación
  })
);

app.use(express.json());

// Conectar a la base de datos PostgreSQL
connectDB();

sequelize
  .sync({ force: false }) // ⚠️ Cambia a true solo si quieres resetear la BD
  .then(() => console.log("Las tablas se han sincronizado correctamente"))
  .catch((error) => console.error("Error al sincronizar las tablas:", error));

// 🔹 Rutas de usuario
app.use("/api", userRoutes);

// 🔹 Ruta de prueba para verificar CORS
app.get("/api/test", (req, res) => {
  res.json({ message: "CORS funcionando correctamente" });
});

// 🔹 Servidor corriendo
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});

