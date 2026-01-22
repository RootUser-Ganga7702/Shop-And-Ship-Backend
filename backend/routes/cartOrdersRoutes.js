const express = require('express');
const cartOrdersRoute = express.Router();

const { addToCart, getCart, removeFromCart, clearCart, updateQuantity } = require('../controller/CartOrdersController/cartController');
// const { createPayment } = require('../controller/CartOrdersController/orderController');

const { getPendingOrders, getDeliveredOrders, getCancelledOrders, getShippedOrders, getReturnedOrders, getOutForDeliveryOrders, getProcessingOrders, shippedProductInOrder, createPaypal, capturePayment, getOrdersByPlatform, getAllOrders, getUserOrders, getAllPayments, getAllProductsLists, cancelProductInOrder } = require('../controller/CartOrdersController/orderPaypal');

// get orders by status routes
cartOrdersRoute.get('/getPendingOrders', getPendingOrders);
cartOrdersRoute.get('/getDeliveredOrders', getDeliveredOrders);
cartOrdersRoute.get('/getCancelledOrders', getCancelledOrders);
cartOrdersRoute.get('/getShippedOrders', getShippedOrders);
cartOrdersRoute.get('/getReturnedOrders', getReturnedOrders);
cartOrdersRoute.get('/getOutForDeliveryOrders', getOutForDeliveryOrders);
cartOrdersRoute.get('/getProcessingOrders', getProcessingOrders);

// cart routes

cartOrdersRoute.post('/addToCart', addToCart);
cartOrdersRoute.post('/getCart', getCart);
cartOrdersRoute.post('/removeFromCart', removeFromCart);
cartOrdersRoute.post('/clearCart', clearCart);
cartOrdersRoute.post('/updateQuantity', updateQuantity);

// cartOrdersRoute.post('/createPayment', createPayment); 

cartOrdersRoute.post("/paymentOrder", createPaypal)
cartOrdersRoute.post("/shippedProductInOrder", shippedProductInOrder)
cartOrdersRoute.post("/capturePayment", capturePayment)
// user params for the getOrdersByPlatform route
cartOrdersRoute.get("/getOrdersByPlatform/:platform", getOrdersByPlatform)
cartOrdersRoute.get("/getAllOrders", getAllOrders)
cartOrdersRoute.get("/getUserOrders/:userId", getUserOrders)
cartOrdersRoute.get("/getAllPayments", getAllPayments)
cartOrdersRoute.get("/getAllProductsLists", getAllProductsLists)
cartOrdersRoute.post("/cancelProductInOrder", cancelProductInOrder)

module.exports = cartOrdersRoute;