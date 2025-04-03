import { getArticles } from '@/lib/db';
import Link from 'next/link';
import ArticleCard from './articleCard';

/*export default async function ArticlesPage() {
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
}*/
import React from "react";
import { getArticlesByCustomerSeq } from "@/lib/db";


export default async function ArticlesPage() {
  const customerSeq = 10217; // Change this as needed
  const data = await getArticlesByCustomerSeq(customerSeq);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Articles</h1>

      {data.articles && data.articles.length > 0 ? (
        <ul className="space-y-4">
          {data.articles.map((article: any) => (
            <li key={article.id} className="p-4 border rounded-lg">
              <Link href={`/dashboard/articles/${article.id}`}>
                <h2 className="text-lg font-semibold text-blue-600 hover:underline">
                  {article.title}
                </h2>
              </Link>
              <p className="text-gray-600">
                {article.content.substring(0, 100)}...
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No articles found for this customer.</p>
      )}
    </div>
  );
}