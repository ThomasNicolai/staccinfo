import { getArticle } from '@/lib/db';
import Link from 'next/link';

export default async function ArticlePage({
  params
}: {
  params: Promise<{ slug: number }>;
}) {
  const slug = (await params).slug;
  const { article } = await getArticle(slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Artikkel ikke funnet</h1>
          <Link href="/articles" className="text-primary hover:underline">
            ← Tilbake til artikler
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Back link bar */}
      <div className="py-2 px-6 bg-background border-b">
        <div className="max-w-[1200px] mx-auto">
          <Link
            href="/articles"
            className="text-primary hover:underline inline-block"
          >
            ← Tilbake til artikler
          </Link>
        </div>
      </div>

      {/* Article content frame */}
      <div className="flex-grow bg-white w-full h-[calc(100vh-40px)]">
        <iframe
          srcDoc={article.content}
          className="w-full h-full border-0"
          title={article.title}
          sandbox="allow-same-origin allow-scripts"
        />
      </div>
    </div>
  );
}
