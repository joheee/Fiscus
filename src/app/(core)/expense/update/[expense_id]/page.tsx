import React from "react";
import { Metadata } from "next";
import ExpenseForm from "../../ExpenseForm";
import { getExpenseById } from "@/app/server/expense";
import { getLabelsForCurrentUser } from "@/app/server/label";

export const metadata: Metadata = {
  title: "Fiscus | Update Expense",
  description: "Fiscus - Personal Expense Tracker - Update Expense Page",
};

interface ExpensePageProps {
  params: Promise<{ expense_id: string }>;
}

export default async function page({ params }: ExpensePageProps) {
  const { expense_id } = await params;
  const expense = await getExpenseById(expense_id);
  const labels = await getLabelsForCurrentUser();
  return <ExpenseForm expense={expense!} labels={labels} />;
}
