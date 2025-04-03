import { NextResponse } from 'next/server';
import { addComment, getCommentsForSuggestion } from '@/lib/db';

// GET endpoint to retrieve comments for a suggestion
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const suggestionId = parseInt(searchParams.get('suggestionId') || '0', 10);
  
  if (!suggestionId) {
    return NextResponse.json(
      { error: 'Suggestion ID is required' }, 
      { status: 400 }
    );
  }
  
  try {
    const comments = await getCommentsForSuggestion(suggestionId);
    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' }, 
      { status: 500 }
    );
  }
}

// POST endpoint to add a new comment or reply
export async function POST(request: Request) {
  try {
    const { suggestionId, content, parentId } = await request.json();
    
    if (!suggestionId || !content) {
      return NextResponse.json(
        { error: 'Suggestion ID and content are required' }, 
        { status: 400 }
      );
    }
    
    // Using user ID 1 for testing - in a real app, you'd get this from auth
    const userId = 1;
    
    // Add the comment to the database
    await addComment(suggestionId, userId, content, parentId);
    
    // Return all updated comments
    const comments = await getCommentsForSuggestion(suggestionId);
    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json(
      { error: 'Failed to add comment' }, 
      { status: 500 }
    );
  }
}