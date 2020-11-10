var child = require('child_process');
var events = require('events');
var express = require('express')

var app = express();
var server = require('http').Server(app);
var spawn = child.spawn;
var exec = child.exec;
var Emitters = {}
var firstChunks = {}
//設定 config
var config = {
    port:8000,
    url:'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov',  //測試用rtsp網址 1
    url1:'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov'     //測試用rtsp網址 2
    //rtsp://freja.hiof.no:1935/rtplive/definst/hessdalen03.stream

}
// 用來實例化 事件監聽器（Emitter）的函式，並放到Emitters{}陣列
var initEmitter = function(feed){  
    if(!Emitters[feed]){
        Emitters[feed] = new events.EventEmitter().setMaxListeners(0)
    }
    return Emitters[feed]  
}
//hold first chunk of FLV video   //用來初始化 FLV影像的第一個frame的函式，並放到firstChunks{}陣列裡面
var initFirstChunk = function(feed,firstBuffer){  
    if(!firstChunks[feed]){
        firstChunks[feed] = firstBuffer
    }
    return firstChunks[feed]
}

console.log('Starting Express Web Server on Port '+config.port)

server.listen(config.port);  //監聽 port

//設定靜態資料夾
app.use('/libs',express.static(__dirname + '/../../web/libs'));
app.use('/',express.static(__dirname + '/'));


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/video_test_2.html');
})

app.get(['/flv','/flv/1/s.flv'], function (req, res) {
    //default to first feed
    // if(!req.params.feed){req.params.feed='1'}  //如果client端導入/flv位址的話，就將seed設定成1
                                               //如果是 /flv/:seed/s.flv 就跳過 因為本身有設定seed了
    //get emitter
    req.Emitter = initEmitter(1)  //初始化一個 Eitter 並放在 Emitters[req.params.feed]的位置(index=req.params.feed)並輸出影
    
    var contentWriter  //宣告用來裝buffer的變數
    //設定 Ｈeader 檔頭
    res.setHeader('Content-Type', 'video/x-flv');     //設定檔頭  Content-Type
    res.setHeader('Access-Control-Allow-Origin','*'); // 不知道 哈哈 反正是檔頭的一些參數
    //write first frame on stream
    res.write(initFirstChunk(1))    //寫入影像的第一個frame 到buffer
    
    //write new frames as they happen 當觸發'data'事件，就將新的frame寫入buffer
    req.Emitter.on('data_1',contentWriter=function(buffer){  //當此事件觸發，將會把93行的buffer放進contentWriter變數中
        res.write(buffer)
        console.log('Emitter trigger')
    })
  
    res.on('close', function () {                          //當client沒有request將刪除 contentWriter 裡的buffer
        req.Emitter.removeListener('data',contentWriter)
        console.log('Emitter close')
    })
});

app.get(['/flv','/flv/2/s.flv'], function (req, res) {
    //default to first feed
    // if(!req.params.feed){req.params.feed='1'}  //如果client端導入/flv位址的話，就將seed設定成1
                                               //如果是 /flv/:seed/s.flv 就跳過 因為本身有設定seed了
    //get emitter
    req.Emitter = initEmitter(2)  //初始化一個 Eitter 並放在 Emitters[req.params.feed]的位置(index=req.params.feed)並輸出影
    
    var contentWriter  //宣告用來裝buffer的變數
    //設定 Ｈeader 檔頭
    res.setHeader('Content-Type', 'video/x-flv');     //設定檔頭  Content-Type
    res.setHeader('Access-Control-Allow-Origin','*'); // 不知道 哈哈 反正是檔頭的一些參數
    //write first frame on stream
    res.write(initFirstChunk(2))    //寫入影像的第一個frame 到buffer
    
    //write new frames as they happen 當觸發'data'事件，就將新的frame寫入buffer
    req.Emitter.on('data_2',contentWriter=function(buffer){  //當此事件觸發，將會把93行的buffer放進contentWriter變數中
        res.write(buffer)
        console.log('Emitter trigger')
    })
  
    res.on('close', function () {                          //當client沒有request將刪除 contentWriter 裡的buffer
        req.Emitter.removeListener('data',contentWriter)
        console.log('Emitter close')
    })
});

//「FFmpeg」是一款沒有圖形使用者介面的影音轉檔工具，它是直接透過命令提示字元（終端機）來運作，
// 使用者只要下指令就可以指定輸入、輸出、格式等細節，轉檔速度非常快！如果要轉換非常龐大的影音檔案用這個準沒錯！
// 「FFmpeg」這個單詞中的「FF」指的是「Fast Forward（快速前進）」，
// 「快」就是其特色之一！使用上只要您熟悉命令提示字元就很簡單了！
console.log('啟動 FFMPEG')
// 宣吿一個變數： 要在ssh跑的指令字串： ffmpeg -i 'rtsp位址' -c:v copy -an -f flv pipe:1' 
// 指令說明：
// ffmpeg 指令名稱 , -i 輸入檔案（含副檔名）, -c:v 輸出影像編碼, copy 複製 , -an 靜音, -f flv 輸入格式為flv，pipe:1  將資料寫到 stdout 
var ffmpegString = '-i '+config.url+' -c:v copy -an -f flv pipe:1';
var ffmpegString1 = '-i '+config.url1+' -c:v copy -an -f flv pipe:1';
// 網路上找不到 ><"
if(ffmpegString.indexOf('rtsp://')>-1){   // index = 20
    ffmpegString='-rtsp_transport tcp '+ffmpegString
}
if(ffmpegString1.indexOf('rtsp://')>-1){   // index = 20
    ffmpegString1='-rtsp_transport tcp '+ffmpegString1
}
// ffmpeg -rtsp_transport tcp -i '+config.url+' -c:v copy -an -f flv pipe:1

// 用spawn() 並建立一個 node.js 的 子程序，這個子程序是用來跑 在shell 輸入上面指令後的『結果』 就是影像流～ 
var ffmpeg = spawn('ffmpeg',ffmpegString.split(' '),{stdio:['pipe','pipe','pipe']});
var ffmpeg1 = spawn('ffmpeg',ffmpegString1.split(' '),{stdio:['pipe','pipe','pipe']});
// stdio:['pipe','pipe','pipe'] => stdio[0] = stdin , [1] = stdout, [2] = stderr。

//此函數用來監控子程序是否關掉，如關掉就會執行的後面CallFunction
ffmpeg.on('close', function (buffer) {
    console.log('ffmpeg關掉囉！！')
})
ffmpeg1.on('close', function (buffer) {
    console.log('ffmpeg關掉囉！！')
})

ffmpeg.stdio[1].on('data', function (buffer) {  //如果ffmpeg物件的stdout有資料出現，將觸發'data'事件，並執行callbackfunction
    initFirstChunk(1,buffer)  //?
    initEmitter(1).emit('data_1',buffer) // 必須等到有client request到 /flv... 的路由 initEmitter(1)建立後，才會啟動'data'事件。
    console.log('ffmpeg執行，並輸出影像中... ')
});
ffmpeg1.stdio[1].on('data', function (buffer1) {  //如果ffmpeg物件的stdout有資料出現，將觸發'data'事件，並執行callbackfunction
    initFirstChunk(2,buffer1)  //?
    initEmitter(2).emit('data_2',buffer1) // 必須等到有client request到 /flv... 的路由 initEmitter(1)建立後，才會啟動'data'事件。
    console.log('ffmpeg1執行，並輸出影像中... ')
});


//步驟：
// ffmpeg data事件啟動：影像寫入暫存
// Client Request:  Emitter建立 
// 觸發 Emitter的 data 事件


