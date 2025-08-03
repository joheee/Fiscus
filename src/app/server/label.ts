"use server";
import prisma from "@/app/lib/prisma";
import { getUserSession } from "@/app/lib/session";

/**
 * Fetches all labels created by the currently logged-in user.
 * This is used to populate the select dropdown in the create expense form.
 */
export async function getLabelsForCurrentUser() {
  const session = await getUserSession();
  if (!session) {
    return [];
  }

  return prisma.label.findMany({
    where: { user_id: session.user_id },
    orderBy: { name: "asc" },
  });
}
