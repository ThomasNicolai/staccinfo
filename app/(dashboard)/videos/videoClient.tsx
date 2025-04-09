'use client';

import React, { useState } from 'react';
import type { Video, VideoProgression } from '@/lib/db';
import VideoCard from './videoCard';
import Link from 'next/link';

// Helper to extract tags.
function getTagsArray(video: Video): string[] {
  if (Array.isArray(video.tag)) return video.tag;
  if (typeof video.tag === 'string')
    return video.tag.split(',').map(t => t.trim()).filter(t => t.length > 0);
  return [];
}

export default function VideoClient({
  initialVideos
}: {
  // Update type so that each video may carry an optional progression property.
  initialVideos: (Video & { progression?: VideoProgression })[];
}) {
  const [videos] = useState(initialVideos);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract unique tags.
  const allTags: string[] = [];
  videos.forEach(video => {
    getTagsArray(video).forEach(tag => {
      if (!allTags.includes(tag)) allTags.push(tag);
    });
  });
  const uniqueTags = allTags.sort();

  // Filter videos based on selected tag.
  const filteredVideos = selectedTag
    ? videos.filter(video => getTagsArray(video).includes(selectedTag))
    : videos;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Videos</h1>
      </div>

      {/* Tags filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded text-sm ${
            selectedTag === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        {uniqueTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded text-sm ${
              selectedTag === tag
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Videos grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.length > 0 ? (
          filteredVideos.map(video => (
            <Link href={`/videos/${video.id}`} key={video.id}>
              <VideoCard video={video} progression={video.progression} />
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center py-8 text-gray-500">
            No videos {selectedTag ? `with tag "${selectedTag}"` : ''} found.
          </p>
        )}
      </div>
    </div>
  );
}
