const { sequelize, DataTypes } = require('../db');

const Auditoria = sequelize.define('Auditoria', {
  tabla_afectada: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  accion: {
    type: DataTypes.ENUM('insercion', 'actualizacion', 'eliminacion'),
    allowNull: false
  },
  registro_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cambios: {
    type: DataTypes.TEXT
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
});

module.exports = Auditoria;
