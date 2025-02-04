const express = require('express');
const { connectDB, sequelize } = require('./db'); // Importa la función connectDB
const userRoutes = require('./routes/routes.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Conectar a la base de datos PostgreSQL
connectDB();

sequelize.sync({ force: false }) // Cambia 'force: true' si deseas eliminar y recrear las tablas cada vez
  .then(() => console.log('Las tablas se han sincronizado correctamente'))
  .catch((error) => console.error('Error al sincronizar las tablas:', error));

// Usar las rutas de usuario
app.use('/api', userRoutes); // Prefijo /api para todas las rutas de usuarios

// Rutas
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});


