'use client'

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";

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
      setFileName(`File selected: ${file.name}`);
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }
    } else {
      setFileName('No file selected');
    }
    setIsDragging(false);
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
        alert('File successfully uploaded and processed!');
      } else {
        setError(data.message || 'An error occurred during upload.');
        alert(data.message || 'An error occurred during upload.');
      }
    } catch (err) {
      console.error('Upload Error:', err);
      setError('An unexpected error occurred.');
      alert('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="max-w-md mx-auto bg-white rounded-2xl p-10 shadow-lg text-center hover:scale-105 transition transform duration-300 ease-in-out hover:shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload a File</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <label htmlFor="file" className="block text-lg text-gray-700 mb-3">
            Select a file:
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
            aria-label="File upload area. Click or drag and drop a file to upload."
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
            Choose a file from your computer
          </Button>
          
          <Button 
            type="submit" 
            className="w-full bg-[#00bcd4] text-white mt-3 hover:bg-[#8e24aa]"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </Button>
        </form>

        {modelResponse && (
          <div className="mt-5 p-4 bg-gray-100 rounded-lg text-left">
            <h3 className="text-xl font-semibold mb-2">Model Response:</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(modelResponse, null, 2)}</pre>
          </div>
        )}

        {error && (
          <div className="mt-5 p-4 bg-red-100 rounded-lg text-left">
            <h3 className="text-xl font-semibold mb-2">Error:</h3>
            <p>{error}</p>
          </div>
        )}

        <div className="mt-5 text-sm text-gray-500">© 2024 Your Website</div>
      </div>
    </div>
  );
}
