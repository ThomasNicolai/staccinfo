import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { getSuggestions, getSuggestionTags } from '@/lib/db';
import { SuggestionsClient } from './suggestion-client';

export default async function SuggestionsPage() {
  const suggestions = await getSuggestions();
  const allTags = await getSuggestionTags();

  return (
    <SuggestionsClient initialSuggestions={suggestions} allTags={allTags} />
  );
}
