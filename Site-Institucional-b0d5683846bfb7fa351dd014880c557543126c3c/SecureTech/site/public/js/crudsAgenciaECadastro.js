function validarSessao() {
    // aguardar();

    var email = sessionStorage.email_usuario;
    var nome = sessionStorage.nome_usuario;
    var id = sessionStorage.id_funcionario_usuario;
    var idAgencia = sessionStorage.fkAgencia_usuario;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null && id != null && idAgencia != null) {
         window.alert(`Seja bem-vindo, ${nome}!`);
        b_usuario.innerHTML = nome;

        
    } else {
        window.location = "../login.html";
    }
    
}

function cadastrarATM() {
    const modeloVar = modelo_input.value;
    const fabricanteVar = fabricante_input.value;
    const qtdDiscoVar = qtdDisco_input.value; // Adicione .value aqui
    const qtdRAMVar = qtdRAM_input.value; // Adicione .value aqui
    const fkAgenciaIDVar = parseInt(sessionStorage.fkAgencia_usuario, 10); // Converta para número
    const fkAgenciaEmpVar = parseInt(sessionStorage.fkEmpUsuario_usuario, 10); // Converta para número
    

    if (modeloVar == "" || fabricanteVar == "") {
        alert("Preencha os campos vazios");
    } else {
        // Restante do código...

        // Agora, você pode enviar os dados para o servidor
        fetch("/usuarios/cadastrarATM", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                modeloServer: modeloVar,
                fabricanteServer: fabricanteVar,
                qtdDiscoServer: qtdDiscoVar,
                qtdRAMServer: qtdRAMVar,
                fkAgenciaIDServer: fkAgenciaIDVar,
                fkAgenciaEmpServer: fkAgenciaEmpVar
            })
        });
    }
}


function cadastrarAgencia() {
    // Obtenha os valores dos campos
    const NAgencia = document.getElementById('NAgencia_input').value;
    const CEP = document.getElementById('cep_input').value;
    const numero = document.getElementById('numero_input').value;

    // Obtenha o idUsuario da sessionStorage
    const idUsuario = sessionStorage.id_usuario;

    // Se o idUsuario não estiver presente, faça o tratamento necessário
    if (!idUsuario) {
        console.error("ID do usuário não encontrado na sessionStorage");
        return;
    }

    // Verifique se os campos não estão vazios
    if (!NAgencia || !CEP || !numero) {
        alert("Preencha todos os campos obrigatórios");
        return; // Saia da função se algum campo estiver vazio
    }

    // Crie um objeto com os dados a serem enviados para o servidor
    const dados = {
        NAgenciaServer: NAgencia,
        CEPServer: CEP,
        numeroServer: numero,
        idUsuarioServer: idUsuario
        // Adicione outras propriedades se necessário
    };

    // Faça uma solicitação POST para o servidor
    fetch('/usuarios/cadastrarAgencia', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data);
        // Adicione o código para lidar com a resposta do servidor, se necessário
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
}