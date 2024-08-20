// src/controllers/ticketController.js
const { Ticket, User, Attraction } = require('../models');

exports.createTicket = async (req, res) => {
    try {
        const { user_id, attraction_id, qr_code } = req.body;

        const newTicket = await Ticket.create({
            user_id,
            attraction_id,
            qr_code,
        });

        res.status(201).json({ message: 'Ticket created successfully!', ticket: newTicket });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the ticket.' });
    }
};

exports.getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.findAll({
            include: [User, Attraction],
        });

        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching tickets.' });
    }
};

exports.getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id, {
            include: [User, Attraction],
        });

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found.' });
        }

        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the ticket.' });
    }
};

exports.updateTicket = async (req, res) => {
    try {
        const { status, redeemed_at } = req.body;

        const ticket = await Ticket.findByPk(req.params.id);

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found.' });
        }

        await ticket.update({
            status,
            redeemed_at,
        });

        res.status(200).json({ message: 'Ticket updated successfully!', ticket });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the ticket.' });
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found.' });
        }

        await ticket.destroy();

        res.status(200).json({ message: 'Ticket deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the ticket.' });
    }
};
