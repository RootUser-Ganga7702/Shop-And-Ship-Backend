const express = require('express');
const ordersReciveRoutes = express.Router();

const { orderRecive, getAllOrders } = require('../controller/OrderControllers/orderReciveController');

ordersReciveRoutes.post('/order-recive', orderRecive);
ordersReciveRoutes.get('/all-orders', getAllOrders);


module.exports = ordersReciveRoutes;