apiRoute.post(async (req: any, res: NextApiResponse) => {
  // ... existing code ...

  try {
    const responses: Record<string, string> = {};
    for (const question of questions) {
      const messages = [
        {
          role: "user",
          content: `Текст: ${fileContent.slice(0, 5000)}...\nВопрос: ${question}`,
        },
      ];

      const chatResponse = await client.chat({ model: "mistral-large-latest", messages });
      const answer = chatResponse.choices?.[0]?.message?.content?.trim();

      if (!answer) {
        throw new Error(`No answer returned for question: ${question}`);
      }

      responses[question] = answer;
    }

    res.status(200).json({
      message: "File successfully processed!",
      modelResponse: responses, // Key-value structure
    });
  } catch (error: any) {
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});
