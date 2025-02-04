const { sequelize, DataTypes } = require('../db'); // Importa sequelize desde db.js

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  identity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
    validate: {
      isIn: [["user", "admin"]], // Los posibles valores de role
    }
  },
}, {
  timestamps: true,
});

module.exports = User;
