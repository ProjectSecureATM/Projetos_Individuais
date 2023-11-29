import com.sun.jna.Native
import com.sun.jna.platform.win32.Advapi32
import com.sun.jna.platform.win32.WinNT
import com.sun.jna.win32.W32APIOptions

interface Advapi32Ex : Advapi32 {
    abstract fun ReadEventLog(hEventLog: WinNT.HANDLE, i: Int, i1: Int, buffer: ByteArray, bufferSize: Int, bytesRead: IntArray, nothing: Nothing?): Boolean

    companion object {
        val INSTANCE: Advapi32Ex = Native.load("Advapi32", Advapi32Ex::class.java, W32APIOptions.DEFAULT_OPTIONS)
    }
}

fun readWindowsLogs() {
    try {
        // Abrir o log de eventos
        val hEventLog = Advapi32Ex.INSTANCE.OpenEventLog(null, "Security")
        if (hEventLog != null) {
            val bufferSize = 4096
            val buffer = ByteArray(bufferSize)
            val bytesRead = IntArray(1)

            while (Advapi32Ex.INSTANCE.ReadEventLog(hEventLog, WinNT.EVENTLOG_SEQUENTIAL_READ or WinNT.EVENTLOG_FORWARDS_READ, 0, buffer, bufferSize, bytesRead, null)) {
                println(String(buffer, 0, bytesRead[0]))
            }

            // Fechar o log de eventos
            Advapi32Ex.INSTANCE.CloseEventLog(hEventLog)
        } else {
            println("Erro ao abrir o log de eventos.")
        }
    } catch (e: Exception) {
        e.printStackTrace()
    }
}
