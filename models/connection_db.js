var mysql = require('mysql'); 
const config = require('../config/development_config');

const connection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
});
connection.connect(err => {
    if (err) {
      console.log('資料庫連線失敗');
      alert('資料庫連線失敗');
    } else {
      console.log('資料庫連線成功');
      alert('資料庫連線成功');
    }
  });
module.exports = connection;