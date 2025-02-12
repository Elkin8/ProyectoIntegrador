const { User } = require('../db');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const { username, identity, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const newUser = await User.create({ username, identity, email, password, role });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener el usuario', error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// Buscar un usuario por nombre
const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al buscar el usuario por nombre:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener el usuario actual
const getCurrentUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, "secreto");
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener el usuario actual', error);
    res.status(500).json({ error: 'Error al obtener el usuario actual' });
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const { username, identity, email, password, role } = req.body;
    user.username = username || user.username;
    user.identity = identity || user.identity;
    user.email = email || user.email;
    user.password = password || user.password;
    user.role = role || user.role;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al actualizar el usuario', error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    console.error('Error al eliminar el usuario', error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Comparar la contraseña ingresada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    // Generar el token JWT
    const token = jwt.sign({ id: user.id, role: user.role }, "secreto", {
      expiresIn: "1h",
    });

    res.json({ message: "Login exitoso", token, username: user.username });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  deleteUser,
  loginUser,
  getUserByUsername,
};