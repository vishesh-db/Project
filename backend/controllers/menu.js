const model = require("../models/restaurantModel");
const restaurantModel = model.restaurantModel;
const multer=require('../models/multer')
const getMenu = async (req, res) => {
    const data = await restaurantModel.find({id:req.body.id});

    res.status(200).send(data[0].menu);
};

module.exports = { getMenu};
