import com.github.britooo.looca.api.core.Looca
import javax.swing.JOptionPane

fun main() {
    val looca= Looca()
    val repositorio = Repositorio()

    repositorio.iniciar()



    val email = JOptionPane.showInputDialog("Insira seu e-mail")
    val senha = JOptionPane.showInputDialog("Insira sua senha")

    val verUsuario = repositorio.verificarUsuario(email,senha)

    if (verUsuario != 0){
        JOptionPane.showMessageDialog(null, "Bem-Vindo a SecureATM!!")
        JOptionPane.showMessageDialog(null, "Iniciando sistema!")



    }else{
        JOptionPane.showMessageDialog(null, "Erro ao iniciar o sistema!!")
    }

}