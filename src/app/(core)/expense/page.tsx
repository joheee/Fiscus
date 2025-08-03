import React from "react";
import { getAllExpenseForCurrentUser } from "../server/expense";
import { ExpenseDataTable } from "./ExpenseDataTable";

export default async function page() {
  const expenses = await getAllExpenseForCurrentUser();
  return (
    <>
      <ExpenseDataTable expenses={expenses} />
    </>
  );
}
