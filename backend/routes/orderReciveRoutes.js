const express = require('express');
const ordersReciveRoutes = express.Router();

const { orderRecive, getAllOrders, getCountryOrders, editOrder, deleteOrder } = require('../controller/OrderControllers/orderReciveController');

ordersReciveRoutes.post('/order-recive', orderRecive);
ordersReciveRoutes.get('/all-orders', getAllOrders);
ordersReciveRoutes.post('/country-orders', getCountryOrders);
ordersReciveRoutes.post('/edit-order', editOrder);
ordersReciveRoutes.post('/delete-order', deleteOrder);

module.exports = ordersReciveRoutes;