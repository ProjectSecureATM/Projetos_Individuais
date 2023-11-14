
function verificar() {
    var emailVar = input_email.value;
    var senhaVar = input_senha.value;

    if (emailVar == "" || senhaVar == "") {
        alert('Preencha todos os campos');
        return;
    }

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!");

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
            
                sessionStorage.email_usuario = json.email;
                sessionStorage.nome_usuario = json.nome;
                sessionStorage.id_usuario = json.idUsuario;
                sessionStorage.fkAgencia_usuario = json.fkAgencia;
                sessionStorage.fkEmpUsuario_usuario = json.fkEmpUsuario;
            
                setTimeout(function () {
                    window.location = "./homeDashBoard.html";
                }, 1000); // apenas para exibir o loading
            });

        } else {
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                //finalizarAguardar(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    });

    return false;

}
