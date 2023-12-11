import psutil
import mysql.connector
from datetime import date, datetime
import time


# Pergunta ao usuário apenas uma vez
fk_atm = input("Qual ATM deve ser monitorado?")


# Pergunta ao usuário se deseja ver os dados uma vez fora do loop
resposta = input("Quer ver os dados? (s/n): ")
if resposta == "s":
    while True:

        mydb = mysql.connector.connect(
        host='localhost',
        port="3306",
        user="root",
        password="root",
        database='secureatm'
        )

        if mydb.is_connected():
                print("Banco conectado")

                ram_percent = psutil.virtual_memory().percent
                data_atual = date.today()

                # Formate a data no formato apropriado para MySQL (YYYY-MM-DD)
                data_formatada = data_atual.strftime('%Y-%m-%d')

                # Obtenha a hora atual
                hora_atual = datetime.now()

                # Formate a hora no formato apropriado para MySQL (HH:MM:SS)
                hora_formatada = hora_atual.strftime('%H:%M:%S')

                # Junte a data e a hora formatadas
                data_hora_formatada = '{} {}'.format(data_formatada, hora_formatada)

                # Lista de variáveis que carregam os dados colhidos que serão inseridos nessa iteração EM ORDEM
                dados_insert = [data_hora_formatada, ram_percent, 1, fk_atm, 3]

                # Retorna a versão atual do SQL / infos de sistema do banco
                db_info = mydb.get_server_info()

                # Abre cursor permitindo inserção
                mycursor = mydb.cursor()

                # Inserção stringificada
                sql_query = "INSERT INTO leitura (DataRegistro, Valor, Componente_ID, ATMComp_ID, APIID) VALUES (%s,%s,%s,%s,%s)"

                # Cursor executa a query e é feito o commit da transação
                mycursor.execute(sql_query, dados_insert)

                # Commit para efetivar a transação
                mydb.commit()

                # Fecha cursor e conexão idependente do sucesso na inserção
                if mydb.is_connected():
                    mycursor.close()

                # Intervalo de 4 segundos
                time.sleep(4)
                
                if mydb.is_connected():
                    mydb.close()
else:
    print("Programa encerrado.")
