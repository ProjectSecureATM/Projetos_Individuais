import Ram
import Repositorio
import java.util.*
import java.util.Scanner

fun main() {
    app()
}

fun chamarCaptura(repositorio: Repositorio):Ram {

    val captura:Ram = repositorio.capturarRam()

    println("captura sendo realizada com sucesso")
    println(captura.valor)
    println(captura.data_registro)

    return captura
}

fun app(){
    val repositorio = Repositorio()
    repositorio.iniciarConexao()

    print("Qual ATM deve ser monitorado?")
    //val fk_atm =

    Timer().schedule(object : TimerTask() {
        override fun run() {
            repositorio.inserir(chamarCaptura(repositorio))
        }
    }, 2000)

    app()
}