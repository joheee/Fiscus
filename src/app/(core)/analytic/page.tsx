import React from "react";
import { ChartPieLabel } from "./PieChart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fiscus | Analytics",
  description: "Fiscus - Personal Expense Tracker - Analytic Page",
};

export default function page() {
  return <ChartPieLabel />;
}
