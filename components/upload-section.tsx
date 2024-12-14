'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface ModelResponse {
  [key: string]: string;
}

export function UploadSection() {
  const [fileName, setFileName] = useState('Drag and drop a file here or select a file to upload');
  const [isDragging, setIsDragging] = useState(false);
  const [modelResponse, setModelResponse] = useState<ModelResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? `File selected: ${file.name}` : 'No file selected');
    setModelResponse(null);
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fileInputRef.current?.files?.[0]) {
      alert('Please select a file to upload.');
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
      } else {
        setError(data.message || 'An error occurred during upload.');
      }
    } catch (err) {
      console.error('Upload Error:', err);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="max-w-md mx-auto bg-white rounded-2xl p-10 shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload a File</h2>
        <form onSubmit={handleSubmit}>
          <div className="border-dashed border-2 border-gray-300 p-4 rounded-lg">
            <input
              type="file"
              id="file"
              name="file"
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <p className="text-gray-600">{fileName}</p>
            <Button onClick={() => fileInputRef.current?.click()} className="mt-4">
              Choose File
            </Button>
          </div>
          <Button type="submit" className="mt-4" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload'}
          </Button>
        </form>

        {error && (
          <div className="mt-4 text-red-500">
            <p>Error: {error}</p>
          </div>
        )}

        {modelResponse && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Analysis Results</h3>
            <table className="table-auto border-collapse border border-gray-300 mt-4 w-full">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-100">Question</th>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-100">Answer</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(modelResponse).map(([question, answer]) => (
                  <tr key={question}>
                    <td className="border border-gray-300 px-4 py-2">{question}</td>
                    <td className="border border-gray-300 px-4 py-2">{answer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
