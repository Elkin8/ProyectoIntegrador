const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const challengeController = require('../controller/challengeController');
const inscriptionController = require('../controller/inscriptionController');

// Rutas para usuarios
router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/login', userController.loginUser);
router.get('/current-user', userController.getCurrentUser);
router.get('/users/username/:username', userController.getUserByUsername);

// Rutas para challenges
router.post('/challenges', challengeController.createChallenge);
router.get('/challenges', challengeController.getChallenges);
router.get('/challenges/:id', challengeController.getChallengeById);
router.put('/challenges/:id', challengeController.updateChallenge);
router.delete('/challenges/:id', challengeController.deleteChallenge);
router.delete('/challenges/:name', challengeController.deleteChallengeByName);

// Rutas para inscripciones
router.post('/inscriptions', inscriptionController.createInscription);
router.post('/declare-winner', inscriptionController.declareWinner);
router.get('/inscriptions/:userId/:challengeId', inscriptionController.checkInscription);
router.delete('/inscriptions/:userId/:challengeId', inscriptionController.deleteInscription);
router.delete('/winners/:userId/:challengeId', inscriptionController.deleteWinner);
router.get('/winners', inscriptionController.getWinners); 

module.exports = router;