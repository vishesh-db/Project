const db = require('./conn').db;
const mongoose = require('./conn').mongoose;

//console.log(db+"   data base  connection   "+mongoose);

const orderSchema = mongoose.Schema({
  orderId: {
    type: Number,
    required: true
  },
  restaurant_id: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "restaurant"
    type:Number,
    required:true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  items:[{
      id: { type: Number,required: true },
      item: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }],
  status: {
    type: String,
  },
  date: { type: Date, default: Date.now() },
  total: {
    type: Number
  },
  address:
  {
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
  }
})

let orderModel = mongoose.model('orders', orderSchema);
module.exports = { orderModel };
