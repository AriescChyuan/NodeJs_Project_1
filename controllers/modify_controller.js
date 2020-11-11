const toRegister = require('../models/register_model');
const LoginAction = require('../models/login_model');
const Check = require('../service/member_check');
const encryption = require('../models/encryption');

check = new Check();

module.exports = class Member { 
    // 處理會員註冊的function
    postRegister(req, res, next){
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
            res.json({
                result:{
                   status : "註冊失敗。",
                   err    : "請輸入正確的E-mail格式"
                }
            })
        }else if (check === true){
            // 將資料寫入資料庫
            toRegister(memberData).then(result=>{
                res.json({
                        status:"註冊成功。",
                        results: result
                    })
            }),(err)=>{
                res.json({
                    results: err
                })
            }    
        }    
    }
    // 處理會員登入的function
    postLogin(req, res, next){ 
        const password = encryption(req.body.password);

        const memberData = {
            name: req.body.name,
            password: password,    //加密後的密碼
        }
        LoginAction(memberData).then(rows =>{
            if (check.checkNull(rows)===true){
                res.json({
                    result:{
                        status: "登入失敗。",
                        loginMember: "請輸入正確的帳號密碼。"
                    }
                })
            }else if(check.checkNull(rows)===false){
                // 產生token
                res.json({
                    result:{
                        status: "登入成功。",
                        loginMember: "歡迎 "+ rows[0].name + "的登入！"
                    }
                })
            }
        })
    
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