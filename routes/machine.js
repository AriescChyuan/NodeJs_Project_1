var express = require('express');
var router = express.Router();

const MachineDataMethod = require('../controllers/data_controller.js');
machineDataMethod = new MachineDataMethod();

//// 取得機台資訊
router.get('/getMachineData/:table/:id',machineDataMethod.lookupdata);

module.exports = router;