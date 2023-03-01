const express = require("express");
const fs = require("fs");
const app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());
const restaurantRoutes = require("./routes/restaurantRoutes");
const userRoutes = require("./routes/userRoutes");
const menuRoutes = require("./routes/menuRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const orderRoutes = require("./routes/orders");
const analyticsRoutes = require("./routes/analyticsRoutes")

app.use("/restaurants", restaurantRoutes);
app.use("/menus", menuRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/order", orderRoutes);
app.use("/", userRoutes);
app.use("/", uploadRoutes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
