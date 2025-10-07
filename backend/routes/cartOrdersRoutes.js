const express = require('express');
const cartOrdersRoute = express.Router();

const { addToCart } = require('../controller/CartOrdersController/cartController');

cartOrdersRoute.post('/addToCart', addToCart);


module.exports = cartOrdersRoute;