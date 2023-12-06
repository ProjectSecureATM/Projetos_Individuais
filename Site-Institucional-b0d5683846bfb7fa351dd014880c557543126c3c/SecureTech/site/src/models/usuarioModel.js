var database = require("../database/config")
const util = require('util');


if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    function autenticar(email, senha) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
        var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
        console.log("Executando a instrução SQL aaaa: \n" + instrucao);
        return database.executar(instrucao);
    }

    function autenticarATM(fkATM) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
        var instrucao = `
        SELECT * FROM Processos WHERE fkATM = '${fkATM}';
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

    function ProcessosPHora(idATM) {

        var instrucaoSql = `
    SELECT MAX(PID) AS quantidade, DATE_FORMAT(data_hora, '%Y-%m-%d %H:00:00') AS hora, fkATM 
    FROM Processos 
    WHERE fkATM = ${idATM}
    GROUP BY DATE_FORMAT(data_hora, '%Y-%m-%d %H:00:00')
    ORDER BY DATE_FORMAT(data_hora, '%Y-%m-%d %H:00:00');`;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }

    function ProcessosPHora_tempoReal(idATM) {

        var instrucaoSql = `
    SELECT MAX(PID) AS quantidade, DATE_FORMAT(data_hora, '%Y-%m-%d %H:00:00') AS hora, fkATM 
FROM Processos 
WHERE fkATM = ${idATM}
GROUP BY DATE_FORMAT(data_hora, '%Y-%m-%d %H:00:00')
ORDER BY DATE_FORMAT(data_hora, '%Y-%m-%d %H:00:00') DESC
LIMIT 1;`;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }

    function TEMPHora(idATM) {

        var instrucaoSql = `
    SELECT MAX(temperatura) AS temp_cpu, DATE_FORMAT(data_hora, '%Y-%m-%d %H:%i:%s') AS hora, fkATM 
    FROM temperaturaCPU 
    WHERE fkATM = ${idATM}
    GROUP BY DATE_FORMAT(data_hora, '%Y-%m-%d %H:%i:%s')
    ORDER BY DATE_FORMAT(data_hora, '%Y-%m-%d %H:%i:%s')
    DESC LIMIT 3;`;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }

    function TEMP_tempoReal(idATM) {

        var instrucaoSql = `
    SELECT MAX(temperatura) AS temp_cpu, DATE_FORMAT(data_hora, '%Y-%m-%d %H:%i:%s') AS hora, fkATM 
    FROM temperaturaCPU 
    WHERE fkATM = ${idATM}
    GROUP BY DATE_FORMAT(data_hora, '%Y-%m-%d %H:%i:%s')
    ORDER BY DATE_FORMAT(data_hora, '%Y-%m-%d %H:%i:%s')
    DESC LIMIT 1;`;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }

    function CPUHora(idATM) {

        var instrucaoSql = `
    SELECT MAX(Valor) AS quantidade, DATE_FORMAT(DataRegistro, '%Y-%m-%d %H:%i:%s') AS hora, ATMComp_ID 
    FROM Leitura 
    WHERE ATMComp_ID = ${idATM} AND Componente_ID = 3 
    GROUP BY DATE_FORMAT(DataRegistro, '%Y-%m-%d %H:%i:%s')
    ORDER BY DATE_FORMAT(DataRegistro, '%Y-%m-%d %H:%i:%s')
    DESC LIMIT 3;`;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }

    function CPU_tempoReal(idATM) {

        var instrucaoSql = `
    SELECT MAX(Valor) AS quantidade, DATE_FORMAT(DataRegistro, '%Y-%m-%d %H:%i:%s') AS hora, ATMComp_ID 
    FROM Leitura 
    WHERE ATMComp_ID = ${idATM} AND Componente_ID = 3 
    GROUP BY DATE_FORMAT(DataRegistro, '%Y-%m-%d %H:%i:%s')
    ORDER BY DATE_FORMAT(DataRegistro, '%Y-%m-%d %H:%i:%s') 
    DESC LIMIT 1;`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }

    function VariedadeHora(idATM) {

        var instrucaoSql1 = `
    SELECT MAX(pacotesRecebidos) AS quantidade, DATE_FORMAT(data_hora, '%Y-%m-%d %H:00:00') AS hora, fk__idATM
FROM rede 
WHERE fk__idATM = ${idATM}  
GROUP BY DATE_FORMAT(data_hora, '%Y-%m-%d %H:00:00');`;

        var instrucaoSql2 = `
SELECT MAX(pacotesEnviados) AS quantidade, DATE_FORMAT(data_hora, '%Y-%m-%d %H:00:00') AS hora, ATMComp_ID 
FROM rede 
WHERE ATMComp_ID = ${idATM}  
GROUP BY DATE_FORMAT(data_hora, '%Y-%m-%d %H:00:00');`;


        console.log("Executando a instrução SQL: \n" + instrucaoSql1, instrucaoSql2);
        return database.executar(instrucaoSql1, instrucaoSql2);
    }

    function Variedade_tempoReal(idATM) {

        var instrucaoSql1 = `
    SELECT MAX(pacotesRecebidos) AS pacotesRecebidos, DATE_FORMAT(data_hora, '%Y-%m-%d %H:00:00') AS hora, fk__idATM
FROM rede 
WHERE fk__idATM = ${idATM}  
GROUP BY DATE_FORMAT(data_hora, '%Y-%m-%d %H:00:00');`;

        var instrucaoSql2 = `
