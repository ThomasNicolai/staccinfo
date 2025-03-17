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
import { count, eq, ilike, desc, asc } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { boolean, datetime } from 'drizzle-orm/mysql-core';

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

// First, define the suggestions table
export const suggestions = pgTable('suggestions', {
  id: serial('suggestion_id').primaryKey(),
  user_id: integer('creator_user_id').notNull(),
  suggestion_text: text('suggestion_text').notNull(),
  created_at: timestamp('created_at').notNull(),
  tag: text('tag_selection').notNull()
});

// 1. Define the Users table schema
export const users = pgTable('users', {
  id: serial('user_id').primaryKey(),
  username: text('username').notNull()
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
    url: 'https://www.youtube.com/embed/Ni7X2dt0Yx4'

  };
  
  const dummyVideo2: Video = {
    id: '2',
    slug: 'kom-i-gang-med-aksjer',
    length: 180,
    title: 'Kom i gang med aksjer',
    url: 'https://www.youtube.com/embed/Ni7X2dt0Yx4'

  };
  
  const dummyVideo3: Video = {
    id: '3',
    slug: 'kom-i-gang-med-investeringer',
    length: 180,
    title: 'Kom i gang med investeringer',
    url: 'https://www.youtube.com/embed/Ni7X2dt0Yx4'

  };
  const dummyVideos = [dummyVideo1, dummyVideo2, dummyVideo3];
  return { videos: dummyVideos };
}
export async function getVideo(slug: string): Promise<{
  video: Video;
}> {
  const dummyVideo1: Video = {
    id: '1',
    slug: 'kom-i-gang-med-obligasjoner',
    length: 180,
    title: 'Kom i gang med obligasjoner',
    url: 'https://www.youtube.com/embed/Ni7X2dt0Yx4'
  };
  return { video: dummyVideo1 };
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


// Updated function with tag filtering and sorting
export async function getSuggestions(
  tag_name?: string,
  sortBy: 'newest' | 'oldest' | 'tag' = 'newest'
) {
  // Build the query using the JS property names
  let query = db
    .select({
      id: suggestions.id,                   // JS property: id (DB column suggestion_id)
      text: suggestions.suggestion_text,    // JS property: suggestion_text
      user_id: suggestions.user_id,         // JS property: user_id (DB column creator_user_id)
      created_at: suggestions.created_at,   // JS property: created_at
      tag: suggestions.tag                  // JS property: tag (DB column tag_selection)
    })
    .from(suggestions);


  // Execute the query to get the results (this converts the query builder to the final result type)
  return await query.execute();
}

// Function to get all available tags (for filtering options)
export async function getSuggestionTags() {
  const results = await db
    .selectDistinct({
      tag: suggestions.tag
    })
    .from(suggestions)
    .orderBy(suggestions.tag);
  
  return results.map(result => result.tag);
}

// Function to get a single suggestion by ID
export async function getSuggestion(id: number) {
  const result = await db
    .select({
      id: suggestions.id,
      text: suggestions.suggestion_text,
      user_id: suggestions.user_id,
      created_at: suggestions.created_at,
      tag: suggestions.tag
    })
    .from(suggestions)
    .where(eq(suggestions.id, id))
    .limit(1)
    .execute();

  return result[0] || null;
}

// 2. Create a function to get a user by ID
export async function getUserById(id: number) {
  const result = await db
    .select({
      id: users.id,
      username: users.username
    })
    .from(users)
    .where(eq(users.id, id))
    .limit(1)
    .execute();
  
  return result[0] || null;
}

// 3. Update getSuggestion to include user data via join
export async function getSuggestionWithUser(id: number) {
  const result = await db
    .select({
      id: suggestions.id,
      text: suggestions.suggestion_text,
      user_id: users.id,
      username: users.username,
      created_at: suggestions.created_at,
      tag: suggestions.tag
    })
    .from(suggestions)
    .leftJoin(users, eq(suggestions.user_id, users.id))
    .where(eq(suggestions.id, id))
    .limit(1)
    .execute();
  
  return result[0] || null;
}

