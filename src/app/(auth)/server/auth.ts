"use server";

import prisma from "@/app/lib/prisma";
import { LoginFormValues } from "../login/LoginForm";
import * as bcrypt from "bcryptjs";

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
