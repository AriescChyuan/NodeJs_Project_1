const toRegister = require('../models/register_model');
const LoginAction = require('../models/login_model');
const updateAction = require('../models/update_model');
const verifyToken = require('../models/verification_model');
const Check = require('../service/member_check');
const encryption = require('../models/encryption');  //密碼加密Function
const config = require('../config/development_config');
const jwt = require('jsonwebtoken');
check = new Check();

var express = require('express');
var app = express(); 
app.set('view engine', 'ejs');

module.exports = class Member { 
    // 處理會員註冊的function
    postRegister(req, res){
        console.log(req.body)
        //密碼加密
        const password = encryption(req.body.password);
        // console.log(password)
        //獲取Client端post來的“欲新增”的會員資料
        const memberData = {
            name: req.body.name,
            email: req.body.email,
            password: password,    //加密後的密碼
            create_date: onTime()
        }
        // 檢查 email格式是否正確
        const checkEmail = check.checkemail(memberData.email);
        
        if (checkEmail === false) {
            // res.json({
            //     result:{
            //        status : "註冊失敗。",
            //        err    : "請輸入正確的E-mail格式"
            //     }
            // })
            res.render('../views/register', {status: "註冊失敗。",err: "請輸入正確的E-mail格式"})
            
        }else if (checkEmail === true){
            // 將資料寫入資料庫
            console.log(memberData)
            toRegister(memberData).then(result=>{
                // res.json({
                //         status:"註冊成功。",
                //         results: result
                //     })
                res.render('../views/login',{status:'註冊成功，請重新登入。',loginMember:''})
            }),(err)=>{
                res.json({
                    results: err
                })
            }    
        }    
    }
    // 處理會員登入的function
    postLogin(req, res){ 
        const password = encryption(req.body.password);

        const memberData = {
            name: req.body.name,
            password: password,    //加密後的密碼
        }
        console.log('登入會員：',memberData.name , '加密後密碼：',memberData.password);
        LoginAction(memberData).then(rows =>{
            if (check.checkNull(rows)===true){
                // res.json({
                //     result:{
                //         status: "登入失敗。",
                //         loginMember: "請輸入正確的帳號密碼。"
                //     }
                // })
                res.render('../views/login.ejs',{status:"登入失敗!", loginMember: "請輸入正確的帳號密碼。"});
            }else if(check.checkNull(rows)===false){
                // 產生token
                const token = jwt.sign({
                    algorithm: 'HS256',
                    exp: Math.floor(Date.now() / 1000) + (60 * 60), // token一個小時後過期。
                    data: rows[0].id
                }, config.secret);
                res.setHeader('token',token);
                // res.json({
                //     result:{
                //         status: "登入成功。",
                //         loginMember: "歡迎 "+ rows[0].name + " 的登入！",
                //     }
                // })
                res.render('../views/index.ejs',{status:"登入成功！",loginMember: "歡迎 "+ rows[0].name + " 的登入！"});
            }
        })
    
    }
    //處理修改會員資料的function
    postUpdate(req, res){
        const token = req.headers['token'];
        console.log(token);
        //確認token是否輸入
        if(check.checkNull(token) === true){
            res.json({
                err:'請輸入token!'
            })
        }else if(check.checkNull(token) === false){
            verifyToken(token).then(tokenResult=>{
                if(tokenResult === false){
                    res.json({
                        result:{
                            status:'token錯誤',
                            err: '請重新登入！'
                        }
                    })
                }else{
                    const id = tokenResult;
                    const password = encryption(req.body.password); //密碼加密
                    const memberUpdateData = {
                        name: req.body.name,
                        password: password,
                        email:req.body.email,
                        update_date: onTime()
                    }
                    updateAction(id, memberUpdateData ).then(result => {
                        res.json({
                            result:result
                        })
                    }, (err)=>{
                        res.json({
                            result:err
                        })
                    })
                }
            })
        }
    }
    
}
//獲取現在時間，並將格式轉成 YYYY-MM-DD HH:MM:SS
const onTime = () => {
    const date = new Date();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const hh = date.getHours();
    const mi = date.getMinutes();
    const ss = date.getSeconds();

    return [date.getFullYear(), "-" +
        (mm > 9 ? '' : '0') + mm, "-" +
        (dd > 9 ? '' : '0') + dd, " " +
        (hh > 9 ? '' : '0') + hh, ":" +
        (mi > 9 ? '' : '0') + mi, ":" +
        (ss > 9 ? '' : '0') + ss
    ].join('');
}