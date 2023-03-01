const express = require('express');
const routes = express.Router();

const orderDetails = require('../controllers/orders');

routes.post('/saveOrder', orderDetails.saveOrder);
routes.post('/fetchRestaurantOrders/:restaurant_id/:status',orderDetails.fetchOrdersWithStatus);
routes.get('/fetchRestaurantOrders/:restaurant_id/:orderId',orderDetails.fetchOrderWithOrderId);
routes.get('/searchOrderId/:orderId',orderDetails.searchOrderId);
routes.post('/updateRestaurantOrder/:restaurant_id/:orderId/:status', orderDetails.updateOrder);

module.exports = routes;