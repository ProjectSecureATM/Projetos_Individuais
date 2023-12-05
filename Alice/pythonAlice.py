import os
import time

def criar_pasta(nome_pasta_destino):
    os.makedirs(nome_pasta_destino, exist_ok=True)

def extrair_logs_do_kotlin_em_tempo_real(arquivo_kotlin, nome_pasta_destino):
    criar_pasta(nome_pasta_destino)

    indice = 0
    
    while True:
        with open(arquivo_kotlin, 'r') as arquivo:
            for indice, linha in enumerate(arquivo):
                if "Usuário falhou na autenticação." in linha:
                    log = linha.strip()

                    # Criar um nome de arquivo baseado no índice e no conteúdo do log
                    nome_arquivo = f"log_{indice + 1}.txt"
                    
                    # Caminho completo para o novo arquivo
                    caminho_arquivo = os.path.join(nome_pasta_destino, nome_arquivo)

                    # Salvar o log no novo arquivo
                    with open(caminho_arquivo, 'w') as arquivo_destino:
                        arquivo_destino.write(log + '\n')

                    print(f"Log {indice + 1} salvo em {caminho_arquivo}")

        time.sleep(1)

if __name__ == "__main__":
    caminho_do_arquivo_kotlin = "C:\\Users\\VkSenes\\OneDrive\\Documentos\\Alice_SPtech\\Semestre 2\\Sprint2 - P.I\\Projetos_Individuais\\Alice\\kotlinAlice\\src\\main\\kotlin\\app\\Main.kt"
    nome_pasta_destino = "Logs"

    extrair_logs_do_kotlin_em_tempo_real(caminho_do_arquivo_kotlin, nome_pasta_destino)

    
   
       
