import React from "react";
import { Metadata } from "next";
import ExpenseForm from "./ExpenseForm";

export const metadata: Metadata = {
  title: "Fiscus | Create Expense",
  description: "Fiscus - Personal Expense Tracker - Create Expense Page",
};

export default function page() {
  return <ExpenseForm />;
}
