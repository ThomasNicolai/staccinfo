import { addComment, getCommentsForSuggestion } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// Add a new comment or reply
export async function addCommentAction(
  suggestionId: number,
  content: string,
  userId: number,
  addComment: (suggestionId: number, userId: number, content: string, parentId?: number | null) => Promise<void>,
  parentId?: number | null,
) {
  addComment(suggestionId, userId, content, parentId);
  revalidatePath(`/suggestions/${suggestionId}`);
}

// Get comments for a suggestion
export async function getCommentsAction(suggestionId: number) {
  try {
    const comments = await getCommentsForSuggestion(suggestionId);
    return { success: true, comments };
  } catch (error) {
    console.error('Error fetching comments:', error);
    return { success: false, error: 'Failed to fetch comments' };
  }
}
