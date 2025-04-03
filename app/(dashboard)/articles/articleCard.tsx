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
mport React from "react";

export default function ArticleCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600">{content.substring(0, 100)}...</p>
    </div>
  );
}