import React from "react";
import RegisterForm from "./RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fiscus | Registration",
  description: "Fiscus - Personal Expense Tracker - Registration Page",
};

export default function page() {
  return <RegisterForm />;
}
