import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Video } from '@/lib/db';

export default async function VideoCard(props: { video: Video }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.video.title}</CardTitle>
        <CardDescription>Length: {props.video.length}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
