const express = require('express');
const cartOrdersRoute = express.Router();

const { addToCart, getCart, removeFromCart, clearCart, updateQuantity } = require('../controller/CartOrdersController/cartController');
const { createPayment } = require('../controller/CartOrdersController/orderController');

const { createPaypal, capturePayment, getOrdersByPlatform, getAllOrders } = require('../controller/CartOrdersController/orderPaypal');


cartOrdersRoute.post('/addToCart', addToCart);
cartOrdersRoute.post('/getCart', getCart);
cartOrdersRoute.post('/removeFromCart', removeFromCart);
cartOrdersRoute.post('/clearCart', clearCart);
cartOrdersRoute.post('/updateQuantity', updateQuantity);

cartOrdersRoute.post('/createPayment', createPayment); // create payment route

cartOrdersRoute.post("/paymentOrder", createPaypal)
cartOrdersRoute.post("/capturePayment", capturePayment)
// user params for the getOrdersByPlatform route
cartOrdersRoute.get("/getOrdersByPlatform/:platform", getOrdersByPlatform)
cartOrdersRoute.get("/getAllOrders", getAllOrders)


module.exports = cartOrdersRoute;