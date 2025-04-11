'use client';
import { useState, useEffect } from 'react';
import { Comment } from '@/lib/db';

// Single comment component with collapsible replies

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
  ) => void;
}) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    // Legg til logikk for å poste ny kommentar
    // newCommentHandlerAction(suggestionId, newComment, null);
    setIsSubmitting(false);
  };

  // Add a reply to an existing comment
  const handleAddReply = async (parentId: number, content: string) => {
    if (!content.trim()) return;
    setIsSubmitting(true);
    newCommentHandlerAction(suggestionId, content, parentId);
    setIsSubmitting(false);
  };

  return (
    <div className="mt-8 bg-background dark:bg-background p-6 rounded-xl shadow-sm border border-gray-200 dark:border-border">
      <h2 className="text-xl font-bold mb-4 text-foreground dark:text-foreground">
        Kommentarer
      </h2>

      {/* Comments list - at the top */}
      <div className="space-y-4 mb-6">
        {comments.length === 0 ? (
          <p className="text-muted-foreground dark:text-muted-foreground">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onAddReply={handleAddReply}
            />
          ))
        )}
      </div>

      {/* Separator line */}
      <div className="border-t border-gray-200 dark:border-border my-6"></div>

      {/* Add new comment form - at the bottom */}
      <form onSubmit={handleAddComment}>
        <h3 className="text-lg font-medium mb-2 text-foreground dark:text-foreground">
          Add your comment
        </h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border border-input dark:border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent bg-background dark:bg-background text-foreground dark:text-foreground"
          placeholder="Write your comment here..."
          rows={3}
          disabled={isSubmitting}
        />
        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            disabled={!newComment.trim() || isSubmitting}
            className="px-4 py-2 bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground rounded-md hover:bg-accent dark:hover:bg-accent disabled:bg-muted dark:disabled:bg-muted"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </form>
    </div>
  );
}

function CommentItem({
  comment,
  onAddReply
}: {
  comment: Comment;
  onAddReply: (parentId: number, content: string) => void;
}) {
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [formattedDate, setFormattedDate] = useState<string>('');

  const hasReplies = comment.replies && comment.replies.length > 0;

  useEffect(() => {
    setFormattedDate(new Date(comment.created_at).toLocaleString());
  }, [comment.created_at]);

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    onAddReply(comment.id, replyContent);
    setReplyContent('');
    setIsReplying(false);
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
            onClick={() => setIsReplying(!isReplying)}
            className="text-sm text-primary dark:text-primary hover:underline"
          >
            {isReplying ? 'Cancel' : 'Reply'}
          </button>

          {hasReplies && (
            <button
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
                disabled={!replyContent.trim()}
                className="bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground px-3 py-1 rounded text-sm hover:bg-accent dark:hover:bg-accent disabled:bg-muted dark:disabled:bg-muted"
              >
                Post Reply
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
