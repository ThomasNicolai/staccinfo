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
    console.log("Seeking to", time);
  };

  return (
    <div className="w-full h-full min-h-screen flex justify-center bg-white py-12 px-4">
      <div className="w-full max-w-screen-2xl flex flex-col md:flex-row gap-12 text-base md:text-lg">
        {/* LEFT COLUMN */}
        <div className="flex-[1.2] space-y-10">
          <div className="video-player-wrapper bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
            <VideoPlayer video={video} onProgressChange={setProgress} />
          </div>

          <div className="related-videos bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-5">Se også</h2>
            <ul className="space-y-3">
              {relatedVideos.map((related) => (
                <li key={related.id}>
                  <a
                    href={`/videos/${related.slug}`}
                    className="text-base text-blue-600 hover:underline"
                  >
                    {related.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full md:w-80 space-y-10">
          <div className="progress-indicator bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-5 text-center">Progresjon</h2>
            <div className="justify-center">
              <svg viewBox="0 0 100 100" className="w-36 h-36 mx-auto">
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
                    {chapter.title}
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
