import React from 'react';
import { getArticles } from '@/lib/db';
import ArticleCard from './articleCard';

export default async function ArticlesPage() {
  const { articles } = await getArticles();

  return (
    <div className="relative min-h-screen">
      {/* Decorative circle in background */}
      <div className="absolute top-[-65px] left-[-170px] w-[390px] h-[390px] rounded-full transform translate-x-1 translate-y-1/3 bg-gradient-to-b from-[hsl(var(--primary))] to-[hsl(var(--secondary))] p-[55px] pointer-events-none z-0">
        <div className="w-full h-full rounded-full bg-background dark:bg-background"></div>
      </div>

      {/* Header section */}
      <div className="relative z-10 pt-6 px-6">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center pt-10">
            <h1 className="text-7xl font-bold">Artikler</h1>
          </div>

          <div className="flex flex-col justify-center items-center pb-10">
            <p className="mt-4 text-[15px] text-center max-w-xl pt-3">
              Her finner du nyttige artikler og veiledninger om våre produkter
              og tjenester.
            </p>
          </div>
        </div>
      </div>

      {/* Articles grid */}
      <div className="mt-10 w-full flex justify-center pb-20 relative z-10">
        <div className="w-full max-w-[1200px] px-6">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {articles.map((article) => (
                <div key={article.id} className="h-full">
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-xl font-medium text-muted-foreground">
                Ingen artikler funnet
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
