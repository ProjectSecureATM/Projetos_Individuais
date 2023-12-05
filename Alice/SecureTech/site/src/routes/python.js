var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/pythonController");

router.get("/ultDados", function (req, res) {
    pythonController.ultDados(req, res);
});


router.get("/realTime/", function (req, res) {
    pythonController.relTime(req, res);
})

module.exports = router;