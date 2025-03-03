import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core';
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  availableAt: timestamp('available_at').notNull()
});

export type Video = {
  id: string;
  slug: string;
  length: number;
  url: string;
  title: string;
};
export type Article = {
  id: string;
  slug: string;
  title: string;
  content: string;
};

export type SelectProduct = typeof products.$inferSelect;
export const insertProductSchema = createInsertSchema(products);

export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: SelectProduct[];
  newOffset: number | null;
  totalProducts: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      products: await db
        .select()
        .from(products)
        .where(ilike(products.name, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalProducts: 0
    };
  }

  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  let totalProducts = await db.select({ count: count() }).from(products);
  let moreProducts = await db.select().from(products).limit(5).offset(offset);
  let newOffset = moreProducts.length >= 5 ? offset + 5 : null;

  return {
    products: moreProducts,
    newOffset,
    totalProducts: totalProducts[0].count
  };
}
export async function getVideos(): Promise<{
  videos: Video[];
}> {
  const dummyVideo1: Video = {
    id: '1',
    slug: 'kom-i-gang-med-obligasjoner',
    length: 180,
    title: 'Kom i gang med obligasjoner',
    url: 'https://example.com/videos/obligasjoner.mp4'
  };
  
  const dummyVideo2: Video = {
    id: '2',
    slug: 'transaksjonsregistrering',
    length: 240,
    title: 'Transaksjonsregistrering',
    url: 'https://example.com/videos/transaksjoner.mp4'
  };
  
  const dummyVideo3: Video = {
    id: '3',
    slug: 'rapportering',
    length: 300,
    title: 'Rapportering',
    url: 'https://example.com/videos/rapporter.mp4'
  };
  const dummyVideos = [dummyVideo1, dummyVideo2, dummyVideo3];
  return { videos: dummyVideos };
}
export async function getVideo(slug: string): Promise<{
  video: Video;
}> {
  const { videos } = await getVideos();
  const video = videos.find(v => v.slug === slug);
  
  if (!video) {
    return {
      video: {
        id: '1',
        slug: slug,
        length: 180,
        title: 'Video ikke funnet',
        url: 'https://example.com/videos/sample.mp4'
      }
    };
  }
  
  return { video };
}
export async function getArticles(): Promise<{
  articles: Article[];
}> {
  const dummyArticle1: Article = {
    id: '1',
    slug: 'kom-i-gang-med-obligasjoner',
    title: 'Kom i gang med obligasjoner',
    content:
      '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8" /> <title>Hello, world!</title> <meta name="viewport" content="width=device-width,initial-scale=1" /> <meta name="description" content="" /> <link rel="icon" href="favicon.png"> </head> <body> <h1>Hello, world!</h1> </body> </html>'
  };
  const dummyArticle2: Article = {
    id: '2',
    slug: 'kom-i-gang-med-obligasjoner',
    title: 'Kom i gang med obligasjoner',
    content:
      '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8" /> <title>Hello, world!</title> <meta name="viewport" content="width=device-width,initial-scale=1" /> <meta name="description" content="" /> <link rel="icon" href="favicon.png"> </head> <body> <h1>Hello, world!</h1> </body> </html>'
  };
  const dummyArticle3: Article = {
    id: '3',
    slug: 'kom-i-gang-med-obligasjoner',
    title: 'Kom i gang med obligasjoner',
    content:
      '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8" /> <title>Hello, world!</title> <meta name="viewport" content="width=device-width,initial-scale=1" /> <meta name="description" content="" /> <link rel="icon" href="favicon.png"> </head> <body> <h1>Hello, world!</h1> </body> </html>'
  };
  const dummyVideos = [dummyArticle1, dummyArticle2, dummyArticle3];
  return { articles: dummyVideos };
}
export async function getArticle(slug: string): Promise<{
  article: Article;
}> {
  const dummyArticle1: Article = {
    id: '1',
    slug: 'kom-i-gang-med-obligasjoner',
    title: 'Kom i gang med obligasjoner',
    content:
      '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8" /> <title>Hello, world!</title> <meta name="viewport" content="width=device-width,initial-scale=1" /> <meta name="description" content="" /> <link rel="icon" href="favicon.png"> </head> <body> <h1>Hello, world!</h1> </body> </html>'
  };
  return { article: dummyArticle1 };
}

export async function deleteProductById(id: number) {
  await db.delete(products).where(eq(products.id, id));
}
