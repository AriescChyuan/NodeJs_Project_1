const db = require('./connection_db');

module.exports = function register(memberData){
    let result ={};
    let sqlVal = [memberData.name, memberData.email, memberData.password, memberData.create_date];
    
    return new Promise((resolve, rejected)=>{
         // 搜尋是否有重複的email
         db.query('SELECT email FROM member_info WHERE email = ?', memberData.email, function(err, rows){
             //如果資料庫發生錯誤
             if(err){
                console.log(err);
                result.status = "註冊失敗";
                result.err ="伺服器錯誤，請稍後再試！";
                rejected(result)
                return; //在此結束，不執行下面程式碼。
             }
             //如果有重複
             if(rows.length >= 1){
                console.log(err);
                result.status = "註冊失敗";
                result.err ="email已有人使用";
                rejected(result)
             }
             else{
                 // 將資料寫入資料庫
                db.query('INSERT INTO member_info SET name =?, email=?, password=?, create_date =?',sqlVal, function(err, rows){
                    //寫入資料庫失敗
                    if (err) {
                        console.log(err);
                        result.status = "註冊失敗";
                        result.err ="伺服器錯誤，請稍後再試！";
                        rejected(result)
                        return; //在此結束，不執行下面程式碼。
                    }
                    //寫入資料庫成功
                      console.log('寫入資料庫成功')
                      result.registerMember = memberData;
                      resolve(result)
              });
             }
         })
    })
}