const { Schema } = require("mongoose");

const db = require("./conn").db;
const mongoose = require("./conn").mongoose;

const counterSchema = mongoose.Schema({
    _id: { 
        type: String, 
        required: true 
    },
    seq: { 
        type: Number,
        default: 0 
    }
});


let counterModel = mongoose.model('counters', counterSchema);
module.exports = { counterModel };