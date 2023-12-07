import platform
import datetime
import mysql.connector
import psutil
import pywinusb.hid as hid
import pymssql
import time


class USBMonitor:
    def __init__(self):
        self.current_os = platform.system()
        self.conn_mysql = mysql.connector.connect(
            host='localhost',
            user='root',
            password='Ph993387998',
            database='SecureATM'
        )

        self.conn_sql_server = pymssql.connect(
            server='18.204.118.27',
            database='secureATM',
            user='sa',
            password='Secure2023'
        )
        self.cursor_mysql = self.conn_mysql.cursor()
        self.cursor_sql_server = self.conn_sql_server.cursor()

        self.last_devices = []
        self.last_update_time = datetime.datetime.now()

    def insert_or_get_id_from_codigo_componentes(self, componente):
        try:
            # Inserir ou obter ID do componente na tabela CodigoComponentes (SQL Server)
            query_sql_server_cc = '''
                IF NOT EXISTS (SELECT * FROM CodigoComponentes WHERE Componente = %s)
                BEGIN
                    INSERT INTO CodigoComponentes (Componente) VALUES (%s)
                    SELECT SCOPE_IDENTITY()
                END
                ELSE
                BEGIN
                    SELECT idCodComponentes FROM CodigoComponentes WHERE Componente = %s
                END
            '''
            self.cursor_sql_server.execute(query_sql_server_cc, (componente, componente, componente))
            self.conn_sql_server.commit()
            row = self.cursor_sql_server.fetchone()
            if row:
                return row[0]
        except pymssql.Error as error:
            print(f"Erro ao inserir ou obter ID do componente: {error}")
        return None

    def get_devices(self):
        try:
            devices = hid.find_all_hid_devices()

            for index, device in enumerate(devices):
                porta = f"Porta {index + 1}"
                produto = device.product_name if device.product_name else 'Desconhecido'
                fabricante = device.vendor_name if device.vendor_name else 'Desconhecido'

                # Obter ID do componente da tabela CodigoComponentes (SQL Server)
                fk_componente = self.insert_or_get_id_from_codigo_componentes(porta)

                if fk_componente is not None:
                    # Inserir informações na tabela DescricaoComponentes (SQL Server)
                    query_sql_server_dc = '''
                        INSERT INTO DescricaoComponentes (produto, fabricante, dataDia, fkComponente) VALUES (%s, %s, GETDATE(), %s)
                    '''
                    self.cursor_sql_server.execute(query_sql_server_dc, (produto, fabricante, fk_componente))
                    self.conn_sql_server.commit()

            self.last_devices = devices
            return devices
        except ImportError:
            print("A biblioteca pywinusb não está instalada. Por favor, instale-a para usar esta funcionalidade.")
            return []

    def list_usb_devices(self):
        cpu_usage, ram_usage = self.get_system_usage()

        print("===================")
        print("Dispositivos USB encontrados:")
        for device in self.last_devices:
            if self.current_os == 'Windows':
                print(f"Produto: {device.product_name}, Fabricante: {device.vendor_name}")
            elif self.current_os == 'Linux':
                print(f"Dispositivo: {device.device_path}, Tipo: {device.device_type}, ID do Produto: {device.get('ID_MODEL')}, ID do Fabricante: {device.get('ID_VENDOR')}")

        print("===================")
        print(f"Última vez atualizado: {self.last_update_time.strftime('%H:%M')}")
        print("Uso de CPU:")
        print(f"    {cpu_usage}%")
        print("Uso de RAM:")
        print(f"    {ram_usage}%")

    def get_system_usage(self):
        cpu_usage = psutil.cpu_percent()
        ram_usage = psutil.virtual_memory().percent

        try:
            # Inserir dados de CPU na tabela Leitura (SQL Server)
            query_sql_server_cpu = '''
                INSERT INTO Leitura (DataRegistro, Valor, Componente_ID, ATMComp_ID, APIID) VALUES (GETDATE(), %s, %s, %s, NULL)
            '''
            self.cursor_sql_server.execute(query_sql_server_cpu, (cpu_usage, 3, 1))
            self.conn_sql_server.commit()

            # Inserir dados de RAM na tabela Leitura (SQL Server)
            query_sql_server_ram = '''
                INSERT INTO Leitura (DataRegistro, Valor, Componente_ID, ATMComp_ID, APIID) VALUES (GETDATE(), %s, %s, %s, NULL)
            '''
            self.cursor_sql_server.execute(query_sql_server_ram, (ram_usage, 1, 1))
            self.conn_sql_server.commit()

        except pymssql.Error as error:
            print(f"Erro ao inserir na tabela Leitura (SQL Server): {error}")

        return cpu_usage, ram_usage

    def run(self):
        print("Bem-vindo ao Monitor de Dispositivos!")
        while True:
            print("===================")
            print("Escolha uma opção:")
            print("1 - Iniciar captura de dispositivos USB")
            print("2 - Sair")
            escolha = input("Digite o número correspondente à opção desejada: ")

            if escolha == '1':
                resposta = input("Deseja ligar a captura de USB? (S/N): ")
                if resposta.upper() == 'S':
                    while True:
                        self.get_devices()
                        self.list_usb_devices()
                        time.sleep(7)
                else:
                    print("Captura de USB não foi iniciada.")
            elif escolha == '2':
                print("Encerrando o monitor de dispositivos.")
                break
            else:
                print("Opção inválida. Tente novamente.")

        self.cursor_mysql.close()
        self.conn_mysql.close()
        self.cursor_sql_server.close()
        self.conn_sql_server.close()


if __name__ == "__main__":
    usb_monitor = USBMonitor()
    usb_monitor.run()
