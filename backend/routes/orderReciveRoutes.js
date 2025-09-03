const express = require('express');
const ordersReciveRoutes = express.Router();

const { orderRecive } = require('../controller/OrderControllers/orderReciveController');

ordersReciveRoutes.post('/order-recive', orderRecive);


module.exports = ordersReciveRoutes;