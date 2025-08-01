"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setApiError(null);
    try {
      const response = await fetch("/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setApiError(result.message || "An unknown error occurred.");
      } else {
        alert("Login successful!");
        router.push("/login");
      }
    } catch (error) {
      setApiError("Failed to connect to the server. Please try again.");
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Login Into Fiscus
      </h2>
      <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
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
          {isSubmitting ? "Loading..." : "Login"}
        </button>
      </form>
      <p className="text-center text-sm mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </p>
    </>
  );
}
