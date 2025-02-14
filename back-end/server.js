const express = require("express");
const { connectDB, sequelize } = require("./db");
const Routes = require("./routes/Routes1.js");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

// Habilitar CORS para el frontend
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use(express.json());

// Conectar a la base de datos PostgreSQL
connectDB()
  .then(() => {
    console.log("Conectado a la base de datos correctamente");
    return sequelize.sync({ force: false });
  })
  .then(() => console.log("Las tablas se han sincronizado correctamente"))
  .catch((error) => console.error("Error al conectar o sincronizar la base de datos:", error));

console.log("Modelos cargados en Sequelize:", sequelize.models);

// Rutas de la API
app.use("/api", Routes);

// Servir archivos estáticos desde la carpeta public
const publicPath = path.join(__dirname, "../front-end/public");
app.use(express.static(publicPath));

// Ruta para listar todas las imágenes en /images
app.get("/images", (req, res) => {
  const imagesDir = path.join(publicPath, "images");
  
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer la carpeta de imágenes" });
    }
    const images = files.map((file) => `/images/${file}`);
    res.json({ images });
  });
});

// Ruta para servir una imagen específica
app.get("/images/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(publicPath, "images", imageName);

  // Verificar si el archivo existe antes de enviarlo
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).json({ error: "Imagen no encontrada" });
  }
});

app.use("/images", express.static("../front-end/public/images"));


// Ruta de prueba para verificar CORS
app.get("/api/test", (req, res) => {
  res.json({ message: "CORS funcionando correctamente" });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`✅ Servidor Express corriendo en http://localhost:${port}`);
});


