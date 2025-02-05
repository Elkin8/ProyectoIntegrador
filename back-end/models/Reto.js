const { sequelize, DataTypes } = require('../db');

const Reto = sequelize.define('Reto', {
  nombre_reto: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
});

module.exports = Reto;
