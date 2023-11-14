// sessão
function validarSessao() {
    // aguardar();

    var email = sessionStorage.email_usuario;
    var nome = sessionStorage.nome_usuario;
    var id = sessionStorage.id_usuario;
    var idAgencia = sessionStorage.fkAgencia_usuario;
    var idEmpresa = sessionStorage.fkEmpUsuario_usuario;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null && id != null && idAgencia != null && idEmpresa != null) {
         window.alert(`Seja bem-vindo, ${nome}!`);
        b_usuario.innerHTML = nome;

        
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    aguardar();
    sessionStorage.clear();
   // finalizarAguardar();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

// function finalizarAguardar(texto) {
//     var divAguardar = document.getElementById("div_aguardar");
//     divAguardar.style.display = "none";

//     var divErrosLogin = document.getElementById("div_erros_login");
//     if (texto) {
//         divErrosLogin.style.display = "flex";
//         divErrosLogin.innerHTML = texto;
//     }
// }


// modal
function mostrarModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "flex";
}

function fecharModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "none";
}

