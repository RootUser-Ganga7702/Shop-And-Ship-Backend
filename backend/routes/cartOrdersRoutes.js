const express = require('express');
const cartOrdersRoute = express.Router();

const { addToCart, getCart, removeFromCart, clearCart } = require('../controller/CartOrdersController/cartController');

cartOrdersRoute.post('/addToCart', addToCart);
cartOrdersRoute.post('/getCart', getCart);
cartOrdersRoute.post('/removeFromCart', removeFromCart);
cartOrdersRoute.post('/clearCart', clearCart);


module.exports = cartOrdersRoute;