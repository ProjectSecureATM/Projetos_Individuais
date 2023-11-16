import platform
import datetime

class USBMonitor:
    def __init__(self):
        self.current_os = platform.system()
        self.last_devices = self.get_devices()
        self.last_update_time = datetime.datetime.now()

    def get_devices(self):
        if self.current_os == 'Windows':
            try:
                import pywinusb.hid as hid
                return hid.find_all_hid_devices()
            except ImportError:
                print("A biblioteca pywinusb não está instalada. Por favor, instale-a para usar esta funcionalidade.")
                return []
        elif self.current_os == 'Linux':
            try:
                import pyudev
                context = pyudev.Context()
                return list(context.list_devices(subsystem='usb'))
            except ImportError:
                print("A biblioteca pyudev não está instalada. Por favor, instale-a para usar esta funcionalidade.")
                return []
        else:
            print("Este sistema operacional não é suportado para listar dispositivos USB.")
            return []

    def list_usb_devices(self):
        print("===================")
        print("Dispositivos USB encontrados:")
        for device in self.last_devices:
            if self.current_os == 'Windows':
                print(f"Produto: {device.product_name}, Fabricante: {device.vendor_name}")
            elif self.current_os == 'Linux':
                print(f"Dispositivo: {device.device_path}, Tipo: {device.device_type}, ID do Produto: {device.get('ID_MODEL')}, ID do Fabricante: {device.get('ID_VENDOR')}")

        print("===================")
        print(f"Última vez atualizado: {self.last_update_time.strftime('%H:%M')}")

    def show_device_history(self):
        print("===================")
        print("Histórico de dispositivos conectados:")
        if self.last_devices:
            for device in self.last_devices:
                if self.current_os == 'Windows':
                    print(f"Produto: {device.product_name}, Fabricante: {device.vendor_name}")
                elif self.current_os == 'Linux':
                    print(f"Dispositivo: {device.device_path}, Tipo: {device.device_type}, ID do Produto: {device.get('ID_MODEL')}, ID do Fabricante: {device.get('ID_VENDOR')}")
        else:
            print("Nenhum dispositivo USB foi conectado.")

    def run(self):
        print("Bem-vindo ao Monitor de Dispositivos USB!")
        while True:
            print("===================")
            print("Escolha uma opção:")
            print("1 - Atualizar Lista")
            print("2 - Histórico de Dispositivos Conectados")
            print("3 - Sair")
            escolha = input("Digite o número correspondente à opção desejada: ")
            
            if escolha == '1':
                self.last_devices = self.get_devices()
                self.last_update_time = datetime.datetime.now()
                self.list_usb_devices()
            elif escolha == '2':
                self.show_device_history()
            elif escolha == '3':
                print("Encerrando o monitor de dispositivos USB.")
                break
            else:
                print("Opção inválida. Tente novamente.")

if __name__ == "__main__":
    usb_monitor = USBMonitor()
    usb_monitor.run()
