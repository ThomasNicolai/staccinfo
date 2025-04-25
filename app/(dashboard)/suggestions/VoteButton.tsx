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

  const handleVoteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);
    try {
      const result = await toggleVote(suggestionId);
      if (result.success) {
        if (result.message === 'Vote added') {
          setVoteCount((prev) => prev + 1);
          setUserHasVoted(true);
        } else if (result.message === 'Vote removed') {
          setVoteCount((prev) => prev - 1);
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
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground hover:bg-muted'
      }`}
    >
      <ThumbsUp className={`h-4 w-4 ${userHasVoted ? 'fill-primary' : ''}`} />
      <span>{voteCount}</span>
    </button>
  );
}
