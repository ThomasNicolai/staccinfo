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
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <VideoPlayer video={video} onProgressChange={setProgress} />
      </div>
      <div className="sidebar w-72">
        <div className="progress-indicator">
          {/* Render your circular progress indicator using the progress state */}
          <svg viewBox="0 0 100 100">
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
        <div className="chapters">
          <h2>Kapittler</h2>
          <ul>
            {chapters.map((chapter, index) => (
              <li key={index}>
                <button onClick={() => goToChapter(chapter.time)}>
                  {chapter.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="related-videos">
          <h2>Se også</h2>
          <ul>
            {relatedVideos.map((related) => (
              <li key={related.id}>
                <a href={`/videos/${related.slug}`}>{related.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}