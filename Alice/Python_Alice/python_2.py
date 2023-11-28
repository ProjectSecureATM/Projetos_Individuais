import platform
import subprocess
from pywin32 import win32evtlog 

s_o_info = platform.system()

if (s_o_info == 'Linux'):

    def ler_logs_autenticacao_linux():
        # Usando o comando `journalctl` para obter os logs de autenticação no Linux
        command = "journalctl _COMM=sshd --since yesterday"  # Filtra por logs do serviço SSH (sshd) desde ontem
        result = subprocess.run(command, shell=True, text=True, capture_output=True)
    
        if result.returncode == 0:
            print(result.stdout)
        else:
            print("Erro ao ler logs de autenticação no Linux.")
    
    if __name__ == "__main__":
        ler_logs_autenticacao_linux
else:
    def read_windows_login_logs():
        hand = win32evtlog.OpenEventLog(None, "Security")

        total = win32evtlog.GetNumberOfEventLogRecords(hand)

        events = win32evtlog.ReadEventLog(hand, win32evtlog.EVENTLOG_BACKWARDS_READ | win32evtlog.EVENTLOG_SEQUENTIAL_READ, 0)

        for event in events:
            event_id = event.EventID
            event_time = event.TimeGenerated.Format()
            event_source = event.SourceName

            # Filtrando eventos de logon (evento ID 4624)
            if event_id == 4624:
                print(f"Event ID: {event_id}")
                print(f"Event Time: {event_time}")
                print(f"Event Source: {event_source}")
                print("-" * 50)

        win32evtlog.CloseEventLog(hand)

    if __name__ == "__main__":
        read_windows_login_logs()
    
    
