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
