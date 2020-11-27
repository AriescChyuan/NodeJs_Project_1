var express = require('express');
var router = express.Router();

const MemberModifyMethod = require('../controllers/modify_controller');


memberModifyMethod = new MemberModifyMethod();

//進入頁面
router.get('/',(req,res)=>{
    res.render('login',{status:"", loginMember:"", err:""});
});
//註冊頁面
router.get('/registerPage',(req,res)=>{  
    res.render('register',{status:"", err:""});
});

// 會員 登入 註冊 更新 功能
router.post('/register',memberModifyMethod.postRegister); 
router.post('/login',memberModifyMethod.postLogin);
router.put('/update',memberModifyMethod.postUpdate);

module.exports = router;