var express = require('express');
var app = express(); 
var bodyParser = require('body-parser');
const path = require('path');

var MemberRouter = require('./routes/member')
var MachineRouter = require('./routes/machine')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
// app.use(express.static('public'));  //設定靜態資料夾 不然無法使用js 及 bootstrap
app.use(express.static(path.join(__dirname, 'public')))  //如果要用pkg打包，靜態目錄要這樣設定才讀取得到
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', [MemberRouter, MachineRouter]);

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