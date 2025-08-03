"use client";

import React from "react";
import { ExpenseDataTable } from "./ExpenseDataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ExpenseWithLabel } from "@/app/server/expense";

export default function ExpenseComponent({
  expenses,
}: {
  expenses: ExpenseWithLabel[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Link href="/expense/create">
          <Button variant="outline">
            Create Expense
            <Plus className="mr-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="w-full">
        <ExpenseDataTable expenses={expenses} />
      </div>
    </div>
  );
}
