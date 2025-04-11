'use server';

// Define Article type directly here to avoid importing from db.ts
type Article = {
  id: string;
  slug: string;
  title: string;
  content: string;
  tag: string[] | string;
};

export async function getArticlesAction() {
  // Completely isolated dummy data
  const dummyArticles: Article[] = [
    {
      id: '1',
      slug: 'kom-i-gang-med-obligasjoner',
      title: 'Kom i gang med obligasjoner',
      content: '<!DOCTYPE html><html><body><h1>Obligasjoner</h1></body></html>',
      tag: ['obligasjoner'],
    },
    {
      id: '2',
      slug: 'aksjer-for-nybegynnere',
      title: 'Aksjer for nybegynnere',
      content: '<!DOCTYPE html><html><body><h1>Aksjer</h1></body></html>',
      tag: ['aksjer'],
    },
    {
      id: '3',
      slug: 'fond-og-sparing',
      title: 'Fond og sparing',
      content: '<!DOCTYPE html><html><body><h1>Fond</h1></body></html>',
      tag: ['fond'],
    },
  ];
  
  return { articles: dummyArticles };
}

export async function getArticleAction(slug: string) {
  const { articles } = await getArticlesAction();
  const article = articles.find(article => article.slug === slug);
  return { article: article || null };
}