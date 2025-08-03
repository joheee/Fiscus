"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLabelsForCurrentUser } from "@/app/server/label";
import { Label as LabelType } from "@/generated/prisma";
import { DateTimePicker24h } from "@/components/ui/date-time-picker";

// Define the type for our form values
type ExpenseFormValues = {
  name: string;
  quantity: number;
  price: number;
  label_id: string;
};

export default function CreateExpensePage() {
  const router = useRouter();
  const [labels, setLabels] = useState<LabelType[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  // Since this is a Client Component, we fetch the labels with useEffect
  useEffect(() => {
    getLabelsForCurrentUser().then(setLabels);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormValues>();

  // This client-side function prepares the data and calls the Server Action
  const onSubmit = async (data: ExpenseFormValues) => {
    setFormError(null);

    // FormData is a standard way to send form data to Server Actions
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("quantity", String(data.quantity));
    formData.append("price", String(data.price));
    formData.append("label_id", data.label_id);

    if (result?.error) {
      setFormError(result.error);
    } else {
      // The redirect will be handled by the server action, but you can
      // add a fallback or toast message here if you want.
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Create New Expense</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="name">Expense Name</Label>
          <Input
            id="name"
            {...register("name", {
              required: "Name is required.",
            })}
            placeholder="e.g., Groceries"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              {...register("quantity", {
                required: "Quantity is required.",
                valueAsNumber: true,
                min: { value: 1, message: "Quantity must be at least 1." },
              })}
              defaultValue={1}
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-500">
                {errors.quantity.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register("price", {
                required: "Price is required.",
                valueAsNumber: true,
                min: { value: 0.01, message: "Price must be greater than 0." },
              })}
              placeholder="0.00"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-500">
                {errors.price.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="label_id">Transaction Date</Label>
          <DateTimePicker24h />
        </div>

        <div>
          <Label htmlFor="label_id">Label</Label>
          <select
            id="label_id"
            {...register("label_id", {
              required: "Please select a label.",
            })}
            className="w-full rounded-lg border bg-white px-3 py-2"
          >
            <option value="">Select a label</option>
            {labels.map((label) => (
              <option key={label.label_id} value={label.label_id}>
                {label.name}
              </option>
            ))}
          </select>
          {errors.label_id && (
            <p className="mt-1 text-sm text-red-500">
              {errors.label_id.message}
            </p>
          )}
        </div>

        {formError && <p className="text-sm text-red-500">{formError}</p>}

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Expense"}
          </Button>
        </div>
      </form>
    </div>
  );
}
