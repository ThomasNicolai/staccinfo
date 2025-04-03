import { getCommentsForSuggestion, getSuggestionWithUser } from '@/lib/db';
import Link from 'next/link';
import { VoteButton } from '../VoteButton';
import { CommentSection } from './comment-section';
import { comment } from 'postcss';

export default async function SuggestionDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const suggestionId = parseInt(slug, 10);

  // Pass dummy user ID 1 for now (would come from auth in real app)
  const suggestionData = await getSuggestionWithUser(suggestionId, 1);

  const comments = await getCommentsForSuggestion(suggestionId);

  if (!suggestionData) {
    return (
      <div className="p-8">Suggestion with ID {suggestionId} not found.</div>
    );
  }

  return (
    <div className="p-8">
      {/* Back button */}
      <Link
        href="/suggestions"
        className="inline-block bg-gray-200 text-gray-900 py-2 px-4 rounded hover:bg-gray-800 hover:text-white transition-colors duration-200"
      >
        ← Back to all Suggestions
      </Link>

      <h1 className="text-2xl font-bold mt-6 mb-4">
        Forslag fra {suggestionData.username}
      </h1>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {suggestionData.tag}
          </span>
          <span className="text-sm text-gray-500">
            Opprettet:{' '}
            {new Date(suggestionData.created_at).toLocaleString('nb-NO')}
          </span>
        </div>

        <p className="text-lg mb-4">{suggestionData.text}</p>

        {/* Add vote button */}
        <div className="mt-4">
          <VoteButton
            suggestionId={suggestionData.id}
            initialVoteCount={suggestionData.vote_count || 0}
            initialUserHasVoted={suggestionData.user_has_voted || false}
          />
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Bruker:</span>{' '}
            {suggestionData.username}
          </p>
        </div>
      </div>
      <CommentSection suggestionId={suggestionId} initialComments={comments} />
    </div>
  );
}
