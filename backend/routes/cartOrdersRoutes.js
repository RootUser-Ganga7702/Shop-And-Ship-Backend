const express = require('express');
const cartOrdersRoute = express.Router();

const { addToCart, getCart, removeFromCart, clearCart, updateQuantity } = require('../controller/CartOrdersController/cartController');
// const { createPayment } = require('../controller/CartOrdersController/orderController');

const { shippedProductInOrder, createPaypal, capturePayment, getOrdersByPlatform, getAllOrders, getUserOrders, getAllPayments, getAllProductsLists, cancelProductInOrder } = require('../controller/CartOrdersController/orderPaypal');


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