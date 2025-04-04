'use client';
import { useState } from 'react';
import VideoPlayer from './videoPlayer';
import { Video } from '@/lib/db';
import Link from 'next/link';
import { getThumbnail, formatDuration } from '../videoUtils'; // Use the utilities file

export default function VideoDetailContent({
  video,
  relatedVideos
}: {
  video: Video;
  relatedVideos: Video[];
}) {
  const [progress, setProgress] = useState(0);

  const chapters = [
    { time: 0, title: 'Introduction' },
    { time: 60, title: 'Background Information' },
    { time: 120, title: 'Main Topic' },
    { time: 180, title: 'Key Takeaways' },
    { time: 240, title: 'Conclusion' }
  ];

  const goToChapter = (time: number) => {
    console.log('Seeking to', time);
  };

  return (
    <div className="w-full h-full min-h-screen flex justify-center bg-white py-12 px-4">
      <div className="w-full max-w-screen-2xl flex flex-col md:flex-row gap-12 text-base md:text-lg">
        {/* LEFT COLUMN */}
        <div className="flex-[1.2] space-y-10">
          <div className="video-player-wrapper bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
            <VideoPlayer video={video} onProgressChange={setProgress} />

            {/* Video metadata */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {typeof video.tag === 'string' &&
                  video.tag.split(',').map((tag, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded"
                    >
                      {tag.trim()}
                    </span>
                  ))}
              </div>
              <div className="text-sm text-gray-500">
                Length: {formatDuration(video.length)}
              </div>
            </div>
          </div>

          <div className="related-videos bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-5">Se også</h2>
            {relatedVideos.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {relatedVideos.map((related) => (
                  <Link
                    href={`/videos/${related.id}`}
                    key={related.id}
                    className="flex items-start gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                  >
                    <div className="w-24 h-14 bg-gray-100 flex-shrink-0 overflow-hidden rounded">
                      {/* Thumbnail preview */}
                      <img
                        src={getThumbnail(related.url)}
                        alt={related.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-2">
                        {related.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDuration(related.length)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No related videos found.</p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full md:w-80 space-y-10">
          <div className="progress-indicator bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-5 text-center">
              Progresjon
            </h2>
            <div className="justify-center">
              <svg viewBox="0 0 100 100" className="w-36 h-36 mx-auto">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="gray"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="blue"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * progress) / 100}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
                <text x="50" y="50" textAnchor="middle" dy=".3em" fontSize="20">
                  {progress.toFixed(0)}%
                </text>
              </svg>
            </div>
          </div>

          <div className="chapters bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-5">Kapittler</h2>
            <ul className="space-y-4">
              {chapters.map((chapter, index) => (
                <li key={index}>
                  <button
                    onClick={() => goToChapter(chapter.time)}
                    className="w-full text-left px-5 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-base rounded-md transition"
                  >
                    {chapter.title} ({formatDuration(chapter.time)})
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
