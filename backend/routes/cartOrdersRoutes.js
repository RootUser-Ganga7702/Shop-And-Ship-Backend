const express = require('express');
const cartOrdersRoute = express.Router();

const { addToCart, getCart, removeFromCart, clearCart, updateQuantity } = require('../controller/CartOrdersController/cartController');
const { createPayment } = require('../controller/CartOrdersController/orderController');


cartOrdersRoute.post('/addToCart', addToCart);
cartOrdersRoute.post('/getCart', getCart);
cartOrdersRoute.post('/removeFromCart', removeFromCart);
cartOrdersRoute.post('/clearCart', clearCart);
cartOrdersRoute.post('/updateQuantity', updateQuantity);

cartOrdersRoute.post('/createPayment', createPayment); // create payment route


module.exports = cartOrdersRoute;