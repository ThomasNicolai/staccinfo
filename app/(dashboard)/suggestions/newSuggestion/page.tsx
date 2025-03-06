'use client';

import * as React from 'react';
import { FileText, PlusIcon } from 'lucide-react';
import { NewSuggestions } from '../newSuggestions';

// To be moved to appropriate api or database file.
type NewSuggestionDTO = {
  suggestion: string;
  files: File[];
};

export default function SuggestionsPage() {
  const handleNewSuggestion = (message: string, files: File[]) => {
    const newSuggestion: NewSuggestionDTO = {
      suggestion: message,
      files: files
    };
    console.log(newSuggestion);
    alert('sending new suggestion to api');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Vi ønsker dine innspill
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Skriv et forslag til oss, du kan legge til én eller flere filer.
          </p>
        </div>

        {/* "Module Card" */}
        {/* <div className="flex items-center gap-2 bg-blue-600/10 p-3 rounded-lg border border-blue-600/20 hover:bg-blue-600/20 transition-colors">
          <FileText className="text-orange-600 w-5 h-5" />
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Data manager
          </span>
        </div> */}
        <div className="p-6">
          <div className="bg-blue-50 dark:bg-gray-800/50 border border-blue-200 dark:border-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <PlusIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                Nytt forslag
              </h2>
            </div>
            <NewSuggestions onSend={handleNewSuggestion} />
          </div>
        </div>
      </div>
    </div>
  );
}
