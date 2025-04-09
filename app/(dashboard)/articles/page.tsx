import { getArticles } from '@/lib/db';
import Link from 'next/link';
import ArticleCard from './articleCard';

export default async function ArticlesPage() {
  const { articles } = await getArticles();
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-foreground dark:text-foreground mb-6">
        Articles
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article) => (
          <Link href={`./articles/${article.slug}`} key={article.id}>
            <ArticleCard article={article} />
          </Link>
        ))}
      </div>
    </div>
  );
}
