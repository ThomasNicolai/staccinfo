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

// Function to format duration 
function formatDuration(seconds: number): string {
  if (seconds >= 3600) {
    const hours = Math.floor(seconds / 3600);
    const remainder = seconds % 3600;
    const minutes = Math.floor(remainder / 60);
    const sec = Math.floor(remainder % 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  } else {
    const minutes = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${minutes}:${sec.toString().padStart(2, '0')}`;
  }
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
        {/* Checkmark overlay if video finished */}
        {progression?.video_finished && (
          <div className="absolute top-2 right-2">
            <img src="/checkmark.png" alt="Finished" className="w-6 h-6" />
          </div>
        )}
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
        {progression ? (
          progression.video_finished ? (
            // If the video is marked as finished, display "Watched" text
            <div className="text-sm text-green-600 mb-2 font-semibold">Watched</div>
          ) : (
            // Otherwise, display the progress bar
            <div
              className="relative bg-gray-200 rounded h-2 mb-2"
              title={`${Math.floor((progression.timestamp / video.length) * 100)}% watched`}
            >
              <div
                className="bg-blue-500 h-full rounded"
                style={{ width: `${(progression.timestamp / video.length) * 100}%` }}
              />
            </div>
          )
        ) : (
          <div className="mb-2" />
        )}
        <CardTitle className="text-lg line-clamp-2">
          {video.title}
        </CardTitle>
        <div className="mt-2 flex flex-wrap gap-1">
          {videoTags.length > 0 && videoTags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <CardDescription className="mt-2">
          {formatDuration(video.length)}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
