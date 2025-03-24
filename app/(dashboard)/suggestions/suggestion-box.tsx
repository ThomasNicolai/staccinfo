// suggestion-box.tsx
import Link from 'next/link';

type SuggestionBoxProps = {
  suggestion: {
    id: number;
    text: string;
    tag: string;
    is_anonymous: boolean;
    created_at: Date;
    user_id: number;
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
          <p>User ID: {suggestion.user_id}</p>
          <p>Created: {new Date(suggestion.created_at).toLocaleDateString()}</p>
          <p>
            Tag:{' '}
            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {suggestion.tag}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
