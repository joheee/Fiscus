import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request){
  return NextResponse.json(true);
}

export async function PATCH(request: Request){
  return NextResponse.json(true);
}