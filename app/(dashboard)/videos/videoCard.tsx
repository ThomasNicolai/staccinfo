'use client';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import type { Video, VideoProgression } from '@/lib/db';
import { useState } from 'react';
import { getThumbnail } from './videoUtils';

// Function to format duration from seconds to MM:SS
function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function VideoCard({ video, progression }: { video: Video; progression?: VideoProgression }) {
  const [thumbnailError, setThumbnailError] = useState(false);

  const handleImageError = () => setThumbnailError(true);

  const getThumbnailWithFallback = () => {
    if (thumbnailError) {
      if (video.url.includes('youtube.com') || video.url.includes('youtu.be')) {
        const regExp =
          /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = video.url.match(regExp);
        const videoId = match && match[7].length == 11 ? match[7] : null;

        if (videoId) {
          return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
      }
    }

    return getThumbnail(video.url);
  };

  const videoTags =
    typeof video.tag === 'string'
      ? video.tag
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
      : [];

  return (
    <Card className="h-full">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={getThumbnailWithFallback()}
          alt={`${video.title} thumbnail`}
          className="object-cover w-full h-full"
          onError={handleImageError}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-40 rounded-full p-3 hover:bg-opacity-60 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg line-clamp-2">
          {video.title}
        </CardTitle>
        <div className="mt-2 flex flex-wrap gap-1">
          {videoTags.length > 0 ? (
            videoTags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-xs">No tags</span>
          )}
        </div>
        <CardDescription className="mt-2">
          {formatDuration(video.length)}
        </CardDescription>
        {progression ? (
          <div className="text-sm text-gray-500 mt-2">
            Have watched: {progression.timestamp}
          </div>
        ) : (
          <div className="text-sm text-gray-500 mt-2">
            Not watched
          </div>
        )}
      </CardHeader>
    </Card>
  );
}
