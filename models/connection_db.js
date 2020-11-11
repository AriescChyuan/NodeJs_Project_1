var mariadb = require('mariadb'); //資料庫
const config = require('../config/development_config');

const pool = mariadb.createPool({
    host: config.mariadb.host,
    user: config.mariadb.user,
    password: config.mariadb.password,
    database: config.mariadb.database,
    // waitForConnections:true,
    // queueLimit:0
    
});
module.exports = pool;