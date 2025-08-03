import React from "react";
import ExpenseComponent from "./ExpenseComponent";
import { getAllExpenseForCurrentUser } from "../server/expense";

export default async function page() {
  const expenses = await getAllExpenseForCurrentUser();
  return <ExpenseComponent expenses={expenses} />;
}
