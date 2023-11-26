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
