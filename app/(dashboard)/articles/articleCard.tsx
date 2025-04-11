import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

// Define Article type locally
type Article = {
  id: string;
  slug: string;
  title: string;
  content: string;
  tag: string[] | string;
};

export default function ArticleCard(props: { article: Article }) {
  return (
    <Card className="w-[300px] h-[200px] max-w-full bg-blue-100">
      <CardHeader>
        <CardTitle>{props.article.title}</CardTitle>
        <CardDescription>Length: {props.article.id}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
