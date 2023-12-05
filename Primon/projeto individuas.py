import platform
import datetime
import mysql.connector
import psutil

class USBMonitor:
    def __init__(self):
        self.current_os = platform.system()
        self.conn = mysql.connector.connect(
            host='localhost',
            user='root',
            #password='sptech',
            password='Ph993387998',
            database='SecureATM'
        )
        self.cursor = self.conn.cursor()
        self.last_devices = []
        self.last_update_time = datetime.datetime.now()

    def get_devices(self):
        if self.current_os == 'Windows':
            try:
                import pywinusb.hid as hid
                devices = hid.find_all_hid_devices()

                for index, device in enumerate(devices):
                    porta = f"Porta {index + 1}"
                    produto = device.product_name if device.product_name else 'Desconhecido'
                    fabricante = device.vendor_name if device.vendor_name else 'Desconhecido'

                    # Inserir informações na tabela CodigoComponentes
                    self.cursor.execute(
                        "INSERT IGNORE INTO CodigoComponentes (Componente) VALUES (%s)",
                        (porta,)
                    )

                    # Obter o ID do último componente inserido na tabela CodigoComponentes
                    self.cursor.execute("SELECT LAST_INSERT_ID()")
                    last_id = self.cursor.fetchone()[0]

                    # Inserir informações na tabela DescricaoComponentes
                    self.cursor.execute(
    "INSERT IGNORE INTO DescricaoComponentes (produto, fabricante, dataDia ,fkComponente) VALUES (%s, %s, NOW(), %s)",
    (produto, fabricante, last_id)
)

                self.conn.commit()
                self.last_devices = devices
                return devices
            except ImportError:
                print("A biblioteca pywinusb não está instalada. Por favor, instale-a para usar esta funcionalidade.")
                return []
    
    def get_system_usage(self):
        cpu_usage = psutil.cpu_percent()
        ram_usage = psutil.virtual_memory().percent

        try:
            # Inserir dados de CPU na tabela Leitura
            self.cursor.execute(
                "INSERT INTO Leitura (DataRegistro, Valor, Componente_ID, ATMComp_ID, APIID) VALUES (NOW(), %s, %s, %s, NULL)",
                (cpu_usage, 3, 1)  
            )

            # Inserir dados de RAM na tabela Leitura
            self.cursor.execute(
                "INSERT INTO Leitura (DataRegistro, Valor, Componente_ID, ATMComp_ID, APIID) VALUES (NOW(), %s, %s, %s, NULL)",
                (ram_usage, 1, 1)  
            )

            self.conn.commit()
        except mysql.connector.Error as error:
            print(f"Erro ao inserir na tabela Leitura: {error}")

        return cpu_usage, ram_usage

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

    def run(self):
        print("Bem-vindo ao Monitor de Dispositivos!")
        while True:
            print("===================")
            print("Escolha uma opção:")
            print("1 - Atualizar Lista de Dispositivos")
            print("2 - Mostrar Dispositivos")
            print("3 - Sair")
            escolha = input("Digite o número correspondente à opção desejada: ")
            
            if escolha == '1':
                self.get_devices()
                self.last_update_time = datetime.datetime.now()
                print("Lista Atualizada!")
            elif escolha == '2':
                self.list_usb_devices()
            elif escolha == '3':
                print("Encerrando o monitor de dispositivos.")
                break
            else:
                print("Opção inválida. Tente novamente.")

        self.cursor.close()
        self.conn.close()

if __name__ == "__main__":
    usb_monitor = USBMonitor()
    usb_monitor.run()
