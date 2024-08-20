// src/routes/redemptionRoutes.js
const express = require('express');
const redemptionController = require('../controllers/redemptionController');

const router = express.Router();

router.post('/', redemptionController.redeemTicket);
router.get('/', redemptionController.getRedemptions);
router.get('/:id', redemptionController.getRedemptionById);

module.exports = router;
