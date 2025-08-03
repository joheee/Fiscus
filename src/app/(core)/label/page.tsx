import React from "react";
import LabelComponent from "./LabelComponent";
import { getLabelsForCurrentUser } from "@/app/server/label";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fiscus | Labels",
  description: "Fiscus - Personal Expense Tracker - Label Page",
};

export default async function page() {
  const labels = await getLabelsForCurrentUser();
  return <LabelComponent labels={labels} />;
}
