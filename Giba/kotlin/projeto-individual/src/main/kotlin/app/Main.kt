package app

import Temperatura
import Repositorio
import com.github.britooo.looca.api.core.Looca
import looca
import java.time.LocalDateTime
import javax.swing.JOptionPane

open class Main {
    companion object {
        @JvmStatic
        fun main(args: Array<String>) {

            val repositorioSQLServer = Repositorio()
            repositorioSQLServer.iniciarSQL()

            // Solicita ao usuário que digite seu e-mail e senha
            val email = JOptionPane.showInputDialog("Olá, digite o seu e-mail:")
            val senha = JOptionPane.showInputDialog("Digite a sua senha:")

            if (email != null && senha != null) {
                if (repositorioSQLServer.verificarUsuarioSQL(email, senha)) {
                    JOptionPane.showMessageDialog(
                        null,
                        "Usuário encontrado no banco de dados.",
                        "Bem-vindo (a) novamente!",
                        JOptionPane.INFORMATION_MESSAGE
                    )
                    val idATMEscolhido = repositorioSQLServer.listarIDsATMsParaEscolhaSQL()
                    if (idATMEscolhido != null) {
                        println("ID do ATM Escolhido: $idATMEscolhido")
                    }
                    repositorioSQLServer.criarTabelaSQL()
                    val looca = Looca()
                    println("Iniciado!")

                    while (true) {
                        val temperatura = looca.temperatura.getTemperatura()
                        val novaTemperatura = Temperatura()
                        novaTemperatura.data_hora = LocalDateTime.now()

                        if (idATMEscolhido != null) {
                            repositorioSQLServer.cadastrar(novaTemperatura, idATMEscolhido)
                        }
                        println("""
                            Temperatura da CPU: $temperatura
                        """.trimIndent())
                        Thread.sleep(2000)
                    }
                } else {
                    JOptionPane.showMessageDialog(
                        null,
                        "Usuário não encontrado no banco de dados.",
                        "Erro",
                        JOptionPane.ERROR_MESSAGE
                    )
                    }
                }
            }
        }
    }

