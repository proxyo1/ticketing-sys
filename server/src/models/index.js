// src/models/index.js
const User = require('./User');
const Attraction = require('./Attraction');
const Ticket = require('./Ticket');
const Payment = require('./Payment');
const Redemption = require('./Redemption');

User.hasMany(Ticket, { foreignKey: 'user_id' });
Attraction.hasMany(Ticket, { foreignKey: 'attraction_id' });
Ticket.belongsTo(User, { foreignKey: 'user_id' });
Ticket.belongsTo(Attraction, { foreignKey: 'attraction_id' });

Ticket.hasOne(Payment, { foreignKey: 'ticket_id' });
Payment.belongsTo(Ticket, { foreignKey: 'ticket_id' });

Ticket.hasOne(Redemption, { foreignKey: 'ticket_id' });
Redemption.belongsTo(Ticket, { foreignKey: 'ticket_id' });

module.exports = {
    User,
    Attraction,
    Ticket,
    Payment,
    Redemption,
};
