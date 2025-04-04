// Function to get thumbnail URL from video URL
export function getThumbnail(url: string): string {
    if (url.includes('vimeo.com')) {
      const match = url.match(/vimeo.com\/(\d+)/);
      const videoId = match ? match[1] : null;
      return videoId
        ? `https://vumbnail.com/${videoId}.jpg`
        : 'https://placehold.co/600x400?text=Video+Thumbnail';
    } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
      // Extract video ID from YouTube URL
      const regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const match = url.match(regExp);
      const videoId = match && match[7].length == 11 ? match[7] : null;
  
      if (!videoId) return 'https://placehold.co/600x400?text=Video+Thumbnail';
  
      // Return high-quality thumbnail URL
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return 'https://placehold.co/600x400?text=Video+Thumbnail';
  }
  
  // Format duration from seconds to MM:SS
  export function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }