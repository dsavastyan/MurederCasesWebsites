import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import MistralClient from "@/lib/MistralClient";

// Use in-memory storage instead of disk
const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    console.error("onError handler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  },
  onNoMatch(req, res) {
    console.log("onNoMatch handler triggered: Method not allowed:", req.method);
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("file"));

apiRoute.post(async (req: any, res: NextApiResponse) => {
  console.log("Upload endpoint hit");
  try {
    if (!req.file) {
      console.log("No file uploaded");
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("File uploaded, converting to string...");
    const fileContent = req.file.buffer.toString("utf-8");
    console.log("File content length:", fileContent.length);

    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      console.error("MISTRAL_API_KEY not set");
      return res.status(500).json({ message: "Missing API key" });
    }

    console.log("Instantiating MistralClient...");
    const client = new MistralClient(apiKey);

    const questions = [
      "Пол жертвы? (ответь только одно слово: мужской или женский, если указано,)",
      "Пол обвиняемого? (ответь только одно слово: мужской или женский, если указано)",
      "Дата преступления? (ответь только дату, если указано, без лишних слов)",
      "Город преступления? (ответь только город, если указано, без лишних слов)",
      "Оружие? (ответь только название оружия, если указано, без лишних слов)",
    ];

    // Create a mapping of displayed questions by removing text in brackets and "?"
    const displayQuestions = questions.map((q) =>
      q.replace(/\(.*?\)/g, "").replace(/\?/g, "").trim()
    );
    const responses: Record<string, string> = {};

    console.log("Processing questions:", questions);
    for (const [index, question] of questions.entries()) {
      console.log(`Asking question: ${question}`);
      const messages = [
        {
          role: "user",
          content: `Текст: ${fileContent.slice(0, 5000)}...\nВопрос: ${question}`,
        },
      ];

      try {
        console.log("Sending messages to Mistral:", messages);
        const chatResponse = await client.chat({
          model: "mistral-large-latest",
          messages,
        });

        console.log("chatResponse received:", JSON.stringify(chatResponse));
        const answer = chatResponse.choices?.[0]?.message?.content?.trim();
        console.log("Extracted answer:", answer);

        if (!answer) {
          console.error(`No answer returned for question: ${question}`);
          throw new Error(`No answer returned for question: ${question}`);
        }

        // Use the cleaned question for the response key
        responses[displayQuestions[index]] = answer;
      } catch (error) {
        console.error(`Error querying Mistral for question "${question}":`, error.message);
        throw new Error(`Failed to process question: ${question}`);
      }
    }

    console.log("All questions processed successfully.");
    console.log("Responses:", responses);

    res.status(200).json({
      message: "File successfully processed!",
      modelResponse: responses,
    });
  } catch (error: any) {
    console.error("Error in upload route:", error.message);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;
