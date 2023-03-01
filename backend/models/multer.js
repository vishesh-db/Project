// const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());
const { S3Client } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
const multer = require("multer");
const multerS3 = require("multer-s3");
dotenv.config();

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     let path = "../uploads";
//     fs.mkdirSync(path, { recursive: true });
//     cb(null, path);
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage }).single("img");

// module.exports = { upload };
// ------------------------------------------------------------------------------------------------
console.log(process.env);
let s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    ACL: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

upload = upload.single("img");

module.exports = { upload };

// app.post("/upload", upload.single("imgFile"), (req, res) => {
//   try {
//     console.log(req.file);
//     console.log(req.file.location);
//     res.send({ result: "Uploaded" });
//   } catch {
//     res.send("Something went wrong");
//   }
// });

// app.listen(3000, () => {
//   console.log("Server listening on 3000");
// });
