import kotlin.random.Random

open class Conta {

    var agencia: Int = 0
    var numeroConta: String = ""
    var numeroCartao: String = ""
    lateinit var cpf: String
    lateinit var senha: String

    val banco = Banco()
    val repositorio = Repositorio()

    init {
        repositorio.iniciar()
    }

}
