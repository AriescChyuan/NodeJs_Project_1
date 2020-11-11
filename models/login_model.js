const db = require('./connection_db');

module.exports = function memberLogin(memberData){
    let result = {};
    return new Promise((resolve, reject)=>{
        //收尋
        db.query('SELECT * FROM member_info WHERE email = ? and password = ?',[memberData.name, memberData.password], function(err, rows){
            if(err){
                result.status = "登入失敗。";
                result.err = "伺服器錯誤，請稍後再試！";
                reject(result);
                return;
            }
            resolve(rows);
        });
    });
}