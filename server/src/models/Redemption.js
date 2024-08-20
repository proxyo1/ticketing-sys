// src/models/Redemption.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Ticket = require('./Ticket');
const User = require('./User');

const Redemption = sequelize.define('Redemption', {
    redemption_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ticket_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Ticket,
            key: 'ticket_id',
        },
    },
    redeemed_by: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id',
        },
    },
    redemption_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Redemption;
