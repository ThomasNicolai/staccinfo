export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const content =
    '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8" /> <title>Hello, world!</title> <meta name="viewport" content="width=device-width,initial-scale=1" /> <meta name="description" content="" /> <link rel="icon" href="favicon.png"> </head> <body> <h1>Hello, world!</h1> </body> </html>';
  const articleData = {
    slug: slug,
    content: content
  };

  const iframeSrcString =
    'data:text/html,' + encodeURIComponent(articleData.content);
  return (
    <div>
      My Post: {articleData.slug}
      <iframe id="ArticleFrame" src={iframeSrcString}></iframe>
    </div>
  );
}
import { getArticlesByCustomerSeq } from "@/lib/db";

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const customerSeq = 10217; // Change this as needed
  const response = await getArticlesByCustomerSeq(customerSeq);

  if (response.error) {
    return <p className="text-red-500">❌ {response.error}</p>;
  }

  const article = response.articles.find((a: any) => a.id === Number(params.slug));

  if (!article) {
    return <p className="text-red-500">❌ Article Not Found</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{article.title}</h1>
      <div className="mt-4 p-4 border rounded-md bg-gray-50">
        <p>{article.content}</p>
      </div>
    </div>
  );
}

