import { getSuggestion } from '@/lib/db';
import Link from 'next/link';

export default async function SuggestionDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  // Get the slug from params and convert it to a number for the ID
  const slug = (await params).slug;
  const suggestionId = parseInt(slug, 10);

  // Fetch the suggestion from the database
  const suggestionData = await getSuggestion(suggestionId);

  // If suggestion wasn't found, show an error message
  if (!suggestionData) {
    return (
      <div className="p-8">Suggestion with ID {suggestionId} not found.</div>
    );
  }

  // Extract the suggestion data
  const suggestion = {
    id: suggestionData.id,
    suggestion: suggestionData.text,
    files: [] // Assuming files aren't yet implemented
  };

  return (
    <div className="p-8">
      <Link
        href="/suggestions"
        className="inline-block bg-gray-200 text-gray-900 py-2 px-4 rounded hover:bg-gray-800 hover:text-white transition-colors duration-200"
      >
        ← Back to all Suggestions
      </Link>

      <h1 className="text-2xl font-bold mt-6 mb-4">Forslag #{suggestion.id}</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <p className="text-lg">{suggestion.suggestion}</p>

        {suggestion.files && suggestion.files.length > 0 ? (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Files:</h2>
            <ul className="list-disc pl-5">
              {suggestion.files.map((file: string, index: number) => (
                <li key={index}>{file}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-4 text-gray-500">No files attached</p>
        )}
      </div>
    </div>
  );
}
