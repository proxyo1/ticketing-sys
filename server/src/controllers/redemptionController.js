// src/controllers/redemptionController.js
const { Redemption, Ticket, User } = require('../models');

exports.redeemTicket = async (req, res) => {
    try {
        const { ticket_id, redeemed_by } = req.body;

        const ticket = await Ticket.findByPk(ticket_id);

        if (!ticket || ticket.status !== 'valid') {
            return res.status(400).json({ error: 'Ticket is invalid or already redeemed.' });
        }

        const redemption = await Redemption.create({
            ticket_id,
            redeemed_by,
        });

        await ticket.update({
            status: 'redeemed',
            redeemed_at: new Date(),
        });

        res.status(200).json({ message: 'Ticket redeemed successfully!', redemption });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during ticket redemption.' });
    }
};

exports.getRedemptions = async (req, res) => {
    try {
        const redemptions = await Redemption.findAll({
            include: [Ticket, User],
        });

        res.status(200).json(redemptions);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching redemptions.' });
    }
};

exports.getRedemptionById = async (req, res) => {
    try {
        const redemption = await Redemption.findByPk(req.params.id, {
            include: [Ticket, User],
        });

        if (!redemption) {
            return res.status(404).json({ error: 'Redemption record not found.' });
        }

        res.status(200).json(redemption);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the redemption record.' });
    }
};
