import Link from 'next/link';
import { SuggestionItem } from './suggestionItem';
import { PlusIcon } from 'lucide-react';
import { getSuggestions } from '@/lib/db';

export default async function SuggestionsPage() {
  // Fetch real suggestions from the database
  const suggestions = await getSuggestions();

  return (
    <div className="background min-h-screen p-4 pt-48">
      {/* Header Container with consistent rounded edges */}
      <div className="w-1/3 h-48 mt-4 rounded-xl mx-auto p-4 mb-4 bg-white border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl text-center font-bold text-gray-800 dark:text-gray-200">
          Vi ønsker dine innspill
        </h1>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-2">
          Skriv et forslag til oss
        </p>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-2">
          Du kan legge til én eller flere filer
        </p>
      </div>
      {/* Flex container for the boxes */}
      <div className="flex h-56 space-x-4 mt-6 px-4">
        {/* New Suggestion Button */}
        <Link href="suggestions/new" className="flex-1 block">
          <button className="w-full h-full bg-blue-500 hover:bg-blue-600 text-white text-left rounded-xl items-start justify-between p-2">
            <span> Nytt forslag</span>
            <PlusIcon className="h-5 w-5" />
          </button>
        </Link>
        {/* Suggestion Items Container */}
        <div className="flex-1 bg-white p-4 border border-gray-200 rounded-xl">
          {suggestions.map((item) => (
            <SuggestionItem
              key={item.id}
              suggestion={{ id: item.id, suggestion: item.text }}
            />
          ))}
        </div>
        {/* Other Boxes with the same rounding */}
        <div className="flex-1 bg-white p-4 border border-gray-200 rounded-xl">
          Boks 3
        </div>
        <div className="flex-1 bg-white p-4 border border-gray-200 rounded-xl">
          Boks 4
        </div>
      </div>
    </div>
  );
}
