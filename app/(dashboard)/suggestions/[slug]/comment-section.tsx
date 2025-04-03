'use client';

import { useState, useEffect } from 'react';
import { Comment } from '@/lib/db';
import { addCommentAction, getCommentsAction } from './add-comment';

// Single comment component with collapsible replies
function CommentItem({
  comment,
  onAddReply
}: {
  comment: Comment;
  onAddReply: (parentId: number, content: string) => void;
}) {
  const userId = 1; // Replace with actual user ID from context or props
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
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between mb-2">
          <span className="font-medium">{comment.username}</span>
          {/* Use the client-side formatted date */}
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>

        <p className="text-gray-800">{comment.content}</p>

        <div className="mt-3 flex gap-4">
          <button
            onClick={() => setIsReplying(!isReplying)}
            className="text-sm text-blue-600 hover:underline"
          >
            {isReplying ? 'Cancel' : 'Reply'}
          </button>

          {/* Only show this button if there are replies */}
          {hasReplies && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="text-sm text-blue-600 hover:underline flex items-center"
            >
              {showReplies
                ? 'Hide replies'
                : `View replies (${comment.replies!.length})`}
            </button>
          )}
        </div>

        {/* Reply form */}
        {isReplying && (
          <form onSubmit={handleSubmitReply} className="mt-3">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 text-sm"
              placeholder="Write your reply..."
              rows={2}
            />
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                disabled={!replyContent.trim()}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm disabled:bg-gray-400"
              >
                Post Reply
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Nested replies - only displayed when expanded */}
      {showReplies && hasReplies && (
        <div className="ml-8 mt-2 border-l-2 border-gray-200 pl-4">
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

export function CommentSection({
  suggestionId,
  initialComments = []
}: {
  suggestionId: number;
  initialComments: Comment[];
}) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add a new top-level comment using server action
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const result = await addCommentAction(suggestionId, newComment, userId);

      if (result.success && result.comments) {
        setComments(result.comments);
        setNewComment('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add a reply to an existing comment
  const handleAddReply = async (parentId: number, content: string) => {
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const result = await addCommentAction(suggestionId, content, parentId);

      if (result.success && result.comments) {
        setComments(result.comments);
      }
    } catch (error) {
      console.error('Error adding reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Kommentarer</h2>

      {/* Comments list - at the top */}
      <div className="space-y-4 mb-6">
        {comments.length === 0 ? (
          <p className="text-gray-500">
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
      <div className="border-t border-gray-200 my-6"></div>

      {/* Add new comment form - at the bottom */}
      <form onSubmit={handleAddComment}>
        <h3 className="text-lg font-medium mb-2">Add your comment</h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Write your comment here..."
          rows={3}
          disabled={isSubmitting}
        />
        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            disabled={!newComment.trim() || isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </form>
    </div>
  );
}
