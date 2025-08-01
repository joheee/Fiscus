"use server";

import prisma from "@/app/lib/prisma";
import { LoginFormValues } from "../login/LoginForm";
import * as bcrypt from "bcryptjs";
import { RegisterFormValues } from "../register/RegisterForm";

export async function LoginUser(data: LoginFormValues) {
  const { email, password } = data;
  if (!email || !password) return { error: "All field are required!" };

  try {
    const findUserByEmail = await prisma.user.findFirst({
      where: { email },
    });
    if (
      !findUserByEmail ||
      !(await bcrypt.compare(password, findUserByEmail.password))
    )
      return { error: "Invalid credentials!" };

    console.log("Login success for: ", findUserByEmail.email);
    return { success: true, user: { ...findUserByEmail } };
  } catch (error) {
    console.error("LoginUser error: ", error);
    return { error: `Internal server error occured: ${error}` };
  }
}

export async function RegisterUser(data: RegisterFormValues) {
  const { full_name, email, password, confirm_password } = data;
  if (!email || !password || !full_name || !confirm_password)
    return { error: "All field are required!" };

  try {
    const findUserByEmail = await prisma.user.findFirst({
      where: { email },
    });
    if (findUserByEmail) return { error: "Email is already used" };

    if (password.length < 8)
      return { error: "Password must be 8 characters minimum" };

    if (password !== confirm_password)
      return { error: "Password must be with confirm password." };

    const salt = process.env.JWT_SALT;
    if (!salt) {
      throw new Error("JWT_SALT is not defined in environment variables.");
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(salt));
    const newUser = await prisma.user.create({
      data: {
        email,
        full_name,
        password: hashedPassword,
      },
    });

    console.log("Register success for: ", newUser.email);
    return { success: true, user: { ...newUser } };
  } catch (error) {
    console.error("RegisterUser: ", error);
    return { error: `Internal server error occured: ${error}` };
  }
}
