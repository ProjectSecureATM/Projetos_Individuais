import java.io.BufferedReader
import java.io.InputStreamReader
import kotlin.concurrent.fixedRateTimer

class LogsLinux {

    fun lerLog() {
        try {
            val processo = ProcessBuilder("journalctl", "_COMM=sshd", "--since", "yesterday").start()

            val leitor = BufferedReader(InputStreamReader(processo.inputStream))
            var linha: String?

            while (leitor.readLine().also { linha = it } != null) {
                println(linha)
            }

            processo.waitFor()
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}