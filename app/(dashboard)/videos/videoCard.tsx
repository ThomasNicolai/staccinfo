import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import type { Video } from '@/lib/db';

// Function to extract YouTube video ID and get thumbnail
function getThumbnail(url: string): string {
  if (url.includes('vimeo.com')) {
    const match = url.match(/vimeo.com\/(\d+)/);
    const videoId = match ? match[1] : null;
    return videoId
    ? `https://vumbnail.com/${videoId}.jpg`
    : 'https://placehold.co/600x400?text=Video+Thumbnail';
  } else if (url.includes('youtube.com') || url.includes("youtu.be")) {
    // Extract video ID from YouTube URL
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[7].length == 11 ? match[7] : null;

    // Return high-quality thumbnail URL if ID is found
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : 'https://placehold.co/600x400?text=Video+Thumbnail';
  }
  return 'https://placehold.co/600x400?text=Video+Thumbnail';
}

export default function VideoCard({ video }: { video: Video }) {
  return (
    <Card className="h-full">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={getThumbnail(video.url)}
          alt={`${video.title} thumbnail`}
          className="object-cover w-full h-full"
        />
        {/* Optional play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-30 rounded-full p-3">
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
        <CardTitle className="text-lg">{video.title}</CardTitle>
        <CardDescription>
          {Math.floor(video.length / 60)}:
          {String(video.length % 60).padStart(2, '0')} min
        </CardDescription>
      </CardHeader>
    </Card>
  );
}