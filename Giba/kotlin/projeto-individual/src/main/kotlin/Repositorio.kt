import com.github.britooo.looca.api.core.Looca
import org.springframework.jdbc.core.JdbcTemplate
import javax.swing.JOptionPane

val looca: Looca = Looca()

class Repositorio {

    lateinit var jdbcTemplate: JdbcTemplate

    fun iniciarSQL() {
        jdbcTemplate = Conexao().conectarSQL()
    }

    fun criarTabelaSQL() {
        jdbcTemplate.execute(
            """
        IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'temperaturaCPU')
BEGIN
    CREATE TABLE temperaturaCPU (
        idTemp INT IDENTITY(1,1) PRIMARY KEY,
        temperatura FLOAT,
        data_hora DATETIME,
        fkComp INT,
        fkATM INT,
        FOREIGN KEY (fkComp) REFERENCES Componentes(id),
        FOREIGN KEY (fkATM) REFERENCES ATM(idATM)
    );
END;
        """
        )

    }

    fun cadastrar(novaTemperatura: Temperatura, idATM: Int) {

        val temperatura = looca.temperatura
        var novaTemp = Temperatura()
        novaTemp.temperatura = temperatura.temperatura
        jdbcTemplate.update(
            """
            INSERT INTO temperaturaCPU(temperatura, data_hora, fkComp, fkATM) VALUES (?, ?, 3, ?)
        """,
            novaTemp.temperatura,
            novaTemperatura.data_hora,
            idATM
        )
    }

    fun verificarUsuarioSQL(email: String, senha: String): Boolean {
        val sql = "SELECT COUNT(*) FROM usuario WHERE email = ? AND senha = ?"
        val count = jdbcTemplate.queryForObject(sql, Int::class.java, email, senha)

        return count > 0
    }

    fun verificarExistenciaATMSQL(idATM: Int): Boolean {
        val sql = "SELECT COUNT(*) FROM ATM WHERE idATM = ?"
        val count = jdbcTemplate.queryForObject(sql, Int::class.java, idATM)
        return count > 0
    }

    fun listarIDsATMsParaEscolhaSQL(): Int? {

        val listaDeIDsATMs = obterListaDeIDsATMsDoBancoDeDadosSQL()
        val escolha = JOptionPane.showInputDialog(
            null,
            "Escolha o ID do ATM:",
            "Escolha de ATM",
            JOptionPane.QUESTION_MESSAGE,
            null,
            listaDeIDsATMs.toTypedArray(),
            null
        ) as Int? ?: return null

        if (verificarExistenciaATMSQL(escolha)) {
            return escolha
        } else {
            JOptionPane.showMessageDialog(
                null,
                "ATM escolhido não encontrado no banco de dados. Saindo do programa.",
                "Erro",
                JOptionPane.ERROR_MESSAGE
            )
            return null
        }
    }

    private fun obterListaDeIDsATMsDoBancoDeDadosSQL(): List<Int> {
        val sql = "SELECT idATM FROM ATM"
        return jdbcTemplate.queryForList(sql, Int::class.java)
    }
}