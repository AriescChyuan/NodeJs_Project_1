var express = require('express');
var db =require('./models/connection_db');
var app = express(); 
var bodyParser = require('body-parser');

var router = require('./routes/member')

app.set('view engine', 'ejs')
app.use(express.static('public'));  //設定靜態資料夾 不然無法使用js 及 bootstrap

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', router);

app.use((req,res)=>{        //此函式要放在最後面
    res.type('text/plain');
    res.status(404);
    res.send('找不到網頁')
});

const port = process.env.PORT || 3000;
//此時到termanal，執行一樣會輸出3000，因此可以來嘗試，在終端機設定不同的環境變數：
//$ export PORT=8000  //Mac 
//$ set PORT=8000  //Windows
app.listen(port,()=>{
    console.log('伺服器成功啟動')
});