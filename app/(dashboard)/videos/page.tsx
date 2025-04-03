import { getVideos } from '@/lib/db';

export default async function VideoPage() {
  // Fetch videos from the database
  const { videos } = await getVideos();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Videos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {video.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {video.tag}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Length: {video.length} seconds{' '}
            </p>
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Watch Video
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
