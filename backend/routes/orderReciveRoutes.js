const express = require('express');
const ordersReciveRoutes = express.Router();

const { orderRecive, getAllOrders } = require('../controller/OrderControllers/orderReciveController');
const { createCountryOrder, getAllCountryOrders, uploadReciptStatus } = require('../controller/OrderControllers/countryOrderController');

ordersReciveRoutes.post('/order-recive', orderRecive);
ordersReciveRoutes.get('/all-orders', getAllOrders);

ordersReciveRoutes.post('/country-order', createCountryOrder);
ordersReciveRoutes.get('/all-country-orders', getAllCountryOrders);
ordersReciveRoutes.post('/upload-recipt', uploadReciptStatus);


module.exports = ordersReciveRoutes;