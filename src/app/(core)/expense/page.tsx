import React from "react";
import { ExpenseTable } from "./ExpenseTable";
import { getAllExpenseForCurrentUser } from "../server/expense";

export default async function page() {
  const expenses = await getAllExpenseForCurrentUser();
  return (
    <>
      Test
      <ExpenseTable expenses={expenses} />
    </>
  );
}
