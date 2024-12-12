const MistralClient = require('../lib/MistralClient');

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
    // Send the entire text without slicing
    const messages = [
      {
        role: "user",
        content: `Текст: ${text}\nВопрос: ${question}`
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
