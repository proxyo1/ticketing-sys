// src/controllers/userController.js
const { User } = require('../models');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const newUser = await User.create({
            username,
            email,
            password_hash: password,
        });

        res.status(201).json({ message: 'User registered successfully!', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during registration.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email, password_hash: password } });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        res.status(200).json({ message: 'Login successful!', user });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during login.' });
    }
};
