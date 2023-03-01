const express=require('express');
const app= express();
const routes= express.Router();
const AnalyticsCtrl=require("../controllers/restaurantAnalytics")

routes.post('/total',AnalyticsCtrl.getTotal);
routes.post('/uniqueUsers',AnalyticsCtrl.getUniqueUsers);
routes.post('/orderAnal',AnalyticsCtrl.restaurantOrderAnal);
routes.post('/charts',AnalyticsCtrl.lastSevenDaysOrderAnal);
routes.post('/menuAnalysis',AnalyticsCtrl.menuAnal);
routes.post('/userOrderHistory',AnalyticsCtrl.getUserOrderHistory);

module.exports = routes;