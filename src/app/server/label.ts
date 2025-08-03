"use server";

import prisma from "@/app/lib/prisma";
import { getUserSession } from "@/app/lib/session";
import { Prisma } from "@/generated/prisma";
import { error } from "console";

export type LabelWithExpense = Prisma.LabelGetPayload<{
  include: { expense: true };
}>;

export type LabelFormValues = {
  name: string;
};

export async function getLabelsForCurrentUser(): Promise<LabelWithExpense[]> {
  const session = await getUserSession();
  if (!session) {
    return [];
  }

  return await prisma.label.findMany({
    where: { user_id: session.user_id },
    include: {
      expense: true,
    },
    orderBy: { name: "asc" },
  });
}

export async function createLabel(data: LabelFormValues) {
  const session = await getUserSession();
  if (!session) {
    return { error: "Session is empty!" };
  }

  const newLabel = await prisma.label.create({
    data: {
      user_id: session.user_id,
      name: data.name,
    },
  });
  return {
    success: true,
    label: newLabel,
  };
}
