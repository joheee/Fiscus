"use server";

import prisma from "@/app/lib/prisma";
import { getUserSession } from "@/app/lib/session";
import { Prisma } from "@/generated/prisma";

export type LabelWithExpense = Prisma.LabelGetPayload<{
  include: { expense: true };
}>;

export async function getLabelsForCurrentUser(): Promise<LabelWithExpense[]> {
  const session = await getUserSession();
  if (!session) {
    return [];
  }

  return prisma.label.findMany({
    where: { user_id: session.user_id },
    include: {
      expense: true,
    },
    orderBy: { name: "asc" },
  });
}
