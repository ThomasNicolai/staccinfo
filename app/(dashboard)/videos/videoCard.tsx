'use client';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import type { Video } from '@/lib/db';
import type { VideoProgression } from '@/lib/db';
import { useState } from 'react';
import { getThumbnail } from './videoUtils';

// Function to format duration: outputs hh:mm:ss if seconds >= 3600, otherwise mm:ss
function formatDuration(seconds: number): string {
  if (seconds >= 3600) {
    const hours = Math.floor(seconds / 3600);
    const remainder = seconds % 3600;
    const minutes = Math.floor(remainder / 60);
    const sec = Math.floor(remainder % 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }
  const minutes = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${minutes}:${sec.toString().padStart(2, '0')}`;
}

export default function VideoCard({
  video,
  progression
}: {
  video: Video;
  progression?: VideoProgression & { ts?: number };
}) {
  const [thumbnailError, setThumbnailError] = useState(false);
  const handleImageError = () => setThumbnailError(true);

  // Get thumbnail URL with a fallback
  const getThumbnailWithFallback = () => {
    if (thumbnailError) {
      if (video.url.includes('youtube.com') || video.url.includes('youtu.be')) {
        const regExp =
          /^.*((youtu\.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = video.url.match(regExp);
        const videoId = match && match[7].length == 11 ? match[7] : null;
        if (videoId) {
          return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
      }
    }
    return getThumbnail(video.url);
  };

  // Convert tags to an array.
  const videoTags = Array.isArray(video.tag)
    ? video.tag
    : typeof video.tag === 'string'
      ? video.tag.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      : [];

  // Calculate progress percentage if progression and video length exist.
  const progressPercentage = progression && video.length
    ? Math.min((progression.ts / video.length) * 100, 100)
    : 0;

  return (
    <Card className="h-full">
      {/* Thumbnail section */}
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
      {/* Place progress bar below the thumbnail container if progression exists and not finished */}
      {(progression && progression.ts > 0 && !progression.video_finished) && (
        <div className="mt-2 px-2">
          <div className="bg-gray-300 rounded h-2">
            <div
              className="bg-blue-500 h-2 rounded"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}
      {/* If video is finished, display the watched text below the progress bar with increased left margin */}
      {progression && progression.video_finished && (
        <div className="mt-2 ml-4 text-xs text-green-600 font-bold">
          Watched
        </div>
      )}
      {/* Card header with title, tags and duration */}
      <CardHeader className="p-4">
        <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
        <div className="mt-2 flex flex-wrap gap-1">
          {videoTags.length > 0 ? (
            videoTags.map(tag => (
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
      </CardHeader>
    </Card>
  );
}
