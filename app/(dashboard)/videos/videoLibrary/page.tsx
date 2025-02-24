'use client';

import { useState } from 'react';
import { getVideos } from '@/lib/db';
import VideoCard from '../videoCard';
import { Card } from '@/components/ui/card';

export default function VideoLibraryPage() {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const categories = ['Alle', 'Systemkonfigurasjon', 'Kontoplan', 'Valutahåndtering', 'Budsjett og prognoser', 'Roller og rettigheter'];

  return (
    <VideoLibraryContent selectedCat={selectedCat} setSelectedCat={setSelectedCat} categories={categories} />
  );
}

async function VideoLibraryContent({ 
  selectedCat, 
  setSelectedCat, 
  categories 
}: { 
  selectedCat: string | null;
  setSelectedCat: (cat: string | null) => void;
  categories: string[];
}) {
  const { videos } = await getVideos();

  const filteredVideos = selectedCat && selectedCat !== 'Alle'
    ? videos.filter((v) => v.title.includes(selectedCat))
    : videos;

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Videobibliotek</h1>
        
        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat === selectedCat ? null : cat)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedCat === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div key={video.id} className="transform transition-transform hover:scale-105">
              <Card className="border hover:border-primary">
                <VideoCard video={video} />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}