SELECT MAX(pacotesEnviados) AS pacotesEnviados, DATE_FORMAT(data_hora, '%Y-%m-%d %H:00:00') AS hora, ATMComp_ID 
FROM rede 
WHERE ATMComp_ID = ${idATM}  
GROUP BY DATE_FORMAT(data_hora, '%Y-%m-%d %H:00:00');`;
        console.log("Executando a instrução SQL: \n" + instrucaoSql1, instrucaoSql2);
        return database.executar(instrucaoSql1, instrucaoSql2);
    }

    function relatarProblema(nome, sobrenome, email, titulo, detalhe, dataHoraProblema) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobrenome, email, titulo, detalhe, dataHoraProblema);

        var instrucao = `
        INSERT INTO relatarProblema (nome, sobrenome, email, tituloProblema, descricao, dataHoraProblema) VALUES ('${nome}', '${sobrenome}', '${email}', '${titulo}', '${detalhe}', CURRENT_TIMESTAMP());
    `;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }


    function listarATM(fkAgencia_usuario) {
        console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
        var instrucao = `
    select * from atm WHERE fkAgenciaEmp = ${fkAgencia_usuario};
    `;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }

    function listarAgencia(fkAgencia_usuario) {
        console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
        var instrucao = `
    select * from Agencia WHERE fkEmpresa = ${fkAgencia_usuario};
    `;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }

    async function obterMetricasComponentes(idATM) {
        const RAMQuery = `SELECT Valor FROM Leitura WHERE ATMComp_ID = ${idATM} AND Componente_ID = 1 ORDER BY DataRegistro DESC LIMIT 1`;
        const DISCOQuery = `SELECT Valor FROM Leitura WHERE ATMComp_ID = ${idATM} AND Componente_ID = 2 ORDER BY DataRegistro DESC LIMIT 1`;
        const CPUQuery = `SELECT Valor FROM Leitura WHERE ATMComp_ID = ${idATM} AND Componente_ID = 3 ORDER BY DataRegistro DESC LIMIT 1`;

        console.log("Executando as instruções SQL:\n", RAMQuery, DISCOQuery, CPUQuery);

        try {
            const ramResult = await database.executar(RAMQuery);
            const discoResult = await database.executar(DISCOQuery);
            const cpuResult = await database.executar(CPUQuery);

            return {
                RAM: (ramResult && ramResult[0] && ramResult[0].Valor) || 'N/A',
                DISCO: (discoResult && discoResult[0] && discoResult[0].Valor) || 'N/A',
                CPU: (cpuResult && cpuResult[0] && cpuResult[0].Valor) || 'N/A',
            };
        } catch (error) {
            console.error(`Erro na obtenção dos dados do sistema: ${error.message}`);
            return {
                RAM: 'N/A',
                DISCO: 'N/A',
                CPU: 'N/A',
            };
        }
    }

    async function obterMetricasRede(idATM) {
        const PINGQuery = `SELECT ping FROM rede WHERE fk__idATM = ${idATM} order by data_hora desc limit 1`;
        const DOWNLOADQuery = `SELECT pacotesRecebidos FROM rede WHERE fk__idATM = ${idATM} order by data_hora desc limit 1`;
        const UPLOADQuery = `SELECT pacotesEnviados FROM rede WHERE fk__idATM = ${idATM} order by data_hora desc limit 1`;

        console.log("Executando as instruções SQL:\n", PINGQuery, DOWNLOADQuery, UPLOADQuery);

        try {
            const pingResult = await database.executar(PINGQuery);
            const downloadResult = await database.executar(DOWNLOADQuery);
            const uploadResult = await database.executar(UPLOADQuery);

            return {
                PING: (pingResult && pingResult[0] && pingResult[0].ping) || 'N/A',
                DOWNLOAD: (downloadResult && downloadResult[0] && downloadResult[0].pacotesRecebidos) || 'N/A',
                UPLOAD: (uploadResult && uploadResult[0] && uploadResult[0].pacotesEnviados) || 'N/A',
            };
        } catch (error) {
            console.error(`Erro na obtenção dos dados do sistema: ${error.message}`);
            return {
                PING: 'N/A',
                DOWNLOAD: 'N/A',
                UPLOAD: 'N/A',
            };
        }
    }

    async function obterDesempenho(idATM) {
        const desempenhoQuery = `
        SELECT
            Leitura.ATMComp_ID,
            ROUND(AVG(CASE WHEN codigocomponentes.idCodComponentes = 1 THEN 100 - Leitura.Valor ELSE NULL END), 2) AS MediaCPU,
            ROUND(AVG(CASE WHEN codigocomponentes.idCodComponentes = 2 THEN 100 - Leitura.Valor ELSE NULL END), 2) AS MediaRAM,
            ROUND(AVG(CASE WHEN codigocomponentes.idCodComponentes = 3 THEN 100 - Leitura.Valor ELSE NULL END), 2) AS MediaDisco,
            COALESCE(ROUND(AVG(100 - Leitura.Valor), 2), 100) AS DesempenhoGeral
        FROM
            Leitura
        JOIN
            codigocomponentes ON Leitura.Componente_ID = codigocomponentes.idCodComponentes
        WHERE
            codigocomponentes.idCodComponentes IN (1, 2, 3)
            AND 
            ATMComp_ID = ${idATM}
        GROUP BY
            Leitura.ATMComp_ID
        ORDER BY 
            Leitura.ATMComp_ID
        DESC LIMIT 1;`;

        console.log("Executando a instrução SQL: \n" + desempenhoQuery);
        try {
            const desempenhoResult = await database.executar(desempenhoQuery);
            return {
                DESEMPENHO: (desempenhoResult && desempenhoResult[0] && desempenhoResult[0].DesempenhoGeral) || 'N/A',
            };
        } catch (error) {
            console.error(`Erro na obtenção de Desempenho Geral: ${error.message}`);
            return {
                DESEMPENHO: 'N/A',
            };
        }
    }

    async function obterTempoAtv(idATM) {
        const atividadeQuery = `
    SELECT atividade
    FROM tempoAtividade 
    WHERE fk__idATM = ${idATM}
    GROUP BY atividade
    ORDER BY atividade
    DESC LIMIT 1;`;

        console.log("Executando a instrução SQL: \n" + atividadeQuery);
        try {
            const atividadeResult = await database.executar(atividadeQuery);
            return {
                TEMPO: (atividadeResult && atividadeResult[0] && atividadeResult[0].atividade) || 'N/A',
            };
        } catch (error) {
            console.error(`Erro na obtenção de Tempo de Atividade: ${error.message}`);
            return {
                TEMPO: 'N/A',
            };
        }
    }

    async function obterBotaoInsert(idATM) {
        const botaoInsertQuery = `
    INSERT INTO notificacao(idNotificacao, quantidade, data_hora, fkComp, fkATM) VALUES 
    (null, 1, CURRENT_TIMESTAMP(), 1, ${idATM});`;

        console.log("Executando a instrução SQL: \n" + botaoInsertQuery);

        return database.executar(botaoInsertQuery);
    }

    async function obterBotao(idATM) {
        const botaoQuery = `
    UPDATE notificacao
    SET quantidade = quantidade + 1,
    data_hora = current_timestamp()
    WHERE fkATM = ${idATM};`;

        console.log("Executando a instrução SQL: \n" + botaoQuery);
        try {
            const botaoResult = await database.executar(botaoQuery);
            return {
                BOTAO: (botaoResult && botaoResult[0] && botaoResult[0].quantidade) || 'N/A',
            };
        } catch (error) {
            console.error(`Erro na obtenção de Tempo de Atividade: ${error.message}`);
            return {
                BOTAO: 'N/A',
            };
        }
    }

    async function cpuTemperatura(idATM) {
        const cpuTempQuery = `
    SELECT MAX(temperatura) AS temp_cpu, DATE_FORMAT(data_hora, '%Y-%m-%d %H:%i:%s') AS hora, fkATM 
    FROM temperaturaCPU 
    WHERE fkATM = ${idATM}
    GROUP BY DATE_FORMAT(data_hora, '%Y-%m-%d %H:%i:%s')
    ORDER BY DATE_FORMAT(data_hora, '%Y-%m-%d %H:%i:%s')
    DESC LIMIT 1;
    `;

        console.log("Executando a instrução SQL: \n" + cpuTempQuery);
        try {
            const cpuTempResult = await database.executar(cpuTempQuery);
            return {
                CPUTEMP: (cpuTempResult && cpuTempResult[0] && cpuTempResult[0].temp_cpu) || 'N/A',
            };
        } catch (error) {
            console.error(`Erro na obtenção de Tempo de Atividade: ${error.message}`);
            return {
                CPUTEMP: 'N/A',
            };
        }
    }

    async function obterIP(idATM) {
        const IPQuery = `
    SELECT MAX(IP) as iprede FROM rede WHERE fk__idATM = ${idATM}
    GROUP BY DATE_FORMAT(data_hora, '%Y-%m-%d %H:00:00')
    ORDER BY DATE_FORMAT(data_hora, '%Y-%m-%d %H:00:00') DESC LIMIT 1;
    `;

        console.log("Executando a instrução SQL: \n" + IPQuery);
        try {
            const IPResult = await database.executar(IPQuery);
            return {
                IP: (IPResult && IPResult[0] && IPResult[0].iprede) || 'N/A',
            };
        } catch (error) {
            console.error(`Erro na obtenção de Tempo de Atividade: ${error.message}`);
            return {
                IP: 'N/A',
            };
        }
    }

    function buscarMedidasRede(idATM, limite_linhas) {
        instrucaoSql = ''

        if (process.env.AMBIENTE_PROCESSO == 'producao') {
            //NUVEM
            instrucaoSql = `
      
      `
        } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
            instrucaoSql = `
            select date_format(data_hora, '%h:%m:%s') as dataHora, pacotesEnviados, pacotesRecebidos from rede where fk__idATM=${idATM}  limit ${limite_linhas};
      `
        } else {
            console.log(
                '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
            )
            return
        }

        console.log('Executando a instrução SQL: \n' + instrucaoSql)
        return database.executar(instrucaoSql)
    }

    function atualizarGraficoRede(idATM, limite_linhas) {
        instrucaoSql = ''

        if (process.env.AMBIENTE_PROCESSO == 'producao') {
            //NUVEM
            instrucaoSql = `
      
      `
        } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
            instrucaoSql = `
      select date_format(data_hora, '%d-%m-%Y') as dataHora, pacotesEnviados, pacotesRecebidos from rede where fk__idATM=${idATM}  limit ${limite_linhas};
      `
        } else {
            console.log(
                '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
            )
            return
        }

        console.log('Executando a instrução SQL: \n' + instrucaoSql)
        return database.executar(instrucaoSql)
    }

    function atualiza(idATM, limite_linhas) {
        instrucaoSql = ''

        if (process.env.AMBIENTE_PROCESSO == 'producao') {
            //NUVEM
            instrucaoSql = `
      SELECT TOP ${limite_linhas} download, upload, FORMAT(dataHora, 'HH:mm') AS Horário
      FROM monitoramentoRede
      WHERE fkMaquina = ${idATM}
      ORDER BY idMonitoramentoRede DESC;
      `
        } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
            instrucaoSql = `
      select date_format(data_hora, '%d-%m-%Y'), pacotesEnviados, pacotesRecebidos from rede where fk__idATM=${idATM}  limit ${limite_linhas};
      `
        } else {
            console.log(
                '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
            )
            return
        }

        console.log('Executando a instrução SQL: \n' + instrucaoSql)
        return database.executar(instrucaoSql)
    }

    async function obterSelect(idATM) {
        const selectQuery = `
    SELECT count(*) as quantidade FROM notificacao WHERE fkATM = ${idATM};`;

        console.log("Executando a instrução SQL: \n" + selectQuery);
        try {
            const selectResult = await database.executar(selectQuery);
            return {
                SELECT: (selectResult && selectResult[0] && selectResult[0].quantidade) || 'N/A',
            };
        } catch (error) {
            console.error(`Erro na obtenção de Tempo de Atividade: ${error.message}`);
            return {
                SELECT: 'N/A',
            };
        }
    }

    function buscarUltimasMedidasServidores(idUsuario) {

        instrucaoSql = ''

        if (process.env.AMBIENTE_PROCESSO == "producao") {
            instrucaoSql =
                `SELECT Valor as valor, DataRegistro as data
        FROM Leitura
        WHERE Componente_ID = 3;`

                ;
        } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
            instrucaoSql =
                `SELECT Valor as valor, DataRegistro as data
        FROM Leitura
        WHERE Componente_ID = 3;`

                ;
        } else {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            return
        }

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }

    function atualizandoMedidasServidores(idUsuario) {

        instrucaoSql2 = ''

        if (process.env.AMBIENTE_PROCESSO == "producao") {
            instrucaoSql2 =
                `SELECT Valor as valor, DataRegistro as data
        FROM Leitura
        WHERE Componente_ID = 3;`

        } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
            instrucaoSql2 =
                `SELECT Valor as valor, DataRegistro as data
        FROM Leitura
        WHERE Componente_ID = 3;`
        } else {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            return
        }

        console.log("Executando a instrução SQL: \n" + instrucaoSql2);
        return database.executar(instrucaoSql2);
    }



    function buscarUltimasMedidasServidores2(idUsuario) {

        instrucaoSql = ''

        if (process.env.AMBIENTE_PROCESSO == "producao") {
            instrucaoSql =
                `SELECT Valor as valorRam, DataRegistro dataRam
        FROM Leitura
        WHERE Componente_ID = 1;`

                ;
        } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
            instrucaoSql =
                `SELECT Valor as valorRam, DataRegistro dataRam
        FROM Leitura
        WHERE Componente_ID = 1;`

                ;
        } else {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            return
        }

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }

    function atualizandoMedidasServidores2(idUsuario) {

        instrucaoSql2 = ''

        if (process.env.AMBIENTE_PROCESSO == "producao") {
            instrucaoSql2 =
                `SELECT Valor as valorRam, DataRegistro dataRam
        FROM Leitura
        WHERE Componente_ID = 1;`

        } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
            instrucaoSql2 =
                `SELECT Valor as valorRam, DataRegistro dataRam
        FROM Leitura
        WHERE Componente_ID = 1;`
        } else {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            return
        }

        console.log("Executando a instrução SQL: \n" + instrucaoSql2);
        return database.executar(instrucaoSql2);
    }




    function buscarUltimasMedidasServidores3(idUsuario) {

        instrucaoSql = ''

        if (process.env.AMBIENTE_PROCESSO == "producao") {
            instrucaoSql =
                `SELECT COUNT(DISTINCT produto, fabricante) AS Quantidade_Dispositivos_Unicos
        FROM DescricaoComponentes;`

                ;
        } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
            instrucaoSql =
                `SELECT COUNT(DISTINCT produto, fabricante) AS Quantidade_Dispositivos_Unicos
        FROM DescricaoComponentes;`

                ;
        } else {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            return
        }

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }

    function atualizandoMedidasServidores3(idUsuario) {

        instrucaoSql2 = ''

        if (process.env.AMBIENTE_PROCESSO == "producao") {
            instrucaoSql2 =
                `SELECT COUNT(DISTINCT produto, fabricante) AS Quantidade_Dispositivos_Unicos
        FROM DescricaoComponentes;`

        } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
            instrucaoSql2 =
                `SELECT COUNT(DISTINCT produto, fabricante) AS Quantidade_Dispositivos_Unicos
        FROM DescricaoComponentes;`
        } else {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            return
        }

        console.log("Executando a instrução SQL: \n" + instrucaoSql2);
        return database.executar(instrucaoSql2);
    }



    function buscarUltimasMedidasServidores4(idUsuario) {

        instrucaoSql = ''

        if (process.env.AMBIENTE_PROCESSO == "producao") {
            instrucaoSql =
                `SELECT produto as produto, fabricante as fabricante, dataDia as dataLista
        FROM DescricaoComponentes
        GROUP BY produto, fabricante, dataDia
        HAVING COUNT(*) > 1;`

                ;
        } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
            instrucaoSql =
                `SELECT produto as produto, fabricante as fabricante, dataDia as dataLista
        FROM DescricaoComponentes
        GROUP BY produto, fabricante, dataDia
        HAVING COUNT(*) > 1;`

                ;
        } else {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            return
        }

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }

    function atualizandoMedidasServidores4(idUsuario) {

        instrucaoSql2 = ''

        if (process.env.AMBIENTE_PROCESSO == "producao") {
            instrucaoSql2 =
                `SELECT produto as produto, fabricante as fabricante, dataDia as dataLista
        FROM DescricaoComponentes
        GROUP BY produto, fabricante, dataDia
        HAVING COUNT(*) > 1;`

        } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
            instrucaoSql2 =
                `SELECT produto as produto, fabricante as fabricante, dataDia as dataLista
        FROM DescricaoComponentes
        GROUP BY produto, fabricante, dataDia
        HAVING COUNT(*) > 1;`
        } else {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            return
        }

        console.log("Executando a instrução SQL: \n" + instrucaoSql2);
        return database.executar(instrucaoSql2);
    }

    module.exports = {
        autenticar,
        cadastrar,
        cadastrarATM,
        obterFkEmpresa,
        cadastrarAgencia,
        relatarProblema,
        ProcessosPHora,
        ProcessosPHora_tempoReal,
        TEMPHora,
        TEMP_tempoReal,
        CPUHora,
        CPU_tempoReal,
        VariedadeHora,
        Variedade_tempoReal,
        listarATM,
        listarAgencia,
        obterMetricasComponentes,
        obterMetricasRede,
        obterDesempenho,
        obterTempoAtv,
        obterBotaoInsert,
        obterBotao,
        cpuTemperatura,
        obterIP,
        buscarMedidasRede,
        atualiza,
        atualizarGraficoRede,
        obterSelect,
        buscarUltimasMedidasServidores,
        atualizandoMedidasServidores,
        buscarUltimasMedidasServidores2,
        atualizandoMedidasServidores2,
        buscarUltimasMedidasServidores3,
        atualizandoMedidasServidores3,
        buscarUltimasMedidasServidores4,
        atualizandoMedidasServidores4
    };
} else if (process.env.AMBIENTE_PROCESSO == "producao") {
    function autenticar(email, senha) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
        var instrucao = `
            SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
        `;
        console.log("Executando a instrução SQL aaaa: \n" + instrucao);
        return database.executar(instrucao);
    }

    function autenticarATM(fkATM) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
        var instrucao = `
            SELECT * FROM Processos WHERE fkATM = '${fkATM}';
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

    async function ProcessosPHora(idATM) {
        const instrucaoSql = `
        select COUNT(id) AS quantidade, FORMAT(data_hora, 'yyyy-MM-dd HH:mm:ss') AS hora
from processos
where fkATM = ${idATM}
group by fkATM, FORMAT(data_hora, 'yyyy-MM-dd HH:mm:ss')
order by FORMAT(data_hora, 'yyyy-MM-dd HH:mm:ss') DESC 
        OFFSET 0 ROWS FETCH FIRST 3 ROWS ONLY;
        `;
        console.log("Executando a instrução SQL:\n", instrucaoSql);
        return database.executar(instrucaoSql);
    }

    async function ProcessosPHora_tempoReal(idATM) {
        const instrucaoSql = `
        select COUNT(id) AS quantidade, FORMAT(data_hora, 'yyyy-MM-dd HH:mm:ss') AS hora
from processos
where fkATM = ${idATM}
group by fkATM, FORMAT(data_hora, 'yyyy-MM-dd HH:mm:ss')
order by FORMAT(data_hora, 'yyyy-MM-dd HH:mm:ss') DESC
        OFFSET 0 ROWS FETCH FIRST 1 ROWS ONLY;
        `;
        console.log("Executando a instrução SQL:\n", instrucaoSql);
        return database.executar(instrucaoSql);
    }

    async function TEMPHora(idATM) {
        const instrucaoSql = `
        SELECT MAX(temperatura) AS temp_cpu, FORMAT(MAX(data_hora), 'yyyy-MM-dd HH:mm:ss') AS hora, fkATM
        FROM temperaturaCPU
        WHERE fkATM = ${idATM}
        GROUP BY fkATM, FORMAT(data_hora, 'yyyy-MM-dd 00:00:ss')
        ORDER BY FORMAT(MAX(data_hora), 'yyyy-MM-dd 00:00:ss') DESC
        OFFSET 0 ROWS FETCH FIRST 3 ROWS ONLY;
        `;
        console.log("Executando a instrução SQL:\n", instrucaoSql);
        return database.executar(instrucaoSql);
    }

    async function TEMP_tempoReal(idATM) {
        const instrucaoSql = `
        SELECT temperatura AS temp_cpu, FORMAT(data_hora, 'yyyy-MM-dd HH:mm:ss') AS hora, fkATM
        FROM (
            SELECT temperatura, data_hora, fkATM,
                   ROW_NUMBER() OVER (PARTITION BY fkATM ORDER BY data_hora DESC) AS rn
            FROM temperaturaCPU
            WHERE fkATM = ${idATM}
        ) AS subquery
        WHERE rn = 1;`
        console.log("Executando a instrução SQL:\n", instrucaoSql);
        return database.executar(instrucaoSql);
    }

    async function CPUHora(idATM) {
        const instrucaoSql = `
        SELECT MAX(Valor) AS quantidade, FORMAT (MAX(DataRegistro), 'yyyy-MM-dd HH:mm:ss') AS hora, ATMComp_ID
        FROM Leitura
        WHERE ATMComp_ID = ${idATM} AND Componente_ID = 3
        GROUP BY ATMComp_ID, FORMAT (DataRegistro, 'yyyy-MM-dd HH:mm:ss')
        ORDER BY FORMAT(MAX(DataRegistro), 'yyyy-MM-dd HH:mm:ss') DESC
        OFFSET 0 ROWS FETCH FIRST 3 ROW ONLY;
        `;
        console.log("Executando a instrução SQL:\n", instrucaoSql);
        return database.executar(instrucaoSql);
    }

    async function CPU_tempoReal(idATM) {
        const instrucaoSql = `
        SELECT MAX(Valor) AS quantidade, FORMAT (MAX(DataRegistro), 'yyyy-MM-dd HH:mm:ss') AS hora, ATMComp_ID
        FROM Leitura
        WHERE ATMComp_ID = ${idATM} AND Componente_ID = 3
        GROUP BY ATMComp_ID, FORMAT (DataRegistro, 'yyyy-MM-dd HH:mm:ss')
        ORDER BY FORMAT(MAX(DataRegistro), 'yyyy-MM-dd HH:mm:ss') DESC
        OFFSET 0 ROWS FETCH FIRST 1 ROW ONLY;
        `;
        console.log("Executando a instrução SQL:\n", instrucaoSql);
        return database.executar(instrucaoSql);
    }

    async function VariedadeHora(idATM) {
        const instrucaoSql1 = `
            SELECT MAX(pacotesRecebidos) AS quantidade, FORMAT(data_hora, 'yyyy-MM-dd HH:00:00') AS hora, fk__idATM
            FROM rede
            WHERE fk__idATM = ${idATM}
            GROUP BY FORMAT(data_hora, 'yyyy-MM-dd HH:00:00');
        `;

        const instrucaoSql2 = `
            SELECT MAX(pacotesEnviados) AS quantidade, FORMAT(data_hora, 'yyyy-MM-dd HH:00:00') AS hora, ATMComp_ID
            FROM rede
            WHERE ATMComp_ID = ${idATM}
            GROUP BY FORMAT(data_hora, 'yyyy-MM-dd HH:00:00');
        `;

        console.log("Executando a instrução SQL:\n", instrucaoSql1, instrucaoSql2);
        return database.executar(instrucaoSql1, instrucaoSql2);
    }

    async function Variedade_tempoReal(idATM) {
        const instrucaoSql1 = `
            SELECT MAX(pacotesRecebidos) AS pacotesRecebidos, FORMAT(data_hora, 'yyyy-MM-dd HH:00:00') AS hora, fk__idATM
            FROM rede
            WHERE fk__idATM = ${idATM}
            GROUP BY FORMAT(data_hora, 'yyyy-MM-dd HH:00:00');
        `;

        const instrucaoSql2 = `
            SELECT MAX(pacotesEnviados) AS pacotesEnviados, FORMAT(data_hora, 'yyyy-MM-dd HH:00:00') AS hora, ATMComp_ID
            FROM rede
            WHERE ATMComp_ID = ${idATM}
            GROUP BY FORMAT(data_hora, 'yyyy-MM-dd HH:00:00');
        `;

        console.log("Executando a instrução SQL:\n", instrucaoSql1, instrucaoSql2);
        return database.executar(instrucaoSql1, instrucaoSql2);
    }

    async function relatarProblema(nome, sobrenome, email, titulo, detalhe) {
        console.log("Executando a função relatarProblema:\n", nome, sobrenome, email, titulo, detalhe);

        const instrucao = `
            INSERT INTO relatarProblema (nome, sobrenome, email, tituloProblema, descricao, dataHoraProblema)
            VALUES ('${nome}', '${sobrenome}', '${email}', '${titulo}', '${detalhe}', GETDATE());
        `;

        console.log("Executando a instrução SQL:\n", instrucao);
        return database.executar(instrucao);
    }

    async function listarATM(fkAgencia_usuario) {
        console.log("Executando a função listarATM");

        const instrucao = `
            SELECT * FROM atm WHERE fkAgenciaEmp = ${fkAgencia_usuario};
        `;

        console.log("Executando a instrução SQL:\n", instrucao);
        return database.executar(instrucao);
    }

    async function listarAgencia(fkAgencia_usuario) {
        console.log("Executando a função listarAgencia");

        const instrucao = `
            SELECT * FROM Agencia WHERE fkEmpresa = ${fkAgencia_usuario};
        `;

        console.log("Executando a instrução SQL:\n", instrucao);
        return database.executar(instrucao);
    }

    async function obterMetricasComponentes(idATM) {
        console.log("Executando a função obterMetricasComponentes");

        const RAMQuery = `SELECT Valor FROM Leitura WHERE ATMComp_ID = ${idATM} AND Componente_ID = 1 ORDER BY DataRegistro DESC OFFSET 0 ROWS FETCH FIRST 1 ROW ONLY`;
        const DISCOQuery = `SELECT Valor FROM Leitura WHERE ATMComp_ID = ${idATM} AND Componente_ID = 2 ORDER BY DataRegistro DESC OFFSET 0 ROWS FETCH FIRST 1 ROW ONLY`;
        const CPUQuery = `SELECT Valor FROM Leitura WHERE ATMComp_ID = ${idATM} AND Componente_ID = 3 ORDER BY DataRegistro DESC OFFSET 0 ROWS FETCH FIRST 1 ROW ONLY`;

        console.log("Executando as instruções SQL:\n", RAMQuery, DISCOQuery, CPUQuery);

        try {
            const ramResult = await database.executar(RAMQuery);
            const discoResult = await database.executar(DISCOQuery);
            const cpuResult = await database.executar(CPUQuery);

            return {
                RAM: (ramResult && ramResult[0] && ramResult[0].Valor) || 'N/A',
                DISCO: (discoResult && discoResult[0] && discoResult[0].Valor) || 'N/A',
                CPU: (cpuResult && cpuResult[0] && cpuResult[0].Valor) || 'N/A',
            };
        } catch (error) {
            console.error(`Erro na obtenção dos dados do sistema: ${error.message}`);
            return {
                RAM: 'N/A',
                DISCO: 'N/A',
                CPU: 'N/A',
            };
        }
    }



    async function obterMetricasRede(idATM) {
        const PINGQuery = `SELECT TOP 1 ping FROM rede WHERE fk__idATM = ${idATM} ORDER BY data_hora DESC;`;
        const DOWNLOADQuery = `SELECT TOP 1 pacotesRecebidos FROM rede WHERE fk__idATM = ${idATM} ORDER BY data_hora DESC;`;
        const UPLOADQuery = `SELECT TOP 1 pacotesEnviados FROM rede WHERE fk__idATM = ${idATM} ORDER BY data_hora DESC;`;

        console.log("Executando as instruções SQL:\n", PINGQuery, DOWNLOADQuery, UPLOADQuery);

        try {
            const pingResult = await database.executar(PINGQuery);
            const downloadResult = await database.executar(DOWNLOADQuery);
            const uploadResult = await database.executar(UPLOADQuery);

            return {
                PING: (pingResult && pingResult.recordset[0] && pingResult.recordset[0].ping) || 'N/A',
                DOWNLOAD: (downloadResult && downloadResult.recordset[0] && downloadResult.recordset[0].pacotesRecebidos) || 'N/A',
                UPLOAD: (uploadResult && uploadResult.recordset[0] && uploadResult.recordset[0].pacotesEnviados) || 'N/A',
            };
        } catch (error) {
            console.error(`Erro na obtenção dos dados do sistema: ${error.message}`);
            return {
                PING: 'N/A',
                DOWNLOAD: 'N/A',
                UPLOAD: 'N/A',
            };
        }
    }

    function obterDesempenho(idATM) {
        var desempenhoQuery = `
        SELECT TOP 1
    Leitura.ATMComp_ID,
    ROUND(AVG(CASE WHEN codigocomponentes.idCodComponentes = 1 THEN 100 - Leitura.Valor ELSE NULL END), 2) AS MediaCPU,
    ROUND(AVG(CASE WHEN codigocomponentes.idCodComponentes = 2 THEN 100 - Leitura.Valor ELSE NULL END), 2) AS MediaRAM,
    ROUND(AVG(CASE WHEN codigocomponentes.idCodComponentes = 3 THEN 100 - Leitura.Valor ELSE NULL END), 2) AS MediaDisco,
    COALESCE(ROUND(AVG(100 - Leitura.Valor), 2), 100) AS DesempenhoGeral
FROM
    Leitura
JOIN
    codigocomponentes ON Leitura.Componente_ID = codigocomponentes.idCodComponentes
WHERE
    codigocomponentes.idCodComponentes IN (1, 2, 3)
    AND 
    ATMComp_ID = ${idATM}
GROUP BY
    Leitura.ATMComp_ID
ORDER BY 
    Leitura.ATMComp_ID DESC;`;

        console.log("Executando a instrução SQL: \n" + desempenhoQuery)
        return database.executar(desempenhoQuery);
    }

    function obterTempoAtv(idATM) {
    var atividadeQuery = `
    SELECT atividade
    FROM (
        SELECT atividade,
               ROW_NUMBER() OVER (PARTITION BY fk__idATM ORDER BY atividade DESC) AS rn
        FROM tempoAtividade
        WHERE fk__idATM = ${idATM}
    ) AS subquery
    WHERE rn = 1;`

        console.log("Executando a instrução SQL: \n" + atividadeQuery);
        
        return database.executar(atividadeQuery)
    }

    async function obterBotaoInsert(idATM) {
        const botaoInsertQuery = `
        INSERT INTO notificacao(quantidade, data_hora, fkComp, fkATM) 
        VALUES (1, GETDATE(), 1, ${idATM});`;

        console.log("Executando a instrução SQL: \n" + botaoInsertQuery);

        return database.executar(botaoInsertQuery);
    }

    async function obterBotao(idATM) {
        `
        UPDATE notificacao
set quantidade = quantidade +1,
data_hora = GETDATE()
where fkATM = 1;`;

        console.log("Executando a instrução SQL: \n" + botaoQuery);
        try {
            const botaoResult = await database.executar(botaoQuery);
            return {
                BOTAO: (botaoResult && botaoResult.recordset[0] && botaoResult.recordset[0].quantidade) || 'N/A',
            };
        } catch (error) {
            console.error(`Erro na obtenção de Tempo de Atividade: ${error.message}`);
            return {
                BOTAO: 'N/A',
            };
        }
    }

    async function cpuTemperatura(idATM) {
        const TempQuery = `
        
        SELECT temperatura AS temp_cpu, FORMAT(data_hora, 'yyyy-MM-dd HH:mm:ss') AS hora, fkATM
        FROM (
            SELECT temperatura, data_hora, fkATM,
                   ROW_NUMBER() OVER (PARTITION BY fkATM ORDER BY data_hora DESC) AS rn
            FROM temperaturaCPU
            WHERE fkATM = ${idATM}
        ) AS subquery
        WHERE rn = 1;`;

        console.log("Executando a instrução SQL: \n" + TempQuery);
        try {
            const TempResult = await database.executar(TempQuery);
            return {
                TEMPERATURA: (TempResult && TempResult.recordset[0] && TempResult.recordset[0].tempCpu) || 'N/A',
            };
        } catch (error) {
            console.error(`Erro na obtenção de Tempo de Atividade: ${error.message}`);
            return {
                TEMPERATURA: 'N/A',
            };
        }
    }

    async function obterIP(idATM) {
        const IPQuery = `
        SELECT TOP 1 MAX(IP) as iprede 
        FROM rede 
        WHERE fk__idATM = ${idATM}
        GROUP BY FORMAT(data_hora, 'yyyy-MM-dd HH:00:00')
        ORDER BY FORMAT(data_hora, 'yyyy-MM-dd HH:00:00') DESC;`;

        console.log("Executando a instrução SQL: \n" + IPQuery);
        try {
            const IPResult = await database.executar(IPQuery);
            return {
                IP: (IPResult && IPResult.recordset[0] && IPResult.recordset[0].iprede) || 'N/A',
            };
        } catch (error) {
            console.error(`Erro na obtenção de Tempo de Atividade: ${error.message}`);
            return {
                IP: 'N/A',
            };
        }
    }

    async function buscarMedidasRede(idATM, limite_linhas) {
        let instrucaoSql = '';

        if (process.env.AMBIENTE_PROCESSO === 'producao') {
            // NUVEM
            instrucaoSql = `
            SELECT TOP ${limite_linhas} download, upload, FORMAT(dataHora, 'HH:mm') AS Horário
            FROM monitoramentoRede
            WHERE fkMaquina = ${idATM}
            ORDER BY idMonitoramentoRede DESC;`;
        } else if (process.env.AMBIENTE_PROCESSO === 'desenvolvimento') {
            instrucaoSql = `
            SELECT TOP ${limite_linhas} CONVERT(VARCHAR, data_hora, 103) + ' ' + CONVERT(VARCHAR, data_hora, 108) AS dataHora, pacotesEnviados, pacotesRecebidos
            FROM rede
            WHERE fk__idATM = ${idATM}
            ORDER BY data_hora DESC;`;
        } else {
            console.log('\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n');
            return;
        }

        console.log('Executando a instrução SQL: \n' + instrucaoSql);
        const result = await database.executar(instrucaoSql);
        return result.recordset;
    }

    async function atualizarGraficoRede(idATM, limite_linhas) {
        let instrucaoSql = '';

        if (process.env.AMBIENTE_PROCESSO === 'producao') {
            // NUVEM
            instrucaoSql = `
            SELECT TOP ${limite_linhas} download, upload, FORMAT(dataHora, 'HH:mm') AS Horário
            FROM monitoramentoRede
            WHERE fkMaquina = ${idATM}
            ORDER BY idMonitoramentoRede DESC;`;
        } else if (process.env.AMBIENTE_PROCESSO === 'desenvolvimento') {
            instrucaoSql = `
            SELECT TOP ${limite_linhas} CONVERT(VARCHAR, data_hora, 103) + ' ' + CONVERT(VARCHAR, data_hora, 108) AS dataHora, pacotesEnviados, pacotesRecebidos
            FROM rede
            WHERE fk__idATM = ${idATM}
            ORDER BY data_hora DESC;`;
        } else {
            console.log('\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n');
            return;
        }

        console.log('Executando a instrução SQL: \n' + instrucaoSql);
        const result = await database.executar(instrucaoSql);
        return result.recordset;
    }

    async function atualiza(idATM, limite_linhas) {
        let instrucaoSql = '';

        if (process.env.AMBIENTE_PROCESSO === 'producao') {
            // NUVEM
            instrucaoSql = `
            SELECT TOP ${limite_linhas} download, upload, FORMAT(dataHora, 'HH:mm') AS Horário
            FROM monitoramentoRede
            WHERE fkMaquina = ${idATM}
            ORDER BY idMonitoramentoRede DESC;`;
        } else if (process.env.AMBIENTE_PROCESSO === 'desenvolvimento') {
            instrucaoSql = `
            SELECT TOP ${limite_linhas} CONVERT(VARCHAR, data_hora, 103), pacotesEnviados, pacotesRecebidos
            FROM rede
            WHERE fk__idATM = ${idATM}
            ORDER BY data_hora DESC;`;
        } else {
            console.log('\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n');
            return;
        }

        console.log('Executando a instrução SQL: \n' + instrucaoSql);
        const result = await database.executar(instrucaoSql);
        return result.recordset;
    }

    async function obterSelect(idATM) {
        const selectQuery = `
        SELECT COUNT(*) as quantidade
        FROM notificacao
        WHERE fkATM = ${idATM};`;

        console.log("Executando a instrução SQL: \n" + selectQuery);
        try {
            const selectResult = await database.executar(selectQuery);
            return {
                SELECT: (selectResult && selectResult.recordset[0] && selectResult.recordset[0].quantidade) || 'N/A',
            };
        } catch (error) {
            console.error(`Erro na obtenção de Tempo de Atividade: ${error.message}`);
            return {
                SELECT: 'N/A',
            };
        }
    }

    async function buscarUltimasMedidasServidores(idUsuario) {

        instrucaoSql = ''

        if (process.env.AMBIENTE_PROCESSO == "producao") {
            instrucaoSql =
                `SELECT Valor as valor, DataRegistro as data
        FROM Leitura
        WHERE Componente_ID = 3;`

                ;
        } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
            instrucaoSql =
                `SELECT Valor as valor, DataRegistro as data
        FROM Leitura
        WHERE Componente_ID = 3;`

                ;
        } else {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            return
        }

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }

    async function atualizandoMedidasServidores(idUsuario) {

        instrucaoSql2 = ''

        if (process.env.AMBIENTE_PROCESSO == "producao") {
            instrucaoSql2 =
                `SELECT Valor as valor, DataRegistro as data
        FROM Leitura
        WHERE Componente_ID = 3;`

        } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
            instrucaoSql2 =
                `SELECT Valor as valor, DataRegistro as data
        FROM Leitura
        WHERE Componente_ID = 3;`
        } else {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            return
        }

        console.log("Executando a instrução SQL: \n" + instrucaoSql2);
        return database.executar(instrucaoSql2);
    }



    async function buscarUltimasMedidasServidores2(idUsuario) {

        instrucaoSql = ''

        if (process.env.AMBIENTE_PROCESSO == "producao") {
            instrucaoSql =
                `SELECT Valor as valorRam, DataRegistro dataRam
        FROM Leitura
        WHERE Componente_ID = 1;`

                ;
        } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
            instrucaoSql =
                `SELECT Valor as valorRam, DataRegistro dataRam
        FROM Leitura
        WHERE Componente_ID = 1;`

                ;
        } else {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            return
        }

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }

    async function atualizandoMedidasServidores2(idUsuario) {

        instrucaoSql2 = ''

        if (process.env.AMBIENTE_PROCESSO == "producao") {
            instrucaoSql2 =
                `SELECT Valor as valorRam, DataRegistro dataRam
        FROM Leitura
        WHERE Componente_ID = 1;`

        } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
            instrucaoSql2 =
                `SELECT Valor as valorRam, DataRegistro dataRam
        FROM Leitura
        WHERE Componente_ID = 1;`
        } else {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            return
        }

        console.log("Executando a instrução SQL: \n" + instrucaoSql2);
        return database.executar(instrucaoSql2);
    }




    async function buscarUltimasMedidasServidores3(idUsuario) {

        instrucaoSql = ''

        if (process.env.AMBIENTE_PROCESSO == "producao") {
            instrucaoSql =
                `SELECT COUNT(DISTINCT produto, fabricante) AS Quantidade_Dispositivos_Unicos
        FROM DescricaoComponentes;`

                ;
        } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
            instrucaoSql =
                `SELECT COUNT(DISTINCT produto, fabricante) AS Quantidade_Dispositivos_Unicos
        FROM DescricaoComponentes;`

                ;
        } else {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            return
        }

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }

    async function atualizandoMedidasServidores3(idUsuario) {

        instrucaoSql2 = ''

        if (process.env.AMBIENTE_PROCESSO == "producao") {
            instrucaoSql2 =
                `SELECT COUNT(DISTINCT produto, fabricante) AS Quantidade_Dispositivos_Unicos
        FROM DescricaoComponentes;`

        } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
            instrucaoSql2 =
                `SELECT COUNT(DISTINCT produto, fabricante) AS Quantidade_Dispositivos_Unicos
        FROM DescricaoComponentes;`
        } else {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            return
        }

        console.log("Executando a instrução SQL: \n" + instrucaoSql2);
        return database.executar(instrucaoSql2);
    }



    async function buscarUltimasMedidasServidores4(idUsuario) {

        instrucaoSql = ''

        if (process.env.AMBIENTE_PROCESSO == "producao") {
            instrucaoSql =
                `SELECT produto as produto, fabricante as fabricante, dataDia as dataLista
        FROM DescricaoComponentes
        GROUP BY produto, fabricante, dataDia
        HAVING COUNT(*) > 1;`

                ;
        } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
            instrucaoSql =
                `SELECT produto as produto, fabricante as fabricante, dataDia as dataLista
        FROM DescricaoComponentes
        GROUP BY produto, fabricante, dataDia
        HAVING COUNT(*) > 1;`

                ;
        } else {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            return
        }

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }

    async function atualizandoMedidasServidores4(idUsuario) {

        instrucaoSql2 = ''

        if (process.env.AMBIENTE_PROCESSO == "producao") {
            instrucaoSql2 =
                `SELECT produto as produto, fabricante as fabricante, dataDia as dataLista
        FROM DescricaoComponentes
        GROUP BY produto, fabricante, dataDia
        HAVING COUNT(*) > 1;`

        } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
            instrucaoSql2 =
                `SELECT produto as produto, fabricante as fabricante, dataDia as dataLista
        FROM DescricaoComponentes
        GROUP BY produto, fabricante, dataDia
        HAVING COUNT(*) > 1;`
        } else {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            return
        }

        console.log("Executando a instrução SQL: \n" + instrucaoSql2);
        return database.executar(instrucaoSql2);
    }

    module.exports = {
        autenticar,
        cadastrar,
        cadastrarATM,
        obterFkEmpresa,
        cadastrarAgencia,
        relatarProblema,
        ProcessosPHora,
        ProcessosPHora_tempoReal,
        TEMPHora,
        TEMP_tempoReal,
        CPUHora,
        CPU_tempoReal,
        VariedadeHora,
        Variedade_tempoReal,
        listarATM,
        listarAgencia,
        obterMetricasComponentes,
        obterMetricasRede,
        obterDesempenho,
        obterTempoAtv,
        obterBotaoInsert,
        obterBotao,
        cpuTemperatura,
        obterIP,
        buscarMedidasRede,
        atualiza,
        atualizarGraficoRede,
        obterSelect,
        buscarUltimasMedidasServidores,
        atualizandoMedidasServidores,
        buscarUltimasMedidasServidores2,
        atualizandoMedidasServidores2,
        buscarUltimasMedidasServidores3,
        atualizandoMedidasServidores3,
        buscarUltimasMedidasServidores4,
        atualizandoMedidasServidores4
    };
}