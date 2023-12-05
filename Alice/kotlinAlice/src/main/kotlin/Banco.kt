class Banco {

    var nome: String = ""

    var listaContas = mutableListOf<Conta>()

    fun addConta (
        agencia: Int,
        numeroConta: String,
        numeroCartao: String,
        cpf: String,
        senha: String
    ) {
        val novaConta = Conta()

        novaConta.agencia = agencia
        novaConta.numeroConta = numeroConta
        novaConta.numeroCartao = numeroCartao
        novaConta.cpf = cpf
        novaConta.senha = senha

        listaContas.add(novaConta)
    }

}