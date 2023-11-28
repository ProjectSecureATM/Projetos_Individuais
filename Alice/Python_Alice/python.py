import mysql.connector
import random
import datetime

while(True):
        print("-----------------------------------------")
        resposta = input("|        Quer ver os Logs? (s/n):         |\n----------------------------------------- \n")
        if resposta == "s":
                for i in [1,2,3]:
                # preecher campos abaixo com as configs específicas do bd
                    mydb = mysql.connector.connect(host = 'localhost',port = "3306",user = "aluno", password = "sptech", database = 'secureatm')
                # Variaveis gerais
                    numero_cartao = random.randint(1000,9999)
                    data_hora_atual = datetime.datetime.now()
                    data_hora_atual_formatado = data_hora_atual.strftime('%d/%m/%Y %H:%M')
                    numero_conta = random.randint(10000000,99999999)
                    print(numero_conta)
                #Retorna a versão atual do SQL / infos de sistema do banco
                    db_info = mydb.get_server_info()
                    
