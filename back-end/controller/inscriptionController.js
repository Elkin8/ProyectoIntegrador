const { Inscription, User, Challenge, Winner } = require('../db');

// Inscribir a un usuario en un reto
const createInscription = async (req, res) => {
  try {
    const { userId, challengeId } = req.body;

    // Verificar si el usuario ya está inscrito en algún reto
    const existingInscription = await Inscription.findOne({ where: { userId } });
    if (existingInscription) {
      return res.status(400).json({ error: "El usuario ya está inscrito en un reto" });
    }

    // Crear la inscripción
    const newInscription = await Inscription.create({ userId, challengeId });
    res.status(201).json(newInscription);
  } catch (error) {
    console.error("Error al inscribir al usuario en el reto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Verificar si el usuario está inscrito en un reto
const checkInscription = async (req, res) => {
  try {
    const { userId, challengeId } = req.params;
    const inscription = await Inscription.findOne({ where: { userId, challengeId } });
    if (inscription) {
      return res.status(200).json({ isInscribed: true });
    } else {
      return res.status(200).json({ isInscribed: false });
    }
  } catch (error) {
    console.error("Error al verificar la inscripción del usuario en el reto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Eliminar una inscripción
const deleteInscription = async (req, res) => {
  try {
    const { userId, challengeId } = req.params;
    const inscription = await Inscription.findOne({ where: { userId, challengeId } });
    if (!inscription) {
      return res.status(404).json({ error: "Inscripción no encontrada" });
    }
    await inscription.destroy();
    res.status(200).json({ message: "Inscripción eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la inscripción:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


// Declarar un ganador para un reto
const declareWinner = async (req, res) => {
  try {
    const { userId, challengeId, proofLink } = req.body;

    // Verificar si ya hay un ganador para el reto
    const existingWinner = await Winner.findOne({ where: { challengeId } });
    if (existingWinner) {
      return res.status(400).json({ error: "Ya hay un ganador para este reto" });
    }

    // Crear el ganador
    const newWinner = await Winner.create({ userId, challengeId, proofLink });
    res.status(201).json(newWinner);
  } catch (error) {
    console.error("Error al declarar el ganador del reto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Eliminar un ganador
const deleteWinner = async (req, res) => {
  try {
    const { userId, challengeId } = req.params;
    const winner = await Winner.findOne({ where: { userId, challengeId } });
    if (!winner) {
      return res.status(404).json({ error: "Ganador no encontrado" });
    }
    await winner.destroy();
    res.status(200).json({ message: "Ganador eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el ganador:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


// Obtener todos los ganadores
const getWinners = async (req, res) => {
  try {
    const winners = await Winner.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'identity', 'email']
        },
        {
          model: Challenge,
          as: 'challenge',
          attributes: ['id']
        }
      ]
    });
    res.status(200).json(winners);
  } catch (error) {
    console.error('Error al obtener los ganadores:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


module.exports = {
  createInscription,
  declareWinner,
  checkInscription,
  deleteInscription,
  deleteWinner,
  getWinners,
};