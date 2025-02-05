const { sequelize, DataTypes } = require('../db');

const Recompensa = sequelize.define('Recompensa', {
  nombre_recompensa: {
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

module.exports = Recompensa;
