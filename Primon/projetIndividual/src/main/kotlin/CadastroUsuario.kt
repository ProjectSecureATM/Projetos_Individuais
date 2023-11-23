import javax.swing.JOptionPane

class Usuario {
    lateinit var nome: String
    lateinit var cpf: String
    lateinit var email: String
    lateinit var senha: String
    //val dataNascimento: LocalDate

    class CadastroUsuario{
        private val usuariosCadastrados = mutableListOf<Usuario>()

        fun cadastrarNovoUsuario(usuario: Usuario) {
            usuariosCadastrados.add(usuario)
            JOptionPane.showMessageDialog(null, "Usuário cadastrado com sucesso!")
        }

        fun verificarUsuario(email: String, senha: String): Boolean {
            val usuarioEncontrado = usuariosCadastrados.find { it.email == email && it.senha == senha }
            return usuarioEncontrado != null
        }
    }

}