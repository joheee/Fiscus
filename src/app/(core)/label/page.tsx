import React from "react";
import LabelComponent from "./LabelComponent";
import { getLabelsForCurrentUser } from "@/app/server/label";

export default async function page() {
  const labels = await getLabelsForCurrentUser();
  return <LabelComponent labels={labels} />;
}
