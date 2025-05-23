import { cn } from '@/lib/utils';
import { forwardRef, useState } from 'react';

export interface WritingBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  onSend: (message: string) => void;
  onSubmit?: () => void;
}

const WritingBox = forwardRef<HTMLDivElement, WritingBoxProps>(
  ({ className, onSend, onSubmit, ...props }, ref) => {
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newMessage = e.target.value;
      setMessage(newMessage);
      onSend(newMessage);
    };

    return (
      <div ref={ref} className={cn('flex gap-2', className)} {...props}>
        <textarea
          className="w-full p-2 border border-input dark:border-input rounded bg-background dark:bg-background text-foreground dark:text-foreground"
          placeholder="Write your suggestion..."
          value={message}
          onChange={handleChange}
          rows={4}
        />
      </div>
    );
  }
);

WritingBox.displayName = 'WritingBox';

export { WritingBox };
