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
    }else {

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
    }else if (qtdDiscos == undefined) {
        res.status(400).send("Seu código está undefined!");
    }else if (fabricante == undefined) {
        res.status(400).send("Seu código está undefined!");
    }else {

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
    }  else if (sobrenome == undefined) {
        res.status(400).send("Seu sobrenome está indefinido!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está indefinido!");
    } else if (titulo == undefined) {
        res.status(400).send("O titulo do problema está indefinido!");
    }else if (detalhe == undefined) {
            res.status(400).send("O detalhe do problema está indefinido!");
    }else {

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
module.exports = {
    autenticar,
    cadastrar,
    cadastrarATM,
    cadastrarAgencia,
    relatarProblema
}