import java.time.LocalDateTime
import javax.swing.JOptionPane.showInputDialog
import javax.swing.JOptionPane.showMessageDialog

fun main() {
    val coleta = RepertorioColeta()
    val cadastro = Usuario.CadastroUsuario()
    val usuario = Usuario()


    showMessageDialog(null, "Bem vindo ao monitoramento de USB")
    while (true){
        val escolhaCadastro = showInputDialog("""
        Para começar, você possuí cadastro?
            1- Sim
            2- Não
    """.trimIndent()).toInt()

        if (escolhaCadastro == 2){
            showMessageDialog(null, "Vamos realizar seu cadastro")

            usuario.nome = showInputDialog("insira seu nome")
            usuario.cpf = showInputDialog("insira seu CPF")
            usuario.email = showInputDialog("insira seu email")
            usuario.senha = showInputDialog("insira sua senha")

            cadastro.cadastrarNovoUsuario(usuario)
        }else if (escolhaCadastro == 1){

            showMessageDialog(null, "Login")
            val emailLogin = showInputDialog("Digite seu Email")
            val senhaLogin = showInputDialog("Digite sua senha")

            if (cadastro.verificarUsuario(emailLogin, senhaLogin)) {
                showMessageDialog(null, "Login realizado com sucesso!")
                showMessageDialog(null, "Bem vindo ${usuario.nome}!")

                val historicoCapturas = mutableListOf<LocalDateTime>()
                val historicoDispositivos = mutableSetOf<String>()

                showMessageDialog(null, "toda captura será informada no console")
                while (true) {
                    val escolhaMonitor = showInputDialog("""
                        Escolha uma opção:
                            1. Atualizar captura
                            2. Exibir histórico de capturas
                            3. Histórico de dispositivos
                            4. Sair
                    """.trimIndent()).toInt()

                    when ( escolhaMonitor) {
                        1 -> {
                            coleta.executarScriptPython()
                            historicoCapturas.add(LocalDateTime.now())
                        }
                        2 -> coleta.exibirHistoricoCapturas(historicoCapturas)
                        3 -> coleta.exibirHistoricoDispositivos(historicoDispositivos)
                        4 -> return
                        else -> showMessageDialog(null, "Opção inválida.")
                    }
                }

            } else {
                showMessageDialog(null, "Usuário não cadastrado ou credenciais inválidas.")
            }

        }
    }


}