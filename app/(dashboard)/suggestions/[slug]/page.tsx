'use server';
import {
  getCommentsForSuggestion,
  getSuggestionWithUser,
  addComment
} from '@/lib/db';
import Link from 'next/link';
import { VoteButton } from '../VoteButton';
import { CommentSection } from './comment-section';
import { revalidatePath } from 'next/cache';
import { handleNewComment } from './comment-action';

export default async function SuggestionDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const userId = 1;
  const suggestionId = parseInt(slug, 10);
  const suggestionData = await getSuggestionWithUser(suggestionId, 1);
  const comments = await getCommentsForSuggestion(suggestionId);

  if (!suggestionData) {
    return (
      <div className="p-8 bg-background dark:bg-background">
        Suggestion with ID {suggestionId} not found.
      </div>
    );
  }
  return (
    <div className="p-8">
      {/* Back button */}
      <Link
        href="/suggestions"
        className="inline-block bg-muted dark:bg-muted text-muted-foreground dark:text-muted-foreground py-2 px-4 rounded hover:bg-secondary dark:hover:bg-secondary hover:text-secondary-foreground transition-colors duration-200"
      >
        ← Back to all Suggestions
      </Link>

      <h1 className="text-2xl font-bold mt-6 mb-4 text-foreground dark:text-foreground">
        Forslag fra {suggestionData.username}
      </h1>
      <div className="bg-card dark:bg-card p-6 rounded-xl shadow-sm border border-muted dark:border-border">
        <div className="flex justify-between items-center mb-4">
          <span className="inline-block bg-accent dark:bg-accent text-accent-foreground dark:text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
            {suggestionData.tag}
          </span>
          <span className="text-sm text-muted-foreground dark:text-muted-foreground">
            Opprettet:{' '}
            {new Date(suggestionData.created_at).toLocaleString('nb-NO')}
          </span>
        </div>

        <p className="text-lg mb-4 text-foreground dark:text-foreground">
          {suggestionData.text}
        </p>

        {/* Add vote button */}
        <div className="mt-4">
          <VoteButton
            suggestionId={suggestionData.id}
            initialVoteCount={suggestionData.vote_count || 0}
            initialUserHasVoted={suggestionData.user_has_voted || false}
          />
        </div>

        <div className="mt-6 pt-4 border-t border-muted dark:border-border">
          <p className="text-sm text-muted-foreground dark:text-muted-foreground">
            <span className="font-medium">Bruker:</span>{' '}
            {suggestionData.username}
          </p>
        </div>
      </div>
      <CommentSection
        newCommentHandlerAction={handleNewComment}
        suggestionId={suggestionId}
        initialComments={comments}
      />
    </div>
  );
}
