// src/models/Ticket.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');
const Attraction = require('./Attraction');

const Ticket = sequelize.define('Ticket', {
    ticket_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id',
        },
    },
    attraction_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Attraction,
            key: 'attraction_id',
        },
    },
    purchase_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    qr_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('valid', 'redeemed', 'canceled'),
        defaultValue: 'valid',
    },
    redeemed_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Ticket;
