import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Article } from '@/lib/db';

export default async function ArticleCard(props: { article: Article }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.article.title}</CardTitle>
        <CardDescription>Length: {props.article.id}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
