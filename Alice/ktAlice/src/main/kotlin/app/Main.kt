package app

import Banco
import Conta
import LoggingKotlin
import Repositorio
import java.time.LocalDateTime
import kotlin.random.Random
import java.io.File
import java.util.*
import java.io.PrintStream
import java.io.FileOutputStream

        fun main() {
            val repositorio = Repositorio()
            repositorio.iniciar()


            val banco = Banco()
            banco.nome = "Bradesco"

            val conta = Conta()

            val agencia = repositorio.idAgenciaAleatorio().toInt()

            banco.addConta(agencia, "12345561", "1234123412341234", "123_123_123_11", "senha1")
            banco.addConta(agencia, "67123452", "1234123412341231", "223_223_223_12", "senha2")
            banco.addConta(agencia, "12345893", "1234123412341233", "323_323_323_13", "senha3")
            banco.addConta(agencia, "12345874", "1234123412341232", "423_123_423_14", "senha4")
            banco.addConta(agencia, "12345578", "1234123412341235", "523_523_523_15", "senha5")
            banco.addConta(agencia, "12378456", "1234123412341236", "623_623_623_16", "senha6")
            banco.addConta(agencia, "12354457", "1234123412341238", "723_723_723_17", "senha7")
            banco.addConta(agencia, "12347858", "1234123412341239", "823_823_823_18", "senha8")
            banco.addConta(agencia, "12453459", "1234123412341211", "253_823_823_19", "senha9")
            banco.addConta(agencia, "12563410", "1234123412341212", "783_823_823_20", "senha10")
            banco.addConta(agencia, "12343411", "1234123412341213", "563_823_823_21", "senha11")
            banco.addConta(agencia, "12358412", "1234123412341214", "463_823_823_22", "senha12")
            banco.addConta(agencia, "12324413", "1234123412341215", "673_823_823_23", "senha13")
            banco.addConta(agencia, "12473414", "1234123412341216", "893_823_823_24", "senha14")
            banco.addConta(agencia, "15423415", "1234123412341217", "343_823_823_25", "senha15")
            banco.addConta(agencia, "12123416", "1234123412341218", "563_823_823_26", "senha16")
            banco.addConta(agencia, "12343417", "1234123412341219", "783_823_823_27", "senha17")
            banco.addConta(agencia, "12783418", "1234123412341220", "893_823_823_28", "senha18")
            banco.addConta(agencia, "19999418", "1233129914341299", "123_456_789_09", "senha19")
            banco.addConta(agencia, "18883418", "1288128814341288", "234_567_890_12", "senha20")
            banco.addConta(agencia, "17773417", "1277128814341277", "235_560_880_19", "senha21")

            //agora vamos gerar autenticações aleatórias com base nas contas instanciadas.
            var i = 0

            val indice = Random.nextInt(0, banco.listaContas.size)
            val indice2 = Random.nextInt(0, banco.listaContas.size)

            var fk = repositorio.getUltimoIdLog()

            val aleatorios = banco.listaContas[indice]
            while (true) {

                if (banco.listaContas.isNotEmpty()) {
                    val cpfAleatorio = aleatorios.cpf
                    val contaAleatorio = aleatorios.numeroConta
                    val cartaoAleatorio = aleatorios.numeroCartao
                    val senhaNormal = aleatorios.senha
                    val senhaAleatoria = banco.listaContas[indice2].senha

                    val dataHora: LocalDateTime = LocalDateTime.now()

                    val mensagemBanco: String = if (senhaNormal != senhaAleatoria) {
                        "Usuário falhou na autenticação."
                    } else {
                        "Usuário autenticado com sucesso."
                    }

                    val mensagem: String = if (senhaNormal != senhaAleatoria) {
                        "A senha ou cpf não correspondem ao banco de dados."
                    } else {
                        "A senha e cpf correspondem ao Banco de Dados."
                    }

                    val mensagemLog = """
                $mensagemBanco
                $contaAleatorio ao tentar realizar o login no ATM ${repositorio.idAtmAleatorio()}.
                $mensagem
                CPF do Usuário: $cpfAleatorio,
                Cartão: ${cartaoAleatorio},
                Agência: ${repositorio.idAgenciaAleatorio()}
            """.trimIndent()

                    LoggingKotlin.logInfo(mensagemLog)
                    repositorio.insertLog(
                        cartaoAleatorio,
                        dataHora,
                        contaAleatorio,
                        repositorio.idAtmAleatorio(),
                        repositorio.idAgenciaAleatorio(),
                        1
                    )
                    repositorio.insertMensagem(mensagem, fk)
                    repositorio.insertTipoErro(mensagemBanco, fk)
                    println("Isso será redirecionado para o arquivo de log.")


                } else {
                    println("A lista de contas está vazia.")
                    //      System.out.flush()
                    //     System.setOut(consoleOriginal)
                    //    println("Isso será redirecionado para o arquivo de log.")
                    //   System.setOut(printStream)

                }
                //i ++
                Thread.sleep(5000)

                if (banco.listaContas.isNotEmpty()) {
                    val cpfAleatorio = aleatorios.cpf
                    val contaAleatorio = aleatorios.numeroConta
                    val cartaoAleatorio = aleatorios.numeroCartao
                    val senhaNormal = aleatorios.senha

                    val dataHora: LocalDateTime = LocalDateTime.now()

                    val mensagemBanco: String = if (senhaNormal != senhaNormal) {
                        "Usuário falhou na autenticação."
                    } else {
                        "Usuário autenticado com sucesso."
                    }

                    val mensagem: String = if (senhaNormal != senhaNormal) {
                        "A senha ou cpf não correspondem ao banco de dados."
                    } else {
                        "A senha e cpf correspondem ao Banco de Dados."
                    }

                    val mensagemLog = """
                $mensagemBanco
                $contaAleatorio ao tentar realizar o login no ATM ${repositorio.idAtmAleatorio()}.
                $mensagem
                CPF do Usuário: $cpfAleatorio,
                Cartão: ${cartaoAleatorio},
                Agência: ${repositorio.idAgenciaAleatorio()}
            """.trimIndent()

                    LoggingKotlin.logInfo(mensagemLog)
                    repositorio.insertLog(
                        cartaoAleatorio,
                        dataHora,
                        contaAleatorio,
                        repositorio.idAtmAleatorio(),
                        repositorio.idAgenciaAleatorio(),
                        1
                    )
                    repositorio.insertMensagem(mensagem, fk)
                    repositorio.insertTipoErro(mensagemBanco, fk)
                    println("Isso será redirecionado para o arquivo de log.")


                } else {
                    println("A lista de contas está vazia.")
                    //      System.out.flush()
                    //     System.setOut(consoleOriginal)
                    //    println("Isso será redirecionado para o arquivo de log.")
                    //   System.setOut(printStream)

                }
            }
        }





