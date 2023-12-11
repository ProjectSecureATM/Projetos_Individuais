import psutil
import mysql.connector
from datetime import date, datetime



while True:
    # FK do ATM associado a leitura em banco
    fk_atm = input("Qual ATM deve ser monitorado?")
    
    resposta = input("Quer ver os dados? (s/n): ")
    if resposta == "s":

        #Configurações específicas do banco de dados
        mydb = mysql.connector.connect(
        host='localhost',
        port="3306",
        user="root",
        password="root",
        database='secureatm'
        )
        
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

        try:
            if mydb.is_connected():
                print("Banco conectado")
                # Lista de variáveis que carregam os dados colhidos que serão inseridos nessa iteração EM ORDEM
                dados_insert = [data_hora_formatada, ram_percent, 1, fk_atm , 3]
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
        #configura mensagem padrão de erro utilizando a Exception trazida pelo Python        
        except Exception as e:
            print("Erro durante o insert:", e)
        finally:
            # Fecha cursor e conexão idependente do sucesso na inserção
            if mydb.is_connected():
                mycursor.close()
                mydb.close()
    else: break
