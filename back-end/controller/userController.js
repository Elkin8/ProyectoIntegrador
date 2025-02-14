const { User } = require('../db');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Crear un nuevo usuario con contraseña encriptada
const createUser = async (req, res) => {
  try {
    const { username, identity, email, password, role } = req.body;

    if (!username || !identity || !email || !password) {
      return res.status(400).json({ error: "Faltan datos obligatorios." });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "El correo ya está en uso." });
    }

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      identity,
      email,
      password: hashedPassword, // Contraseña encriptada
      role,
    });

    res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // No devolver la contraseña
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Buscar un usuario por nombre
const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ where: { username }, attributes: { exclude: ["password"] } });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al buscar el usuario por nombre:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener el usuario actual a partir del token
const getCurrentUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: "Acceso no autorizado." });

    const decoded = jwt.verify(token, "secreto");
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener el usuario actual:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un usuario (evita sobreescribir la contraseña sin encriptar)
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    let { username, identity, email, password, role } = req.body;

    // Si la contraseña se actualiza, encriptarla antes de guardar
    if (password) {
      password = await bcrypt.hash(password, 10);
    }

    await user.update({
      username: username || user.username,
      identity: identity || user.identity,
      email: email || user.email,
      password: password || user.password,
      role: role || user.role,
    });

    res.status(200).json({ message: "Usuario actualizado con éxito", user });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
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
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
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

    // Definir la URL de redirección basada en el rol del usuario
    const redirectUrl = user.role === "admin" ? "/create-challenge" : "/home";

    console.log(`➡️ Usuario autenticado: ${user.email}, Rol: ${user.role}, Redirigiendo a: ${redirectUrl}`);

    res.json({
      message: "Login exitoso",
      token,
      username: user.username,
      role: user.role, // Enviar el rol correctamente
      redirectUrl, // Enviar la URL de redirección
    });

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
