import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { getSuggestions } from '@/lib/db';
import { SuggestionsClient } from './suggestion-client';

export default async function SuggestionsPage() {
  const { suggestions, tags } = await getSuggestions();
  return <SuggestionsClient initialSuggestions={suggestions} allTags={tags} />;
}
