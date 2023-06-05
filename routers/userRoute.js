const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/isAuth');
router.post('/user/create', auth.isAdmin, userController.createUser);
router.post('/user/login', userController.userLogIn);
router.post('/user/adminlogin', userController.adminLogin);
router.get('/user/all', userController.getAll);
router.post('/user/reset', userController.resetPassword);
router.get('/user/get', userController.getUserCookies);
router.get('/user/farmer', userController.getFarmer);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;
