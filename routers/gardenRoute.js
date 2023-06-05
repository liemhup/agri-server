const express = require('express');
const router = express.Router();
const controller = require('../controllers/gardenController');

router.post('/garden/create', controller.createGarden);
router.get('/garden/all', controller.getAllGarden);
router.delete('/garden/del/:id', controller.deleteGareden);
router.post('/garden/edit/:id', controller.editGarden);

module.exports = router;
