'use client';

import { PlusIcon } from 'lucide-react';
import { NewSuggestions } from './newSuggestions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSuggestion } from '../actions';

export default function SuggestionsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleNewSuggestion = async (message: string, tag: string, isAnonymous: boolean) => {
    // Reset error state
    setError(null);
    
    // Validate inputs
    if (!message.trim()) {
      setError("Please enter a suggestion");
      return;
    }
    
    if (!tag.trim()) {
      setError("Please enter a tag");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create FormData to send to the server action
      const formData = new FormData();
      formData.append('suggestion', message);
      formData.append('tag', tag);
      formData.append('isAnonymous', isAnonymous.toString());
      
      // Call the server action
      const result = await createSuggestion(formData);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to submit suggestion');
      }
      
      alert('Suggestion submitted successfully!');
      router.push('/suggestions');
      router.refresh();
      
    } catch (err) {
      console.error('Error submitting suggestion:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      // Always reset submitting state, even if there's an error
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Vi ønsker dine innspill
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Skriv et forslag til oss
          </p>
        </div>

        <div className="p-6">
          <div className="bg-blue-50 dark:bg-gray-800/50 border border-blue-200 dark:border-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <PlusIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                Nytt forslag
              </h2>
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <NewSuggestions onSend={handleNewSuggestion} />
            
            {isSubmitting && (
              <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
                Submitting...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
