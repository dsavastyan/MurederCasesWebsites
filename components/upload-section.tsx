'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

export function UploadSection() {
  const [fileName, setFileName] = useState('Drag and drop a file here or select a file to upload')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setFileName(file ? `File selected: ${file.name}` : 'No file selected')
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.currentTarget.style.backgroundColor = '#e0f7fa'
    event.currentTarget.style.borderColor = '#8e24aa'
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.style.backgroundColor = '#f5f5f5'
    event.currentTarget.style.borderColor = '#00bcd4'
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    setFileName(file ? `File selected: ${file.name}` : 'No file selected')
    event.currentTarget.style.backgroundColor = '#f5f5f5'
    event.currentTarget.style.borderColor = '#00bcd4'
  }

  return (
    <div className="container">
      <div className="max-w-md mx-auto bg-white rounded-2xl p-10 shadow-lg text-center transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload a File</h2>
        <form action="/upload" method="POST" encType="multipart/form-data">
          <label htmlFor="file" className="block text-lg text-gray-700 mb-3">
            Select a file:
          </label>
          
          <div 
            className="bg-gray-100 border-2 border-dashed border-[#00bcd4] rounded-xl p-8 cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#e0f7fa] hover:border-[#8e24aa]"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              id="file" 
              name="file" 
              required 
              className="hidden"
              onChange={handleFileChange}
            />
            <p className="text-gray-600 text-base">{fileName}</p>
          </div>
          
          <Button 
            type="button" 
            className="w-full bg-[#00bcd4] text-white mt-3 hover:bg-[#8e24aa]"
            onClick={() => document.getElementById('file')?.click()}
          >
            Choose a file from your computer
          </Button>
          
          <Button 
            type="submit" 
            className="w-full bg-[#00bcd4] text-white mt-3 hover:bg-[#8e24aa]"
          >
            Upload
          </Button>
        </form>
        <div className="mt-5 text-sm text-gray-500">© 2024 Your Website</div>
      </div>
    </div>
  )
}
