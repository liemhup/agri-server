const express = require('express');
const router = express.Router();
const controller = require('../controllers/treeController');

router.post('/tree/create', controller.treeCreate);
router.get('/tree/all', controller.treeGetAll);
module.exports = router;
