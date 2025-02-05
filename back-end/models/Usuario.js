const { sequelize, DataTypes } = require('../db');

const Usuario = sequelize.define('Usuario', {
  cedula: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  tipo_usuario: {
    type: DataTypes.ENUM('super_usuario', 'usuario_standar'),
    allowNull: false
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  contraseña: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
});

module.exports = Usuario;
