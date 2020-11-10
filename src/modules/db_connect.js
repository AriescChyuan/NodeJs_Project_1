var mariadb = require('mariadb'); //資料庫
const pool = mariadb.createPool({
    host:'localhost',
    user:'root',  
    password: '',
    database:'test',
    waitForConnections:true,
    queueLimit:0
});
module.exports = pool;