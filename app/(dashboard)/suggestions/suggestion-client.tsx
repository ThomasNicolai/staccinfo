'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlusIcon, ThumbsUp } from 'lucide-react';
import { SuggestionBox } from './suggestion-box';
import { NewSuggestionButton } from './new-suggestion-button';

export type Suggestion = {
  id: number;
  text: string;
  tag: string;
  is_anonymous: boolean;
  created_at: Date;
  user_id: number;
  vote_count?: number;
};

export function SuggestionsClient({
  initialSuggestions,
  allTags
}: {
  initialSuggestions: Suggestion[];
  allTags: string[];
}) {
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
      </div>
      
      {/* Simple Tag Filter Buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <button
          onClick={() => handleTagClick(undefined)}
          className={`px-4 py-2 rounded-full ${
            !selectedTag
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-4 py-2 rounded-full ${
              selectedTag === tag
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Suggestions grid */}
      <div className="flex h-auto space-x-4 mt-6 px-4 flex-wrap">
        {/* New Suggestion Button */}
        <NewSuggestionButton />
        
        {displayedSuggestions.map((suggestion) => (
          <SuggestionBox key={suggestion.id} suggestion={suggestion} />
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
