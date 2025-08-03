import prisma from "@/app/lib/prisma";

export async function getAllExpense() {
  const expense = await prisma.expense.findMany();
  return expense;
}
