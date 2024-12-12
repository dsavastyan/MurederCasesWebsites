import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

const apiRoute = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    console.error(error);
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req: NextApiRequest & { file?: Express.Multer.File }, res: NextApiResponse) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const filePath = path.join(process.cwd(), 'uploads', req.file.filename);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const scriptPath = path.join(process.cwd(), 'scripts', 'model.py');

    const pythonProcess = spawn('python3', [scriptPath, fileContent], {
      env: { ...process.env },
    });

    let pythonOutput = '';
    let pythonError = '';

    pythonProcess.stdout.on('data', (data) => {
      pythonOutput += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      pythonError += data.toString();
    });

    pythonProcess.on('close', (code) => {
      // Delete the uploaded file after processing
      fs.unlinkSync(filePath);

      if (code === 0) {
        try {
          const parsedOutput = JSON.parse(pythonOutput);
          res.status(200).json({
            message: 'File successfully processed!',
            modelResponse: parsedOutput,
          });
        } catch (parseError) {
          console.error('JSON Parse Error:', parseError);
          res.status(500).json({ message: 'Error parsing model response' });
        }
      } else {
        console.error(`Python script exited with code ${code}: ${pythonError}`);
        res.status(500).json({ message: 'Error processing the file with the model' });
      }
    });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ message: 'Server encountered an error' });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;
