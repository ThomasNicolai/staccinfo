import { getArticle } from '@/lib/db';
import Link from 'next/link';

export default async function ArticlePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.slug);
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
    // VML content needs special handling
    displayContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            font-family: system-ui, sans-serif;
            background-color: white;
          }
          body {
            padding: 20px;
            box-sizing: border-box;
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
    // Extract HTML part from MIME content
    try {
      const contentParts = article.content.split('------=_NextPart');
      if (contentParts.length > 1) {
        const mainPartMatch = contentParts[1].match(
          /Content-Type: text\/html[\s\S]*?\r\n\r\n([\s\S]*?)(?:\r\n------=|$)/
        );
        if (mainPartMatch && mainPartMatch[1]) {
          let textContent = mainPartMatch[1]
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
                html, body {
                  margin: 0;
                  padding: 0;
                  height: 100%;
                  width: 100%;
                  font-family: system-ui, sans-serif;
                  background-color: white;
                }
                body {
                  padding: 20px;
                  box-sizing: border-box;
                  white-space: pre-wrap;
                }
              </style>
            </head>
            <body>${textContent}</body>
            </html>
          `;
        }
      } else {
        // Fallback for MIME content
        displayContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              html, body {
                margin: 0;
                padding: 0;
                height: 100%;
                width: 100%;
                font-family: system-ui, sans-serif;
                background-color: white;
              }
              body {
                padding: 20px;
                box-sizing: border-box;
                white-space: pre-wrap;
              }
            </style>
          </head>
          <body>${article.content}</body>
          </html>
        `;
      }
    } catch (e) {
      // Fallback for any parsing errors
      displayContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            html, body {
              margin: 0;
              padding: 0;
              height: 100%;
              width: 100%;
              font-family: system-ui, sans-serif;
              background-color: white;
            }
            body {
              padding: 20px;
              box-sizing: border-box;
              white-space: pre-wrap;
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
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            font-family: system-ui, sans-serif;
            background-color: white;
          }
          body {
            padding: 20px;
            box-sizing: border-box;
          }
          img { max-width: 100%; }
        </style>
      </head>
      <body>${article.content}</body>
      </html>
    `;
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
          srcDoc={displayContent}
          className="w-full h-full border-0"
          title={article.title}
          sandbox="allow-same-origin allow-scripts"
        />
      </div>
    </div>
  );
}
