import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { getSuggestions } from '@/lib/db';
import { SuggestionsClient } from './suggestion-client';

export default async function SuggestionsPage() {
  const { suggestions, tags } = await getSuggestions();
  
  return (
    <div className="relative min-h-screen">
      {/* Decorative circle in background */}
      <div className="absolute top-[-65px] left-[-170px] w-[390px] h-[390px] rounded-full transform translate-x-1 translate-y-1/3 bg-gradient-to-b from-[hsl(var(--primary))] to-[hsl(var(--secondary))] p-[55px] pointer-events-none z-0">
        <div className="w-full h-full rounded-full bg-background dark:bg-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <SuggestionsClient initialSuggestions={suggestions} allTags={tags} />
      </div>
    </div>
  );
}
