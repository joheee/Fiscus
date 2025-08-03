import React from "react";
import ExpenseComponent from "./ExpenseComponent";
import { getAllExpenseForCurrentUser } from "../../server/expense";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fiscus | Expenses",
  description: "Fiscus - Personal Expense Tracker - Expense Page",
};

export default async function page() {
  const initialExpenses = await getAllExpenseForCurrentUser();
  return <ExpenseComponent expenses={initialExpenses} />;
}
