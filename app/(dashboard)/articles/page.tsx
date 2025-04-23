'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ArticleCard from './articleCard';
import { ArticleNavigation } from './articleNavigation';
import { getArticlesAction } from './actions';

type Article = {
  id: string;
  slug: string;
  title: string;
  content: string;
  tag: string[] | string;
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const normalizeTags = (tag: string[] | string | undefined): string[] => {
    if (!tag) return [];
    if (Array.isArray(tag)) return tag;
    return [tag];
  };

  useEffect(() => {
    async function fetchArticles() {
      const { articles: fetchedArticles } = await getArticlesAction();

      const uniqueCategories = Array.from(
        new Set(
          fetchedArticles.flatMap((article) => normalizeTags(article.tag))
        )
      );

      setArticles(fetchedArticles);
      setFilteredArticles(fetchedArticles);
      setCategories(uniqueCategories);
    }

    fetchArticles();
  }, []);

  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category);

    if (category === null) {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(
        articles.filter((article) => {
          const tags = normalizeTags(article.tag);
          return tags.includes(category);
        })
      );
    }
  };

  return (
    <div className="p-4 h-full min-h-[calc(100vh-4rem)]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-2">
          Articles
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Explore our collection of articles covering various financial topics
          to help you make informed decisions.
        </p>
      </div>

      <ArticleNavigation
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChangeAction={handleCategoryChange}
      />

      <div className="flex flex-row flex-wrap gap-4 mt-6">
        {filteredArticles.map((article) => (
          <Link href={`/articles/${article.slug}`} key={article.id}>
            <ArticleCard article={article} />
          </Link>
        ))}
      </div>
    </div>
  );
}
