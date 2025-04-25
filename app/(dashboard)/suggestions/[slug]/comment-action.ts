"use server";

import { addComment, getCommentsForSuggestion, getUserByEmail } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

export async function handleNewComment(
  suggestionId: number,
  content: string,
  parentId: number | null
) {
  try {
    // Get the current authenticated session
    const session = await auth();

    if (!session || !session.user?.email) {
      throw new Error("You must be logged in to comment");
    }

    // Get the user from the database
    const { user } = await getUserByEmail(session.user.email);

    if (!user) {
      throw new Error("User not found");
    }

    // Use the authenticated user's ID from the session
    const userId = user.id;

    // Add the comment
    await addComment(suggestionId, userId, content, parentId);

    // Revalidate the path to refresh the data
    revalidatePath(`/suggestions/${suggestionId}`);

    // Return the updated comments
    return await getCommentsForSuggestion(suggestionId);
  } catch (error) {
    console.error("Error adding comment:", error);
    throw new Error("Failed to add comment");
  }
}
