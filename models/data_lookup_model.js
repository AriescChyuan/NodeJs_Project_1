// const { promiseImpl } = require('ejs');
const db = require('./connection_db');

module.exports = function LookUpData(id){
    let result = {};
    return new Promise((resolve, reject)=>{
        
        db.query('SELECT * FROM machine WHERE item = ?', 'speed', function(err, results){
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
