import React from "react";
import { Metadata } from "next";
import LabelForm from "../LabelForm";

export const metadata: Metadata = {
  title: "Fiscus | Create Label",
  description: "Fiscus - Personal Expense Tracker - Create Label Page",
};

export default function page() {
  return <LabelForm label={null} />;
}
