var express = require("express");
var router = express.Router();

var PauloController = require("../controllers/PauloController");

router.get('/buscarRamHora/:idATM', function (req, res) {
    PauloController.buscarRamHora(req, res)
});

router.get('/buscarTempoReal/:idATM',function(req, res){
    PauloController.buscarTempoReal(req,res)
});

router.get('/buscarMaximo/:idATM', function(req, res){
    PauloController.buscarMaximo(req,res)
} );

router.get('/buscarMinimo/:idATM', function(req, res){
    PauloController.buscarMinimo(req,res)
} );

module.exports = router;