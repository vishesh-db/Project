const express=require('express')

const routes = express.Router();
const fileupload=require('../controllers/fileupload');
routes.post('/upload', fileupload.upload,fileupload.uploadRes);

module.exports = routes;