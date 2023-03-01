const express = require("express");
const app = express();

const routes = express.Router();
const userCtrl=require("../controllers/users");
const queryCtrl=require("../controllers/query");
routes.post("/signup", userCtrl.signup);

routes.post("/signin", userCtrl.signin);
routes.post("/addCart",userCtrl.addCart);

routes.get("/getUsers", userCtrl.getUsers);
routes.get("/getQueries", queryCtrl.getQueries);

routes.post("/addQueries", queryCtrl.addQueries);


module.exports = routes;