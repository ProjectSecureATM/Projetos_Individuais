import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class Ram(
    val valor: Long,
    val disponivel: Long,
    val total:Long) {
    var data_registro =LocalDateTime.now()
    var fkATM:Int = 0
}