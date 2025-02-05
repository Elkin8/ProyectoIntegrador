const { sequelize, DataTypes } = require('../db');

const UsuariosRetos = sequelize.define('UsuariosRetos', {}, { timestamps: false });

module.exports = UsuariosRetos;
