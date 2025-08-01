"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

type RegisterFormValues = {
  full_name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setApiError(null);
    try {
      const response = await fetch("/api/v1/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setApiError(result.message || "An unknown error occurred.");
      } else {
        alert("Registration successful! Please log in.");
        router.push("/login");
      }
    } catch (error) {
      setApiError("Failed to connect to the server. Please try again.");
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create a Fiscus Account
      </h2>
      <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <label className="block mb-2" htmlFor="full_name">
            Full Name
          </label>
          <input
            {...register("full_name", {
              required: "Full name is required.",
              minLength: {
                value: 3,
                message: "Full name must be at least 3 characters.",
              },
            })}
            className="w-full px-3 py-2 border rounded-lg"
            id="full_name"
            type="text"
          />
          {errors.full_name && (
            <p className="text-red-error text-xs mt-1">
              {errors.full_name.message}
            </p>
          )}
        </div>

        <div className="">
          <label className="block mb-2" htmlFor="email">
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email address.",
              },
            })}
            className="w-full px-3 py-2 border rounded-lg"
            id="email"
            type="email"
          />
          {errors.email && (
            <p className="text-red-error text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="">
          <label className="block mb-2" htmlFor="password">
            Password
          </label>
          <input
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters.",
              },
            })}
            className="w-full px-3 py-2 border rounded-lg"
            id="password"
            type="password"
          />
          {errors.password && (
            <p className="text-red-error text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {apiError && (
          <p className="text-red-error text-sm mb-4 text-center">{apiError}</p>
        )}

        <button
          className="w-full bg-blue-500 text-background py-2 rounded-lg disabled:bg-bg-700"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Account..." : "Register"}
        </button>
      </form>
      <p className="text-center text-sm mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Log in
        </Link>
      </p>
    </>
  );
}
