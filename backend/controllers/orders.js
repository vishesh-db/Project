const orderModelCtrl = require('../models/orderModel');
const counter = require('./getNextSequence');

async function saveOrder(req, res){
    const array=req.body.items;
    const items=[];
    for(let i=0;i<array.length;i++)
    {
        const ele=JSON.parse(array[i]);
        const objCart={
            id:ele.id,
            item:ele.name,
            quantity:ele.qt,
            price:ele.price
          }
        items.push(objCart);
    }
    let orderData = orderModelCtrl.orderModel({
        orderId : await counter.getNextSequence("orderId"),
        items : items,
        status: req.body.status,
        address: {
            "street":"Indra Nagar",
            "locality":"Gachibowli",
            "city":"Hyderabad",
            "pincode":500032
        },
        restaurant_id: req.body.res_id,
        user_id: req.body.user_id,
        total: req.body.total
    });

    orderData.save().then((data)=>res.send("Ordered Successfully"+data)).catch("While saving orders, Something went wrong!");
    
}


async function fetchOrdersWithStatus(req, res){
    try{
        if(req.params.restaurant_id !=null)
        {
            orderModel = orderModelCtrl.orderModel;
            orderModel.find({restaurant_id:req.params.restaurant_id, status:req.params.status}).then((docs)=>res.send(docs)).catch("While fetching orders, Something went wrong!")
        }
    }
    catch(e)
    {
        res.send("Something went wrong while fetching restaurant orders");
    }

}

async function fetchOrderWithOrderId(req, res){
    try{
        if(req.params.orderId != null)
        {
            orderModelCtrl.orderModel.find({orderId:req.params.orderId}).then((docs)=>res.send(docs)).catch("Something went wrong in fetching query");
        }
    }
    catch(e)
    {
        res.send("Something went wrong while fetching a order of orderId");
    }
}

async function updateOrder(req, res)
{
    try{
        if(req.params.orderId != null && req.params.restaurant_id != null && req.params.status)
        {
            orderModelCtrl.orderModel.updateOne({orderId: req.params.orderId, restaurant_id:req.params.restaurant_id},{$set:{status:req.params.status}},{new:true}).then((doc)=>res.send(doc)).catch("Something went wrong while updating a status");
        }
    }
    catch(e){
        res.send("Something went wrong while updating data")
    }
}

function searchOrderId(req, res){
    try{
        if(req.params.orderId != null)
        {
            orderDoneModelCtrl.orderDoneModel.find({orderId : req.params.orderId},(err, doc)=>{
                if(err)
                {
                    res.send("While searching orderId in orderDone collection, Something went wrong");
                }
                else
                {
                    let isPresent = (doc.length == 0)? false : true ;
                    res.send(isPresent);   
                }
            });
        }
    }
    catch(e)
    {
        res.send("Something went wrong on searchOrderId funtion");
    }
}



module.exports = {saveOrder, fetchOrdersWithStatus, searchOrderId, fetchOrderWithOrderId, updateOrder};