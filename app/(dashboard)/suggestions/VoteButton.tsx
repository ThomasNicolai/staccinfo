// Create app/(dashboard)/suggestions/VoteButton.tsx
'use client';

import { ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { toggleVote } from './actions';

export function VoteButton({
  suggestionId,
  initialVoteCount = 0,
  initialUserHasVoted = false
}: {
  suggestionId: number;
  initialVoteCount?: number;
  initialUserHasVoted?: boolean;
}) {
  const [voteCount, setVoteCount] = useState(initialVoteCount);
  const [userHasVoted, setUserHasVoted] = useState(initialUserHasVoted);
  const [isLoading, setIsLoading] = useState(false);

  const handleVoteClick = async () => {
    setIsLoading(true);
    try {
      const result = await toggleVote(suggestionId);
      
      if (result.success) {
        // If vote was added, increment count
        if (result.message === 'Vote added') {
          setVoteCount(prev => prev + 1);
          setUserHasVoted(true);
        } 
        // If vote was removed, decrement count
        else if (result.message === 'Vote removed') {
          setVoteCount(prev => prev - 1);
          setUserHasVoted(false);
        }
      }
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleVoteClick}
      disabled={isLoading}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
        userHasVoted
          ? 'bg-blue-100 text-blue-800' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
      }`}
    >
      <ThumbsUp className={`h-4 w-4 ${userHasVoted ? 'fill-blue-600' : ''}`} />
      <span>{voteCount}</span>
    </button>
  );
}