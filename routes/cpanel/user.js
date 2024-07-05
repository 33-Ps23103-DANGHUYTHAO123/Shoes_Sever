var express = require('express');
var router = express.Router();
const userController = require('../../components/user/Controller')
const uploadFile = require('../../middle/UploadFile')
const CONFIG = require('../../config/Config')
var modelUser = require('../../../ShoeStore_Sever/components/user/Model')
// hiển thị trang danh sách user
router.get('/', uploadFile.array('image', 10), async function (req, res, next) {
    try {
        var users = await modelUser.find();
        res.render('user/listUser', { ds: users })
    } catch (error) {

    }
});
//hiển thị trang thêm user
router.get('/new', async function (req, res, next) {
    try {
        res.render('user/addUser')
    } catch (error) {
        console.log(error);
    }
});
router.post('/new', uploadFile.array('image', 10), async function (req, res, next) {
    try {
        var { name, email, phonenumber, address, image} = req.body;
        var addUser = { name, email, phonenumber, address, image};
        console.log(req.files);
        var image = [];
       
        if (req.files && req.files.length > 0) {
            image= req.files.map(file => `${CONFIG.CONSTANTS.IP}images/${file.filename}`);
        }
        

        var result = await modelUser.create(addUser);
        //var addImage = await modelUser.create(image);
       // console.log(addImage);
        console.log(result);
        res.redirect('/cpanel/users');

    } catch (error) {
        console.log(error);
    }
});
//xóa user theo id
router.get('/:id/delete', async function (req, res, next) {
    try {
       var {id}  = req.query;
        var result = await modelUser.findByIdAndDelete(id);
       if (result!=null) {
        res.json({stattus: 1, message: "xóa ok"});
       }else{
        res.json({stattus: 0, message: "xóa khong thanh cong"});
       }
    } catch (error) {
       res.json({stattus: 0, message: error});
    }
  });
  



module.exports = router;