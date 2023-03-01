const orderModelCtrl = require("../models/orderModel");
const restaurantModelCtrl = require("../models/restaurantModel");

let getTotal = async function (req, res) {
  let rest_id = req.body.id;
  let data = await orderModelCtrl.orderModel.aggregate([
    {
      $match: {
        restaurant_id: rest_id,
      },
    },
    {
      $group: {
        _id: "$restaurant_id",
        sum: {
          $sum: "$total",
        },
        avg: {
          $avg: "$total",
        },
      },
    },
  ]);
  console.log(data);
  res.send(data);
};

let getUniqueUsers = async function (req, res) {
  let rest_id = req.body.id;
  let data = await orderModelCtrl.orderModel.aggregate([
    {
      $match: {
        restaurant_id: 1,
      },
    },
    {
      $group: {
        _id: {
          restaurant_id: "$restaurant_id",
          users: "$user_id",
        },
        users: {
          $sum: "1",
        },
      },
    },
  ]);
  console.log(data);
  res.send(data);
};

const restaurantOrderAnal = async function (req, res) {
  let data = await orderModelCtrl.orderModel.aggregate([
    {
      $match: {
        restaurant_id: req.body.id,
      },
    },
    {
      $group: {
        _id: "$status",
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  let obj = { completed: 0, pending: 0, rejected: 0 };
  for(let i = 0; i < data.length;i++) {
    if(data[i]._id === "completed"){
      obj.completed=data[i].count;
    }
    else if(data[i]._id === "rejected"){
      obj.rejected=data[i].count;
    }
    else{
      obj.pending+=data[i].count;
    }
  }
  obj =JSON.stringify(obj)
  res.send(obj);
};

const lastSevenDaysOrderAnal = async function (req, res) {
  let data = await orderModelCtrl.orderModel.aggregate([
    {
      $match: {
        restaurant_id: req.body.id,
      },
    },
    {
      $group: {
        _id: {
          month: {
            $month: "$date",
          },
          day: {
            $dayOfMonth: "$date",
          },
          year: {
            $year: "$date",
          },
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        _id: -1,
      },
    },
    {
      $limit: 3,
    },
  ]);
  console.log(data);
  res.send(data);
};

const menuAnal = async (req, res) => {
  let data = await restaurantModelCtrl.restaurantModel.find({
    id: req.body.id,
  });
  let qty = [];
  let dishes = [];
  let menu = data[0].menu;
  for (dish of menu) {
    qty.push(dish.sellCount);
    dishes.push(dish.name);
  }
  let analyticsData = JSON.stringify({
    qty: qty,
    menu: dishes,
  });
  res.send(analyticsData);
};

async function getUserOrderHistory(req, res) {
  let findObj = {
    user_id: req.body.id,
  };
  try {
    let data = await orderModelCtrl.orderModel.find(findObj);
    let restData = await restaurantModelCtrl.restaurantModel.find(
      {},
      { id: 1, name: 1 }
    );
    let obj = {
      orderData: data,
      restaurantData: restData,
    };
    obj = JSON.stringify(obj);
    console.log(obj);
    res.send(obj);
  } catch {
    res.send("Something went wrong");
  }
}

module.exports = {
  getTotal,
  restaurantOrderAnal,
  lastSevenDaysOrderAnal,
  menuAnal,
  getUserOrderHistory,
  getUniqueUsers,
};