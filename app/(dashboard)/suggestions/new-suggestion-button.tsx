// new-suggestion-button.tsx
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

export function NewSuggestionButton() {
  return (
    <Link href="suggestions/new" className="flex-1 block min-w-[200px] mb-4">
      <button className="w-full h-full bg-blue-500 hover:bg-blue-600 text-white text-left rounded-xl items-start justify-between p-4">
        <span>Nytt forslag</span>
        <PlusIcon className="h-5 w-5" />
      </button>
    </Link>
  );
}
