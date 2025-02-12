"use client";

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface WritingBoxProps extends React.HTMLAttributes<HTMLDivElement> {}

const WritingBox = React.forwardRef<HTMLDivElement, WritingBoxProps>(
  ({ className, ...props }, ref) => {
    const [message, setMessage] = React.useState('');

    // Replace 'CurrentUser' with actual logged-in user info as needed.
    const handleSend = () => {
      const userSignature = 'CurrentUser';
      const mailtoLink = `mailto:ier@uib.no?subject=Suggestion%20from%20${encodeURIComponent(userSignature)}&body=${encodeURIComponent(message)}`;
      window.location.href = mailtoLink;
    };

    return (
      <div ref={ref} className={cn("flex gap-2", className)} {...props}>
        <textarea
          className="w-full p-2 border border-gray-300 rounded text-black"
          placeholder="Write your suggestion..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSend}
        >
          🚀
        </button>
      </div>
    );
  }
);

WritingBox.displayName = 'WritingBox';

export { WritingBox };