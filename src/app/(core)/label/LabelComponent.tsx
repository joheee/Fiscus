"use client";

import React from "react";
import { LabelDataTable } from "./LabelDataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { LabelWithExpense } from "@/app/server/label";

export default function LabelComponent({
  labels,
}: {
  labels: LabelWithExpense[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Link href="/expense/create">
          <Button variant="outline">
            Create Label
            <Plus className="mr-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="w-full">
        <LabelDataTable labels={labels} />
      </div>
    </div>
  );
}
