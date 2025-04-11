import Link from 'next/link';

type Suggestion = {
  id: number;
  suggestion: string;
};

export function SuggestionItem({ suggestion }: { suggestion: Suggestion }) {
  return (
    <Link href={`/suggestions/${suggestion.id}`}>
      <div className="border dark:border-border p-4 rounded-md bg-card">
        <p className="text-foreground dark:text-foreground">
          {suggestion.suggestion}
        </p>
      </div>
    </Link>
  );
}
