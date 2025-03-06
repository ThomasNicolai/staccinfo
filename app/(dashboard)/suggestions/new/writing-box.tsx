import { cn } from '@/lib/utils';
import { forwardRef, useState } from 'react';

export interface WritingBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  onSend: (message: string) => void;
}

const WritingBox = forwardRef<HTMLDivElement, WritingBoxProps>(
  ({ className, onSend, ...props }, ref) => {
    const [message, setMessage] = useState('');

    const handleSendClick = () => {
      onSend(message);
      setMessage('');
    };

    return (
      <div ref={ref} className={cn('flex gap-2', className)} {...props}>
        <textarea
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-black dark:text-white dark:bg-gray-700"
          placeholder="Write your suggestion..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={handleSendClick}
        >
          🚀
        </button>
      </div>
    );
  }
);

WritingBox.displayName = 'WritingBox';

export { WritingBox };
