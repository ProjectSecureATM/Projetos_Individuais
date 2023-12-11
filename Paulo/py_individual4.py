import psutil
import mysql.connector
from datetime import date, datetime
import time
import pymssql

# Pergunta ao usuário apenas uma vez
fk_atm = input("Qual ATM deve ser monitorado?")

# Pergunta ao usuário se deseja ver os dados uma vez fora do loop
resposta = input("Quer ver os dados? (s/n): ")
if resposta == "s":
    while True:

        sql_server_cnx = pymssql.connect(
        server='18.204.118.27',
        database='SecureATM',
        user='sa',
        password='Secure2023'
        )

        mydb = mysql.connector.connect(
        host='localhost',
        port="3306",
        user="root",
        password="#Gf48556583830",
        database='secureatm'
        )

        if mydb.is_connected():
                print("Banco conectado")
                # Abre cursores permitindo inserção
                mycursor = mydb.cursor()
                cursor_sql_server = sql_server_cnx.cursor()
                    
                #captura de dados
                ram_percent = psutil.virtual_memory().percent
                data_atual = date.today()
                print(ram_percent , data_atual)
                
                # Formate a data no formato apropriado para MySQL (YYYY-MM-DD)
                data_formatada = data_atual.strftime('%Y-%m-%d')

                # Obtenha a hora atual
                hora_atual = datetime.now()

                # Formate a hora no formato apropriado para MySQL (HH:MM:SS)
                hora_formatada = hora_atual.strftime('%H:%M:%S')

                # Junte a data e a hora formatadas
                data_hora_formatada = '{} {}'.format(data_formatada, hora_formatada)

                #dados usados para consulta no banco nessa iteração EM ORDEM
                dados_select = [fk_atm] 
                
                #configurar o APIID da api de kotlin
                mycursor.execute("SELECT  Valor FROM leitura WHERE ATMComp_ID=%s AND APIID=3 AND Componente_ID=1 ORDER BY leituraID desc limit 1;", dados_select)
                resultados = mycursor.fetchall()
                valor= float(resultados[0][0])
                print(valor)
                #print(f"Valor: {valor}, Data de Registro: {data_registro}")
                valor_final = (ram_percent + valor) / 2
                print(valor_final)
                
                # Lista de variáveis que carregam os dados colhidos que serão inseridos nessa iteração EM ORDEM
                dados_insert = (data_hora_formatada, valor_final, 1, fk_atm, 4)

                #Inserção stringificada
                sql_query = "INSERT INTO leitura (DataRegistro, Valor, Componente_ID, ATMComp_ID, APIID) VALUES (%s,%s,%s,%s,%s)"
                sql_server_query = "INSERT INTO leitura (DataRegistro, Valor, Componente_ID, ATMComp_ID, APIID) VALUES (%s,%s,%s,%s,%s)"

                #Cursor executa a query e é feito o commit da transação
                mycursor.execute(sql_query, dados_insert)
                cursor_sql_server.execute(sql_server_query, dados_insert)

                #Commit para efetivar a transação
                mydb.commit()
                sql_server_cnx.commit()
                # Fecha cursor e conexão idependente do sucesso na inserção
                if mydb.is_connected():
                        mydb.close()
                        sql_server_cnx.close()

                # Intervalo de 4 segundos
                time.sleep(4)
else:
    print("Programa encerrado.")
