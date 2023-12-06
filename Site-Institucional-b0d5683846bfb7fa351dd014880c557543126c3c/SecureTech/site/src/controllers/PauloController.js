var PauloModel = require("../models/PauloModel");

function buscarRamHora(req, res) {

    var idATM = req.params.idATM;

    PauloModel.buscarRamHora(idATM)

        .then(dados => res.json(dados))
        .catch(error => res.status(500).json({ error: error.message }));
        
}

function buscarTempoReal(req, res) {

    var idATM = req.params.idATM;

    PauloModel.buscarTempoReal(idATM)

        .then(dados => res.json(dados))
        .catch(error => res.status(500).json({ error: error.message }));
        
}

function buscarMaximo(req, res) {

    var idATM = req.params.idATM;

    PauloModel.buscarMaximo(idATM)

        .then(dados => res.json(dados))
        .catch(error => res.status(500).json({ error: error.message }));
        
}

function buscarMinimo(req, res) {

    var idATM = req.params.idATM;

    PauloModel.buscarMinimo(idATM)

        .then(dados => res.json(dados))
        .catch(error => res.status(500).json({ error: error.message }));
        
}

module.exports={
buscarRamHora,
buscarTempoReal,
buscarMaximo,
buscarMinimo
}