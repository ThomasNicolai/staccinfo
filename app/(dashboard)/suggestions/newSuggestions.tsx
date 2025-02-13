"use client";

import * as React from 'react';
import { WritingBox } from './writing-box';
import { cn } from '@/lib/utils';

interface NewSuggestionsProps {
  onSend: (message: string, files: File[]) => void;
  className?: string;
}

const NewSuggestions = React.forwardRef<HTMLDivElement, NewSuggestionsProps>(
  ({ onSend, className, ...props }, ref) => {
    const [files, setFiles] = React.useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFiles(Array.from(e.target.files));
      }
    };

    const handleMessageSend = (message: string) => {
      onSend(message, files);
      setFiles([]); // Clear files after sending
    };

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        <WritingBox onSend={handleMessageSend} />
        
        <div className="flex flex-col gap-2">
          <label 
            htmlFor="file-upload" 
            className="cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded text-center"
          >
            📎 Attach files
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          {files.length > 0 && (
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {files.map((file, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span>📄 {file.name}</span>
                  <button
                    onClick={() => setFiles(files.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

NewSuggestions.displayName = 'NewSuggestions';

export { NewSuggestions };