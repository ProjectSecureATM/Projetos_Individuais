import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate

class Conexao {

    fun conectar(): JdbcTemplate {
        val dataSource = BasicDataSource().apply{
            driverClassName = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
            url = "jdbc:sqlserver://18.204.118.27;database=SecureATM;encrypt=true;trustServerCertificate=true"
            username = "sa"
            password = "Secure2023"


        }
        return JdbcTemplate(dataSource)
        }
        // Conexão Localhost
//        dataSource.driverClassName = "com.mysql.cj.jdbc.Driver"
//        dataSource.url = "jdbc:mysql://localhost:3306/SecureATM?serverTimezone=UTC"
//        dataSource.username = "root"
//        dataSource.password = "sptech"

        //Conexão SQLServer

}





