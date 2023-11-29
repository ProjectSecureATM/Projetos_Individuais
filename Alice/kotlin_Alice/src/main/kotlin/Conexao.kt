import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate

class Conexao {

    fun conectar(): JdbcTemplate {
        // Cria um objeto DataSource usando BasicDataSource
        val dataSource = BasicDataSource()
        // Configura as informações de conexão com o banco de dados
        dataSource.driverClassName = "com.mysql.cj.jdbc.Driver" // Define o driver JDBC para o MySQL
        dataSource.url = "jdbc:mysql://localhost:3306/SecureATM" // URL do banco de dados
        dataSource.username = "giba" // Nome de usuário do banco de dados
        dataSource.password = "fgandb25" // Senha do banco de dados
        return JdbcTemplate(dataSource) // Retorna um objeto JdbcTemplate configurado com o DataSource
    }
 }

