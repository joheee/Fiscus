import prisma from "@/app/lib/prisma";
import { getUserSession } from "@/app/lib/session";

export interface ExpenseInterface {
  expense_id: string;
  name: string;
  quantity: number;
  price: number;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  label_id: string;
  label: LabelInterface;
}

export interface LabelInterface {
  name: string;
  created_at: Date;
  updated_at: Date;
  user_id: string | null;
  label_id: string;
}

export async function getAllExpenseForCurrentUser(): Promise<
  ExpenseInterface[]
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
  return expense;
}
