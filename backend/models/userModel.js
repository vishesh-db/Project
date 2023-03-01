const db = require("./conn").db;
const mongoose = require("./conn").mongoose;

const userSchema = mongoose.Schema({
  id:{
    type:Number
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
  isAdmin: {
    type: Boolean,
  },

  cart:{
    res_id :{
      type: Object,
    },
   items:[{
      id:{
        type:Number
      },
      name:{
        type:String
      },
      qt:{
        type:Number
      },
      price:{
        type:Number
      }
    }],
    total:{
      type: Number
    }
  }
});

let userModel = mongoose.model("user", userSchema);
module.exports = { userModel };
