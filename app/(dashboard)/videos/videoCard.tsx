import Link from 'next/link';

type VideoCardProps = {
  video: {
    id: number;
    title: string;
    url: string;
    length: number;
    tag: string;
  };
};

export default function VideoCard({ video }: VideoCardProps) {
  // Format the video length (assuming it's in seconds)
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Link href={`/videos/${video.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
        {/* Video thumbnail (could be a placeholder or generated from the video URL) */}
        <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded">
            {formatDuration(video.length)}
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-lg font-medium line-clamp-2">{video.title}</h2>
          <div className="mt-2 flex justify-between items-center">
            <span className="inline-block bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded">
              {video.tag}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
