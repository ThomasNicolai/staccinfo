"use client";

import * as React from 'react';
import { 
  Layers, 
  FileText, 
  BarChart2, 
  Shield, 
  PlusIcon 
} from 'lucide-react';
import { ModuleCard } from './module-card';
import { NewSuggestions } from './newSuggestions';

export default function SuggestionsPage() {
  const handleSend = (message: string, files: File[]) => {
    let emailBody = message;

    // Add file information to the email body
    if (files.length > 0) {
      emailBody += '\n\nAttached files:\n';
      files.forEach(file => {
        emailBody += `- ${file.name} (${(file.size / 1024).toFixed(2)} KB)\n`;
      });
    }

    const mailtoLink = `mailto:ier@uib.no?subject=Suggestion&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Vi ønsker dine innspill
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Her får du fullstendig oversikt over dine moduler hos oss. Dersom du ønsker flere moduler kan du ta kontakt med oss.
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <ModuleCard 
              icon={<Layers className="text-blue-600 w-5 h-5" />} 
              title="Escall Financials" 
            />
            <ModuleCard 
              icon={<Shield className="text-green-600 w-5 h-5" />} 
              title="Escall risk management" 
            />
            <ModuleCard 
              icon={<BarChart2 className="text-purple-600 w-5 h-5" />} 
              title="Reports" 
            />
            <ModuleCard 
              icon={<FileText className="text-orange-600 w-5 h-5" />} 
              title="Data manager" 
            />
          </div>

          <div className="bg-blue-50 dark:bg-gray-800/50 border border-blue-200 dark:border-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <PlusIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Nytt forslag</h2>
            </div>
            <NewSuggestions onSend={handleSend} />
          </div>
        </div>
      </div>
    </div>
  );
}