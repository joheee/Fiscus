import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Fiscus | Update Label",
  description: "Fiscus - Personal Expense Tracker - Update Label Page",
};

interface LabelPageProps {
  params: Promise<{ label_id: string }>;
}

export default function page({ params }: LabelPageProps) {
  return <div>page</div>;
}
