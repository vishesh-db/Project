const userModelCtrl = require("../models/userModel");
const bcrypt = require("bcrypt");
const cors = require("cors");

const signup = async (req, res) => {
  console.log(req.body);

  let user = new userModelCtrl.userModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: false,
    cart: {
      res_id: {
        id: -1,
      },
      items: [],
      total: 0,
    },
  });
  if (req.body.isAdmin) {
    req.body.isAdmin = req.body.isAdmin;
  }
  const foundUsers = await userModelCtrl.userModel.find({
    email: req.body.email,
  });
  if (foundUsers.length !== 0) {
    res.status(404).send("User already exists");
    return;
  }
  bcrypt.hash(user.password, 10, async function (err, hash) {
    // Store hash in your password DB.
    if (err) {
      res.status(404).send("Could not register user");
      return;
    }
    user.password = hash;
    const error = await user.save();
    res.status(201).send(user);
  });
};

const signin = async (req, res) => {
  try {
    const foundUser = await userModelCtrl.userModel.find({
      email: req.body.email,
    });
    console.log(foundUser);
    if (foundUser.length === 0) {
      res.status(404).send("Invalid email or password");
      return;
    }
    bcrypt.compare(
      req.body.password,
      foundUser[0].password,
      function (err, result) {
        console.log(result);
        if (result === true) {
          res.status(200).send(JSON.stringify(foundUser[0]));
        } else {
          res.status(404).send("Invalid email or password");
        }
      }
    );
  } catch (err) {
    res.status(500).send("INTERNAL SERVER ERROR");
  }
};
const addCart = async (req, res) => {
  const array = req.body.items;
  const items = [];
  for (let i = 0; i < array.length; i++) {
    items.push(JSON.parse(array[i]));
  }
  var myquery = { _id: req.body.user_id };
  const obj = {
    res_id: { id: req.body.res_id },
    items: items,
  };
  console.log(obj);
  var newvalues = {
    $set: {
      cart: obj,
    },
  };

  //console.log(obj);
  userModelCtrl.userModel.updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });
};
const getUsers = async (req, res) => {
  const data = await userModelCtrl.userModel.find({}, { password: 0 });
  res.status(200).send(data);
};
module.exports = { signup, signin, getUsers, addCart };

// 63f06b00ea788bbea2e8e91c 1 {"id":1,"name":"Chicken Seekulu","qt":1,"price":389}
