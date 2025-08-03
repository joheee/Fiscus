import React from "react";
import { TableDemo } from "./Table";
import { getAllExpense } from "../server/expense";

export default async function page() {
  const expenses = await getAllExpense();
  console.log(expenses);
  return <TableDemo />;
}
