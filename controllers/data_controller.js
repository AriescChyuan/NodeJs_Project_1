const datalookup = require('../models/data_lookup_model');


module.exports = class MachineData{
    lookupdata(req, res){

        let table = req.params.table
        let id = req.params.id
        let isClick ;
        if(req.params.isClick){
            isClick =  req.params.isClick
        }else{
            isClick = 'others';
        }
        // console.log('id:', id)
        // console.log('req.params:',req.params)
        // console.log('req.query: ',req.query)
        datalookup(table, id).then(results=>{
            
            if(isClick == 'click'){   // 如果是 點擊機台 呈現畫面 
                res.render('machines/'+table,{dbData : results })
            }else{
                res.json(results)
            }
            
        }).catch((err) => {
            console.log('錯誤:', err);
        });
    }
}