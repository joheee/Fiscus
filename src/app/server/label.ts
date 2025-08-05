"use server";

import prisma from "@/app/lib/prisma";
import { getUserSession } from "@/app/lib/session";
import { Label, Prisma } from "@/generated/prisma";

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

export async function deleteLabel(label_id: string) {
  const deleteLabel = await prisma.label.delete({
    where: {
      label_id,
    },
  });
  return { success: true, label: deleteLabel };
}

export async function getLabelById(label_id: string) {
  return await prisma.label.findFirst({
    where: { label_id },
  });
}

export async function updateLabelById(label_id: string, data: LabelFormValues) {
  const session = await getUserSession();
  if (!session) {
    return { error: "Session is empty!" };
  }

  const newLabel = await prisma.label.update({
    where: { label_id },
    data,
  });
  return {
    success: true,
    label: newLabel,
  };
}
