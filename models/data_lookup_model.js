
const db = require('./connection_db');

module.exports = function LookUpData(table, id){
    let result = {};
    return new Promise((resolve, reject)=>{

        let sql = "SELECT * FROM "+table+" WHERE id = ?";

        
        db.query(sql,id,function(err, results){
            if(err){
                console.log(err);
                result.status = '資料搜尋失敗。';
                result.err = '資料庫錯誤，請稍後再試！';
                reject(result);
                
                return;
            }
            resolve(results)
        })
        
        
    })
}
