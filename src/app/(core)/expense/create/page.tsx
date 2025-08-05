import React from "react";
import { Metadata } from "next";
import ExpenseForm from "./ExpenseForm";
import { getLabelsForCurrentUser } from "@/app/server/label";

export const metadata: Metadata = {
  title: "Fiscus | Create Expense",
  description: "Fiscus - Personal Expense Tracker - Create Expense Page",
};

export default async function page() {
  const labels = await getLabelsForCurrentUser();
  return <ExpenseForm labels={labels} />;
}
