'use client';
import { useState } from 'react';
import { SuggestionBox } from './suggestion-box';
import { NewSuggestionButton } from './new-suggestion-button';
import TagFilterToolbar from './navigationtoolbar';

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
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [displayedSuggestions, setDisplayedSuggestions] =
    useState(initialSuggestions);

  // Fixed syntax error - removed "async function" before the assignment
  const handleTagSelectAction = (tag: string | null) => {
    setSelectedTag(tag);

    if (tag === null) {
      // Show all suggestions when no tag is selected
      setDisplayedSuggestions(initialSuggestions);
    } else {
      // Filter by the selected tag
      setDisplayedSuggestions(
        initialSuggestions.filter((suggestion) => suggestion.tag === tag)
      );
    }
  };

  return (
    <div className="flex flex-col relative items-center w-full min-h-screen overflow-y-auto overflow-hidden m-0 p-0">
      {/* Title */}
      <div className="flex flex-col items-center pt-20">
        <h1 className="text-5xl font-bold">Vi ønsker dine innspill!</h1>
      </div>

      {/* Description */}
      <div className="flex flex-col justify-center items-center pb-10">
        <p className="text-[15px] mt-4">
          Her kan du komme med forslag til forbedringer og nye funksjoner.
        </p>
        <p className="text-[15px]">
          Vi setter pris på dine innspill for å gjøre produktene våre bedre.
        </p>
      </div>

      {/* Navigation toolbar - fixed function name to match declaration */}
      <div className="w-full max-w-[1200px] px-6">
        <TagFilterToolbar
          selectedTag={selectedTag}
          onSelectTagAction={handleTagSelectAction}
          icons={{}}
        />
      </div>

      {/* Suggestions grid */}
      <div className="w-full max-w-[1200px] px-6 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[220px]">
          <NewSuggestionButton />
          {displayedSuggestions.map((suggestion) => (
            <SuggestionBox key={suggestion.id} suggestion={suggestion} />
          ))}
          {displayedSuggestions.length === 0 && selectedTag !== null && (
            <div className="col-span-3 text-center p-8">
              <p className="text-muted-foreground dark:text-muted-foreground">
                Ingen forslag funnet med taggen "{selectedTag}".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
