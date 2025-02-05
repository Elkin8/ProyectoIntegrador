const { sequelize, DataTypes } = require('../db');

const UsuariosRecompensas = sequelize.define('UsuariosRecompensas', {}, { timestamps: false });

module.exports = UsuariosRecompensas;
