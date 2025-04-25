'use client';
import Link from 'next/link';
import { VoteButton } from './VoteButton';
import { useState, useEffect } from 'react';

type SuggestionBoxProps = {
  suggestion: {
    id: number;
    text: string;
    tag: string;
    is_anonymous: boolean;
    created_at: Date;
    user_id: number;
    vote_count?: number;
    user_has_voted?: boolean;
  };
};

export function SuggestionBox({ suggestion }: SuggestionBoxProps) {
  // State to hold the formatted date
  const [formattedDate, setFormattedDate] = useState<string>('');

  // Format date on client side only to prevent hydration mismatch
  useEffect(() => {
    // Consistent date formatting to avoid hydration issues
    const date = new Date(suggestion.created_at);
    setFormattedDate(date.toLocaleDateString());
  }, [suggestion.created_at]);

  return (
    <Link
      href={`/suggestions/${suggestion.id}`}
      className="block h-[220px] w-full"
    >
      <div className="w-full h-full bg-card p-4 border dark:border-border rounded-xl transition-colors duration-200 hover:bg-muted flex flex-col">
        <div className="overflow-hidden mb-2">
          <p className="font-bold line-clamp-2">{suggestion.text}</p>
        </div>

        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-auto text-sm text-muted-foreground space-y-1"
        >
          {suggestion.is_anonymous ? (
            <p>Posted by: Anonymous</p>
          ) : (
            <p>User ID: {suggestion.user_id}</p>
          )}

          {/* Client-side rendered date */}
          <p>Created: {formattedDate}</p>

          <VoteButton
            suggestionId={suggestion.id}
            initialVoteCount={suggestion.vote_count ?? 0}
            initialUserHasVoted={suggestion.user_has_voted ?? false}
          />
        </div>
      </div>
    </Link>
  );
}
