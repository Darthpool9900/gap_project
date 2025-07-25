import sys
import requests

def traduzir_texto(texto: str) -> str:
    prompt = f"Traduza o seguinte texto do inglês para o português:\n\n\"{texto}\""

    try:
        resposta = requests.post(
            "http://localhost:11434/api/chat",
            json={
                "model": "gemma3",  # ou "gemma3"
                "messages": [
                    {"role": "user", "content": prompt}
                ],
                "stream": False
            }
        )

        data = resposta.json()
        traducao = data.get("message", {}).get("content", "Erro ao gerar tradução.")
        return traducao

    except Exception as e:
        return f"Erro ao conectar com o Ollama: {str(e)}"

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Erro: passe o texto para traduzir como argumento")
        sys.exit(1)
    texto_input = sys.argv[1]
    resultado = traduzir_texto(texto_input)
    print(resultado)
