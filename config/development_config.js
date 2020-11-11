require('dotenv').config()
//為了不在程式碼的各處加入新的環境變數，
//而想要集中在 .env 檔中管理它，所以有大神寫了 dotenv , 可以在程式一開始就載入所有的環境變數。

module.exports = {
    mariadb: {
      host: process.env.HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE
    },
    secret:process.env.MY_SECRET
}