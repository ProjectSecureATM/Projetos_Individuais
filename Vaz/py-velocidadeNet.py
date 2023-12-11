import speedtest
import mysql.connector
import time
import sqlite3
import socket
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from datetime import datetime

# Conectar ao banco de dados
connection = mysql.connector.connect(
    user='root',
    password='#Gf45217532807',
    host='localhost',
    database='SecureATM',
)

print('Seja bem-vindo ao sistema da Secure ATM')
time.sleep(3)
print('Faça seu cadastro para começar o seu monitoramento de rede!')
time.sleep(3)
print('-------------------------------------------------------------------')
print('')
time.sleep(2)

# Autenticar usuário no banco de dados
autenticado = False
while not autenticado:
    try:
        email = input("Digite seu e-mail de usuário: ") 
        senha = input("Digite sua senha: ")

        cursor = connection.cursor()
        cursor.execute("SELECT * FROM usuario WHERE email=%s AND senha=%s", (email, senha))
        resultado = cursor.fetchone()

        print("")
        time.sleep(1)
        print("Checando usuário no banco de dados, aguarde um instante...")
        time.sleep(3)
        
        if resultado:
            time.sleep(2)
            print("")
            print("Autenticação bem-sucedida!")
            time.sleep(2)
            print('-------------------------------------------------------------------')
            print("")
            time.sleep(2)
            autenticado = True
        else:
            time.sleep(2)
            print("Erro: E-mail ou senha incorretos. Tente novamente.")

    except Exception as e:
        print(f"Erro: {e}")
        # Você pode querer lidar com a exceção adequadamente, por exemplo, registrá-la e esperar antes da próxima tentativa

# Verificar se a conexão ao MySQL é bem-sucedida
if connection.is_connected():
    print("Conectando com o banco MySQL... ")
    print("")
    time.sleep(5)
    print("Conexão ao MySQL bem-sucedida!")
    print('-------------------------------------------------------------------')
    print("")
    time.sleep(3)

# Obter e exibir o número de máquinas no banco de dados
cursor = connection.cursor()
cursor.execute("SELECT COUNT(*) FROM ATM")
numero_maquinas_bd = cursor.fetchone()[0]

cursor.execute("SELECT COUNT(*) FROM agencia")
numero_agencia_bd = cursor.fetchone()[0]

cursor.execute("SELECT COUNT(*) FROM empresa")
numero_empresa_bd = cursor.fetchone()[0]

cursor.close()

# Obter a máquina desejada do usuário
print("Tudo certo para começar o monitoramento, por favor, siga corretamente as intruções.")
print("")
time.sleep(3)
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
        
print("")        
print(f"Número de agência(s) registrados no sistema: {numero_empresa_bd}")
while True:
    try:
        empresa_desejada = int(input("Digite o número da empresa que deseja: "))
        if 1 <= empresa_desejada <= numero_empresa_bd:
            break
        else:
            print(f"Por favor, digite um número válido entre 1 e {numero_empresa_bd}.")

    except ValueError:
        print("Por favor, digite um número válido para empresa.")

print("")
time.sleep(2)
print("Preparando sistema...")
time.sleep(5)
print("")
print("Tudo certo!! Seu monitoramento será incializado!")
time.sleep(2)
print('-------------------------------------------------------------------')
print("") 
print(f"Vamos monitorar o ATM {maquina_desejada}.") 

# Obtém o nome do host
host_name = socket.gethostname()

# Obtém o endereço IP associado ao nome do host
ip_address = socket.gethostbyname(host_name)

# Loop principal
while True:
    try:
        # Cria um cursor para executar operações no banco de dados
        cursor = connection.cursor()

        # Captura de Rede
        st = speedtest.Speedtest()

        velocidade_download = int(st.download())
        velocidade_DBanco = int(velocidade_download / 10**6)
        
        velocidade_upload = int(st.upload())
        velocidade_UBanco = int(velocidade_download / 10**6)
        
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
        

        sql_insercao = "INSERT INTO rede (IP, pacotesRecebidos, pacotesEnviados, Ping, fk__idATM, fk__ATMAgencia, data_hora) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(sql_insercao, [ip_address, velocidade_DBanco, velocidade_UBanco, ping, maquina_desejada,agencia_desejada, data_hora_atual])

        # Confirmar alterações e fechar a conexão
        connection.commit()
        cursor.close()

        # Aguardar algum tempo antes da próxima iteração

    except Exception as e:
        print(f"Erro: {e}")
        # Você pode querer lidar com a exceção adequadamente, por exemplo, registrá-la e esperar antes da próxima iteração
    time.sleep(2)  # Aguardar 3 segundos antes da próxima iteração
