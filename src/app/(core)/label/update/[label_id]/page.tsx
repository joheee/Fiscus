import { Metadata } from "next";
import React from "react";
import LabelForm from "../../LabelForm";
import { getLabelById } from "@/app/server/label";

export const metadata: Metadata = {
  title: "Fiscus | Update Label",
  description: "Fiscus - Personal Expense Tracker - Update Label Page",
};

interface LabelPageProps {
  params: Promise<{ label_id: string }>;
}

export default async function page({ params }: LabelPageProps) {
  const { label_id } = await params;
  const label = await getLabelById(label_id);
  return <LabelForm label={label} />;
}
