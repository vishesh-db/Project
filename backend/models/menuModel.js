const db = require("./conn").db;
const mongoose = require("./conn").mongoose;

const starerSchema = mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    },
    ingredients: {
        type: Array,

    },
    img: {
        type: String
    },
    cost: {
        type: Number,
    },

});
const breakfastSchema = mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    },
    ingredients: {
        type: Array,
    },
    img: {
        type: String
    },
    cost: {
        type: Number,
    },

});
const lunchSchema = mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    },
    ingredients: {
        type: Array,

    },
    img: {
        type: String
    },
    cost: {
        type: Number,
    },

});
const dinnerSchema = mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    },
    ingredients: {
        type: Array,

    },
    img: {
        type: String
    },
    cost: {
        type: Number,
    },

});


let statersModel = mongoose.model("starter", starerSchema);
let breakfastModel = mongoose.model("breakfast", starerSchema);
let lunchModel = mongoose.model("lunch", lunchSchema);
let dinnersModel = mongoose.model("dinner", dinnerSchema);
module.exports = { statersModel, breakfastModel, lunchModel, dinnersModel };
