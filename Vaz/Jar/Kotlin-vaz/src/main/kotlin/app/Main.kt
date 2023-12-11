package app

import com.github.britooo.looca.api.core.Looca
import javax.swing.JOptionPane

import Repositorio
import javax.swing.JOptionPane.*

open class Main {
    companion object {
        @JvmStatic fun main(args: Array<String>) {

            // seu código ficará aqui

            val looca= Looca()
            val repositorio = Repositorio()

            repositorio.iniciar()



            val email = showInputDialog("Insira seu e-mail")
            val senha = showInputDialog("Insira sua senha")

            val verUsuario = repositorio.verificarUsuario(email,senha)

            if (verUsuario != 0){
                showMessageDialog(null, "Bem-Vindo a SecureATM!!")
                showMessageDialog(null, "Iniciando sistema...")

                showMessageDialog(null, "Estamos monitorando sua rede!!!")
            }else{
                showMessageDialog(null, "Erro ao iniciar o sistema!!")
            }

        }
    }
}