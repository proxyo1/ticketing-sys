// src/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);  // This route will fetch all users
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
