const datalookup = require('../models/data_lookup_model');

module.exports = class MachineData{
    lookupdata(req, res){
        
        let table = req.params.table
        let id = req.params.id
        // console.log('id:', id)
        // console.log('req.params:',req.params)
        // console.log('req.query: ',req.query)
        datalookup(table, id).then(results=>{
            res.json(results)
        }).catch((err) => {
            console.log('錯誤:', err);
        });
    }
}