"use client";
import { useState } from 'react';
import VideoPlayer from './videoPlayer';

export default function VideoDetailContent({
  video,
  relatedVideos,
}: {
  video: { slug: string; url: string; title: string };
  relatedVideos: any[];
}) {
  const [progress, setProgress] = useState(0);

  const chapters = [
    { time: 0, title: 'Introduction' },
    { time: 60, title: 'Background Information' },
    { time: 120, title: 'Main Topic' },
    { time: 180, title: 'Key Takeaways' },
    { time: 240, title: 'Conclusion' },
  ];

  const goToChapter = (time: number) => {
    // Client-side logic to seek the video
    console.log("Seeking to", time);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 mt-8">
      {/* LEFT COLUMN */}
      <div className="flex-1 space-y-8">
        <div className="video-player-wrapper bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
          <VideoPlayer video={video} onProgressChange={setProgress} />
        </div>

        <div className="related-videos bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-4">Se også</h2>
          <ul className="space-y-2">
            {relatedVideos.map((related) => (
              <li key={related.id}>
                <a
                  href={`/videos/${related.slug}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {related.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-full md:w-72 space-y-8">
        <div className="progress-indicator bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-4 text-center">Progresjon</h2>
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-32 h-32">
              <circle cx="50" cy="50" r="40" stroke="gray" strokeWidth="10" fill="none" />
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
              <text x="50" y="50" textAnchor="middle" dy=".3em" fontSize="18">
                {progress.toFixed(0)}%
              </text>
            </svg>
          </div>
        </div>

        <div className="chapters bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-4">Kapittler</h2>
          <ul className="space-y-2">
            {chapters.map((chapter, index) => (
              <li key={index}>
                <button
                  onClick={() => goToChapter(chapter.time)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {chapter.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
