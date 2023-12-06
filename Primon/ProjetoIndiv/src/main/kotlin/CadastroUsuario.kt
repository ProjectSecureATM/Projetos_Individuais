import java.sql.Connection
import java.sql.DriverManager
import java.sql.ResultSet
import java.time.LocalDateTime
import javax.swing.JOptionPane
import javax.swing.JOptionPane.showInputDialog
import javax.swing.JOptionPane.showMessageDialog

fun main() {
    val url = "jdbc:mysql://localhost:3306/SecureATM"
    val user = "root"
    val password = "Ph993387998"

    // Estabelecer a conexão com o banco de dados
    val connection = DriverManager.getConnection(url, user, password)


    val cadastro = CadastroUsuario()
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

            showMessageDialog(null, "Vamos realizar seu Login.")
            val emailLogin = showInputDialog("Digite seu Email:")
            val senhaLogin = showInputDialog("Digite sua senha:")

            if (cadastro.verificarUsuario(emailLogin, senhaLogin)) {
                showMessageDialog(null, "Login realizado com sucesso!")
                showMessageDialog(null, "Bem vindo ${usuario.nome}!")

                val historicoCapturas = mutableListOf<LocalDateTime>()
                val historicoDispositivos = mutableSetOf<String>()

                while (true) {
                    val escolhaMonitor = showInputDialog("""
                        Escolha uma opção:
                            1. Atualizar captura
                            2. Mostrar Dispositivos
                            3. Sair
                    """.trimIndent()).toInt()

                    when ( escolhaMonitor) {
                        1 -> {
                            historicoCapturas.add(LocalDateTime.now())
                            showMessageDialog(null, "")
                            showMessageDialog(null, "Dispositivos atualizados!")
                        }
                        2 -> {
                            val statement = connection.createStatement()
                            val sql = """
                                SELECT produto, fabricante, MIN(dataDia) AS dataDia
                                FROM DescricaoComponentes
                                GROUP BY produto, fabricante;
                            """.trimIndent()

                            val resultSet: ResultSet = statement.executeQuery(sql)

                            while (resultSet.next()) {
                                val produto = resultSet.getString("produto")
                                val fabricante = resultSet.getString("fabricante")
                                val dataDia = resultSet.getDate("dataDia")

                                showMessageDialog(null, "Produto: $produto, Fabricante: $fabricante, Data mais antiga: $dataDia")
                            }

                            resultSet.close()
                            statement.close()
                        }
                        3 -> return
                        else -> showMessageDialog(null, "Opção inválida.")
                    }
                }

            } else {
                showMessageDialog(null, "Usuário não cadastrado ou credenciais inválidas.")
            }

        }
    }


}