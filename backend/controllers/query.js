const queryModel=require("../models/queryModel");

const addQueries = async function(req,res){
    console.log(req.body);
    let query=new queryModel.queryModel({
        name:req.body.name,
        email:req.body.email,
        subject:req.body.subject,
        message:req.body.message
    })
    let data=await query.save();
    res.status(201).send(data);
}


const getQueries = async (req, res) => {
    const data = await queryModel.queryModel.find({},{"_id":0});
    res.status(200).send(data);
  };

module.exports = {addQueries,getQueries};