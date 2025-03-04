'use client';

import * as React from 'react';
import VideoCard from './videoCard';
import Link from 'next/link';
import type { Video } from '@/lib/db';
import { useRouter } from 'next/navigation';

interface VideoClientProps {
  initialVideos: Video[];
}

export default function VideoClient({ initialVideos }: VideoClientProps) {
  const [selectedFilter, setSelectedFilter] = React.useState('Alle videoer');
  const [videos, setVideos] = React.useState<Video[]>(initialVideos || []);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const filters = [
    'Alle videoer',
    'Oppsett',
    'Grunndata',
    'Transaksjonsregistrering',
    'Rapportering'
  ];

  const filteredVideos = React.useMemo(() => {
    if (selectedFilter === 'Alle videoer') return videos;
    
    return videos.filter(video => {
      const title = video.title.toLowerCase();
      switch(selectedFilter) {
        case 'Oppsett':
          return title.includes('kom i gang');
        case 'Grunndata':
          return title.includes('grunndata');
        case 'Transaksjonsregistrering':
          return title.includes('transaksjon');
        case 'Rapportering':
          return title.includes('rapport');
        default:
          return false;
      }
    });
  }, [selectedFilter, videos]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Videobibliotek</h1>
        
        {isLoading && (
          <div className="text-center py-4">Loading videos...</div>
        )}
        
        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm transition-colors
                ${selectedFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Link 
              href={`/videos/${video.slug}`} 
              key={video.id}
              onClick={() => router.push(`/videos/${video.slug}`)}
              className="block transform hover:scale-105 transition-transform"
            >
              <VideoCard video={video} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}