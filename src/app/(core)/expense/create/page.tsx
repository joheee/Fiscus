import React from "react";
import { Metadata } from "next";
import { getLabelsForCurrentUser } from "@/app/server/label";
import ExpenseForm from "../ExpenseForm";

export const metadata: Metadata = {
  title: "Fiscus | Create Expense",
  description: "Fiscus - Personal Expense Tracker - Create Expense Page",
};

export default async function page() {
  const labels = await getLabelsForCurrentUser();
  return <ExpenseForm expense={null} labels={labels} />;
}
