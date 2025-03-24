'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { SuggestionItem } from './suggestionItem';

export type Suggestion = {
  id: number;
  text: string;
  tag: string;
  is_anonymous: boolean;
  created_at: Date;
  user_id: number;
};

export function SuggestionsClient({
  initialSuggestions,
  allTags
}: {
  initialSuggestions: Suggestion[];
  allTags: string[];
}) {
  // Just keep track of the selected tag and filtered suggestions
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [displayedSuggestions, setDisplayedSuggestions] =
    useState(initialSuggestions);

  // Simple handler for tag button clicks
  const handleTagClick = (tag?: string) => {
    setSelectedTag(tag);

    if (!tag) {
      // Show all suggestions when "All" is clicked
      setDisplayedSuggestions(initialSuggestions);
    } else {
      // Filter suggestions by the selected tag
      setDisplayedSuggestions(
        initialSuggestions.filter((suggestion) => suggestion.tag === tag)
      );
    }
  };

  return (
    <div className="background min-h-screen p-4 pt-16">
      {/* Header Container */}
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

      {/* Simple Tag Filter Buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <button
          onClick={() => handleTagClick(undefined)}
          className={`px-4 py-2 rounded-lg font-medium ${!selectedTag ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
        >
          Alle
        </button>

        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-4 py-2 rounded-lg font-medium ${selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Suggestions grid */}
      <div className="flex h-auto space-x-4 mt-6 px-4 flex-wrap">
        {/* New Suggestion Button */}
        <Link
          href="suggestions/new"
          className="flex-1 block min-w-[200px] mb-4"
        >
          <button className="w-full h-full bg-blue-500 hover:bg-blue-600 text-white text-left rounded-xl items-start justify-between p-4">
            <span>Nytt forslag</span>
            <PlusIcon className="h-5 w-5" />
          </button>
        </Link>

        {/* Display filtered suggestions */}
        {displayedSuggestions.map((item) => (
          <SuggestionItem suggestion={item} key={item.id}></SuggestionItem>
        ))}

        {displayedSuggestions.length === 0 && (
          <div className="w-full text-center p-8">
            <p>No suggestions found with this tag.</p>
          </div>
        )}
      </div>
    </div>
  );
}
