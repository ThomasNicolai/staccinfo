'use client';

import * as React from 'react';
import { FileText, PlusIcon } from 'lucide-react';
import { NewSuggestions } from './newSuggestions';

// To be moved to appropriate api or database file.
type NewSuggestionDTO = {
  suggestion: string;
  files: File[];
};

export default function SuggestionsPage() {
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
      </div>
    </div>
  );
}
