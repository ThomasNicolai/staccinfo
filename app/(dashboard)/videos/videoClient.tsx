'use client';

import React, { useState } from 'react';
import { Video } from '@/lib/db';
import VideoCard from './videoCard';
import Link from 'next/link';

function getTagsArray(video: Video): string[] {
  // Check if tag is an array
  if (Array.isArray(video.tag)) {
    return video.tag;
  }

  // Check if tag exists and is a string
  if (typeof video.tag === 'string') {
    return video.tag
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
  }

  // Default case: no tags
  return [];
}

export default function VideoClient({
  initialVideos
}: {
  initialVideos: Video[];
}) {
  const [videos] = useState<Video[]>(initialVideos);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags from comma-separated tag strings
  const allTags: string[] = [];
  videos.forEach((video) => {
    // Use our safe helper function
    const videoTags = getTagsArray(video);
    videoTags.forEach((tag) => {
      if (!allTags.includes(tag)) {
        allTags.push(tag);
      }
    });
  });

  // Sort tags alphabetically
  const uniqueTags = allTags.sort();

  // Filter videos based on selected tag
  const filteredVideos = selectedTag
    ? videos.filter((video) => {
        // Use our safe helper function
        const videoTags = getTagsArray(video);
        return videoTags.includes(selectedTag);
      })
    : videos;

  return (
    <div className="container mx-auto px-4 py-8">
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
        {uniqueTags.map((tag) => (
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
          filteredVideos.map((video) => (
            <Link href={`/videos/${video.id}`} key={video.id}>
              <VideoCard video={video} />
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
