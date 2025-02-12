const { Challenge, Winner, User } = require('../db');

// Crear un nuevo challenge
const createChallenge = async (req, res) => {
  try {
    console.log("Solicitud recibida en /api/challenges con datos:", req.body); // Log para ver qué datos llegan
    const { name, description, reward, rewardDescription, imageUrl } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const newChallenge = await Challenge.create({ name, description, reward, rewardDescription, imageUrl });
    res.status(201).json(newChallenge);
  } catch (error) {
    console.error("Error al crear el challenge:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener todos los challenges
const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.findAll();
    res.status(200).json(challenges);
  } catch (error) {
    console.error('Error al obtener los challenges', error);
    res.status(500).json({ error: 'Error al obtener los challenges' });
  }
};

// Obtener un challenge por ID
const getChallengeById = async (req, res) => {
  const { id } = req.params;
  try {
    const challenge = await Challenge.findByPk(id, {
      include: [
        {
          model: Winner,
          as: 'winner',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['username']
            }
          ]
        }
      ]
    });
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge no encontrado' });
    }
    res.status(200).json(challenge);
  } catch (error) {
    console.error('Error al obtener el challenge', error);
    res.status(500).json({ error: 'Error al obtener el challenge' });
  }
};

// Actualizar un challenge
const updateChallenge = async (req, res) => {
  const { id } = req.params;
  const { name, description, reward, rewardDescription, imageUrl } = req.body;
  try {
    const challenge = await Challenge.findByPk(id);
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge no encontrado' });
    }
    challenge.name = name;
    challenge.description = description;
    challenge.reward = reward;
    challenge.rewardDescription = rewardDescription;
    challenge.imageUrl = imageUrl;
    await challenge.save();
    res.status(200).json(challenge);
  } catch (error) {
    console.error('Error al actualizar el challenge', error);
    res.status(500).json({ error: 'Error al actualizar el challenge' });
  }
};

// Eliminar un challenge
const deleteChallenge = async (req, res) => {
  const { id } = req.params;
  try {
    const challenge = await Challenge.findByPk(id);
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge no encontrado' });
    }
    await challenge.destroy();
    res.status(200).json({ message: 'Challenge eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el challenge', error);
    res.status(500).json({ error: 'Error al eliminar el challenge' });
  }
};

// Eliminar un challenge por nombre
const deleteChallengeByName = async (req, res) => {
  try {
    const { name } = req.params;
    const challenge = await Challenge.findOne({ where: { name } });

    if (!challenge) {
      return res.status(404).json({ error: "Reto no encontrado" });
    }

    await challenge.destroy();
    res.status(200).json({ message: "Reto eliminado correctamente" });
  } catch (error) {
    console.error('Error al eliminar el challenge', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  createChallenge,
  getChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge,
  deleteChallengeByName,
};