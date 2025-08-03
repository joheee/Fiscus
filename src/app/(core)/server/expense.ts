import prisma from "@/app/lib/prisma";
import { getUserSession } from "@/app/lib/session";
import { Prisma } from "@/generated/prisma";

export type ExpenseWithLabel = Prisma.ExpenseGetPayload<{
  include: { label: true };
}>;

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
      created_at: "desc",
    },
  });
  console.log(expense);
  return expense;
}
