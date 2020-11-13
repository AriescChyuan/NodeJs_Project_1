
const db = require('./connection_db');

module.exports = function LookUpData(req){
    let result = {};
    return new Promise((resolve, reject)=>{
        //SELECT * FROM machine WHERE item = ?'
        db.query('SELECT * FROM machine',req, function(err, results){
            // console.log(err);
            if(err){
                result.status = '資料搜尋失敗。';
                result.err = '資料庫錯誤，請稍後再試！';
                reject(result);
                return;
            }
            resolve(results)
        })
        
    })
}
