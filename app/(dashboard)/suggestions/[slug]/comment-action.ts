'use server';

import { addComment, getCommentsForSuggestion } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function handleNewComment(
  suggestionId: number,
  content: string,
  parentId: number | null
) {
  try {
    // Hard-coding userId as 1 for demo - in real app, get from auth
    const userId = 1;
    
    // Add the comment
    await addComment(suggestionId, userId, content, parentId);
    
    // Revalidate the path to refresh the data
    revalidatePath(`/suggestions/${suggestionId}`);
    
    // Return the updated comments
    return await getCommentsForSuggestion(suggestionId);
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('Failed to add comment');
  }
}