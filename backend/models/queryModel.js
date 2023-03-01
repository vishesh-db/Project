const db = require("./conn").db;
const mongoose = require("./conn").mongoose;

const QuerySchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  message: {
    type: String,
  },
  subject: {
    type: String,
  },
});

let queryModel = mongoose.model("query", QuerySchema);
module.exports = { queryModel };
