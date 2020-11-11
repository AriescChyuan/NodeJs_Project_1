var express = require('express');
var router = express.Router();

const MemberModifyMethod = require('../controllers/modify_controller');

memberModifyMethod = new MemberModifyMethod();

router.post('/register',memberModifyMethod.postRegister); //哥哥帶你去 modify_controller.js

router.post('/login',memberModifyMethod.postLogin); 

module.exports = router;