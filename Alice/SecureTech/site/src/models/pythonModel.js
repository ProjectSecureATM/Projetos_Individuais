var database = require("../database/config");
function ultDados() {
    instrucaoSql01 = `
    select * from 
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function realTime() {

    instrucaoSql1 = ''

        instrucaoSql = `
        
        `;

    console.log("Executando a instrução SQL1: \n" + instrucaoSql1);
    return database.executar(instrucaoSql1);
}
module.exports = {
    ultDados,
    realTime
}