import Link from 'next/link';
import { ThumbsUp } from 'lucide-react';

type SuggestionBoxProps = {
  suggestion: {
    id: number;
    text: string;
    tag: string;
    is_anonymous: boolean;
    created_at: Date;
    user_id: number;
    vote_count?: number;
  };
};

export function SuggestionBox({ suggestion }: SuggestionBoxProps) {
  return (
    <Link
      href={`/suggestions/${suggestion.id}`}
      className="flex-1 block min-w-[200px] mb-4"
    >
      <div
        className="
          w-full h-full 
          bg-green dark:bg-card 
          p-4 
          border dark:border-border 
          rounded-xl 
          transition-colors duration-200
          hover:bg-primary active:bg-primary
        "
      >
        <p className="font-bold">{suggestion.text}</p>
        <div className="mt-2 text-sm text-muted-foreground">
          {suggestion.is_anonymous ? (
            <p>Posted by: Anonymous</p>
          ) : (
            <p>User ID: {suggestion.user_id}</p>
          )}
          <p>Created: {new Date(suggestion.created_at).toLocaleDateString()}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="inline-block bg-accent text-accent-foreground px-2 py-1 rounded">
              {suggestion.tag}
            </span>
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              <span>{suggestion.vote_count || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
