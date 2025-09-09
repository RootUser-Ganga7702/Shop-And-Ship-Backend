const express = require('express');
const ordersReciveRoutes = express.Router();

const { orderRecive, getAllOrders, getCountryOrders } = require('../controller/OrderControllers/orderReciveController');
const { getAllCountryOrders, uploadReciptStatus } = require('../controller/OrderControllers/countryOrderController');

ordersReciveRoutes.post('/order-recive', orderRecive);
ordersReciveRoutes.get('/all-orders', getAllOrders);
ordersReciveRoutes.post('/country-orders', getCountryOrders);

ordersReciveRoutes.get('/all-country-orders', getAllCountryOrders);
ordersReciveRoutes.post('/upload-recipt', uploadReciptStatus);


module.exports = ordersReciveRoutes;