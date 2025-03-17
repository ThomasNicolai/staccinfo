'use client';

import { forwardRef, useState } from 'react';
import { WritingBox } from './writing-box';
import { cn } from '@/lib/utils';

interface NewSuggestionsProps {
  onSend: (message: string, tag: string, isAnonymous: boolean) => void;
  className?: string;
}

const NewSuggestions = forwardRef<HTMLDivElement, NewSuggestionsProps>(
  ({ onSend, className, ...props }, ref) => {
    const [message, setMessage] = useState('');
    const [tag, setTag] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    
    const handleMessageChange = (message: string) => {
      setMessage(message);
    };
    
    const handleSendClick = () => {
      onSend(message, tag, isAnonymous);
      setMessage('');
      setTag('');
      setIsAnonymous(false);
    };

    return (
      <div ref={ref} className={cn('space-y-4', className)} {...props}>
        {/* Tag input field */}
        <div className="mb-4">
          <label 
            htmlFor="tag-input" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Tag (required)
          </label>
          <input
            id="tag-input"
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Enter a tag (e.g. 'feature', 'bug', 'improvement')"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-black dark:text-white dark:bg-gray-700"
          />
        </div>
        
        {/* Message input */}
        <div className="mb-4">
          <label 
            htmlFor="suggestion-input" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Your suggestion (required)
          </label>
          <WritingBox 
            onSend={handleMessageChange} 
            onSubmit={handleSendClick} 
          />
        </div>
        
        {/* Anonymous checkbox */}
        <div className="mb-4 flex items-center">
          <input
            id="anonymous-checkbox"
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="anonymous-checkbox"
            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
          >
            Submit anonymously
          </label>
        </div>
        
        {/* Submit button */}
        <button
          onClick={handleSendClick}
          disabled={!message.trim() || !tag.trim()}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Suggestion
        </button>
      </div>
    );
  }
);

NewSuggestions.displayName = 'NewSuggestions';

export { NewSuggestions };