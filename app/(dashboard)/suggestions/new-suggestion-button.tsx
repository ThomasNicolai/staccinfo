// new-suggestion-button.tsx
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

export function NewSuggestionButton() {
  return (
    <Link href="suggestions/new" className="block h-[220px] w-full">
      <div
        className="
          w-full h-full
          bg-primary 
          p-4 border border-primary/20
          rounded-xl transition-colors duration-200
          hover:bg-primary/90
          flex flex-col justify-between
          text-primary-foreground
        "
      >
        <div>
          <h3 className="font-bold text-lg mb-2">Nytt forslag</h3>
          <p className="text-sm opacity-90">
            Del dine ideer og forslag med oss
          </p>
        </div>

        <div className="flex justify-end mt-auto">
          <PlusIcon className="h-8 w-8" />
        </div>
      </div>
    </Link>
  );
}
