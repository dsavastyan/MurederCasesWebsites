// model.js
require('dotenv').config(); // For local development; not needed on Vercel if env vars are set in the dashboard
const MistralClient = require('./MistralClient'); // Adjust this import path to where you place your MistralClient code

(async () => {
  const text = process.argv[2];
  if (!text) {
    console.error("Не передан текст для анализа");
    process.exit(1);
  }

  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    console.error("API key not found");
    process.exit(1);
  }

  const model = "mistral-large-latest";
  const questions = [
    "Пол жертвы?",
    "Пол преступника?",
    "Дата происшествия?",
    "Город происшествия?"
  ];

  const client = new MistralClient(apiKey);

  const responses = {};

  for (const question of questions) {
    // Build the messages array as per MistralClient requirements
    const messages = [
      {
        role: "user",
        content: `Текст: ${text.slice(0, 500)}...\nВопрос: ${question}`
      }
    ];

    try {
      const chatResponse = await client.chat({ model, messages });
      // Assuming the structure includes chatResponse.choices[0].message.content
      const answer = chatResponse.choices?.[0]?.message?.content?.trim();
      if (!answer) {
        console.error(`No answer returned for question: ${question}`);
        process.exit(1);
      }
      responses[question] = answer;
    } catch (error) {
      console.error(`Error querying Mistral for question "${question}":`, error.message);
      process.exit(1);
    }
  }

  console.log(JSON.stringify(responses, null, 2));
})();
