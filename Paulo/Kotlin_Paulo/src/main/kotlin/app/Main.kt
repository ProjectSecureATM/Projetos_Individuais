package app

import java.util.*
import Repositorio
import java.util.*
import Ram
import chamarCaptura
import main

open class Main {
    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            app()
        }

        fun chamarCaptura(repositorio: Repositorio):Ram {

            val captura:Ram = repositorio.capturarRam()

            print("Qual ATM deve ser monitorado?")
            val fkATM = Scanner(System.`in`)
            captura.fkATM = fkATM.nextInt()

            println("captura sendo realizada com sucesso")
            println(captura.valor)
            println(captura.data_registro)

            return captura
        }

        fun app(){
            val repositorio = Repositorio()
            repositorio.iniciarConexao()

            Timer().schedule(object : TimerTask() {
                override fun run() {
                    repositorio.inserir(chamarCaptura(repositorio))
                }
            }, 20000)
        }
    }
}
