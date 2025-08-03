"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { RegisterUser } from "../server/auth";

export interface RegisterFormValues {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const passwordValue = watch("password");

  const onSubmit = async (data: RegisterFormValues) => {
    setErrorMsg(null);
    const result = await RegisterUser(data);
    if (result.error) {
      setErrorMsg(result.error);
      return;
    }
    alert(
      `Registration successful! Please login as ${result.user?.full_name}!`
    );
    router.push("/login");
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
            <p className="text-red-error text-xs mt-1">{errors.email.message}</p>
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

        <div className="">
          <label className="block mb-2" htmlFor="confirm_password">
            Confirm Password
          </label>
          <input
            {...register("confirm_password", {
              required: "Please confirm your password.",
              // 3. Add the custom validate function
              validate: (value) =>
                value === passwordValue || "The passwords do not match",
            })}
            className="w-full px-3 py-2 border rounded-lg"
            id="confirm_password"
            type="password"
          />
          {errors.confirm_password && (
            <p className="text-red-error text-xs mt-1">
              {errors.confirm_password.message}
            </p>
          )}
        </div>

        {errorMsg && (
          <p className="text-red-error text-sm mb-4 text-center">{errorMsg}</p>
        )}

        <button
          className="w-full bg-blue-500 text-background py-2 rounded-lg disabled:bg-blue-700"
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
