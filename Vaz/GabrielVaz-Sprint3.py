import speedtest
import mysql.connector
import pymssql
import psutil
import time
import sqlite3
import socket
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from datetime import datetime

# Conectar ao banco de dados
sql_server_db = pymssql.connect(
    server='18.204.118.27',
    database='SecureATM',
    user='sa',
    password='Secure2023'
)


print("deu bom neguin")
cursor = sql_server_db.cursor()

cursor.execute("SELECT COUNT(*) FROM ATM")
numero_maquinas_bd = cursor.fetchone()[0]

cursor.execute("SELECT COUNT(*) FROM agencia")
numero_agencia_bd = cursor.fetchone()[0]

cursor.close()

# Loop para pegar agência e ATM
print(f"Número de ATM(s) registrados no sistema: {numero_maquinas_bd}")
while True:
    try:
        maquina_desejada = int(input("Digite o número do ATM que deseja monitorar:"))
        if 1 <= maquina_desejada <= numero_maquinas_bd:
            break
        else:
            print(f"Por favor, digite um número válido entre 1 e {numero_maquinas_bd}.")

    except ValueError:
        print("Por favor, digite um número válido para ATM.")
        
print("")
print(f"Número de agência(s) registrados no sistema: {numero_agencia_bd}")
while True:
    try:
        agencia_desejada = int(input("Digite o número da agência que deseja: "))
        if 1 <= agencia_desejada <= numero_agencia_bd:
            break
        else:
            print(f"Por favor, digite um número válido entre 1 e {numero_agencia_bd}.")
            
    except ValueError:
        print("Por favor, digite um número inteiro válido para a agência.")

# Obtém o nome do host
host_name = socket.gethostname()

# Obtém o endereço IP associado ao nome do host
ip_address = socket.gethostbyname(host_name)

# Loop Receber e mandar dados
while True:
    try:
        # Captura de Rede
        st = speedtest.Speedtest()

        velocidade_download = int(st.download())
        velocidade_DBanco = int(velocidade_download / 10**6)

        velocidade_upload = int(st.upload())
        velocidade_UBanco = int(velocidade_upload / 10**6)

        ping = int(st.results.ping)

        # Obtém a data e hora atual
        data_hora_atual = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        print("")
        print(f"Data e Hora da captação: {data_hora_atual}")
        print("")
        print(f"IP local do ATM que está tendo a captura: {ip_address}")
        print("")
        print(f"Latência (Ping): {ping} ms")
        print(f"Velocidade de Upload: {velocidade_UBanco} Mbps")
        print(f"Velocidade de Download: {velocidade_DBanco} Mbps")
        print('-------------------------------------------------------------------')

        cursor_sql_server = sql_server_db.cursor()
        cursor_sql_server.execute("INSERT INTO rede (IP, data_hora, pacotesRecebidos, pacotesEnviados, Ping, fk__ATMAgencia, fk__AgenciaEmpresa) VALUES (%s, %s, %s, %s, %s, %s, %s)", 
            (ip_address, data_hora_atual, velocidade_DBanco, velocidade_UBanco, ping, maquina_desejada, agencia_desejada))

        # Commit das alterações
        sql_server_db.commit()

    except Exception as e:
        print(f"Erro durante a captura e inserção de dados: {e}")

        # Fechar o cursor e a conexão ao banco de dados
        cursor.close()
        sql_server_db.close()
