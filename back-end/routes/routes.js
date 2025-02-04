const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controller/userController.js');

// Crear un nuevo usuario
router.post('/users', createUser);

// Obtener todos los usuarios
router.get('/users', getUsers);

// Obtener un usuario por ID
router.get('/users/:id', getUserById);

// Actualizar un usuario
router.put('/users/:id', updateUser);

// Eliminar un usuario
router.delete('/users/:id', deleteUser);

module.exports = router;
