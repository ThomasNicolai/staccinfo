import Link from 'next/link';

type Suggestion = {
  id: number;
  suggestion: string;
};

export function SuggestionItem({ suggestion }: { suggestion: Suggestion }) {
  return (
    <Link href={`/suggestions/${suggestion.id}`}>
      <div className="border p-4 rounded-md">
        <p className="text-gray-800 dark:text-gray-200">
          {suggestion.suggestion}
        </p>
      </div>
    </Link>
  );
}
