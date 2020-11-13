const datalookup = require('../models/data_lookup_model');

module.exports = class MachineData{
    lookupdata(req, res){
        let id = req.params.item
        // console.log('id:', id)
        // console.log('req.params:',req.params)
        // console.log('req.query: ',req.query)
        datalookup(id).then(results=>{
            res.json(results)
        }).catch((err) => {
            console.log('錯誤:', err);
        });
    }
}