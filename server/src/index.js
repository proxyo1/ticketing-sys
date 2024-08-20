// src/index.js
const express = require('express');
const sequelize = require('./database');
const userRoutes = require('./routes/userRoutes');
const attractionRoutes = require('./routes/attractionRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const redemptionRoutes = require('./routes/redemptionRoutes');

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/attractions', attractionRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/redemptions', redemptionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await sequelize.sync(); // Sync database tables
    console.log('Database synced.');
});
