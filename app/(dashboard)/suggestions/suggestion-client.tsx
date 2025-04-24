'use client';
import { useState } from 'react';
import Link from 'next/link';
import { PlusIcon, ThumbsUp } from 'lucide-react';
import { SuggestionBox } from './suggestion-box';
import { NewSuggestionButton } from './new-suggestion-button';
import NavigationToolbar from './navigationtoolbar';

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
  }
  const menuItems = [
    {
      label: 'All',
      icon: '/All.png',
      isActive: !selectedTag,
      onClick: () => handleTagClick(undefined),
    },
    ...allTags.map((tag) => ({
      label: tag,
      icon: '/Tag.png',
      isActive: selectedTag === tag,
      onClick: () => handleTagClick(tag),
    }))
  ];


  return (
    <div className="flex flex-col relative items-center w-full min-h-screen overflow-y-auto overflow-hidden m-0 p-0">
    {/* Title */}
    <div className="flex flex-col items-center pt-20">
      <h1 className="text-5xl font-bold">
        Vi ønsker dine innspill!
      </h1>
    </div>
    {/* Description */}
    <div className="flex flex-col justify-center items-center pb-20">
    <p className="text-[15px] mt-4">
    Her får du fullstendig oversikt over dine moduler hos oss.
  </p>
  <p className="text-[15px]">
    Dersom du ønsker flere moduler kan du ta
    <a href="#" className="text-blue-500 hover:underline ml-1">kontakt med oss.</a>
  </p>
  </div>
      {/* Navigation toolbar */}
      <NavigationToolbar menuItems={menuItems} />
      
      {/* Suggestions grid */}
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
