const restaurantModelCTRL = require("../models/restaurantModel");
const counter = require("./getNextSequence");

const bcrypt = require("bcrypt");
const cors = require("cors");

const restaurantApply = async (req, res) => {
  let restaurant = new restaurantModelCTRL.restaurantModel({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    address: req.body.address,
    fssaiCertificate: req.body.fssaiCertificate,
    image: req.body.image,
    approvalStatus: "pending",
    menuCount : 0,
    menu: [],
    
  });
  const foundRes = await restaurantModelCTRL.restaurantModel.find({
    email: req.body.email,
    approvalStatus: { $ne: "rejected" },
  });
  if (foundRes.length !== 0) {
    res.status(404).send("Restaurant already exists");
    return;
  }
  let id = await counter.getNextSequence("restaurantId");
  restaurant.id = id;
  bcrypt.hash(restaurant.password, 10, async function (err, hash) {
    // Store hash in your password DB.
    if (err) {
      res.status(404).send("Could not register user");
      return;
    }
    restaurant.password = hash;
    try {
      // const data = await user.save();
      data = await restaurant.save();
      res.status(201).send(data);
    } catch (err) {
      console.log(err);
    }
  });
};

const restaurantSignIn = async (req, res) => {
  //console.log("hi...................");
  //console.log(req.body);
  const foundRestaurant = await restaurantModelCTRL.restaurantModel.find({
    email: req.body.email,
    approvalStatus: "approved",
  });
  //console.log(foundRestaurant);
  if (foundRestaurant.length === 0) {
    res.status(404).send("Invalid email or password");
    return;
  }
  bcrypt.compare(
    req.body.password,
    foundRestaurant[0].password,
    function (err, result) {
      console.log(result);
      if (result === true) {
        res.status(200).send(JSON.stringify(foundRestaurant[0]));
      } else {
        res.status(404).send("Invalid email or password");
      }
    }
  );
};

const getPendingRestaurant = async function (req, res) {
  let data = await restaurantModelCTRL.restaurantModel.find({
    approvalStatus: "pending",
  });
  res.send(JSON.stringify(data));
};

const approve = async function (req, res) {
  restaurantId = req.body.id;
  approvalStatus = req.body.status;
  let data = await restaurantModelCTRL.restaurantModel.updateOne(
    { id: restaurantId },
    { $set: { approvalStatus: approvalStatus } }
  );
  console.log(data);
  res.send(data);
};

const getRestaurants = async (req, res) => {
  const data = await restaurantModelCTRL.restaurantModel.find({
    approvalStatus: "approved",
  });
  // console.log(data);

  res.status(200).send(data);
};
const getRestaurantName = async (req, res) => {
  const data = await restaurantModelCTRL.restaurantModel.find({
    id:req.body.id
  });
  // console.log(data);

  res.status(200).send(data);
};

const addItem= async (req, res) => {
  const data = await restaurantModelCTRL.restaurantModel.find({
    id:req.body.res_id
  });
  // console.log(data);
   const itemObj = {
    
    category :req.body.category,
    id:req.body.id,
    img:req.body.img,
   
    name:req.body.name,
     price:parseInt(req.body.price),
    quantity:req.body.quantity,
    sellCount : req.body.sellCount
    
    
  };
  //console.log(itemObj);
  const array=data[0].menu;
   array.push(itemObj);
  // console.log(array);
    
   const addItem= await restaurantModelCTRL.restaurantModel.updateOne({
    id:req.body.res_id
  },{
    $set:
     { menuCount:array.length,
       menu:array},
    
  });

  res.status(200).send("Hello");
};


module.exports = {
  restaurantApply,
  restaurantSignIn,
  approve,
  getPendingRestaurant,
  getRestaurants,
  getRestaurantName,
  addItem
};
