const express = require("express");
const app = express();

const routes = express.Router();
const restaurantCTRL=require("../controllers/restaurant");

routes.post("/apply",restaurantCTRL.restaurantApply);
routes.post("/signin",restaurantCTRL.restaurantSignIn);
routes.post("/approve",restaurantCTRL.approve);
routes.get("/pendingRestaurants",restaurantCTRL.getPendingRestaurant);
routes.get("/display", restaurantCTRL.getRestaurants);
routes.post("/info",restaurantCTRL.getRestaurantName);
routes.post("/addItem",restaurantCTRL.addItem);
module.exports =routes;
