var express = require("express");
var router = express.Router();

var aliceController = require("../controllers/aliceController");

router.post("/logTempoReal/:idATM", function(req,res){
    aliceController.logTempoReal(req, res);
});

router.post("/comparacaoLogsSucessoEFalha", function(req,res){
    aliceController.comparacaoLogsSucessoEFalha(req, res);
}); 

module.exports = router;