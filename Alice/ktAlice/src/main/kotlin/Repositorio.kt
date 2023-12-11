import org.springframework.jdbc.core.JdbcTemplate
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import kotlin.random.Random

class Repositorio {

    lateinit var jdbcTemplate: JdbcTemplate

    fun iniciar() {
        jdbcTemplate = conectarSQL()
    }

    // fun pra pegar o maior ID do ATM cadastrado no Banco
    fun obterMaiorIDAtm(): Int{

        val sql = "SELECT MAX(idATM) FROM ATM;"
        val resultado = jdbcTemplate.queryForList(sql, Int::class.java).firstOrNull() ?: 0

        return if (resultado == 0) {
            println("Ainda não há ATMs cadastrados, cadastre seu ATM no nosso Site!")
            resultado
        } else resultado
    }

    // fun pra pegar o maior ID do ATM cadastrado no Banco
    fun obterMenorIDAtm(): Int{

        val sql = "SELECT MIN(idATM) FROM ATM;"
        val resultado = this.jdbcTemplate.queryForList(sql, Int::class.java).firstOrNull() ?: 0

        return if (resultado == 0) {
            println("Ainda não há ATMs cadastrados, cadastre seu ATM no nosso Site!")
            resultado
        } else resultado
    }

    fun obterMaiorIDAgencia(): Int{

        val sql = "SELECT MAX(idAgen) FROM agencia;"
        val resultado = this.jdbcTemplate.queryForObject(sql, Int::class.java)
        return if (resultado == 0) {
            println("Ainda não há Agências cadastradas, cadastre sua agência no nosso Site!")
            resultado
        } else resultado
    }


    // Esse método é apenas para fins de simulação, o id do ATM será aquele que o log está sendo capturado.
    fun idAtmAleatorio(): Int{
        val atmAleatorio = Random.nextInt(obterMenorIDAtm(), obterMaiorIDAtm() + 1)

        return atmAleatorio
    }

    fun idAgenciaAleatorio(): Int{
        val agenAleatorio = Random.nextInt(1, obterMaiorIDAgencia() + 1)

        return agenAleatorio
    }

    fun insertLog(cartaoAleatorio: String, dataHora: LocalDateTime, contaAleatorio: String, atm: Int, agencia: Int, empresa: Int) {
        val dataHoraFormatada = dataHora.format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss"))
        jdbcTemplate.update("""
            INSERT INTO logs(data_hora, Ncartao, contaCliente, fk_idATM, fk_ATMAgencia, fk_AgenciaEmpresa) VALUES
            ('${dataHoraFormatada}', '${cartaoAleatorio}', '${contaAleatorio}', ${atm}, ${agencia}, 1);
        """
        )
    }

    fun getUltimoIdLog() : Int{
        val sql = "SELECT COUNT(idLogs) FROM logs"
        var resultado = jdbcTemplate.queryForList(sql, Int::class.java).firstOrNull() ?: 0

        if(resultado == 0){
            resultado += 1
        }

        return resultado
    }

    fun insertMensagem(mensagem: String, fk: Int) {
        jdbcTemplate.update("""
            INSERT INTO mensagem(mensagem, fkLogs) VALUES
            ('$mensagem', $fk);
        """
        )
    }

    fun insertTipoErro(mensagemBanco: String, fk: Int) {
        jdbcTemplate.update("""
            INSERT INTO TipoERRO(Tipo, fkMSG) VALUES
            ('$mensagemBanco', $fk);
        """
        )
    }

    fun qtdErrosATM (mensagemBanco: String){
        jdbcTemplate.update("""
             SELECT Tipo, COUNT(*) AS qtdErros FROM TipoERRO WHERE Tipo LIKE "%falhou%" GROUP BY Tipo;  
            ('$mensagemBanco');
        """
        )
    }

    fun ErrosATMAcertos (mensagemBanco: String){
        jdbcTemplate.update("""
             INSERT INTO TipoERRO  
            ('1', );
        """
        )
    }

}