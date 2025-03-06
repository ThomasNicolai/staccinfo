// import { getSuggestion } from '@/lib/db';
import Link from 'next/link';

export default async function SuggestionDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  console.log(slug);
  const suggestion = { suggestion: 'add more videos', files: [] };

  if (!suggestion) {
    return <div>Suggestion not found.</div>;
  }

  return (
    <div className="page">
      <Link
        href="/suggestions"
        className="inline-block bg-gray-200 text-gray-900 py-2 px-4 rounded hover:bg-gray-800 hover:text-white transition-colors duration-200"
      >
        ← Back to all Suggestions
      </Link>
      <h1>Forslag</h1>
      <p>{suggestion.suggestion}</p>
      <div />
      <p>Files: {suggestion.files}</p>
    </div>
  );
}
