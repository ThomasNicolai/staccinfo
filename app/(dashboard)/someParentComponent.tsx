import dynamic from 'next/dynamic';

// Dynamically import VideoCard with SSR enabled so that it runs only on the server.
const VideoCard = dynamic(() => import('./videos/videoCard'), { ssr: true });

// ...existing code...
// Use <VideoCard video={...} /> in your component as needed.
