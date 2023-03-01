const multer = require("../models/multer");

let uploadRes = (req, res) => {
  try {
    // console.log(req.file);
    console.log(req.file.location);
    res.send(req.file);
  } catch {
    res.send("Something went wrong");
  }
};
let upload = multer.upload;
module.exports = { upload, uploadRes };
