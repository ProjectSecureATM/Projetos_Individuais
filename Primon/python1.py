import importlib

# Tenta importar o módulo pyusb
try:
    importlib.import_module('usb.core')
except ImportError:
    print("O módulo pyusb não está instalado. Instalando agora...")

    import subprocess
    import sys

    try:
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'pyusb'])
    except subprocess.CalledProcessError as e:
        print("Ocorreu um erro ao instalar o pyusb:", e)
        exit()

# Agora importe o módulo pyusb após a tentativa de instalação
import usb.core

# Resto do seu código para listar dispositivos USB
def listar_dispositivos_usb():
    dispositivos = usb.core.find(find_all=True)
    
    if dispositivos is None:
        print("Nenhum dispositivo USB encontrado.")
        return
    
    for dispositivo in dispositivos:
        fabricante = usb.util.get_string(dispositivo, dispositivo.iManufacturer)
        modelo = usb.util.get_string(dispositivo, dispositivo.iProduct)
        print(f"Fabricante: {fabricante}, Modelo: {modelo}")

# Chamando a função para listar dispositivos USB
listar_dispositivos_usb()
