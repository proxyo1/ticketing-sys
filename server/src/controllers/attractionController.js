// src/controllers/attractionController.js
const { Attraction } = require('../models');

exports.createAttraction = async (req, res) => {
    try {
        const { name, description, location, price, available_tickets, event_date } = req.body;

        const newAttraction = await Attraction.create({
            name,
            description,
            location,
            price,
            available_tickets,
            event_date,
        });

        res.status(201).json({ message: 'Attraction created successfully!', attraction: newAttraction });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the attraction.' });
    }
};

exports.getAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.findAll();
        res.status(200).json(attractions);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching attractions.' });
    }
};

exports.getAttractionById = async (req, res) => {
    try {
        const attraction = await Attraction.findByPk(req.params.id);

        if (!attraction) {
            return res.status(404).json({ error: 'Attraction not found.' });
        }

        res.status(200).json(attraction);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the attraction.' });
    }
};

exports.updateAttraction = async (req, res) => {
    try {
        const { name, description, location, price, available_tickets, event_date } = req.body;

        const attraction = await Attraction.findByPk(req.params.id);

        if (!attraction) {
            return res.status(404).json({ error: 'Attraction not found.' });
        }

        await attraction.update({
            name,
            description,
            location,
            price,
            available_tickets,
            event_date,
        });

        res.status(200).json({ message: 'Attraction updated successfully!', attraction });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the attraction.' });
    }
};

exports.deleteAttraction = async (req, res) => {
    try {
        const attraction = await Attraction.findByPk(req.params.id);

        if (!attraction) {
            return res.status(404).json({ error: 'Attraction not found.' });
        }

        await attraction.destroy();

        res.status(200).json({ message: 'Attraction deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the attraction.' });
    }
};
