import React from "react";
import { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Fiscus | Login",
  description: "Fiscus - Personal Expense Tracker - Login Page",
};

export default function page() {
  return <LoginForm />;
}
