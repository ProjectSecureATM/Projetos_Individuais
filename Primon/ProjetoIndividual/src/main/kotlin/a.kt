import java.sql.DriverManager

fun main() {
    val connection = DriverManager.getConnection("jdbc:sqlite:caminho/do/seu/banco.db")

    val statement = connection.createStatement()
    val resultSet = statement.executeQuery("SELECT * FROM capturas")

    while (resultSet.next()) {
        val captura = resultSet.getString("nome_da_coluna_captura")
        println("Captura em Python: $captura")
    }

    resultSet.close()
    statement.close()
    connection.close()
}