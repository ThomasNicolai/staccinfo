import { getArticles } from '@/lib/db';
import Link from 'next/link';
import ArticleCard from './articleCard';

export default async function ArticlesPage() {
  const { articles } = await getArticles();
  return (
    <div className="page">
      <h1>Articles</h1>
      {articles.map(function (article, i) {
        return (
          <Link href={`./articles/${article.slug}`} key={article.id}>
            <ArticleCard article={article} key={article.id} />
          </Link>
        );
      })}
    </div>
  );
}
