import Link from 'next/link';
import { Suggestion } from './suggestion-client';

export function SuggestionItem({ suggestion }: { suggestion: Suggestion }) {
  return (
    <Link href={`/suggestions/${suggestion.id}`}>
      <div className="border p-4 rounded-md">
        <p className="text-gray-800 dark:text-gray-200">{suggestion.text}</p>
      </div>
    </Link>
  );
}
