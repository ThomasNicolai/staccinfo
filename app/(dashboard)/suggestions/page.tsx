import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { getSuggestions, getSuggestionTags } from '@/lib/db';

export default async function SuggestionsPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Get the tag filter from URL query params
  const tagParam = await searchParams.tag;
  const selectedTag = typeof tagParam === 'string' ? tagParam : undefined;

  // Get all available tags for filter buttons
  const allTags = await getSuggestionTags();

  // Fetch suggestions filtered by selected tag
  const suggestions = await getSuggestions(selectedTag);

  return (
    <div className="background min-h-screen p-4 pt-16">
      {/* Header Container */}
      <div className="w-1/3 h-48 mt-4 rounded-xl mx-auto p-4 mb-4 bg-white border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl text-center font-bold text-gray-800 dark:text-gray-200">
          Vi ønsker dine innspill
        </h1>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-2">
          Skriv et forslag til oss
        </p>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-2">
          Du kan legge til én eller flere filer
        </p>
      </div>

      {/* Tag Filter Buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <Link
          href="/suggestions"
          className={`px-4 py-2 rounded-lg font-medium ${!selectedTag ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
        >
          Alle
        </Link>

        {allTags.map((tag) => (
          <Link
            key={tag}
            href={`/suggestions?tag=${encodeURIComponent(tag)}`}
            className={`px-4 py-2 rounded-lg font-medium ${selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          >
            {tag}
          </Link>
        ))}
      </div>

      {/* Flex container for the boxes */}
      <div className="flex h-auto space-x-4 mt-6 px-4 flex-wrap">
        {/* New Suggestion Button */}
        <Link
          href="suggestions/new"
          className="flex-1 block min-w-[200px] mb-4"
        >
          <button className="w-full h-full bg-blue-500 hover:bg-blue-600 text-white text-left rounded-xl items-start justify-between p-4">
            <span>Nytt forslag</span>
            <PlusIcon className="h-5 w-5" />
          </button>
        </Link>

        {/* Individual Suggestion Boxes */}
        {suggestions.map((item) => (
          <Link
            href={`/suggestions/${item.id}`}
            key={item.id}
            className="flex-1 block min-w-[200px] mb-4"
          >
            <div className="w-full h-full bg-white p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
              <p className="font-bold">{item.text}</p>
              <div className="mt-2 text-sm text-gray-600">
                {item.is_anonymous ? (
                  <p>Posted by: Anonymous</p>
                ) : (
                  <p>User ID: {item.user_id}</p>
                )}
                <p>Created: {new Date(item.created_at).toLocaleDateString()}</p>
                <p>
                  Tag:{' '}
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {item.tag}
                  </span>
                </p>
              </div>
            </div>
          </Link>
        ))}

        {suggestions.length === 0 && (
          <div className="w-full text-center p-8">
            <p>No suggestions found with this tag.</p>
          </div>
        )}
      </div>
    </div>
  );
}
