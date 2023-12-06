var database = require("../database/config")
const util = require('util');

function confirmacaoSeguranca(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
            SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}' AND fkNivelAcesso = 2;
        `;
    console.log("Executando a instrução SQL aaaa: \n" + instrucao);
    return database.executar(instrucao);
}

function graficoPacotes(fkAgencia_usuario) {
    var instrucaoSql = `
    SELECT SUM(pacotesEnviados) AS total_pacotes, FORMAT(MAX(data_hora), 'yyyy-MM-dd HH:mm:ss') AS hora, fk__ATMAgencia
    FROM rede
    WHERE fk__ATMAgencia = ${fkAgencia_usuario}
    GROUP BY fk__ATMAgencia, FORMAT(data_hora, 'yyyy-MM-dd HH:00:00')
    ORDER BY FORMAT(MAX(data_hora), 'yyyy-MM-dd HH:00:00') 
    OFFSET 0 ROWS FETCH FIRST 3 ROWS ONLY;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
        .then(resultados => {
            // Formatando dados para Chart.js
            const labels = resultados.map(item => item.data_hora);
            const data = resultados.map(item => item.total_pacotes);

            return { labels, data };
        });
}


async function atualizarGraficoPacotes(fkAgencia_usuario) {
    try {
        // Definindo valores padrão
        var instrucaoSql = `
        SELECT SUM(pacotesEnviados) AS total_pacotes, FORMAT(MAX(data_hora), 'yyyy-MM-dd HH:mm:ss') AS hora, fk__ATMAgencia
            FROM rede
            WHERE fk__ATMAgencia = ${fkAgencia_usuario}
            GROUP BY fk__ATMAgencia, FORMAT(data_hora, 'yyyy-MM-dd HH:00:00')
            ORDER BY FORMAT(MAX(data_hora), 'yyyy-MM-dd HH:00:00') 
            OFFSET 0 ROWS FETCH FIRST 1 ROWS ONLY`;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        const resultados = await database.executar(instrucaoSql);

        // Formatando dados para Chart.js
        const labels = resultados.map(item => item.data_hora);
        const data = resultados.map(item => item.total_pacotes);

        return { labels, data };
    } catch (error) {
        console.error(`Erro ao executar instrução SQL: ${error.message}`);
        throw error; // Rejogue o erro para tratamento adequado no controlador
    }
}



function listarIPePacotes() {

    var instrucao = `
    select IP, FORMAT(data_hora, 'yyyy-MM-dd 00:00:00') as hora, pacotesEnviados from rede;
    `;

    console.log("Executando a sua tia");
    return database.executar(instrucao);

}




module.exports = {
    confirmacaoSeguranca,
    graficoPacotes,
    atualizarGraficoPacotes,
    listarIPePacotes
};