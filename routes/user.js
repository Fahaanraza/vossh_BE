const express = require('express');
const router = express.Router();

const { signUp, signIn,logout } = require('../controller/user');
const { addOrder, getOrder } = require('../controller/order');
const authenticateToken = require('../Middlewares/AuthTokenRequired');

router.post('/add-user', signUp);

router.post('/login-user', signIn);

router.post('/logout', logout);

router.post('/add-order', authenticateToken, addOrder);

router.get('/get-order', authenticateToken, getOrder);

module.exports = router;
