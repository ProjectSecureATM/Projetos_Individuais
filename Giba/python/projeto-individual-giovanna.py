import psutil
import mysql.connector
import pymssql
from datetime import datetime, timedelta
import time

def autenticar_usuario(mycursor, email, senha):
    sql_query = "SELECT idUsuario FROM Usuario WHERE Email = %s AND Senha = %s"
    mycursor.execute(sql_query, (email, senha))
    result = mycursor.fetchone()
    return result

def exibir_atms_disponiveis(mycursor):
    mycursor.execute("SELECT idATM, Modelo FROM ATM")
    atms_disponiveis = mycursor.fetchall()
    print("ATMs disponíveis para monitoramento:")
    for atm in atms_disponiveis:
        print(f"ATM ID: {atm[0]}, Modelo: {atm[1]}")

def get_atm_info(mycursor, atm_id):
    sql_query = "SELECT fkAgenciaEmp, AgenciaID FROM ATM WHERE idATM = %s"
    mycursor.execute(sql_query, (atm_id,))
    result = mycursor.fetchone()
    return result

def get_uptime():
    uptime_seconds = psutil.boot_time()
    uptime_timedelta = datetime.now() - datetime.fromtimestamp(uptime_seconds)
    return uptime_timedelta

def format_timedelta(td):
    days, seconds = td.days, td.seconds
    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    seconds = seconds % 60
    return f"{days} dias, {hours} horas, {minutes} minutos, {seconds} segundos"

mysql_db = mysql.connector.connect(host='localhost', port="3306", user="giba", password="fgandb25", database='secureATM')

sql_server_db = pymssql.connect(
    server='18.204.118.27',
    user='sa',
    password='Secure2023',
    database='secureATM'
)

if mysql_db.is_connected() and sql_server_db:

    print("------------------------------------------------------------")
    print("| Bem-vindo(a) à Secure ATM. Por favor, faça o login.       |")
    print("------------------------------------------------------------")

    email = input("Digite o seu e-mail: ")
    senha = input("Digite a sua senha: ")

    mycursor_mysql = mysql_db.cursor()
    usuario_autenticado = autenticar_usuario(mycursor_mysql, email, senha)

    if usuario_autenticado:
        print("\nOlá! Selecione o ATM que você quer monitorar:")

        exibir_atms_disponiveis(mycursor_mysql)

        atm_escolhido = input("Escolha o ATM pelo ID para monitorar:")

        atm_info = get_atm_info(mycursor_mysql, atm_escolhido)
        
        if atm_info:
            fk_AgenciaEmpresa, fk_ATMAgencia = atm_info
            print("\nMonitoramento iniciado.")

            while True:
                uptime = get_uptime()
                formatted_uptime = format_timedelta(uptime)

                cpu_percent = psutil.cpu_percent()
                ram_percent = psutil.virtual_memory().percent
                disk_percent = psutil.disk_usage('/').percent

                print("-----------------------------------------")
                print(f"| Tempo de atividade do sistema: {formatted_uptime} |")

                mycursor_mysql.execute("INSERT INTO tempoAtividade (atividade, fk__idATM, fk__ATMAgencia, fk__AgenciaEmpresa) VALUES (%s, %s, %s, %s)",
                                       (str(formatted_uptime), atm_escolhido, fk_ATMAgencia, fk_AgenciaEmpresa))
                mysql_db.commit()

                cursor_sql_server = sql_server_db.cursor()
                cursor_sql_server.execute("INSERT INTO tempoAtividade (atividade, fk__idATM, fk__ATMAgencia, fk__AgenciaEmpresa) VALUES (%s, %s, %s, %s)",
                                          (str(formatted_uptime), atm_escolhido, fk_ATMAgencia, fk_AgenciaEmpresa))
                sql_server_db.commit()

                cursor_sql_server.execute("INSERT INTO Leitura (DataRegistro, Valor, Componente_ID, ATMComp_ID, APIID) VALUES (CURRENT_TIMESTAMP, %s, 3, %s, 2)",
                                          (cpu_percent, atm_escolhido))
                sql_server_db.commit()

                cursor_sql_server.execute("INSERT INTO Leitura (DataRegistro, Valor, Componente_ID, ATMComp_ID, APIID) VALUES (CURRENT_TIMESTAMP, %s, 1, %s, 2)",
                                          (ram_percent, atm_escolhido))
                sql_server_db.commit()

                cursor_sql_server.execute("INSERT INTO Leitura (DataRegistro, Valor, Componente_ID, ATMComp_ID, APIID) VALUES (CURRENT_TIMESTAMP, %s, 2, %s, 2)",
                                          (disk_percent, atm_escolhido))
                sql_server_db.commit()

                print(f"CPU: {cpu_percent}% | RAM: {ram_percent}% | Disco: {disk_percent}%")

                time.sleep(10)
else:
    print("Não foi possível conectar ao banco de dados.")

mysql_db.close()
sql_server_db.close()
