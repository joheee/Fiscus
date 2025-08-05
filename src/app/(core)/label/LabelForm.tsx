"use client";
import {
  createLabel,
  LabelFormValues,
  updateLabelById,
} from "@/app/server/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Label as LabelType } from "@/generated/prisma";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type LabelUpdateParam = {
  label: LabelType | null;
};

export default function LabelForm({ label }: LabelUpdateParam) {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isEdit = !!label;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LabelFormValues>({
    defaultValues: {
      name: label?.name,
    },
  });

  const onSubmit = async (data: LabelFormValues) => {
    setErrorMsg(null);
    if (isEdit) {
      const result = await updateLabelById(label.label_id, data);
      if (result.error) {
        setErrorMsg(result.error);
        return;
      }
      alert(`Label ${result.label?.name} successfully updated!`);
    } else {
      const result = await createLabel(data);
      if (result.error) {
        setErrorMsg(result.error);
        return;
      }
      alert(`New label ${result.label?.name} successfully created!`);
    }
    router.push("/label");
  };

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">
        {isEdit ? `Update Label ${label.name}` : `Create New Label`}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="name" className="mb-2">
            Label Name
          </Label>
          <Input
            id="name"
            {...register("name", { required: "Name is required." })}
            placeholder="e.g., Groceries"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}

        <div className="flex justify-end">
          <Button variant="outline" type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Loading..."
              : isEdit
              ? "Update Label"
              : "Create Label"}
          </Button>
        </div>
      </form>
    </>
  );
}
