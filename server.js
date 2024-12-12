const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client.html');
});

app.post('/upload', upload.single('file'), async (req, res) => {
    console.log('Файл загружен');

    const filePath = path.join(__dirname, 'uploads', req.file.filename);

    try {
        // Чтение текста из файла
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        // Запуск Python-скрипта и передача текста
        const pythonProcess = spawn('python3', ['model.py', fileContent]);

        let pythonOutput = '';

        pythonProcess.stdout.on('data', (data) => {
            pythonOutput += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Ошибка Python-скрипта: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                console.log('Ответ модели:', pythonOutput.trim());
                res.json({
                    message: 'Файл успешно обработан!',
                    modelResponse: pythonOutput.trim(),
                });
            } else {
                res.status(500).json({ message: 'Ошибка обработки модели' });
            }
        });
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json({ message: 'Ошибка обработки файла' });
    }
});

// Запуск сервера
app.listen(3333, () => {
    console.log('Сервер запущен на http://localhost:3333');
});
