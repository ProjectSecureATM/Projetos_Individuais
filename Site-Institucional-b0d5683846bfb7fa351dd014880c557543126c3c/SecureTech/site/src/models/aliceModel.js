var database = require("../database/config")

function logTempoReal (idATM){
    
    var instrucaoSql = `
    SELECT idLogs, data_hora FROM logs
        ORDER BY idLogs DESC 
            LIMIT 10;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function comparacaoLogsSucessoEFalha(idATM){
    
    var instrucaoSql = `
    SELECT Tipo, COUNT(*) AS qtdErros FROM TipoERRO GROUP BY Tipo;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    logTempoReal,
    comparacaoLogsSucessoEFalha
}