var pythonModel = require("../models/pythonModel");
function ultDados(req, res) {


    console.log(`Recuperando os ultimos dados`);


    pythonModel.ultDados().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimao favoritos.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function realTime(req, res) {

    
    console.log(`Recuperando medidas em tempo real`);

    pythonModel.ultDados().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}




module.exports = {
    ultDados,
    realTime
}