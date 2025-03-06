import Link from 'next/link';
import { SuggestionItem } from './suggestionItem';

// Dummy suggestions data
const dummyForslag = [
  {
    id: 1,
    suggestion: 'Dette er forslag nummer én'
  },
  {
    id: 2,
    suggestion: 'Dette er forslag nummer to'
  }
];

export default function SuggestionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mt-4">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Vi ønsker dine innspill
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Skriv et forslag til oss, du kan legge til én eller flere filer.
          </p>
        </div>
      </div>
      {/* "Nytt Forslag" Button */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <Link href="suggestions/new">Nytt Forslag</Link>
        </div>
      </div>
      {/* Render dummy suggestions using SuggestionItem */}
      <div className="max-w-4xl mx-auto space-y-4">
        {dummyForslag.map((forslag) => (
          <SuggestionItem key={forslag.id} suggestion={forslag} />
        ))}
      </div>
    </div>
  );
}
