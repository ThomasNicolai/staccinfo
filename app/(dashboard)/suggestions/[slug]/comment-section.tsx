'use client';

import { useState } from 'react';
import { Comment } from '@/lib/db';

// Simple relative time formatter without date-fns
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60)
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24)
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30)
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12)
    return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
}

// Component for individual comments
function CommentItem({
  comment,
  onAddReply
}: {
  comment: Comment;
  onAddReply: (parentId: number, content: string) => Promise<void>;
}) {
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasReplies = comment.replies && comment.replies.length > 0;
  const formattedDate = formatRelativeTime(new Date(comment.created_at));

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddReply(comment.id, replyContent);
      setReplyContent('');
      setIsReplying(false);
    } catch (error) {
      console.error('Error posting reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="bg-background dark:bg-background p-4 rounded-lg border border-gray-200 dark:border-border">
        <div className="flex justify-between mb-2">
          <span className="font-medium text-foreground dark:text-foreground">
            {comment.username}
          </span>
          <span className="text-sm text-muted-foreground dark:text-muted-foreground">
            {formattedDate}
          </span>
        </div>

        <p className="text-foreground dark:text-foreground">
          {comment.content}
        </p>

        <div className="mt-3 flex gap-4">
          <button
            type="button"
            onClick={() => setIsReplying(!isReplying)}
            className="text-sm text-primary dark:text-primary hover:underline"
          >
            {isReplying ? 'Cancel' : 'Reply'}
          </button>

          {hasReplies && (
            <button
              type="button"
              onClick={() => setShowReplies(!showReplies)}
              className="text-sm text-primary dark:text-primary hover:underline flex items-center"
            >
              {showReplies
                ? 'Hide replies'
                : `View replies (${comment.replies!.length})`}
            </button>
          )}
        </div>
        {isReplying && (
          <form onSubmit={handleSubmitReply} className="mt-3">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="w-full border border-input dark:border-input rounded p-2 text-sm bg-background dark:bg-background text-foreground dark:text-foreground"
              placeholder="Write your reply..."
              rows={2}
            />
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !replyContent.trim()}
                className="bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground px-3 py-1 rounded text-sm hover:bg-accent dark:hover:bg-accent disabled:bg-muted dark:disabled:bg-muted"
              >
                {isSubmitting ? 'Posting...' : 'Post Reply'}
              </button>
            </div>
          </form>
        )}
      </div>

      {showReplies && hasReplies && (
        <div className="ml-8 mt-2 border-l-2 border-gray-200 dark:border-border pl-4">
          {comment.replies!.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onAddReply={onAddReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Main comment section component
export function CommentSection({
  suggestionId,
  initialComments,
  newCommentHandlerAction
}: {
  suggestionId: number;
  initialComments: Comment[];
  newCommentHandlerAction: (
    suggestionId: number,
    content: string,
    parentId: number | null
  ) => Promise<Comment[]>;
}) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      // Call the server action to add the comment
      const updatedComments = await newCommentHandlerAction(
        suggestionId,
        newComment,
        null
      );

      // Update local comments state with the new data
      setComments(updatedComments);

      // Clear the input
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add a reply to an existing comment
  const handleAddReply = async (parentId: number, content: string) => {
    if (!content.trim()) return;

    try {
      // Call the server action to add the reply
      const updatedComments = await newCommentHandlerAction(
        suggestionId,
        content,
        parentId
      );

      // Update local comments state with the new data including replies
      setComments(updatedComments);
      return Promise.resolve();
    } catch (error) {
      console.error('Error posting reply:', error);
      return Promise.reject(error);
    }
  };

  return (
    <div className="mt-8 bg-background dark:bg-background p-6 rounded-xl shadow-sm border border-gray-200 dark:border-border">
      <h2 className="font-bold text-xl mb-4">Comments</h2>

      {/* New comment form */}
      <form onSubmit={handleAddComment} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full border border-input dark:border-input rounded p-3 text-sm bg-background dark:bg-background text-foreground dark:text-foreground"
          placeholder="Write a comment..."
          rows={3}
        />
        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground px-4 py-2 rounded text-sm hover:bg-accent dark:hover:bg-accent disabled:bg-muted dark:disabled:bg-muted"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </form>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onAddReply={handleAddReply}
            />
          ))
        ) : (
          <p className="text-center text-muted-foreground py-4">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}
