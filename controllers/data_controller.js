const datalookup = require('../models/data_lookup_model');

module.exports = class MachineData{
    lookupdata(req, res){
        datalookup(req).then(results=>{
            res.json(results)
        })
    }
}