'use client'

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";

interface ModelResponse {
  [key: string]: string;
}

export function UploadSection() {
  const [fileName, setFileName] = useState('Перетащите файл сюда или выберите для загрузки');
  const [isDragging, setIsDragging] = useState(false);
  const [modelResponse, setModelResponse] = useState<ModelResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? `Файл выбран: ${file.name}` : 'Файл не выбран');
    setModelResponse(null);
    setError(null);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setFileName(`Файл выбран: ${file.name}`);
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }
    } else {
      setFileName('Файл не выбран');
    }
    setIsDragging(false);
    setModelResponse(null);
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fileInputRef.current?.files?.[0]) {
      alert('Пожалуйста, выберите файл для загрузки.');
      return;
    }

    const formData = new FormData();
    formData.append('file', fileInputRef.current.files[0]);

    setLoading(true);
    setError(null);
    setModelResponse(null);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setModelResponse(data.modelResponse);
        alert('Файл успешно загружен и обработан!');
      } else {
        setError(data.message || 'Произошла ошибка при загрузке.');
        alert(data.message || 'Произошла ошибка при загрузке.');
      }
    } catch (err) {
      console.error('Ошибка загрузки:', err);
      setError('Произошла неожиданная ошибка.');
      alert('Произошла неожиданная ошибка.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="max-w-md mx-auto bg-white rounded-2xl p-10 shadow-lg text-center hover:scale-105 transition transform duration-300 ease-in-out hover:shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Загрузить файл</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <label htmlFor="file" className="block text-lg text-gray-700 mb-3">
            Выберите файл:
          </label>
          
          <div 
            className={`bg-gray-100 border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all duration-300 ease-in-out ${
              isDragging 
                ? 'bg-[#e0f7fa] border-[#8e24aa]' 
                : 'hover:bg-[#e0f7fa] hover:border-[#8e24aa] border-[#00bcd4]'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
            aria-label="Область для загрузки файла. Нажмите или перетащите файл для загрузки."
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                fileInputRef.current?.click();
              }
            }}
          >
            <input 
              type="file" 
              id="file" 
              name="file" 
              required 
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <p className="text-gray-600 text-base">{fileName}</p>
          </div>
          
          <Button 
            type="button" 
            className="w-full bg-[#00bcd4] text-white mt-3 hover:bg-[#8e24aa]"
            onClick={() => fileInputRef.current?.click()}
          >
            Выберите файл на компьютере
          </Button>
          
          <Button 
            type="submit" 
            className="w-full bg-[#00bcd4] text-white mt-3 hover:bg-[#8e24aa]"
            disabled={loading}
          >
            {loading ? 'Загрузка...' : 'Загрузить'}
          </Button>
        </form>

        {modelResponse && (
          <div className="mt-5 p-4 bg-gray-100 rounded-lg text-left">
            <h3 className="text-xl font-semibold mb-2">Ответ модели:</h3>
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2">Вопрос</th>
                  <th className="border border-gray-400 p-2">Ответ</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(modelResponse).map(([question, answer]) => (
                  <tr key={question}>
                    <td className="border border-gray-400 p-2">{question}</td>
                    <td className="border border-gray-400 p-2">{answer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {error && (
          <div className="mt-5 p-4 bg-red-100 rounded-lg text-left">
            <h3 className="text-xl font-semibold mb-2">Ошибка:</h3>
            <p>{error}</p>
          </div>
        )}

      </div>
    </div>
  );
}
