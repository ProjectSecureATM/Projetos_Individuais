var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL aaaa: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha, idUsuario) {
    console.log("Executando a função de cadastro de usuário...");

    // Inicie a instrução de obtenção da fkEmpUsuario do usuário
    const instrucaoFkEmpUsuario = `SELECT fkEmpUsuario FROM usuario WHERE idUsuario = ${idUsuario}`;

    console.log("Executando a instrução SQL de obtenção de fkEmpUsuario: \n" + instrucaoFkEmpUsuario);

    // Execute a instrução para obter o fkEmpUsuario do usuário
    return database.executar(instrucaoFkEmpUsuario)
        .then((resultados) => {
            // Obtenha o valor de fkEmpUsuario
            const fkEmpUsuario = resultados[0].fkEmpUsuario;

            // Verifique se fkEmpUsuario não é null
            if (fkEmpUsuario === null) {
                throw new Error("Valor de fkEmpUsuario é NULL. Não é possível cadastrar o usuário.");
            }

            // Agora, inicie a instrução de obtenção da fkAgencia do usuário
            const instrucaoFkAgencia = `SELECT fkAgencia FROM usuario WHERE idUsuario = ${idUsuario}`;

            console.log("Executando a instrução SQL de obtenção de fkAgencia: \n" + instrucaoFkAgencia);

            // Execute a instrução para obter o fkAgencia do usuário
            return database.executar(instrucaoFkAgencia)
                .then((resultados) => {
                    // Obtenha o valor de fkAgencia
                    const fkAgencia = resultados[0].fkAgencia;

                    // Verifique se fkAgencia não é null
                    if (fkAgencia === null) {
                        throw new Error("Valor de fkAgencia é NULL. Não é possível cadastrar o usuário.");
                    }

                    // Agora, inicie a instrução de inserção do usuário com fkEmpUsuario e fkAgencia obtidos
                    const instrucao = `
                        INSERT INTO usuario (email, senha, nome, fkAgencia, fkEmpUsuario) 
                        VALUES ('${email}', '${senha}', '${nome}', '${fkAgencia}', '${fkEmpUsuario}');
                    `;

                    console.log("Executando a instrução SQL de cadastro de usuário: \n" + instrucao);

                    // Execute a instrução de inserção do usuário
                    return database.executar(instrucao);
                });
        });
}


function cadastrarATM(modelo, fabricante, fkAgenciaID, fkAgenciaEmp, qtdRAM, qtdDiscos) {

    // Inicie a instrução de inserção da ATM
    const instrucaoATM = `INSERT INTO ATM (Modelo, Fabricante, AgenciaID, fkAgenciaEmp) VALUES ('${modelo}', '${fabricante}', ${fkAgenciaID}, ${fkAgenciaEmp})`;


    // Inicie a instrução de inserção dos componentes

    const instrucaoComponenteRAM = `INSERT INTO Componentes (quantidade, CodigoComponenteID, ATMID, TipoID) VALUES ('${qtdRAM}', 1, ${fkAgenciaID}, 2)`;
    const instrucaoComponenteDisco = `INSERT INTO Componentes (quantidade, CodigoComponenteID, ATMID, TipoID) VALUES ('${qtdDiscos}', 2, ${fkAgenciaID}, 1)`;
    const instrucaoComponenteCPU = `INSERT INTO Componentes (quantidade, CodigoComponenteID, ATMID, TipoID) VALUES (1, 3, ${fkAgenciaID}, 1)`;

    console.log("Executando a instrução SQL de ATM: \n" + instrucaoATM);
    console.log("Instrução Componente RAM:", instrucaoComponenteRAM);
    console.log("Instrução Componente Disco:", instrucaoComponenteDisco);
    console.log("Instrução Componente CPU:", instrucaoComponenteCPU);

    // Execute a instrução de inserção da ATM
    return database.executar(instrucaoATM)
        .then(() => {
            console.log("ATM cadastrada com sucesso. Executando instruções SQL de Componentes: \n", instrucaoComponenteRAM, instrucaoComponenteDisco, instrucaoComponenteCPU);

            // Execute as instruções de inserção dos componentes
            return database.executar(instrucaoComponenteRAM)
                .then(() => database.executar(instrucaoComponenteDisco))
                .then(() => database.executar(instrucaoComponenteCPU));
        });
}


function obterFkEmpresa(consulta) {
    return database.executar(consulta);
}

function cadastrarAgencia(NAgencia, CEP, numero, idUsuario) {
    // Inicie a instrução de obtenção do fkEmpresa do usuário
    const instrucaoFkEmpresa = `SELECT fkEmpUsuario FROM usuario WHERE idUsuario = ${idUsuario}`;

    console.log("Executando a instrução SQL de obtenção de fkEmpresa: \n" + instrucaoFkEmpresa);

    // Execute a instrução para obter o fkEmpresa do usuário
    return database.executar(instrucaoFkEmpresa)
        .then((resultados) => {
            // Obtenha o valor de fkEmpUsuario
            const fkEmpUsuario = resultados[0].fkEmpUsuario;

            // Verifique se fkEmpUsuario não é null
            if (fkEmpUsuario === null) {
                throw new Error("Valor de fkEmpUsuario é NULL. Não é possível cadastrar a agência.");
            }

            // Agora, inicie a instrução de inserção da agência com o fkEmpUsuario obtido
            const instrucaoAgencia = `INSERT INTO agencia (nAgencia, fkEmpresa) VALUES ('${NAgencia}', '${fkEmpUsuario}')`;

            // Inicie a instrução de inserção da localização, usando o mesmo valor de idAgen da inserção anterior
            const instrucaoLocalizacao = `
                INSERT INTO localizacao (cep, numero, fkAgenciaLoc)
                SELECT '${CEP}', '${numero}', idAgen FROM agencia WHERE nAgencia = '${NAgencia}' AND fkEmpresa = '${fkEmpUsuario}'
            `;

            console.log("Executando a instrução SQL de agência: \n" + instrucaoAgencia);

            // Execute a instrução de inserção da agência
            return database.executar(instrucaoAgencia)
                .then(() => {
                    console.log("Agência cadastrada com sucesso. Executando instrução SQL de localização: \n" + instrucaoLocalizacao);

                    // Execute a instrução de inserção da localização
                    return database.executar(instrucaoLocalizacao);
                });
        });
}



function relatarProblema(nome, sobrenome, email, titulo, detalhe, dataHoraProblema) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobrenome, email, titulo, detalhe, dataHoraProblema);

    var instrucao = `
        INSERT INTO relatarProblema (nome, sobrenome, email, tituloProblema, descricao, dataHoraProblema) VALUES ('${nome}', '${sobrenome}', '${email}', '${titulo}', '${detalhe}', CURRENT_TIMESTAMP());
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarATM,
    obterFkEmpresa,
    cadastrarAgencia,
    relatarProblema
};