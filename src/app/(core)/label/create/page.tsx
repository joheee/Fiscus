import React from "react";
import LabelForm from "./LabelForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fiscus | Create Label",
  description: "Fiscus - Personal Expense Tracker - Create Label Page",
};

export default function page() {
  return <LabelForm />;
}
