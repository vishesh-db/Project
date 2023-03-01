const express = require("express");

const routes = express.Router();
const menuCtrl = require("../controllers/menu");

routes.post("/getMenu", menuCtrl.getMenu);



module.exports = routes;