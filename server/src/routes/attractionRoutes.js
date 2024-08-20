// src/routes/attractionRoutes.js
const express = require('express');
const attractionController = require('../controllers/attractionController');

const router = express.Router();

router.post('/', attractionController.createAttraction);
router.get('/', attractionController.getAttractions);
router.get('/:id', attractionController.getAttractionById);
router.put('/:id', attractionController.updateAttraction);
router.delete('/:id', attractionController.deleteAttraction);

module.exports = router;
