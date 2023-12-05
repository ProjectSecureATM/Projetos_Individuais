import javax.swing.JOptionPane

class CadastroUsuario {
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