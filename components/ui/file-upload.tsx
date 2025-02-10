"use client";
import React, { useState } from 'react';

export const FileUpload: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="mt-4">
      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Filer</div>
      <div className="flex items-center gap-2">
        <input 
          type="file" 
          className="hidden" 
          id="file-upload"
          onChange={handleFileChange}
        />
        <label 
          htmlFor="file-upload" 
          className="bg-blue-50 border border-blue-200 text-blue-700 px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-blue-100 transition-colors"
        >
          Last opp fil
        </label>
        {fileName && (
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-sm">
            <span className="text-gray-600">{fileName}</span>
            <button 
              onClick={() => setFileName(null)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};