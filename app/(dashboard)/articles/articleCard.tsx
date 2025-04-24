import React from 'react';
import Link from 'next/link';
import type { Article } from '@/lib/db';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  // Create a better text preview by handling both HTML and MIME content
  const getTextPreview = (content: string) => {
    // Check for VML content (Microsoft Word specific styling)
    if (content.includes('v\\:*') || content.includes('behavior:url')) {
      return 'Klikk for å lese artikkel...';
    }

    // Check if content appears to be MIME format or Word export
    if (content.includes('MIME-Version') || content.includes('Content-Type:')) {
      // Better approach for Word documents - look for actual body content
      const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (bodyMatch && bodyMatch[1]) {
        // Try to find paragraph content first - most likely to contain readable text
        const paragraphs = bodyMatch[1].match(/<p[^>]*>([\s\S]*?)<\/p>/gi);
        if (paragraphs && paragraphs.length > 0) {
          // Extract text from the first few paragraphs
          const paragraphText = paragraphs
            .slice(0, 3)
            .join(' ')
            .replace(/<[^>]*>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

          return paragraphText.length > 100
            ? paragraphText.slice(0, 97) + '...'
            : paragraphText;
        }

        // Extract text from body without tags as fallback
        const bodyText = bodyMatch[1]
          .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '') // Remove style tags completely
          .replace(/<[^>]*>/g, ' ') // Remove HTML tags
          .replace(/\s+/g, ' ') // Normalize whitespace
          .replace(/v\\:\*[^}]*}/g, '') // Remove VML style definitions
          .replace(/o\\:\*[^}]*}/g, '') // Remove Office style definitions
          .replace(/w\\:\*[^}]*}/g, '') // Remove Word style definitions
          .trim();

        return bodyText.length > 0
          ? bodyText.length > 100
            ? bodyText.slice(0, 97) + '...'
            : bodyText
          : 'Klikk for å lese artikkel...';
      }

      // Fallback for MIME content
      return 'Klikk for å lese artikkel...';
    }

    // Regular HTML content - use the original approach
    return content.replace(/<[^>]*>/g, '').slice(0, 100) + '...';
  };

  const textPreview = getTextPreview(article.content);

  return (
    <Link href={`/articles/${encodeURIComponent(article.id)}`}>
      <div className="bg-card dark:bg-card border dark:border-border p-6 rounded-xl shadow-md hover:shadow-lg transition-all h-full flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2 text-foreground">
            {article.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3">
            {textPreview}
          </p>
        </div>
        <div className="mt-4">
          <span className="text-primary dark:text-primary text-sm font-medium">
            Les mer →
          </span>
        </div>
      </div>
    </Link>
  );
}
