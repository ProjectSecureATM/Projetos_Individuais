var aliceModel = require('../models/aliceModel');

function logTempoReal(req,res){

    var idATM = req.params.idATM;

aliceModel.logTempoReal(idATM).them(function(resultado){
    if (resultado.length > 0){
        res.status(200).json(resultado);;
    } else {
        req.status(204).send("Nenhum resultado encontrado.")
    }
}).catch(function(erro){
    console.log(erro);
    console.log("Houve um erro ao buscar as últimas medidas", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage)
})

}

function comparacaoLogsSucessoEFalha(req,res){

    var idATM = req.params.idATM;

aliceModel.comparacaoLogsSucessoEFalha(idATM).them(function(resultado){
    if (resultado.length > 0){
        res.status(200).json(resultado);;
    } else {
        req.status(204).send("Nenhum resultado encontrado.")
    }
}).catch(function(erro){
    console.log(erro);
    console.log("Houve um erro ao buscar as últimas medidas", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage)
})

}

module.exports = {
    logTempoReal,
    comparacaoLogsSucessoEFalha
}
