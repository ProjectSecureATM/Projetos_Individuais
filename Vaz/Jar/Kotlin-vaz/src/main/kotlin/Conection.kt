import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate

class Conection {
    var jdbcTemplate: JdbcTemplate? = null
        get() {
            if (field == null) {
                val dataSource = BasicDataSource()
                dataSource.driverClassName = "com.mysql.cj.jdbc.Driver"
                dataSource.url = "jdbc:mysql://localhost:3306/SecureATM"
                dataSource.username = "root"
                dataSource.password = "#Gf45217532807"

                val novoJdbcTemplate = JdbcTemplate(dataSource)
                field = novoJdbcTemplate
            }
            return field
        }
}