import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate

class Conexao {

    fun conectar(): JdbcTemplate {
    lateinit var jdbcTemplate: JdbcTemplate

        val dataSource = BasicDataSource()
        // Conexão Localhost
        dataSource.driverClassName = "com.mysql.cj.jdbc.Driver"
        dataSource.url = "jdbc:mysql://localhost:3306/SecureATM?serverTimezone=UTC"
        dataSource.username = "root"
        dataSource.password = "sptech"

        return JdbcTemplate(dataSource)
    }
}

// Conexão SQLServer

//dataSource.driverClassName = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
//dataSource.url = "jdbc:sqlsercer://18.204.118.27;database=SecureATM;encrypt=false;trustServerCertificated"
//dataSource.username = "sa"
//dataSource.password = "Secure2023"
//return JdbcTemplate(dataSource)

