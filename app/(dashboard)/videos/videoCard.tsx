import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Video } from '@/lib/db';

export default function VideoCard({ video }: { video: Video }) {
  return (
    <Card className="h-full">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img 
          src={video.url} 
          alt="Video thumbnail" 
          className="object-cover w-full h-full"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{video.title}</CardTitle>
        <CardDescription>
          {Math.floor(video.length / 60)}:{String(video.length % 60).padStart(2, '0')} min
        </CardDescription>
      </CardHeader>
    </Card>
  );
}