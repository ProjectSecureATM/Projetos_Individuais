var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/cadastrarATM", function (req, res) {
    usuarioController.cadastrarATM(req, res);
});

router.post("/cadastrarAgencia", function (req, res) {
    usuarioController.cadastrarAgencia(req, res);
})

// Em algum lugar do seu arquivo de rota
router.post("/cadastrarAgencia", function (req, res) {
    // Obtenha os dados do corpo da requisição
    const { NAgencia, cep, numero, fkAgenciaLoc } = req.body;

    // Chame a função de cadastro da agência no seu controller
    usuarioController.cadastrarAgencia(req, res, NAgencia, cep, numero, fkAgenciaLoc);
});

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/relatarProblema", function (req, res) {
    usuarioController.relatarProblema(req, res);
});

router.get("/ProcessosPHora/:idATM", function (req, res) {
    usuarioController.ProcessosPHora(req, res);
});

router.get("/ProcessosPHora_tempoReal/:idATM", function (req, res) {
    usuarioController.ProcessosPHora_tempoReal(req, res);
});

router.get("/CPUHora/:idATM", function (req, res) {
    usuarioController.CPUHora(req, res);
});

router.get("/CPU_tempoReal/:idATM", function (req, res) {
    usuarioController.CPU_tempoReal(req, res);
});

router.get("/TEMPHora/:idATM", function (req, res) {
    usuarioController.TEMPHora(req, res);
});

router.get("/TEMP_tempoReal/:idATM", function (req, res) {
    usuarioController.TEMP_tempoReal(req, res);
});

router.get("/VariedadeHora/:idATM", function (req, res) {
    usuarioController.VariedadeHora(req, res);
});

router.get("/Variedade_tempoReal/:idATM", function (req, res) {
    usuarioController.Variedade_tempoReal(req, res);
});

router.post("/listarATM", function (req, res) {
    usuarioController.listarATM(req, res);
});

router.get('/obterMetricasComponentes/:idATM', function (req, res) {
    usuarioController.obterMetricasComponentes(req, res)
});

router.get('/obterMetricasRede/:idATM', function (req, res) {
    usuarioController.obterMetricasRede(req, res)
});

router.post("/listarAgencia", function (req, res) {
    usuarioController.listarAgencia(req, res);
});

router.get('/obterValoresParaGrafico', function(req, res){
    usuarioController.obterValoresParaGrafico(req, res)
})

router.get('/obterDesempenho/:idATM', function(req, res) {
    usuarioController.obterDesempenho(req, res)
})

router.get('/obterTempoAtv/:idATM', function(req, res) {
    usuarioController.obterTempoAtv(req, res)
})

router.get('/obterBotao/:idATM', function(req, res) {
    usuarioController.obterBotao(req, res)
})

router.get('/obterBotaoInsert/:idATM', function(req, res) {
    usuarioController.obterBotaoInsert(req, res)
})

router.get('/cpuTemperatura/:idATM', function(req, res) {
    usuarioController.cpuTemperatura(req, res)
})

router.get('/obterIP/:idATM', function(req, res) {
    usuarioController.obterIP(req, res)
})

router.get('/tempo-medidasRede/:idATM', function (req, res) {
    usuarioController.buscarMedidasRede(req, res);
})
router.get('/atualiza/:idATM', function (req, res) {
    usuarioController.atualiza(req, res);
})

router.get('/obterSelect/:idATM', function(req, res) {
    usuarioController.obterSelect(req, res)
})

router.get("/atualizarGraficoRede/:idATM", function (req, res) {
    usuarioController.atualizarGraficoRede(req, res);
});

router.get("/ultimasServidores/:idUsuario", function (req, res) {
    usuarioController.buscarUltimasMedidasServidores(req, res);
});
router.get("/AtualizandoServidor/:idUsuario", function (req, res) {
    usuarioController.atualizandoMedidasServidores(req, res);
})
router.get("/ultimasServidores2/:idUsuario", function (req, res) {
    usuarioController.buscarUltimasMedidasServidores2(req, res);
});
router.get("/AtualizandoServidor2/:idUsuario", function (req, res) {
    usuarioController.atualizandoMedidasServidores2(req, res);
})
router.get("/ultimasServidores3/:idUsuario", function (req, res) {
    usuarioController.buscarUltimasMedidasServidores3(req, res);
});
router.get("/AtualizandoServidor3/:idUsuario", function (req, res) {
    usuarioController.atualizandoMedidasServidores3(req, res);
});    
router.get("/ultimasServidores4/:idUsuario", function (req, res) {
    usuarioController.buscarUltimasMedidasServidores4(req, res);
});
router.get("/AtualizandoServidor4/:idUsuario", function (req, res) {
    usuarioController.atualizandoMedidasServidores4(req, res);
});  
   

module.exports = router;
