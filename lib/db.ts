import 'server-only';

import 'server-only';
import sql from 'mssql';

// Database configuration for MSSQL
const config = {
  server: 'stacc.database.windows.net',
  database: 'EscallLicenseDev',
  user: 'StaccUIB',
  password: 'puoNma012GpAGAep',
  options: {
    encrypt: true, 
    trustServerCertificate: false, 
  },
};

// Function to connect to the database
export async function connectToDatabase() {
  try {
    await sql.connect(config);
    console.log('Connected to the database');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

// Function to query the database
export async function queryDatabase(query: string) {
  try {
    const result = await sql.query(query);
    return result.recordset; // Return the query result
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  }
}

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
