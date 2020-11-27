
$(document).ready(function(){

    $('img[usemap]').rwdImageMaps();  //圖片 RWD 控制
    //https://cdnjs.com/libraries/jQuery-rwdImageMaps
    
    var xO = $('img').width()   
    var yO = $('img').height()

    $(window).resize(function(){
      window.location.reload();
    })
    /////////////////////////////顯示燈號 及 底下資訊///////////////////////////////////

    //InfoBelow(燈號標籤id, [文字標籤id], 欲綁定的機台標籤id, 資料庫table, [欲呈現的字樣], [資料庫欄位],[燈號座標],[文字坐標],文字大小)
    var timeoutID = setInterval(function(){
          // 入料暫存區
          for(let i=1;i<=9;i++)
              InfoBelow('#light'+i, ['#text'+i], '#choose'+i, 'FeedingArea',['重量'],['重量(噸)'],[-3,5],[-18,30],'12')
          
          // 粗選機
          for(let i=1;i<=6;i++)
              InfoBelow('#rm_light'+i, ['#rm_text'+i+'_1','#rm_text'+i+'_2'],'#rm'+i, 'RoughingMachine',['重量','雜質'],['重量(噸)','雜質量'],[8,5],[-5,30],'10')

           // 流量計
           for(let i=1;i<=4;i++)
              InfoBelow('#fm_light'+i, ['#fm_text'+i],'#fm'+i, 'FlowMeter', ['流量'], ['流量'], [-2,0],[-20,20],'10')
           
           // 烘乾暫存區
           for(let i=1;i<=8;i++)
              InfoBelow('#pd_light'+i, ['#pd_text'+i+'_1','#pd_text'+i+'_2'],'#pd'+i, 'PreDryingArea', ['重量','濕度'], ['重量(噸)','濕度'], [-1,0],[-20,20],'10')

           // 烘乾機
           for(let i=1;i<=14;i++)
              InfoBelow('#dry_light'+i, ['#dry_text'+i+'_1','#dry_text'+i+'_2','#dry_text'+i+'_3'],'#dry'+i, 'Dryer', ['重量','溫度','濕度'], ['重量(噸)','溫度','濕度'], [6,0],[-10,20],'10')
            
           //  粗糠桶 120T
           for(let i=1;i<=1;i++)
           InfoBelow('#ca_light'+i, ['#ca_text'+i],'#ca'+i, 'Dryer', ['重量'], ['重量(噸)'], [63,0],[40,20],'10')
          
            // 粗糠桶 others
           for(let i=2;i<=6;i++)
           InfoBelow('#ca_light'+i, ['#ca_text'+i],'#ca'+i, 'Dryer', ['重量'], ['重量(噸)'], [20,0],[5,20],'10')
          }, 500)

         
    
    //////////////////////////////滑鼠滑過顯示資料庫資訊/////////////////////////////////

    // 入料暫存區：
    for(let i=1 ; i<=9 ;i++){
    $('#choose'+i).on({
      mouseenter:function(){
        InfoScreen('FeedingArea',i)
      },
      mouseleave:function(){
        $("tbody tr").remove();
        $("#tb").css('display','none'); 
      }
      });
    }
    // 粗選機：
    for(let i=1 ; i<=6 ;i++){
      $('#rm'+i).on({
        mouseenter:function(evnt){
          InfoScreen('RoughingMachine',i)
        },
        mouseleave:function(){
          $("tbody tr").remove();
          $("#tb").css('display','none'); 
        }
        });
      }
     // 流量計
     for(let i=1 ; i<=4 ;i++){
      $('#fm'+i).on({
        mouseenter:function(event){
          InfoScreen('FlowMeter',i)
        },
        mouseleave:function(){
          $("tbody tr").remove();
          $("#tb").css('display','none'); 
        }
        });
      }

       // 烘乾暫存區
     for(let i=1 ; i<=8 ;i++){
      $('#pd'+i).on({
        mouseenter:function(){
          InfoScreen('PreDryingArea',i)
        },
        mouseleave:function(){
          $("tbody tr").remove();
          $("#tb").css('display','none'); 
        }
        });
      }

      // 烘乾機
     for(let i=1 ; i<=14 ;i++){
      $('#dry'+i).on({
        mouseenter:function(event){
          InfoScreen('Dryer',i)
        },
        mouseleave:function(){
          $("tbody tr").remove();
          $("#tb").css('display','none'); 
        }
        });
      }

      // 粗糠桶
     for(let i=1 ; i<=6 ;i++){
      $('#ca'+i).on({
        mouseenter:function(){
          InfoScreen('ChaffArea',i)
        },
        mouseleave:function(){
          $("tbody tr").remove();
          $("#tb").css('display','none'); 
        }
        });
      }

    //  獲取當前滑鼠座標 用來設定area座標用。
    $(document).mousemove((e)=>{
      //  console.log(getMousePos(e))
      // console.log(ImageRatio(e))
    });
/////////////////// 自訂功能 /////////////////////////////////////////////////////////

      //動態表格視窗(顯示資料庫資料)Function
      function InfoScreen(table, Id, ){
        var rowColor = ['primary','success','danger','warning','info','light','dark','primary','success','danger','warning','info','light','dark']
        var x = event.clientX + document.body.scrollLeft + 10 ;
        var y = event.clientY + document.body.scrollTop ;
        var Cx = event.clientX
        var Cy = event.clientY
        var Wx = $(window).width()
        var Wy = $(window).height()
        fetch('/getMachineData/'+table+'/'+Id,{
          method:'GET',
        }).then(res=>{
          return res.json()
        }).then(data=>{
          
          var data = data[0]
          // var i = 0
          var colList=[]
          for (var key in data){
            colList.push(key)
          }
         for(let i=0; i<colList.length; i++){
           $("tbody").append("<tr class='table-"+rowColor[i]+"'" + "><td>"+colList[i]+"</td><td>"+data[colList[i]]+"</td></tr>");
         }
         // 這邊在處理 解決Table被遮住的方法
         
        var tb_width = 135             // 因為table的高抓不到 所以設定個大概
        var tb_height = $('#tb').height() // 抓取動態生成後 table 的 寬

        // （視窗的寬／高 - 滑鼠位置的X/Y座標）如果小於 Table的寬/高 表示Table會被遮住！！
        if((Wx-Cx)<tb_width){
          x = x - tb_width 
        }
        if((Wy-Cy)<tb_height+10){
          y = y - tb_height
        }
        console.log('tb_height: ',tb_height)
        $("#tb").css('left',x+'px');
        $("#tb").css('top',y+10+'px'); //高度要在加個10(因為有誤差) 不然錯誤  (這裡搞狠九)
        $("#tb").css('display','block');

        }).catch((err) => {
           console.log('錯誤:', err);
        }); 
      }
     // 燈號放置位置及顏色設定 功能
     function InfoBelow(lightID, TextID, machineLabel,Table,ColumnName, column,LightCoords,TextCoords,TextSize){
      var label = $(machineLabel)
      var str = machineLabel.slice(-2,)
      var Id=''
      if(str[0] in ['1','2','3','4','5','6','7','8','9']){
            Id = str
            // console.log('Id: ',Id)
      }else{
           Id = str[1]
          //  console.log('Id: ',Id)
      }
      var coords = label.attr('coords').split(',')
      var x = parseInt(coords[0]) + 3
      var y = parseInt(coords[3]) + 30
      imgW = $('img').width()
      imgH = $('img').height()
      xR = $('img').width()/xO
      yR = $('img').height()/yO
      // 燈號尺寸
      $(lightID).css('height',18*yR)
      $(lightID).css('width',18*xR)
      $(lightID).addClass('light').css('left',(x+LightCoords[0])+'px').css('top',(y+LightCoords[1])+'px')
      // 文字尺寸及位置
      for(let i=0;i<TextID.length;i++){
        $(TextID[i]).css('height',30*yR)
        $(TextID[i]).css('width',70*xR)
        $(TextID[i]).css('color','blue')
        $(TextID[i]).css('font-size',(TextSize*xR)+'px')
        $(TextID[i]).addClass('UnderText').css('left',x+TextCoords[0]+'px').css('top',y+TextCoords[1]*(i+1)+'px')
      }   
      fetch('/getMachineData/'+Table+'/'+Id,{
          method:'GET',
        }).then(res=>{
          return res.json()
        }).then(data=>{
          // 改變燈號顏色
          if (data[0]['狀態'] == 1){
            $(lightID).css('background','lightgreen')
          }else{
            $(lightID).css('background','red')
          }
          // 顯示資料庫資料
          if(TextID.length==ColumnName.length && ColumnName.length==column.length && TextID.length==column.length){
            for(let i=0;i<TextID.length;i++){
              $(TextID[i]).text(ColumnName[i]+': '+data[0][column[i]])
              // console.log(ColumnName[j]+':'+data[0][column[j]])
            }
          }else{
           console.log('Text標籤、資料庫欄位名稱及欄位名稱 長度不一致！')
          }
      }).catch((err) => {
           console.log('錯誤:', err);
        }); 
      }

      //獲取滑鼠座標位置的Function
      function getMousePos(e){
        var y_extra = $('#login_message').height()
       //  console.log('y_extra: ',y_extra)
        var e = event || window.event;
        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var x = e.pageX || e.clientX + scrollX;
        var y = e.pageY || e.clientY + scrollY;
        return {'X: ': x,'Y: ' : y-y_extra}
      }
  });

