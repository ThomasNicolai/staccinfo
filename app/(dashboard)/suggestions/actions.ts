'use server';

import { postSuggestion as dbPostSuggestion, voteSuggestion } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';

export async function createSuggestion(formData: FormData) {
  try {
    const suggestionText = formData.get('suggestion') as string;
    const tag = formData.get('tag') as string;
    const isAnonymousStr = formData.get('isAnonymous') as string;
    const isAnonymous = isAnonymousStr === 'true';
    
   
    if (!suggestionText || suggestionText.trim() === '') {
      return { success: false, error: 'Suggestion text is required' };
    }

    if (!tag || tag.trim() === '') {
      return { success: false, error: 'Tag is required' };
    }

    
    const userId = 1; 
    
    
    const result = await dbPostSuggestion(suggestionText, userId, tag, isAnonymous);
    
   
    revalidatePath('/suggestions');
    
    return { 
      success: true, 
      suggestion: result 
    };
  } catch (error) {
    console.error('Error creating suggestion:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create suggestion' 
    };
  }
}

export async function toggleVote(suggestionId: number) {
  try {
    const session = await auth();
    if (!session || !session.user?.email) {
      return {
        success: false,
        message: 'You must be logged in to vote'
      };
    }

  
    const userId = session.user.id;
    if (!userId) {
      return {
        success: false,
        message: 'User ID not found in session'
      };
    }

   
    const userIdNumber = parseInt(userId as string, 10);
    
    const result = await voteSuggestion(suggestionId, userIdNumber);
    return result;
  } catch (error) {
    console.error('Error in toggleVote action:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}