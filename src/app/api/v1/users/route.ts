import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    // 2. Find the user in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Use a generic error message for security
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 401 }
      );
    }

    // 4. Create the JWT token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      secret,
      {
        expiresIn: "1d", // Token expires in 1 day
      }
    );

    // 5. Return the token to the client
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { email, full_name, password } = body;

    if (!email || !full_name || !password) {
      return NextResponse.json(
        {
          message:
            "Missing required fields: email, full_name, and password are required.",
        },
        { status: 400 }
      );
    }

    if (typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        full_name,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("POST /api/users Error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
