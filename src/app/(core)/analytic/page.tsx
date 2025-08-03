import React from "react";
import { ChartPieLabel } from "./PieChart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fiscus | Labels",
  description: "Fiscus - Personal Expense Tracker - Label Page",
};

export default function page() {
  return <ChartPieLabel />;
}
