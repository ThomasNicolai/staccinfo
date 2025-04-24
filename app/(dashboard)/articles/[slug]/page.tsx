import { getArticle } from '@/lib/db';
import Link from 'next/link';

export default async function ArticlePage({
  params
}: {
  params: { slug: string };
}) {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.slug);

  const { article } = await getArticle(slug);

  if (!article) {
    return <div className="p-4">Article not found</div>;
  }

  // Determine content type
  const isVml =
    article.content.includes('v\\:*') ||
    article.content.includes('behavior:url');
  const isMime =
    article.content.includes('MIME-Version') ||
    article.content.includes('Content-Type: multipart/related');

  // Prepare content based on type
  let displayContent = '';

  if (isVml) {
    displayContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { 
            margin: 0; 
            padding: 20px; 
            font-family: system-ui, sans-serif;
            background-color: white;
            min-height: 100vh;
          }
          v\\:* { behavior:url(#default#VML); }
          o\\:* { behavior:url(#default#VML); }
          w\\:* { behavior:url(#default#VML); }
          img { max-width: 100%; }
        </style>
      </head>
      <body>${article.content}</body>
      </html>
    `;
  } else if (isMime) {
    // Your existing MIME content handling
    try {
      // Your existing code for MIME content parsing...
      const contentParts = article.content.split('------=_NextPart');
      if (contentParts.length > 1) {
        const mainPartMatch = contentParts[1].match(
          /Content-Type: text\/html[\s\S]*?\r\n\r\n([\s\S]*?)(?:\r\n------=|$)/
        );
        if (mainPartMatch && mainPartMatch[1]) {
          const textContent = mainPartMatch[1]
            .replace(/=\r\n/g, '')
            .replace(/=3D/g, '=')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/=20/g, ' ');

          displayContent = `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { 
                  margin: 0; 
                  padding: 20px; 
                  font-family: system-ui, sans-serif; 
                  white-space: pre-wrap;
                  background-color: white;
                  min-height: 100vh;
                }
              </style>
            </head>
            <body>${textContent}</body>
            </html>
          `;
        }
      }
    } catch (e) {
      // Fallback for MIME content
      displayContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { 
              margin: 0; 
              padding: 20px; 
              font-family: monospace; 
              white-space: pre-wrap;
              background-color: white;
              min-height: 100vh;
            }
          </style>
        </head>
        <body>${article.content}</body>
        </html>
      `;
    }
  } else {
    // Regular HTML content
    displayContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { 
            margin: 0; 
            padding: 20px; 
            font-family: system-ui, sans-serif;
            background-color: white;
            min-height: 100vh;
          }
          img { max-width: 100%; }
        </style>
      </head>
      <body>${article.content}</body>
      </html>
    `;
  }

  // Update the return section of your component

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Minimal back link bar */}
      <div className="py-2 px-6 bg-background flex-shrink-0 border-b">
        <div className="max-w-[1200px] mx-auto">
          <Link
            href="/articles"
            className="text-primary hover:underline inline-block"
          >
            ← Tilbake til artikler
          </Link>
        </div>
      </div>

      {/* Article content - take all remaining space */}
      <div className="flex-grow bg-white w-full h-[calc(100vh-48px)]">
        <iframe
          srcDoc={displayContent}
          className="w-full h-full border-0"
          title={article.title}
          sandbox="allow-same-origin allow-scripts"
          style={{ display: 'block', height: 'calc(100vh - 48px)' }}
        />
      </div>
    </div>
  );
}
