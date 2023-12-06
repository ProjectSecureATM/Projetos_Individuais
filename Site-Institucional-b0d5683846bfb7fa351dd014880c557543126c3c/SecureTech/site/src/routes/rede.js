var express = require("express");
var router = express.Router();

var redeController = require("../controllers/redeController");

router.post("/confirmacaoSeguranca", function (req, res) {
    redeController.confirmacaoSeguranca(req, res);
});

router.get("/listarIPePacotes", function (req, res) {
    redeController.listarIPePacotes(req, res);
});

router.get('/graficoPacotes/:idAgen', function (req, res) {
    redeController.graficoPacotes(req, res);
});

router.get('/atualizarGraficoPacotes/:idAgen', function (req, res) {
    redeController.atualizarGraficoPacotes(req, res);
});


module.exports = router;
