import os
import sys
import json
from mistralai import Mistral

def main():
    if len(sys.argv) < 2:
        print("Не передан текст для анализа")
        sys.exit(1)

    text = sys.argv[1]

    # Read API key from environment variable
    api_key = os.getenv("MISTRAL_API_KEY")
    if not api_key:
        print("API key not found")
        sys.exit(1)

    model = "mistral-large-latest"
    client = Mistral(api_key=api_key)

    questions = [
        "Пол жертвы?",
        "Пол преступника?",
        "Дата происшествия?",
        "Город происшествия?"
    ]

    responses = {}
    for question in questions:
        chat_response = client.chat.complete(
            model=model,
            messages=[
                {
                    "role": "user",
                    "content": f"Текст: {text[:500]}...\nВопрос: {question}",
                },
            ]
        )
        responses[question] = chat_response.choices[0].message.content.strip()

    print(json.dumps(responses, ensure_ascii=False))

if __name__ == "__main__":
    main()
