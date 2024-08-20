// src/controllers/paymentController.js
const { Payment, Ticket } = require('../models');

exports.createPayment = async (req, res) => {
    try {
        const { ticket_id, amount, payment_method, status } = req.body;

        const newPayment = await Payment.create({
            ticket_id,
            amount,
            payment_method,
            status,
        });

        res.status(201).json({ message: 'Payment processed successfully!', payment: newPayment });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while processing the payment.' });
    }
};

exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll({
            include: [Ticket],
        });

        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching payments.' });
    }
};

exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id, {
            include: [Ticket],
        });

        if (!payment) {
            return res.status(404).json({ error: 'Payment not found.' });
        }

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the payment.' });
    }
};
