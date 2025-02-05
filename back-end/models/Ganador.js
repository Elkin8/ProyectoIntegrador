const { sequelize, DataTypes } = require('../db');

const Ganador = sequelize.define('Ganador', {
  fecha_ganado: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
});

module.exports = Ganador;
