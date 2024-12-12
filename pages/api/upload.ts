import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import multer from 'multer'
import MistralClient from '@/lib/MistralClient' // Adjust the import path if needed

// Use in-memory storage instead of disk
const upload = multer({ storage: multer.memoryStorage() })

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})

apiRoute.use(upload.single('file'))

apiRoute.post(async (req: any, res: NextApiResponse) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    // Convert file buffer to string
    const fileContent = req.file.buffer.toString('utf-8')

    const apiKey = process.env.MISTRAL_API_KEY
    if (!apiKey) {
      console.error('MISTRAL_API_KEY not set')
      return res.status(500).json({ message: 'Missing API key' })
    }

    const client = new MistralClient(apiKey)
    const questions = [
      "Пол жертвы?",
      "Пол преступника?",
      "Дата происшествия?",
      "Город происшествия?"
    ]

    const responses: Record<string, string> = {}
    for (const question of questions) {
      const messages = [
        {
          role: "user",
          content: `Текст: ${fileContent.slice(0, 500)}...\nВопрос: ${question}`
        }
      ]

      // Call the Mistral API via client
      const chatResponse = await client.chat({ model: "mistral-large-latest", messages })
      const answer = chatResponse.choices?.[0]?.message?.content?.trim()
      if (!answer) {
        throw new Error(`No answer returned for question: ${question}`)
      }
      responses[question] = answer
    }

    res.status(200).json({
      message: 'File successfully processed!',
      modelResponse: responses,
    })
  } catch (error: any) {
    console.error('Error in upload route:', error.message)
    res.status(500).json({ message: 'An unexpected error occurred.' })
  }
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apiRoute
