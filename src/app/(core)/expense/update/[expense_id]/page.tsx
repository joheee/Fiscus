import React from "react";
import { Metadata } from "next";
import ExpenseUpdateForm from "./ExpenseUpdateForm";
import { getExpenseById } from "@/app/server/expense";
import { getLabelsForCurrentUser } from "@/app/server/label";

export const metadata: Metadata = {
  title: "Fiscus | Update Expense",
  description: "Fiscus - Personal Expense Tracker - Update Expense Page",
};

export default async function page({ params }: any) {
  const expense = await getExpenseById(params.expense_id);
  const labels = await getLabelsForCurrentUser();
  return <ExpenseUpdateForm expense={expense!} labels={labels} />;
}
