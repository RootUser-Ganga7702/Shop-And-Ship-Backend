const express = require('express');
const ordersReciveRoutes = express.Router();

const { orderRecive, getAllOrders, getCountryOrders } = require('../controller/OrderControllers/orderReciveController');

ordersReciveRoutes.post('/order-recive', orderRecive);
ordersReciveRoutes.get('/all-orders', getAllOrders);
ordersReciveRoutes.post('/country-orders', getCountryOrders);


module.exports = ordersReciveRoutes;