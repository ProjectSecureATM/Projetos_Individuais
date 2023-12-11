import com.github.britooo.looca.api.core.Looca
import org.springframework.jdbc.core.JdbcTemplate

val looca:Looca = Looca()

class Repositorio{

    lateinit var jdbcTemplate: JdbcTemplate

    fun iniciarConexao(){
        jdbcTemplate = Conexao().conectar()
    }

    fun inserir(captura:Ram) {
        jdbcTemplate.update("""
            INSERT INTO leitura() VALUES (null,?, ?, 1, ? , 1)
        """,
            captura.data_registro,
            captura.valor,
            captura.fkATM
        )

    }

    fun capturarRam():Ram{

        val looca = Looca()
        val Ram = Ram(looca.memoria.emUso,looca.memoria.disponivel,looca.memoria.total)
        return Ram

    }
}