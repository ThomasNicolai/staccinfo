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
  serial,
  boolean,
  unique
} from 'drizzle-orm/pg-core';
import { count, eq, ilike, desc, asc, and, sql } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { url } from 'inspector';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);


// First, define the suggestions table
export const suggestions = pgTable('suggestions', {
  id: serial('suggestion_id').primaryKey(),
  user_id: integer('creator_user_id').notNull(),
  suggestion_text: text('suggestion_text').notNull(),
  created_at: timestamp('created_at').notNull(),
  tag: text('tag_selection').notNull(),
  is_anonymous: boolean('is_anonymous').notNull().default(false)
});

export const videos = pgTable('videos', {
  id: serial('video_id').primaryKey(),
  title: text('title').notNull(),
  url: text('url').notNull(),
  length: numeric('video_length').notNull(),
  tag: text('tag_selection').notNull(),
});

export const users = pgTable('users', {
  id: serial('user_id').primaryKey(),
  username: text('username').notNull()
});

export const suggestionVotes = pgTable(
  'suggestion_votes',
  {
    id: serial('vote_id').primaryKey(),
    suggestion_id: integer('suggestion_id')
      .notNull()
      .references(() => suggestions.id),
    user_id: integer('user_id')
      .notNull()
      .references(() => users.id),
    created_at: timestamp('created_at').notNull()
  },
  (table) => {
    return {
      // Define the unique constraint inside a function to avoid circular reference
      uniqueVote: unique('unique_suggestion_vote').on(table.suggestion_id, table.user_id)
    };
  }
);

export type Video = {
  id: number;
  title: string;
  url: string;
  length: number;
  tag: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  content: string;
};


export async function getVideos(): Promise<{ videos: Video[] }> {
  const result = await db
    .select({
      id: videos.id,
      title: videos.title,
      url: videos.url,
      length: videos.length,
      tag: videos.tag, // Use videos.tag instead of suggestions.tag
    })
    .from(videos)
    .execute();
  
  return { videos: result };
}

    

export async function getVideo(id: number): Promise<{ video: Video | null }> {
  const result = await db
    .select({
      id: videos.id,
      title: videos.title,
      url: videos.url,
      length: videos.length,
      tag: videos.tag,
    })
    .from(videos)
    .where(eq(videos.id, id))
    .limit(1)
    .execute();
  
  return { video: result[0] || null };
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


// Updated function with tag filtering and sorting AND vote counts
export async function getSuggestions(tag_name?: string) {
  // Create a subquery to count votes
  const voteSubquery = db
    .select({
      suggestion_id: suggestionVotes.suggestion_id,
      vote_count: count(suggestionVotes.id).as('vote_count')
    })
    .from(suggestionVotes)
    .groupBy(suggestionVotes.suggestion_id)
    .as('vote_counts');

  // Start with a base query
  const baseSelect = db
    .select({
      id: suggestions.id,
      text: suggestions.suggestion_text,
      user_id: suggestions.user_id,
      created_at: suggestions.created_at,
      tag: suggestions.tag,
      is_anonymous: suggestions.is_anonymous,
      vote_count: voteSubquery.vote_count
    })
    .from(suggestions)
    .leftJoin(
      voteSubquery,
      eq(suggestions.id, voteSubquery.suggestion_id)
    );
    
  // Apply tag filtering if needed
  const filteredQuery = tag_name 
    ? baseSelect.where(eq(suggestions.tag, tag_name))
    : baseSelect;
  
  // Apply ordering and execute
  const result = await filteredQuery
    .orderBy(desc(sql`COALESCE(${voteSubquery.vote_count}, 0)`))
    .execute();
    
  // Get all unique tags in a separate query
  const tags = await db
    .selectDistinct({ tag: suggestions.tag })
    .from(suggestions)
    .orderBy(asc(suggestions.tag))
    .execute();
    
  return {
    suggestions: result,
    tags: tags.map(t => t.tag)
  };
}

// Add function to check if user has voted
export async function hasUserVotedSuggestion(suggestionId: number, userId: number): Promise<boolean> {
  const result = await db
    .select()
    .from(suggestionVotes)
    .where(
      and(
        eq(suggestionVotes.suggestion_id, suggestionId),
        eq(suggestionVotes.user_id, userId)
      )
    )
    .limit(1);
    
  return result.length > 0;
}

// Add a vote to a suggestion
export async function voteSuggestion(
  suggestionId: number,
  userId: number
): Promise<{ success: boolean; message: string }> {
  try {
    // Check if user has already voted
    const hasVoted = await hasUserVotedSuggestion(suggestionId, userId);
    if (hasVoted) {
      // Remove the vote if they've already voted
      await db
        .delete(suggestionVotes)
        .where(
          and(
            eq(suggestionVotes.suggestion_id, suggestionId),
            eq(suggestionVotes.user_id, userId)
          )
        );
      return { success: true, message: 'Vote removed' };
    } else {
      // Add a new vote
      await db
        .insert(suggestionVotes)
        .values({
          suggestion_id: suggestionId,
          user_id: userId,
          created_at: new Date()
        });
      return { success: true, message: 'Vote added' };
    }
  } catch (error) {
    console.error('Error voting on suggestion:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Update getSuggestionWithUser to include vote info
export async function getSuggestionWithUser(id: number, currentUserId: number = 1) {
  // Create a subquery to get vote count
  const voteCountSubquery = db
    .select({
      suggestion_id: suggestionVotes.suggestion_id,
      vote_count: count(suggestionVotes.id).as('vote_count')
    })
    .from(suggestionVotes)
    .where(eq(suggestionVotes.suggestion_id, id))
    .groupBy(suggestionVotes.suggestion_id)
    .as('vote_count_subquery');

  // Check if current user has voted
  const userVoteSubquery = db
    .select({
      has_voted: sql`TRUE`.as('has_voted')
    })
    .from(suggestionVotes)
    .where(
      and(
        eq(suggestionVotes.suggestion_id, id),
        eq(suggestionVotes.user_id, currentUserId)
      )
    )
    .limit(1)
    .as('user_vote_subquery');

  const result = await db
    .select({
      id: suggestions.id,
      text: suggestions.suggestion_text,
      user_id: users.id,
      username: users.username,
      created_at: suggestions.created_at,
      tag: suggestions.tag,
      is_anonymous: suggestions.is_anonymous,
      vote_count: voteCountSubquery.vote_count,
      user_has_voted: userVoteSubquery.has_voted
    })
    .from(suggestions)
    .leftJoin(users, eq(suggestions.user_id, users.id))
    .leftJoin(voteCountSubquery, eq(suggestions.id, voteCountSubquery.suggestion_id))
    .leftJoin(userVoteSubquery, sql`TRUE`)
    .where(eq(suggestions.id, id))
    .limit(1)
    .execute();
  
  if (!result[0]) return null;
  
  const suggestion = {
    ...result[0],
    vote_count: result[0].vote_count || 0,
    user_has_voted: Boolean(result[0].user_has_voted)
  };
  
  if (suggestion.is_anonymous) {
    return {
      ...suggestion,
      username: 'Anonymous'
    };
  }
  
  return suggestion;
}

// Function to post a new suggestion
export async function postSuggestion(
  suggestionText: string,
  userId: number,
  tag: string,
  isAnonymous: boolean
) {
  try {
    const result = await db
      .insert(suggestions)
      .values({
        suggestion_text: suggestionText,
        user_id: userId,
        created_at: new Date(),
        tag: tag,
        is_anonymous: isAnonymous
      })
      .returning();
    
    return result[0];
  } catch (error) {
    console.error('Error posting suggestion:', error);
    throw error;
  }
}