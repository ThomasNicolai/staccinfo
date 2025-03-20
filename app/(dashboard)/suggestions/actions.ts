'use server';

import { postSuggestion as dbPostSuggestion } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createSuggestion(formData: FormData) {
  try {
    const suggestionText = formData.get('suggestion') as string;
    const tag = formData.get('tag') as string;
    const isAnonymousStr = formData.get('isAnonymous') as string;
    const isAnonymous = isAnonymousStr === 'true';
    
    // Validate inputs
    if (!suggestionText || suggestionText.trim() === '') {
      return { success: false, error: 'Suggestion text is required' };
    }

    if (!tag || tag.trim() === '') {
      return { success: false, error: 'Tag is required' };
    }

    // Using a default user ID for now (in a real app, this would come from authentication)
    const userId = 1; 
    
    // Call the database function
    const result = await dbPostSuggestion(suggestionText, userId, tag, isAnonymous);
    
    // Revalidate the suggestions page to show the new suggestion
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