const express = require('express');
const router = express.Router();
const controller = require('../controllers/gardenController');

router.post('/garden/create', controller.createGarden);
router.get('/garden/all', controller.getAllGarden);

module.exports = router;
