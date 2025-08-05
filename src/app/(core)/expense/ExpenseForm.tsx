"use client";

import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createExpense,
  ExpenseFormValues,
  updateExpenseById,
} from "@/app/server/expense";
import { Expense, Label as LabelType } from "@/generated/prisma";
import { DateTimePicker24h } from "@/components/ui/date-time-picker";

type ExpenseFormParam = {
  expense: Expense | null;
  labels: LabelType[];
};

export default function ExpenseForm({ expense, labels }: ExpenseFormParam) {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const isEdit = !!expense;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormValues>({
    defaultValues: {
      quantity: expense?.quantity,
      name: expense?.name,
      label_id: expense?.label_id,
      price: expense?.price,
      transaction_date: isEdit ? expense?.transaction_date : new Date(),
    },
  });

  const onSubmit = async (data: ExpenseFormValues) => {
    setFormError(null);
    if (isEdit) {
      const result = await updateExpenseById(expense.expense_id, data);
      if (result.error) {
        setFormError(result.error);
      }
      alert(`Expense ${result.expense?.name} successfully updated!`);
    } else {
      const result = await createExpense(data);
      if (result.error) {
        setFormError(result.error);
      }
      alert(`New expense successfully created!`);
    }
    router.push("/expense");
  };

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">
        {isEdit ? `Update Expense ${expense?.name}` : `Create Expense`}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label className="mb-2" htmlFor="name">
            Expense Name
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label className="mb-2" htmlFor="quantity">
              Quantity
            </Label>
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
            <Label className="mb-2" htmlFor="price">
              Price
            </Label>
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
          <Label className="mb-2" htmlFor="transaction_date">
            Transaction Date
          </Label>
          <Controller
            name="transaction_date"
            control={control}
            rules={{
              required: "Transaction date is required.",
              validate: (value) => {
                const now = new Date();
                now.setMinutes(now.getMinutes() + 5);
                return (
                  value <= now || "Transaction date cannot be in the future."
                );
              },
            }}
            render={({ field }) => (
              <DateTimePicker24h
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.transaction_date && (
            <p className="mt-1 text-sm text-red-500">
              {errors.transaction_date.message}
            </p>
          )}
        </div>

        <div>
          <Label className="mb-2" htmlFor="label_id">
            Label
          </Label>
          <select
            id="label_id"
            {...register("label_id", { required: "Please select a label." })}
            className="w-full rounded-lg border bg-white px-3 py-2"
          >
            {labels.map((label: LabelType) => (
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
            {isSubmitting
              ? "Loading..."
              : isEdit
              ? "Update Expense"
              : "Create Expense"}
          </Button>
        </div>
      </form>
    </>
  );
}
