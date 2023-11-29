import kotlin.concurrent.fixedRateTimer

fun main() {

    val so: String = System.getProperty("os.name")
    val soNome: String = extractOsName(so)
    println("----- Sistema Operacional: $soNome -----")

    if(soNome == "Linux") {

        val logLinux = LogsLinux()

        // Agendando a execução da função em intervalos regulares
        fixedRateTimer(name = "LogReaderTimer", initialDelay = 0, period = 5000) {
            logLinux.lerLog()
        }

        while (true) {
            // Espera por 1 segundo antes de verificar novamente
            Thread.sleep(1000)
        }

    } else if (soNome == "Windows"){

        var i = 0
        while(i < 10 ){
            readWindowsLogs()
            Thread.sleep(1000)
            i++
        }

    } else {

        println("A SecureATM não trabalha com esse S.O")

    }
}

fun extractOsName(fullOsName: String): String {
    return when {
        fullOsName.contains("Linux") -> "Linux"
        fullOsName.contains("Windows") -> "Windows"
        else -> "A SecureATM não trabalha com esse tipo de S.O"
    }
}