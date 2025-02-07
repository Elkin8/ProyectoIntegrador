const express = require("express");
const { connectDB, sequelize } = require("./db");
const Routes = require("./routes/Routes1.js");
const cors = require("cors"); 


const app = express();
const port = process.env.PORT || 3000;


app.use(
  cors({
    origin: "http://localhost:3001", 
    credentials: true, 
  })
);

app.use(express.json());

// Conectar a la base de datos PostgreSQL
connectDB();


console.log("Modelos cargados en Sequelize:", sequelize.models);


sequelize
  .sync({ force: false }) 
  .then(() => console.log("Las tablas se han sincronizado correctamente"))
  .catch((error) => console.error("Error al sincronizar las tablas:", error));

// Rutas
app.use('/api', Routes);

// Ruta de prueba para verificar CORS
app.get("/api/test", (req, res) => {
  res.json({ message: "CORS funcionando correctamente" });
});

// Servidor corriendo
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});

