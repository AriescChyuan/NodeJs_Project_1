const jwt = require('jsonwebtoken');
const config = require('../config/development_config');

//進行Token認證
module.exports = function verifyToken(token){
    let tokenResult ="";
    const time = Math.floor(Date.now()/1000);
    console.log('time: ', time);
    return new Promise((resolve, reject)=>{
        if(token){
            jwt.verify(token, config.secret, function(err, decoded){
                if(err){
                    tokenResult = false;
                    resolve(tokenResult);
                }
                else if(decoded.exp <= time){
                    // token過期
                    tokenResult = false;
                    resolve(tokenResult);
                }
                else{
                    // 取得會員id
                    tokenResult = decoded.data 
                    resolve(tokenResult);
                }
            })
        }
    });
}