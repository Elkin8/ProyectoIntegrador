const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,  // Nombre de la base de datos
  process.env.DB_USER,      // Usuario de la base de datos
  process.env.DB_PASSWORD,  // Contraseña del usuario
  {
    host: process.env.DB_HOST, // Dirección del servidor
    port: process.env.DB_PORT, // Puerto de conexión
    dialect: 'postgres',       // Dialecto de la base de datos
  }
);

// Función para conectar a la base de datos
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos');
  } catch (err) {
    console.error('Error de conexión a la base de datos:', err);
  }
};

module.exports = { sequelize, DataTypes, connectDB }; // Exporta solo una instancia de sequelize



