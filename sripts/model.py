import os
import sys
import json
from mistralai import Mistral

# Получение текста из аргументов командной строки
if len(sys.argv) < 2:
    print("Не передан текст для анализа")
    sys.exit(1)

text = sys.argv[1]

api_key = "Ch7P1rLKIZ32oiGG6txt4S1HCN4y5TWr"
model = "mistral-large-latest"

client = Mistral(api_key=api_key)

# Вопросы, которые нужно задать модели
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

    # Сохраняем ответ модели
    responses[question] = chat_response.choices[0].message.content.strip()

# Выводим ответы в формате JSON
print(json.dumps(responses, ensure_ascii=False))
