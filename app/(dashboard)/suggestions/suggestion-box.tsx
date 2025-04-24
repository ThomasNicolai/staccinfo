import Link from 'next/link';
import { VoteButton } from './VoteButton';  


type SuggestionBoxProps = {
  suggestion: {
    id: number;
    text: string;
    tag: string;
    is_anonymous: boolean;
    created_at: Date;
    user_id: number;
    vote_count?: number;
    user_has_voted?: boolean;   // ← add this if your query exposes it
  };
};

export function SuggestionBox({ suggestion }: SuggestionBoxProps) {
  return (
    <Link
      href={`/suggestions/${suggestion.id}`}
      className="flex-1 block min-w-[220px] mb-4"
    >
      <div className="
          w-full h-full
          bg-card           /* fixed: no more bg-green */
          p-4 border dark:border-border
          rounded-xl transition-colors duration-200
          hover:bg-muted
        "
      >
        <p className="font-bold">{suggestion.text}</p>

        <div className="mt-2 text-sm text-muted-foreground space-y-1">
          {suggestion.is_anonymous
            ? <p>Posted by: Anonymous</p>
            : <p>User ID: {suggestion.user_id}</p>}
          <p>Created: {new Date(suggestion.created_at).toLocaleDateString()}</p>

          {/* ⬇️ interactive vote button */}
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