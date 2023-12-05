import java.io.BufferedReader
import java.io.InputStreamReader
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class RepertorioColeta {
        fun executarScriptPython() {
            val processo = Runtime.getRuntime().exec("python seu_script_python.py")
            val leitor = BufferedReader(InputStreamReader(processo.inputStream))

            var linha: String?
            while (leitor.readLine().also { linha = it } != null) {
                println(linha)
            }
        }

        // Função para exibir o histórico de capturas
        fun exibirHistoricoCapturas(historico: List<LocalDateTime>) {
            println("Histórico de Capturas:")
            historico.forEachIndexed { index, captura ->
                println("Captura ${index + 1}: ${captura.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"))}")
            }
        }

        // Função para exibir o histórico de dispositivos
        fun exibirHistoricoDispositivos(dispositivos: Set<String>) {
            println("Histórico de Dispositivos:")
            dispositivos.forEach { dispositivo ->
                println("- $dispositivo")
            }
        }
    }
