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
    vote_count?: number; // Add this to the type
  };
};

export function SuggestionBox({ suggestion }: SuggestionBoxProps) {
  return (
    <Link
      href={`/suggestions/${suggestion.id}`}
      className="flex-1 block min-w-[200px] mb-4"
    >
      <div className="w-full h-full bg-white p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
        <p className="font-bold">{suggestion.text}</p>
        <div className="mt-2 text-sm text-gray-600">
          {suggestion.is_anonymous ? (
            <p>Posted by: Anonymous</p>
          ) : (
            <p>User ID: {suggestion.user_id}</p>
          )}
          <p>Created: {new Date(suggestion.created_at).toLocaleDateString()}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {suggestion.tag}
            </span>
            
            {/* Vote count display */}
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