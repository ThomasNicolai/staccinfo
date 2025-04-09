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

  const handleTagClick = (tag?: string) => {
    setSelectedTag(tag);
    if (!tag) {
      setDisplayedSuggestions(initialSuggestions);
    } else {
      setDisplayedSuggestions(
        initialSuggestions.filter((suggestion) => suggestion.tag === tag)
      );
    }
  };

  return (
    <div className="min-h-screen p-4 pt-16">
      <div className="w-1/3 h-48 mt-4 rounded-xl mx-auto p-4 mb-4 bg-card dark:bg-card border-b border dark:border-border">
        <h1 className="text-2xl text-center font-bold text-foreground dark:text-foreground">
          Vi ønsker dine innspill
        </h1>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <button
          onClick={() => handleTagClick(undefined)}
          className={`px-4 py-2 rounded-full ${
            !selectedTag
              ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted'
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
                ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="flex h-auto space-x-4 mt-6 px-4 flex-wrap">
        <NewSuggestionButton />
        {displayedSuggestions.map((suggestion) => (
          <SuggestionBox key={suggestion.id} suggestion={suggestion} />
        ))}
        {displayedSuggestions.length === 0 && (
          <div className="w-full text-center p-8">
            <p className="text-muted-foreground dark:text-muted-foreground">
              No suggestions found with this tag.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
