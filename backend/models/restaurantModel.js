const { Schema } = require("mongoose");

const db = require("./conn").db;
const mongoose = require("./conn").mongoose;

const restaurantSchema = new mongoose.Schema({
  id:{
    type:Number,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    street: {
      type: String,
    },
    locality: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: Number,
    },
  },
  fssaiCertificate: {
    type: String,
  },
  image: {
    type: String,
  },
  approvalStatus: {
    type: String,
    enum: ["approved", "pending", "rejected"],
    default: "pending",
  },
  menuCount :{
     type :Number,
  },
  menu:[{
    id:{
        type:Number,
    },
    name:{
        type: String,
      },
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
      img: {
        type: String,
      },
      category: {
        type: String,
      },
      sellCount: {
        type: Number,
      },
    },
  ]
});

let restaurantModel = mongoose.model("restaurant", restaurantSchema);

module.exports = { restaurantModel };

