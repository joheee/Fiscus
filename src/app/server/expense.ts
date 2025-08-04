"use server";

import prisma from "@/app/lib/prisma";
import { getUserSession } from "@/app/lib/session";
import { Prisma } from "@/generated/prisma";

export type ExpenseWithLabel = Prisma.ExpenseGetPayload<{
  include: { label: true };
}>;

export type ExpenseFormValues = {
  name: string;
  quantity: number;
  price: number;
  label_id: string;
  transaction_date: Date;
};

export async function getAllExpenseForCurrentUser(): Promise<
  ExpenseWithLabel[]
> {
  const session = await getUserSession();
  if (!session) {
    return [];
  }

  const expense = await prisma.expense.findMany({
    where: {
      user_id: session.user_id,
    },
    include: {
      label: true,
    },
    orderBy: {
      transaction_date: "desc",
    },
  });
  return expense;
}

export async function createExpense(data: ExpenseFormValues) {
  const session = await getUserSession();
  if (!session) {
    return { error: "Session is empty!" };
  }

  const newExpense = await prisma.expense.create({
    data: {
      label_id: data.label_id,
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      transaction_date: data.transaction_date,
      user_id: session.user_id,
    },
  });

  return { success: true, expense: newExpense };
}

export async function deleteExpense(expense_id: string) {
  const deleteExpense = await prisma.expense.delete({
    where: { expense_id },
  });
  return { success: true, expense: deleteExpense };
}
