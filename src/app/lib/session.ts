import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import prisma from "./prisma";

export async function CreateJwt(user: { user_id: string }) {
  const secret = process.env.JWT_SECRET;
  const secretKey = new TextEncoder().encode(secret);

  const token = await new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secretKey);

  console.log("debug", token);

  (await cookies()).set("session-token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 12,
    path: "/",
  });

  console.log("debug session", await getUserSession());
}

export async function getUserSession() {
  const secret = process.env.JWT_SECRET;
  const secretKey = new TextEncoder().encode(secret);

  try {
    const token = (await cookies()).get("session-token");
    if (token) {
      const { payload } = await jwtVerify(token.value, secretKey, {
        algorithms: ["HS256"],
      });
      const user_id = payload.user_id as string;
      return await prisma.user.findFirst({
        where: { user_id },
        select: {
          user_id: true,
          full_name: true,
          email: true,
        },
      });
    }
    return null;
  } catch (error) {
    console.log("Failed to verify session: ", error);
    return null;
  }
}

export async function deleteSession() {
  (await cookies()).delete("session-token");
}
