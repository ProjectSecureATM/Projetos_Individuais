import com.github.britooo.looca.api.core.Looca
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.jdbc.core.JdbcTemplate

class Repositorio {
    /*
   Captura vaz
    */

    lateinit var jdbcTemplate: JdbcTemplate

    fun iniciar() {
        jdbcTemplate = Conection().jdbcTemplate!!
    }

    fun verificarUsuario(email:String,senha:String):Int?{
        var usuario:Int? = 0

        try {
            usuario = jdbcTemplate.queryForObject("""
                select count(idUsuario) from usuario where email = '${email}' and senha = '${senha}';
            """,Int::class.java)
        }
        catch (excecao: EmptyResultDataAccessException){
            usuario = 0
        }
        return usuario
    }
}