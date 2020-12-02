require('dotenv').config()
//為了不在程式碼的各處加入新的環境變數，
//而想要集中在 .env 檔中管理它，所以有大神寫了 dotenv , 可以在程式一開始就載入所有的環境變數。

// module.exports = {
//   mysql: {
//       host: process.env.HOST,
//       user: process.env.DATABASE_USER,
//       password: process.env.DATABASE_PASSWORD,
//       database: process.env.DATABASE
//     },
//     secret:process.env.MY_SECRET
// }
module.exports = {
  mysql: {
      host: 'us-cdbr-east-02.cleardb.com',
      user: 'b3f4c83c211f65',
      password: '12a9db6e',
      database: 'heroku_01a96fa5657592f'
    },
    secret:process.env.MY_SECRET
}
