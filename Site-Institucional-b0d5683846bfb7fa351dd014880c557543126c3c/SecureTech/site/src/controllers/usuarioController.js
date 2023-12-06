var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function autenticarATM(req, res) {
    var nome = req.body.nomeServer;
    var PID = req.body.PIDServer;
    var fkATM = req.body.fkATM

    usuarioModel.autenticar(nome, PID, fkATM)
        .then(
            function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                if (resultado.length == 1) {
                    console.log(resultado);
                    res.json(resultado[0]);
                } else if (resultado.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um ATM com o mesmo id!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login do ATM! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}



function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var idUsuario = req.body.idUsuarioServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarATM(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var modelo = req.body.modeloServer;
    var qtdRAM = req.body.qtdRAMServer;
    var qtdDiscos = req.body.qtdDiscoServer;
    var fabricante = req.body.fabricanteServer;
    var fkAgenciaID = req.body.fkAgenciaIDServer;
    var fkAgenciaEmp = req.body.fkAgenciaEmpServer
    // Faça as validações dos valores
    if (modelo == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (qtdRAM == undefined) {
        res.status(400).send("Seu código está undefined!");
    } else if (qtdDiscos == undefined) {
        res.status(400).send("Seu código está undefined!");
    } else if (fabricante == undefined) {
        res.status(400).send("Seu código está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarATM(modelo, fabricante, fkAgenciaID, fkAgenciaEmp, qtdRAM, qtdDiscos)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro do ATM! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarAgencia(req, res) {
    // Obtenha os dados do corpo da solicitação
    const { NAgenciaServer, CEPServer, numeroServer, idUsuarioServer } = req.body;

    // Validação dos campos obrigatórios
    if (!NAgenciaServer || !CEPServer || !numeroServer || !idUsuarioServer) {
        return res.status(400).send("Preencha todos os campos obrigatórios");
    }

    // Chame a função no modelo para cadastrar a agência
    usuarioModel.cadastrarAgencia(NAgenciaServer, CEPServer, numeroServer, idUsuarioServer)
        .then(resultados => {
            // Envie uma resposta ao cliente
            return res.json({ resultado: 'Algum resultado', resultados });
        })
        .catch(error => {
            // Trate erros durante a execução do processo
            console.error("Erro durante o cadastro da agência:", error);
            return res.status(500).json(error);
        });
}


function relatarProblema(req, res) {
    var nome = req.body.nomeServer
    var sobrenome = req.body.sobrenomeServer
    var email = req.body.emailServer
    var titulo = req.body.tituloServer
    var detalhe = req.body.detalheServer
    var dataHoraProblema = req.body.dataHoraProblemaServer

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("Seu sobrenome está indefinido!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está indefinido!");
    } else if (titulo == undefined) {
        res.status(400).send("O titulo do problema está indefinido!");
    } else if (detalhe == undefined) {
        res.status(400).send("O detalhe do problema está indefinido!");
    } else {

        usuarioModel.relatarProblema(nome, sobrenome, email, titulo, detalhe, dataHoraProblema)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Relato do problema inválido(s)");
                    }
                    else {
                        res.status(403).send("Mais de um relato do mesmo problema!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o relato de problemas! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function listarATM(req, res) {
    var fkAgencia_usuario = req.body.fkagenciaServer;
    usuarioModel.listarATM(fkAgencia_usuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function ProcessosPHora(req, res) {
    idATM  = req.params.idATM;
    
    usuarioModel.ProcessosPHora(idATM).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function ProcessosPHora_tempoReal(req, res) {
    idATM  = req.params.idATM;
    usuarioModel.ProcessosPHora_tempoReal(idATM).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function CPUHora(req, res) {
    idATM  = req.params.idATM;
    
    usuarioModel.CPUHora(idATM).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function CPU_tempoReal(req, res) {
    idATM  = req.params.idATM;
    usuarioModel.CPU_tempoReal(idATM).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function TEMPHora(req, res) {
    idATM  = req.params.idATM;
    
    usuarioModel.TEMPHora(idATM).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function TEMP_tempoReal(req, res) {
    idATM  = req.params.idATM;
    usuarioModel.TEMP_tempoReal(idATM).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function cpuTemperatura(req, res) {
    idATM  = req.params.idATM;
    usuarioModel.cpuTemperatura(idATM).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function VariedadeHora(req, res) {
    idATM  = req.params.idATM;
    
    usuarioModel.VariedadeHora(idATM).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function Variedade_tempoReal(req, res) {
    idATM  = req.params.idATM;
    usuarioModel.Variedade_tempoReal(idATM).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarAgencia(req, res) {
    var fkAgencia_usuario = req.body.fkagenciaServer;
    usuarioModel.listarAgencia(fkAgencia_usuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as agências: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterMetricasComponentes(req, res) {
    const idATM = req.params.idATM;
    usuarioModel.obterMetricasComponentes(idATM)
        .then(dados => res.json(dados))
        .catch(error => res.status(500).json({ error: error.message }));
}

async function obterMetricasRede(req, res) {
    const idATM = req.params.idATM;
    try {
        const dados = await usuarioModel.obterMetricasRede(idATM);
        res.json(dados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

function obterDesempenho(req, res) {
    var idATM = req.params.idATM;
    try {
        usuarioModel.obterDesempenho(idATM).then(function (resposta){
            if (resposta.length > 0) {
                res.status(200).json(resposta);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obterTempoAtv(req, res) {
    const idATM = req.params.idATM;
    try {
        const dados = await usuarioModel.obterTempoAtv(idATM);
        res.json(dados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obterBotaoInsert(req, res) {
    const idATM = req.params.idATM;
    try {
        const dados = await usuarioModel.obterBotaoInsert(idATM);
        res.json(dados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obterBotao(req, res) {
    const idATM = req.params.idATM;
    try {
        const dados = await usuarioModel.obterBotao(idATM);
        res.json(dados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obterIP(req, res) {
    const idATM = req.params.idATM;
    try {
        const dados = await usuarioModel.obterIP(idATM);
        res.json(dados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

function buscarMedidasRede(req, res) {

    const limite_linhas = 10;

    var idATM =  req.params.idATM;

    console.log(`Recuperando medidas em tempo real`);

    usuarioModel.buscarMedidasRede(idATM, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function atualiza(req, res) {

    const limite_linhas = 8;

    var idATM =  req.params.idATM;

    console.log(`Recuperando medidas em tempo real`);

    usuarioModel.atualiza(idATM, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function atualizarGraficoRede(req, res) {

    var idATM =  req.params.idATM;
    var limite_linhas = 8

    console.log("Recuperando medidas em tempo real");

    usuarioModel.atualizarGraficoRede(idATM, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

async function obterSelect(req, res) {
    const idATM = req.params.idATM;
    try {
        const dados = await usuarioModel.obterSelect(idATM);
        res.json(dados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

function buscarUltimasMedidasServidores(req, res) {
    const limite_linhas = 50;
    var idUsuario = req.params.idUsuario;

    usuarioModel.buscarUltimasMedidasServidores(idUsuario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.error(erro);
        console.error("Houve um erro ao buscar as últimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function atualizandoMedidasServidores(req, res) {
    var idUsuario = req.params.idUsuario;
    usuarioModel.atualizandoMedidasServidores(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.error(erro);
        console.error("Houve um erro ao buscar as medidas em tempo real.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



function buscarUltimasMedidasServidores2(req, res) {
    const limite_linhas = 50;
    var idUsuario = req.params.idUsuario;

    usuarioModel.buscarUltimasMedidasServidores2(idUsuario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.error(erro);
        console.error("Houve um erro ao buscar as últimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function atualizandoMedidasServidores2(req, res) {
    var idUsuario = req.params.idUsuario;
    usuarioModel.atualizandoMedidasServidores2(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.error(erro);
        console.error("Houve um erro ao buscar as medidas em tempo real.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarUltimasMedidasServidores3(req, res) {
    const limite_linhas = 50;
    var idUsuario = req.params.idUsuario;

    usuarioModel.buscarUltimasMedidasServidores3(idUsuario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.error(erro);
        console.error("Houve um erro ao buscar as últimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function atualizandoMedidasServidores3(req, res) {
    var idUsuario = req.params.idUsuario;
    usuarioModel.atualizandoMedidasServidores3(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.error(erro);
        console.error("Houve um erro ao buscar as medidas em tempo real.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}





function buscarUltimasMedidasServidores4(req, res) {
    const limite_linhas = 50;
    var idUsuario = req.params.idUsuario;

    usuarioModel.buscarUltimasMedidasServidores4(idUsuario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.error(erro);
        console.error("Houve um erro ao buscar as últimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function atualizandoMedidasServidores4(req, res) {
    var idUsuario = req.params.idUsuario;
    usuarioModel.atualizandoMedidasServidores4(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.error(erro);
        console.error("Houve um erro ao buscar as medidas em tempo real.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
module.exports = {
    autenticar,
    cadastrar,
    cadastrarATM,
    autenticarATM,
    cadastrarAgencia,
    relatarProblema,
    ProcessosPHora,
    ProcessosPHora_tempoReal,
    CPUHora,
    CPU_tempoReal,
    TEMPHora,
    TEMP_tempoReal,
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
    obterSelect,
    atualizarGraficoRede,
    buscarUltimasMedidasServidores,
    atualizandoMedidasServidores,
    buscarUltimasMedidasServidores2,
    atualizandoMedidasServidores2,
    buscarUltimasMedidasServidores3,
    atualizandoMedidasServidores3,
    buscarUltimasMedidasServidores4,
    atualizandoMedidasServidores4
}